import useSWR, { mutate, MutatorOptions } from "swr";

import getMessages from "../../functions/messages/get-messages";

export const USE_MESSAGES_HOOK_KEY = (channelId: string, sourceId: string): string => ['messaging', 'channels', channelId, 'sources', sourceId, 'messages'].join("/");

export type useMessagesDataType = Awaited<
    ReturnType<typeof getMessages>
>;

export default (
    channelId: string,
    sourceId: string,
    offset: number = 0,
    limit: number = 10
) =>
    useSWR<useMessagesDataType>(
        USE_MESSAGES_HOOK_KEY(channelId, sourceId),
        getMessages.bind(null, channelId, sourceId, {
            offset,
            limit
        })
    );

export const mutateMessages = (
    channelId: string,
    sourceId: string,
    data: (
        oldData: useMessagesDataType
    ) => Promise<useMessagesDataType>,
    options?: boolean | MutatorOptions<useMessagesDataType, useMessagesDataType>
) => {
    return mutate<useMessagesDataType>(
        USE_MESSAGES_HOOK_KEY(channelId, sourceId),
        data,
        options
    );
};