import BodyTypography from "../../../../../../components/typography/body";

type InboxChannelSourceChatSidebarMembersProps = {}

const InboxChannelSourceChatSidebarMembers = ({ }: InboxChannelSourceChatSidebarMembersProps) => {
    return (
        <div className="w-full h-full">
            <div className="h-full w-full p-4 flex flex-col gap-4">
                <BodyTypography weight="bold">Participants</BodyTypography>
                <div>participants-list</div>
            </div>
        </div>
    )
}

export default InboxChannelSourceChatSidebarMembers;