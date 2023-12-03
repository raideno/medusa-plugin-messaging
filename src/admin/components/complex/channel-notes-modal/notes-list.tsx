import Channel from "../../../../types/channel";
import useTargetNotes from "../../../hooks/notes/use-target-notes";
import NoteCard from "../../cards/note-card";
import NoteCardSkeelton from "../../cards/note-card-skeleton";
import SmallTypography from "../../typography/small";

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

type ChannelsNotesModalNotesListProps = {
    channel: Channel
}

const ChannelsNotesModalNotesList = ({ channel }: ChannelsNotesModalNotesListProps) => {

    const { data, isLoading, error } = useTargetNotes(channel.id);

    if (isLoading)
        return (
            <List>
                {new Array(4).fill(0).map((_, i) => {
                    return (
                        <NoteCardSkeelton key={"channel-notes-list-item-skeleton-" + i} />
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

export default ChannelsNotesModalNotesList;