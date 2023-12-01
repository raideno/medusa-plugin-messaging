import { Avatar, Tooltip } from "@medusajs/ui";

import Channel from "../../../../../../../types/channel";

import SourcesList from "./sources-list";
import BodyTypography from "../../../../../../components/typography/body";

type InboxChannelsListItemProps = {
    channel: Channel;
}

const InboxChannelsListItem = ({ channel }: InboxChannelsListItemProps) => {

    return (
        <div className="w-full hover:opacity-90 cursor-pointer flex flex-row gap-2 items-center justify-start p-4 border-grey-20 border-b">
            <div className="flex flex-row items-center gap-1">
                <div>
                    <Avatar fallback="CH" />
                </div>
                <div>
                    <Tooltip content={channel.customerId}>
                        <BodyTypography weight="bold">Channel</BodyTypography>
                    </Tooltip>
                </div>
            </div>
            <div>
                <SourcesList channel={channel} />
            </div>
        </div>
    )
}

export default InboxChannelsListItem;