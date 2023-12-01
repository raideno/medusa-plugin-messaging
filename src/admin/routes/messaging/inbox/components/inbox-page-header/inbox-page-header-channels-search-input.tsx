import { ChangeEvent } from "react";

import { Input } from "@medusajs/ui";

import { useMessagingInboxChannelsContext } from "../../../../../contexts/messaging-inbox-channels-context";

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
            <div>Loading-Channels...</div>
        )

    if (isChannelsFetchError || !channels)
        return (
            <div>Channels-Error.</div>
        )

    return (
        <Input
            size="small"
            type="search"
            value={filter.search}
            onChange={handleChange}
            placeholder="Search Channels"
        />
    )
}

export default InboxPageHeaderChannelsSearchInput;