import Source from "../../../../../../../../types/source";
import NoteCard from "../../../../../../../components/cards/note-card";
import NoteCardSkeelton from "../../../../../../../components/cards/note-card-skeleton";
import SmallTypography from "../../../../../../../components/typography/small";
import useTargetNotes from "../../../../../../../hooks/notes/use-target-notes";

type ListProps = {
    children: React.ReactNode[];
}

const List = ({
    children
}: ListProps) => {
    return (
        <div className="flex flex-col gap-2">
            {children}
        </div>
    )
}

type InboxChannelSourceChatSideBarNotesListProps = {
    source: Source
}

const InboxChannelSourceChatSideBarNotesList = ({ source }: InboxChannelSourceChatSideBarNotesListProps) => {

    const { data, isLoading, error } = useTargetNotes(source.id);

    if (isLoading)
        return (
            <List>
                {new Array(4).fill(0).map((_, i) => {
                    return (
                        <NoteCardSkeelton key={"source-notes-list-item-skeleton-" + i} />
                    )
                })}
            </List>
        )

    if (error || !data || !data.notes)
        return (
            <div className="w-full h-full flex flex-row items-center justify-center">
                <SmallTypography>Error while Loading Channel Notes :( Try again.</SmallTypography>
            </div>
        )

    const notes = data.notes;

    if (notes.length === 0)
        return (
            <div className="w-full h-full flex flex-row items-center justify-center">
                <SmallTypography>No Note have been written yet.</SmallTypography>
            </div>
        )

    return (
        <List>
            {notes.map((note) => {
                return (
                    <NoteCard note={note} />
                )
            })}
        </List>
    )
}

export default InboxChannelSourceChatSideBarNotesList;