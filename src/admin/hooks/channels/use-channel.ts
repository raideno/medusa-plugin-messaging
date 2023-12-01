import useSWR, { mutate, MutatorOptions } from "swr";

import getChannel from "../../functions/channels/get-channel";

export const USE_CHANNEL_HOOK_KEY = (channelId: string): string => ['messaging', 'channels', channelId].join("/");

export type useChannelsDataType = Awaited<
    ReturnType<typeof getChannel>
>;

export default (channelId: string) =>
    useSWR<useChannelsDataType>(
        USE_CHANNEL_HOOK_KEY(channelId),
        getChannel.bind(null, channelId)
    );

export const mutateChannel = (
    channelId: string,
    data: (
        oldData: useChannelsDataType
    ) => Promise<useChannelsDataType>,
    options?: boolean | MutatorOptions<useChannelsDataType, useChannelsDataType>
) => {
    return mutate<useChannelsDataType>(
        USE_CHANNEL_HOOK_KEY(channelId),
        data,
        options
    );
};