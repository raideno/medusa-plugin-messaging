// import "./styles.css"

import { useEffect } from "react";

import Source from "../../../../../../types/source";
import { useMessagingInboxSourceContext } from "../../../../../contexts/messaging-inbox-source-context";
import useSource from "../../../../../hooks/sources/use-source";
import BodyTypography from "../../../../../components/typography/body";
import { IconButton, Input, Tooltip } from "@medusajs/ui";
import { MessagingInboxSourceChatContextProvider } from "../../../../../contexts/messaging-inbox-source-chat-context";
import InboxChannelSourceChatHeader from "./inbox-channel-source-chat-header";
import InboxChannelSourceChatSidebar from "./inbox-channel-source-chat-sidebar";
import InboxChannelSourceChatControls from "./inbox-channel-source-chat-controls";
import InboxChannelSourceChatContent from "./inbox-channel-source-chat-content";

type InboxChannelSourceChatProps = {
};

const InboxChannelSourceChat = ({
}: InboxChannelSourceChatProps) => {

    const {
        channel,
        source,
        channelId,
        isFetchError,
        isFetchLoading,
        sourceId,
        unSelectSource,
        selectSource
    } = useMessagingInboxSourceContext();

    if (!sourceId || !channelId)
        return (
            <div className="bg-white opacity-50 bg-[radial-gradient(#000000_0.75px,transparent_0.75px),radial-gradient(#000000_0.75px,#ffffff_0.75px)] bg-[30px_30px] bg-[0_0,15px_15px] w-full h-full flex items-center justify-center">
                <BodyTypography>No Source Selected.</BodyTypography>
            </div>
        )

    if (isFetchLoading)
        return (
            <div className="w-full h-full flex items-center justify-center bg-white opacity-50 bg-[radial-gradient(#000000_0.75px,transparent_0.75px),radial-gradient(#000000_0.75px,#ffffff_0.75px)] bg-[30px_30px] bg-[0_0,15px_15px]">
                <BodyTypography>Channel - Source Loading...</BodyTypography>
            </div>
        )

    if (isFetchError)
        return (
            <div className="w-full h-full flex items-center justify-center bg-white opacity-50 bg-[radial-gradient(#000000_0.75px,transparent_0.75px),radial-gradient(#000000_0.75px,#ffffff_0.75px)] bg-[30px_30px] bg-[0_0,15px_15px]">
                <BodyTypography>Channel - Source Error.</BodyTypography>
            </div>
        )

    return (
        <MessagingInboxSourceChatContextProvider
            channelId={channel.id}
            sourceId={source.id}
        >
            <div className="w-full h-full flex flex-col items-center justify-center bg-white opacity-50 bg-[radial-gradient(#000000_0.75px,transparent_0.75px),radial-gradient(#000000_0.75px,#ffffff_0.75px)] bg-[30px_30px] bg-[0_0,15px_15px]">
                <InboxChannelSourceChatHeader />
                <div className="flex flex-row w-full h-full">
                    <div className="flex flex-col w-full h-full">
                        <InboxChannelSourceChatContent />
                        <InboxChannelSourceChatControls />
                    </div>
                    <InboxChannelSourceChatSidebar />
                </div>
            </div>
        </MessagingInboxSourceChatContextProvider>
    )
}

export default InboxChannelSourceChat;