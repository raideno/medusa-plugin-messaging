import { FocusModal } from "@medusajs/ui";

import Channel from "../../../../types/channel";

import BodyTypography from "../../typography/body";
import TitleTypography from "../../typography/title";

import ChannelsNotesModalNotesList from "./notes-list";
import ChannelsNotesModalCreateNote from "./create-note";

type ChannelNotesModalProps = {
    channel: Channel;
    children: React.ReactNode;
}

const ChannelNotesModal = ({
    channel,
    children: trigger
}: ChannelNotesModalProps) => {

    return (
        <FocusModal>
            <FocusModal.Trigger>
                {trigger}
            </FocusModal.Trigger>
            <FocusModal.Content>
                <FocusModal.Header>
                    <BodyTypography weight="bold">Customer Channel Notes</BodyTypography>
                </FocusModal.Header>
                <FocusModal.Body className="flex flex-col items-center py-16">
                    <div className="flex w-full max-w-lg flex-col gap-y-8 h-full max-h-full">
                        <div className="flex flex-col gap-y-1">
                            <TitleTypography weight="bold">Customer Channel Notes</TitleTypography>
                            <BodyTypography className="text-ui-fg-subtle">
                                Here you can consult your this customer channel notes and write new ones for the other staff / admin members to see.
                            </BodyTypography>
                        </div>
                        <ChannelsNotesModalCreateNote channel={channel} />
                        <ChannelsNotesModalNotesList channel={channel} />
                    </div>
                </FocusModal.Body>
            </FocusModal.Content>
        </FocusModal>
    )
}

export default ChannelNotesModal;