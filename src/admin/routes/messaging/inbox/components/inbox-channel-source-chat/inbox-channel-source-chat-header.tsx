import { Sidebar } from "@medusajs/icons";
import { IconButton, Input, Tooltip } from "@medusajs/ui";

import { useMessagingInboxSourceContext } from "../../../../../contexts/messaging-inbox-source-context";

import BodyTypography from "../../../../../components/typography/body";
import { useMessagingInboxSourceChatContext } from "../../../../../contexts/messaging-inbox-source-chat-context";

type InboxChannelSourceChatHeaderProps = {}

const InboxChannelSourceChatHeader = ({ }: InboxChannelSourceChatHeaderProps) => {

    const { source } = useMessagingInboxSourceContext();

    const { toggleRightSideBarVisibility } = useMessagingInboxSourceChatContext();

    return (
        <div className="w-full min-h-[calc(32*4px)] h-[calc(32*4px)] max-h-[calc(32*4px)] border-grey-20 border-b">
            <div className="w-full h-full p-4 flex flex-col">
                <div className="w-full flex flex-row items-center justify-between">
                    <div>
                        <BodyTypography className="text-ui-fg-base" weight="bold">Channel {">"} {source.name}</BodyTypography>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Input size="small" type="search" placeholder="Search" />
                        <Tooltip content="Toggle Right SideBar.">
                            <IconButton onClick={toggleRightSideBarVisibility} variant="primary" size="base">
                                <Sidebar />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div>more-infos</div>
            </div>
        </div>
    )
}

export default InboxChannelSourceChatHeader;