import Skeleton from "../ui/skeleton";

type NoteCardSkeeltonProps = {}

const NoteCardSkeelton = ({ }: NoteCardSkeeltonProps) => {
    return (
        <Skeleton className="w-full rounded-md h-32" />
    )
}

export default NoteCardSkeelton;