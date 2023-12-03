import { Button } from "@medusajs/ui";
import Channel from "../../../../../../../types/channel";

import useSources from "../../../../../../hooks/sources/use-sources";

import SourcesListItem from "./sources-list-item";
import SourcesListItemSkeleton from "./sources-list-item-skeleton";
import CreateChannelSourceModal from "../../../../../../components/complex/create-channel-source-modal";

type ListProps = {
    children: React.ReactNode[];
}

const List = ({ children }: ListProps) => {
    return (
        <div className="w-full flex flex-col gap-2">
            {children}
        </div>
    )
}

type SourcesListProps = {
    channel: Channel;
};

const SourcesList = ({ channel }: SourcesListProps) => {

    const { data, isLoading: isSourcesFetchLoading, error: isSourcesFethError } = useSources(channel.id);

    if (isSourcesFetchLoading)
        return (
            <List>
                {new Array(3).map((_, i) => {
                    return (
                        <SourcesListItemSkeleton key={"sources-list-item-skeleton-" + i} />
                    )
                })}
            </List>
        )

    if (isSourcesFethError || !data || !data.sources)
        return (
            <div>channel's-sources-fetch-error.</div>
        )

    const sources = data.sources;

    return (
        <List>
            {sources.map((source) => {
                return (
                    <SourcesListItem
                        key={"sources-list-item-" + source.id}
                        source={source}
                    />
                )
            })}
            <CreateChannelSourceModal channel={channel} >
                <Button className="w-full" variant="secondary">Create Source</Button>
            </CreateChannelSourceModal>
        </List>
    )
}

export default SourcesList;