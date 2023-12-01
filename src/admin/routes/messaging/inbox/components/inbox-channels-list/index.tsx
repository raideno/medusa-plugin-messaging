import SmallTypography from "../../../../../components/typography/small";
import { useMessagingInboxChannelsContext } from "../../../../../contexts/messaging-inbox-channels-context";

import InboxChannelsListItem from "./inbox-channels-list-item";
import InboxChannelsListItemSkeleton from "./inbox-channels-list-item-skeleton";

type ListProps = {
    children: React.ReactNode[];
}

const List = ({ children }: ListProps) => {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}

type InboxChannelsListProps = {

}

const InboxChannelsList = ({ }: InboxChannelsListProps) => {

    const { channels, isChannelsFetchError, isChannelsFetchLoading } = useMessagingInboxChannelsContext();

    if (isChannelsFetchLoading)
        return (
            <List>
                {new Array(8).fill(0).map((_, i) => {
                    return (
                        <InboxChannelsListItemSkeleton key={"channels-list-item-skeleton-" + i} />
                    )
                })}
            </List>
        )


    if (isChannelsFetchError || !channels || channels === undefined || channels === null)
        return (
            <div>Channels-Fetch-Error.</div>
        )

    if (channels.length === 0)
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <SmallTypography className="text-center">No Channels Created Yet.</SmallTypography>
            </div>
        )

    return (
        <List>
            {channels.map((channel) => {
                return (
                    <InboxChannelsListItem
                        key={"channels-list-item-" + channel.id}
                        channel={channel}
                    />
                )
            })}
        </List>
    )
}

export default InboxChannelsList;