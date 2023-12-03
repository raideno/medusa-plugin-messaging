import { IconButton, Tooltip } from "@medusajs/ui";
import BodyTypography from "../../../../../../../components/typography/body";
import { useMessagingInboxSourceChatContext } from "../../../../../../../contexts/messaging-inbox-source-chat-context";
import { useMessagingInboxSourceContext } from "../../../../../../../contexts/messaging-inbox-source-context";
import useTargetNotes from "../../../../../../../hooks/notes/use-target-notes";
import InboxChannelSourceChatSideBarNotesList from "./notes-list";
import { Plus } from "@medusajs/icons";
import WriteTargetNoteModal from "../../../../../../../components/complex/write-target-note-modal";

type InboxChannelSourceChatSidebarNotesProps = {}

const InboxChannelSourceChatSidebarNotes = ({ }: InboxChannelSourceChatSidebarNotesProps) => {

    const { source } = useMessagingInboxSourceContext();

    const { } = useMessagingInboxSourceChatContext();

    const { data, isLoading, isValidating } = useTargetNotes(source.id);

    return (
        <div className="w-full h-full border-grey-20 border-t">
            <div className="h-full w-full p-4 flex flex-col gap-4">
                <div className="w-full flex flex-row items-center justify-between">
                    <BodyTypography weight="bold">Source Notes</BodyTypography>
                    <Tooltip content="Wirte a Note.">
                        <WriteTargetNoteModal
                            targetId={source.id}
                            targetTypeName={"Source"}
                        >
                            <IconButton>
                                <Plus />
                            </IconButton>
                        </WriteTargetNoteModal>
                    </Tooltip>
                </div>
                <InboxChannelSourceChatSideBarNotesList source={source} />
            </div>
        </div>
    )
}

export default InboxChannelSourceChatSidebarNotes;