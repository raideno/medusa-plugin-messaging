import Source from "../../../../../../../types/source";

import { useMessagingInboxSourceContext } from "../../../../../../contexts/messaging-inbox-source-context";

import BodyTypography from "../../../../../../components/typography/body";
import SmallTypography from "../../../../../../components/typography/small";

type SourcesListItemProps = {
    source: Source;
};

const SourcesListItem = ({
    source
}: SourcesListItemProps) => {

    const { selectSource } = useMessagingInboxSourceContext();

    function handleClick() {
        selectSource(source.channelId, source.id);
    }

    return (
        <div onClick={handleClick} className="cursor-pointer w-full rounded-md border-grey-2 border p-2 flex flex-col gap-1 hover:opacity-75">
            <div className="w-full flex flex-row items-center justify-between">
                <BodyTypography weight="semibold">{source.name}</BodyTypography>
                <SmallTypography>{new Date(source.created_at).getMonth()}</SmallTypography>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
                <SmallTypography>last-message</SmallTypography>
                <div className="w-4 h-4 rounded-full border border-grey-20 flex flex-row items-center justify-center">
                    <SmallTypography>n</SmallTypography>
                </div>
            </div>
        </div>
    )
}

export default SourcesListItem;