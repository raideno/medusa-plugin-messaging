import { ChangeEvent } from "react";

import { Input } from "@medusajs/ui";

import { useMessagingInboxChannelsContext } from "../../../../../contexts/messaging-inbox-channels-context";
import Skeleton from "../../../../../components/ui/skeleton";
import SmallTypography from "../../../../../components/typography/small";

type InboxPageHeaderChannelsSearchInputProps = {}

const InboxPageHeaderChannelsSearchInput = ({ }: InboxPageHeaderChannelsSearchInputProps) => {

    const {
        channels,
        isChannelsFetchLoading,
        isChannelsFetchError,
        /*---*/
        filter,
        setFilterSearch
    } = useMessagingInboxChannelsContext();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFilterSearch(value);
    }

    if (isChannelsFetchLoading)
        return (
            <Skeleton className="w-full h-8 rounded-md" />
        )

    if (isChannelsFetchError || !channels)
        return (
            <div className="w-full h-8 rounded-md flex flex-row items-center justify-center">
                <SmallTypography>Channels Fetch Error.</SmallTypography>
            </div>
        )

    return (
        <Input
            size="base"
            type="search"
            value={filter.search}
            onChange={handleChange}
            placeholder="Search Channels"
        />
    )
}

export default InboxPageHeaderChannelsSearchInput;