import React, { createContext, useContext, useState, useEffect } from "react";

import Channel from "../../types/channel";

import useChannels from "../hooks/channels/use-channels";
import getChannelsEvents from "../functions/channels/get-channels-events";

import { EndpointEventResponseBodyType } from "../../api/routes/admin/messaging/channels/get-channels-events/types";
import { channelCreateMutate, channelDeleteMutate, channelUpdateMutate } from "../hooks/channels";

const DEFAULT_FILTER_KEY = "id";
const DEFAULT_FILTER_SEARCH = undefined;

type MessagingInboxChannelsContextType = {

    isChannelsFetchLoading: boolean;
    isChannelsFetchError: boolean;

    filter: {
        search: string | undefined;
        key: string;
    };

    channels: Channel[] | undefined | null;

    setFilterSearch: (search: string | undefined) => void;
    setFilterKey: (key: string) => void,
}

const MessagingInboxChannelsContext = createContext<MessagingInboxChannelsContextType | null>(null);

type MessagingInboxChannelsContextProviderProps = {
    children: React.ReactNode;
}

export const MessagingInboxChannelsContextProvider = ({ children }: MessagingInboxChannelsContextProviderProps) => {

    const {
        data,
        isLoading: isChannelsFetchLoading,
        error: isChannelsFetchError
    } = useChannels();

    const [filter, setFilter] = useState<MessagingInboxChannelsContextType["filter"]>({
        key: DEFAULT_FILTER_KEY,
        search: DEFAULT_FILTER_SEARCH
    });

    const [isSourceError, setIsSourceError] = useState<boolean>(false);
    const [isSourceLoading, setIsSourceLoading] = useState<boolean>(false);
    const [source, setSource] = useState<EventSource | null | undefined>(undefined);

    useEffect(() => {
        (async () => {
            let src: EventSource | null | undefined = undefined;
            setIsSourceLoading(true);
            try {
                src = await getChannelsEvents();
                setSource(src);
            } catch (error) {
                src = null;
                setSource(null);
                setIsSourceError(true);
            } finally {
                setIsSourceLoading(false);
            }

            if (!src) {
                console.log("messaging", "failed to create source.");
                return;
            }

            src.addEventListener("message", async (e) => {
                const event: EndpointEventResponseBodyType = e.data;

                const name = event.name;
                const channel = event.data.channel;

                switch (name) {
                    case "medusa-plugin-messaging-channel-insert-event":
                        await channelCreateMutate(channel);
                        break;
                    case "medusa-plugin-messaging-channel-update-event":
                        await channelUpdateMutate(channel);
                        break;
                    case "medusa-plugin-messaging-channel-delete-event":
                        await channelDeleteMutate(channel.id);
                        break;
                    default:
                        break;
                }

            });
        })();

        return () => {
            if (source) {
                /**
                 * TODO: remove event listener
                 */
                source.close();
            }
        }
    }, [])


    function setFilterSearch(search: string | undefined) {
        const newFilter = JSON.parse(JSON.stringify(filter)) as MessagingInboxChannelsContextType["filter"];
        newFilter.search = search;
        setFilter(newFilter);
    }

    function setFilterKey(key: string) {
        const newFilter = JSON.parse(JSON.stringify(filter)) as MessagingInboxChannelsContextType["filter"];
        newFilter.key = key;
        setFilter(newFilter);
    }

    return (
        <MessagingInboxChannelsContext.Provider
            value={{
                channels: data ? data.channels : null,
                isChannelsFetchError,
                isChannelsFetchLoading,
                filter,
                setFilterKey,
                setFilterSearch
            }}
        >
            {children}
        </MessagingInboxChannelsContext.Provider>
    )
}

export const useMessagingInboxChannelsContext = () => {
    const context = useContext(MessagingInboxChannelsContext);

    if (context === null) {
        throw new Error(
            "useMessagingInboxChannelsContext must be used within a MessagingInboxChannelsContextProvider"
        );
    }
    return context;
};