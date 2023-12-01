import { useEffect } from "react";

import Source from "../../../../../../types/source";
import { useMessagingInboxSourceContext } from "../../../../../contexts/messaging-inbox-source-context";
import useSource from "../../../../../hooks/sources/use-source";

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
        unSelectSource
    } = useMessagingInboxSourceContext();

    if (!sourceId || !channelId)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div>InboxChannelSourceChat: No Source Selected.</div>
            </div>
        )

    if (isFetchLoading)
        return (
            <div>channel-source-loading...</div>
        )

    if (isFetchError)
        return (
            <div>channel-source-error.</div>
        )

    return (
        <div>
            <div className="h-32 border-grey-20 border-b">header</div>
            <div>
                <div>
                    <div>content</div>
                    <div className="border-grey-20 border-t">input</div>
                </div>
                <div className="border-grey-20 border-l">
                    <div>participants</div>
                    <div className="border-grey-20 border-t">notes</div>
                </div>
            </div>
        </div>
    )
}

export default InboxChannelSourceChat;