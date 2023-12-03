import { Avatar, IconButton, Tooltip, useToggleState } from "@medusajs/ui";

import Channel from "../../../../../../../types/channel";

import SourcesList from "./sources-list";
import BodyTypography from "../../../../../../components/typography/body";
import { ChevronUpDown, PencilSquare } from "@medusajs/icons";
import ChannelNotesModal from "../../../../../../components/complex/channel-notes-modal";

type InboxChannelsListItemProps = {
    channel: Channel;
}

const InboxChannelsListItem = ({ channel }: InboxChannelsListItemProps) => {

    const { state: areSourcesDisplayed, open: displaySources, close: hideSources, toggle: toggleSources } = useToggleState(false);

    return (
        <div className="w-full flex flex-col gap-2 items-center justify-start">
            <div className="w-full cursor-pointer flex flex-row items-center justify-between hover:opacity-90 border-grey-20 border-b p-4">
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
                    <Tooltip content="Display Channel's Sources">
                        <IconButton variant="transparent" onClick={toggleSources}>
                            <ChevronUpDown />
                        </IconButton>
                    </Tooltip>
                    <Tooltip content="View & Write Notes">
                        <ChannelNotesModal channel={channel}>
                            <IconButton variant="transparent">
                                <PencilSquare />
                            </IconButton>
                        </ChannelNotesModal>
                    </Tooltip>
                </div>
            </div>
            {areSourcesDisplayed && (
                <div className="w-full pl-14 pr-4">
                    <SourcesList channel={channel} />
                </div>
            )}
            {areSourcesDisplayed && (<div className="w-full border-grey-2 border-b" />)}
        </div>
    )
}

export default InboxChannelsListItem;