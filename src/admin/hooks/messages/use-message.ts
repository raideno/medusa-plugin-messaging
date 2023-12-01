import useSWR, { mutate, MutatorOptions } from "swr";

import getMessage from "../../functions/messages/get-message";

export const USE_MESSAGE_HOOK_KEY = (channelId: string, sourceId: string, messageId: string): string => ['messaging', 'channels', channelId, 'sources', sourceId, 'messages', messageId].join("/");

export type useMessagesDataType = Awaited<
    ReturnType<typeof getMessage>
>;

export default (channelId: string, sourceId: string, messageId: string) =>
    useSWR<useMessagesDataType>(
        USE_MESSAGE_HOOK_KEY(channelId, sourceId, messageId),
        getMessage.bind(null, channelId, sourceId, messageId)
    );

export const mutateMessage = (
    channelId: string,
    sourceId: string,
    messageId: string,
    data: (
        oldData: useMessagesDataType
    ) => Promise<useMessagesDataType>,
    options?: boolean | MutatorOptions<useMessagesDataType, useMessagesDataType>
) => {
    return mutate<useMessagesDataType>(
        USE_MESSAGE_HOOK_KEY(channelId, sourceId, messageId),
        data,
        options
    );
};