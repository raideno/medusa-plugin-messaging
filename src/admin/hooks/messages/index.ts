/**
 * TODO: global mutation function
 */

import { MutatorOptions } from "swr";

import Message from "../../../types/message";
import { mutateMessage } from "./use-message";
import { mutateMessages } from "./use-messages";

/**
 * a function to mutate data on both use-message and use-messages
 * 
 * we call mutator when we update, add or delete
 * 
 * we gonna have three functions:
 * * messagesCreateMutate(message: Message);
 * * * it'll add the given message to the use-messages and use-message
 * * messagesDeleteMutate(message: Message);
 * * * it'll remove the message from the use-messages and make it undefined || null on the use-message
 * * messagesUpdateMutate(message: Message);
 * * * it'll update the message on both use-message and use-messages
 */

export async function messageCreateMutate(channelId: string, sourceId: string, message: Message, options?: MutatorOptions) {
    await mutateMessages(channelId, sourceId, async (oldData) => {
        return {
            /**
             * TODO: check if we need to mutate or it's not necessary
             */
            messages: [
                ...(JSON.parse(JSON.stringify(oldData.messages)) as typeof oldData.messages),
                /**
                 * TODO: fix type error
                 */
                message as any
            ],
            count: oldData.count + 1
        }
    }, options);
    /**
     * TODO: check if it'll not cause an error since the key isn't known by swr yet
     */
    await mutateMessage(channelId, sourceId, message.id, async () => {
        /**
         * TODO: fix type issue
         */
        return ({
            message
        }) as any;
    }, options);
}

export async function messageUpdateMutate(channelId: string, sourceId: string, message: Message, options?: MutatorOptions) {
    await mutateMessages(channelId, sourceId, async (oldData) => {
        const newMessages = JSON.parse(JSON.stringify(oldData.messages)) as typeof oldData.messages;

        const messageIndex = newMessages.findIndex((c) => c.id === message.id);

        newMessages[messageIndex] = (message) as any;

        return {
            messages: newMessages,
            count: oldData.count
        }
    }, options);
    /**
     * TODO: check if it'll not cause an error since the key isn't known by swr yet
     */
    await mutateMessage(channelId, sourceId, message.id, async () => {
        return {
            message: message as any
        };
    }, options);
}

export async function messageDeleteMutate(channelId: string, sourceId: string, messageId: string, options?: MutatorOptions) {
    await mutateMessages(channelId, sourceId, async (oldData) => {
        const newMessages = JSON.parse(JSON.stringify(oldData.messages)) as typeof oldData.messages;

        const messageIndex = newMessages.findIndex((c) => c.id === messageId);

        newMessages.splice(messageIndex, 1)

        return {
            messages: newMessages,
            count: oldData.count - 1
        }
    }, options);
    /**
     * TODO: check if it'll not cause an error since the key isn't known by swr yet
     */
    await mutateMessage(channelId, sourceId, messageId, async () => {
        return null;
    }, options);
}