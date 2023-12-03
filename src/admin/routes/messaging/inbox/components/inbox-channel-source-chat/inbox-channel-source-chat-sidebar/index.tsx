import { useMessagingInboxSourceChatContext } from "../../../../../../contexts/messaging-inbox-source-chat-context";
import { useMessagingInboxSourceContext } from "../../../../../../contexts/messaging-inbox-source-context";
import InboxChannelSourceChatSidebarMembers from "./inbox-channel-source-chat-sidebar-members";
import InboxChannelSourceChatSidebarNotes from "./inbox-channel-source-chat-sidebar-notes";

type InboxChannelSourceChatSidebarProps = {}

const InboxChannelSourceChatSidebar = ({ }: InboxChannelSourceChatSidebarProps) => {

    const { source } = useMessagingInboxSourceContext();

    const { isRightSideBarVisible } = useMessagingInboxSourceChatContext();

    if (!isRightSideBarVisible)
        return null;

    return (
        <div className="flex flex-col min-w-[calc(64*4px)] w-[calc(64*4px)] max-w-[calc(64*4px)] h-full border-grey-20 border-l">
            <InboxChannelSourceChatSidebarMembers />
            <InboxChannelSourceChatSidebarNotes />
        </div>
    )
}

export default InboxChannelSourceChatSidebar