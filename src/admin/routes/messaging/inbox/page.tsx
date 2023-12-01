import "./styles.css";

import { useEffect } from "react";

import { RouteProps, RouteConfig } from "@medusajs/admin"

import InboxPageHeader from "./components/inbox-page-header";
import InboxChannelsList from "./components/inbox-channels-list";
import InboxChannelSourceChat from "./components/inbox-channel-source-chat";

import InboxPageProviders from "./providers";
import { Toaster } from "@medusajs/ui";

const cleanContainerMarginAndPadding = () => {
    const container = document.querySelector("main");
    "xsmall:mx-base small:mx-xlarge medium:mx-4xlarge large:mx-auto large:max-w-7xl".split(" ").forEach((className) => {
        container.classList.remove(className);
    });
    "large:px-xlarge py-xlarge bg-grey-5 overflow-y-auto".split(" ").forEach((className) => {
        container.parentElement.classList.remove(className);
    });
}

const revertCleanContainerMarginAndPadding = () => {
    const container = document.querySelector("main");
    "xsmall:mx-base small:mx-xlarge medium:mx-4xlarge large:mx-auto large:max-w-7xl".split(" ").forEach((className) => {
        container.classList.add(className);
    });
    "large:px-xlarge py-xlarge bg-grey-5 overflow-y-auto".split(" ").forEach((className) => {
        container.parentElement.classList.add(className);
    });
}

const InboxPage = ({
    notify
}: RouteProps) => {

    useEffect(() => {
        cleanContainerMarginAndPadding();

        () => revertCleanContainerMarginAndPadding();
    }, []);

    return (
        <InboxPageProviders>
            <div className="w-full h-full flex flex-row">
                <div className="min-w-[calc(96*4px)] w-96 max-w-[calc(96*4px)] border-grey-20 border-r h-full max-h-full">
                    <div className="min-w-[calc(96*4px)] w-96 max-w-[calc(96*4px)] border-grey-20 border-b">
                        <InboxPageHeader />
                    </div>
                    <div className="min-w-[calc(96*4px)] w-96 max-w-[calc(96*4px)] h-full max-h-full overflow-y-auto">
                        <InboxChannelsList />
                    </div>
                </div>
                <div className="w-full h-full flex flex-row items-center justify-center">
                    <InboxChannelSourceChat />
                </div>
            </div>
            <Toaster />
        </InboxPageProviders>
    )
}

export default InboxPage;