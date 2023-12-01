import useSWR, { mutate, MutatorOptions } from "swr";

import getSources from "../../functions/sources/get-sources";

export const USE_SOURCES_HOOK_KEY = (channelId: string): string => ['messaging', 'channels', channelId, 'sources'].join("/");

export type useSourcesDataType = Awaited<
    ReturnType<typeof getSources>
>;

export default (
    channelId: string,
) =>
    useSWR<useSourcesDataType>(
        USE_SOURCES_HOOK_KEY(channelId),
        getSources.bind(null, channelId)
    );

export const mutateSources = (
    channelId: string,
    data: (
        oldData: useSourcesDataType
    ) => Promise<useSourcesDataType>,
    options?: boolean | MutatorOptions<useSourcesDataType, useSourcesDataType>
) => {
    return mutate<useSourcesDataType>(
        USE_SOURCES_HOOK_KEY(channelId),
        data,
        options
    );
};