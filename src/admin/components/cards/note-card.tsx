import Note from "../../../types/note";
import BodyTypography from "../typography/body";
import SmallTypography from "../typography/small";

type NoteCardProps = {
    note: Note
}

const NoteCard = ({
    note
}: NoteCardProps) => {
    return (
        <div className="w-full rounded-md border border-grey-20 overflow-hidden flex flex-row gap-2">
            <div className="min-w-[calc(2*4px)] w-[calc(2*4px)] max-w-[calc(2*4px)] h-full bg-grey-20" />
            <div className="w-full flex flex-col gap-2 p-2">
                <BodyTypography weight="bold" className="text-ui-fg-base">{note.title}</BodyTypography>
                <SmallTypography>{note.content}</SmallTypography>
                <div className="w-full flex flex-row items-center justify-between">
                    <SmallTypography weight="thin">{note.authorId}</SmallTypography>
                    <SmallTypography weight="thin">{JSON.stringify(note.created_at)}</SmallTypography>
                </div>
            </div>
        </div>
    )
}

export default NoteCard;