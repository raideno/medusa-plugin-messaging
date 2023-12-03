import { CursorArrowRays, PlaySolid, TriangleRightMini } from "@medusajs/icons";
import { IconButton, Input, Tooltip } from "@medusajs/ui";

type InboxChannelSourceChatControlsProps = {

}

const InboxChannelSourceChatControls = () => {
    return (
        <div className="w-full h-20 border-grey-20 border-t">
            <div className="w-full h-full p-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
                <Tooltip content="Actions.">
                    <IconButton size="large">
                        <CursorArrowRays />
                    </IconButton>
                </Tooltip>
                <Input className="w-full" placeholder="Message.." />
                <Tooltip content="Send Message.">
                    <IconButton size="large">
                        <PlaySolid />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default InboxChannelSourceChatControls;