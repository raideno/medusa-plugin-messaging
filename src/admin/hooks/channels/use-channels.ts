import useSWR, { mutate, MutatorOptions } from "swr";

import getChannels from "../../functions/channels/get-channels";

export const USE_CHANNELS_HOOK_KEY = (): string => ['messaging', 'channels'].join("/");

export type useChannelsDataType = Awaited<
    ReturnType<typeof getChannels>
>;

export default () =>
    useSWR<useChannelsDataType>(
        USE_CHANNELS_HOOK_KEY(),
        getChannels.bind(null)
    );

export const mutateChannels = (
    data: (
        oldData: useChannelsDataType
    ) => Promise<useChannelsDataType>,
    options?: boolean | MutatorOptions<useChannelsDataType, useChannelsDataType>
) => {
    return mutate<useChannelsDataType>(
        USE_CHANNELS_HOOK_KEY(),
        data,
        options
    );
};