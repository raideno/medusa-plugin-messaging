import useSWR, { mutate, MutatorOptions } from "swr";

import getSource from "../../functions/sources/get-source";

export const USE_SOURCE_HOOK_KEY = (channelId: string, sourceId: string): string => ['messaging', 'channels', channelId, 'sources', sourceId].join("/");

export type useSourceDataType = Awaited<
    ReturnType<typeof getSource>
>;

export default (channelId: string, sourceId: string) =>
    useSWR<useSourceDataType>(
        USE_SOURCE_HOOK_KEY(channelId, sourceId),
        getSource.bind(null, channelId, sourceId)
    );

export const mutateSource = (
    channelId: string,
    sourceId: string,
    data: (
        oldData: useSourceDataType
    ) => Promise<useSourceDataType>,
    options?: boolean | MutatorOptions<useSourceDataType, useSourceDataType>
) => {
    return mutate<useSourceDataType>(
        USE_SOURCE_HOOK_KEY(channelId, sourceId),
        data,
        options
    );
};