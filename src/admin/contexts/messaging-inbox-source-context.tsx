import React, { createContext, useContext, useState } from "react";

import Channel from "../../types/channel";
import Source from "../../types/source";

import useSource from "../hooks/sources/use-source";
import useChannel from "../hooks/channels/use-channel";

type MessagingInboxSourceContextType = {
    channelId: string | null;
    sourceId: string | null;

    channel: Channel | null;
    source: Source | null;

    isFetchLoading: boolean;
    isFetchError: boolean;

    selectSource: (channelId: string, sourceId: string) => void;
    unSelectSource: () => void;
}

const MessagingInboxSourceContext = createContext<MessagingInboxSourceContextType | null>(null);

type MessagingInboxSourceContextProviderProps = {
    children: React.ReactNode;
}

export const MessagingInboxSourceContextProvider = ({ children }: MessagingInboxSourceContextProviderProps) => {

    const [channelId, setChannelId] = useState<MessagingInboxSourceContextType["channelId"]>(null);
    const [sourceId, setSourceId] = useState<MessagingInboxSourceContextType["sourceId"]>(null);

    const { data: channelData, isLoading: isChannelFetchLoading, error: isChannelFetchError } = useChannel(channelId);
    const { data: sourceData, isLoading: isSourceFetchLoading, error: isSourceFetchError } = useSource(channelId, sourceId);

    const isFetchLoading = isChannelFetchLoading || isSourceFetchLoading;
    const isFetchError = (channelId !== null && sourceId !== null) && (isChannelFetchError || isSourceFetchError);

    function selectSource(channelId: string, sourceId: string) {
        setChannelId(channelId);
        setSourceId(sourceId);
    }

    function unSelectSource() {
        setChannelId(null);
        setSourceId(null);
    }

    return (
        <MessagingInboxSourceContext.Provider
            value={{
                channelId,
                sourceId,

                isFetchLoading,
                isFetchError,

                channel: channelData ? channelData.channel : null,
                source: sourceData ? sourceData.source : null,

                selectSource,
                unSelectSource
            }}
        >
            {children}
        </MessagingInboxSourceContext.Provider>
    )
}


export const useMessagingInboxSourceContext = () => {
    const context = useContext(MessagingInboxSourceContext);

    if (context === null) {
        throw new Error(
            "useMessagingInboxSourceContext must be used within a MessagingInboxSourceContextProvider"
        );
    }
    return context;
};