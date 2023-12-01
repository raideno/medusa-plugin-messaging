import React, { createContext, useContext, useState } from "react";

import Channel from "../../types/channel";
import Source from "../../types/source";

import useChannel from "../hooks/channels/use-channel";
import useSource from "../hooks/sources/use-source";
import Message from "../../types/message";
import useMessages from "../hooks/messages/use-messages";

type MessagingInboxSourceChatContextType = {
    isMessagesFetchLoading: boolean;
    isMessagesFetchError: boolean;

    featchPreviousMessages: () => void;

    messages: Message[];
}

const MessagingInboxSourceChatContext = createContext<MessagingInboxSourceChatContextType | null>(null);

type MessagingInboxSourceChatContextProviderProps = {
    channelId: string;
    sourceId: string;
    children: React.ReactNode;
}

export const MessagingInboxSourceChatContextProvider = ({
    channelId,
    sourceId,
    children,
}: MessagingInboxSourceChatContextProviderProps) => {

    // const [isMessagesFetchError, setIsFetchError] = useState<MessagingInboxSourceChatContextType["isMessagesFetchError"]>(false);
    // const [isMessagesFetchLoading, setIsFetchLoading] = useState<MessagingInboxSourceChatContextType["isMessagesFetchLoading"]>(false);

    const { data, isLoading: isMessagesFetchLoading, error: isMessagesFetchError } = useMessages(channelId, sourceId);

    async function featchPreviousMessages() {
        // setIsFetchLoading(true);

        try {

        } catch (error) {

        } finally {
            // setIsFetchLoading(false);
        }
    }

    return (
        <MessagingInboxSourceChatContext.Provider
            value={{
                isMessagesFetchLoading,
                isMessagesFetchError,

                featchPreviousMessages,

                messages: data ? data.messages : []
            }}
        >
            {children}
        </MessagingInboxSourceChatContext.Provider>
    )
}


export const useMessagingInboxSourceChatContext = () => {
    const context = useContext(MessagingInboxSourceChatContext);

    if (context === null) {
        throw new Error(
            "useMessagingInboxSourceChatContext must be used within a MessagingInboxSourceChatContextProvider"
        );
    }
    return context;
};