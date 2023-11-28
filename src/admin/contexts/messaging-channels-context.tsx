import React, { createContext, useContext } from "react";

type MessagingContextType = {
    isChannelsFetchLoading: boolean;
    isChannelsFetchError: boolean;

    channels: any[] | undefined | null;
}

const MessagingContext = createContext<MessagingContextType | null>(null);

type MessagingContextProviderProps = {
    children: React.ReactNode;
}

export const MessagingContextProvider = ({ settingId, children }: MessagingContextProviderProps) => {
    return (

    )
}


export const useMessagingContext = () => {
    const context = useContext(MessagingContext);

    if (context === null) {
        throw new Error(
            "useMessagingContext must be used within a MessagingContextProvider"
        );
    }
    return context;
};