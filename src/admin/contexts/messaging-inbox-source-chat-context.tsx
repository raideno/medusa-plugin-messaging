import React, { createContext, useContext, useState } from "react";

import Channel from "../../types/channel";
import Source from "../../types/source";

import useChannel from "../hooks/channels/use-channel";
import useSource from "../hooks/sources/use-source";
import Message from "../../types/message";
import useMessages from "../hooks/messages/use-messages";
import { useToggleState } from "@medusajs/ui";

type MessagingInboxSourceChatContextType = {
    isRightSideBarVisible: boolean;

    toggleRightSideBarVisibility: () => void;

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

    const { state: isRightSideBarVisible, toggle: toggleRightSideBarVisibility } = useToggleState(true);

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
                isRightSideBarVisible,
                toggleRightSideBarVisibility,

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