/**
 * TODO: global mutation function
 */

import { MutatorOptions } from "swr";

import Channel from "../../../types/channel";
import { mutateChannel } from "./use-channel";
import { mutateChannels } from "./use-channels";

/**
 * a function to mutate data on both use-channel and use-channels
 * 
 * we call mutator when we update, add or delete
 * 
 * we gonna have three functions:
 * * channelsCreateMutate(channel: Channel);
 * * * it'll add the given channel to the use-channels and use-channel
 * * channelsDeleteMutate(channel: Channel);
 * * * it'll remove the channel from the use-channels and make it undefined || null on the use-channel
 * * channelsUpdateMutate(channel: Channel);
 * * * it'll update the channel on both use-channel and use-channels
 */

export async function channelCreateMutate(channel: Channel, options?: MutatorOptions) {
    await mutateChannels(async (oldData) => {
        return {
            /**
             * TODO: check if we need to mutate or it's not necessary
             */
            channels: [
                ...(JSON.parse(JSON.stringify(oldData.channels)) as typeof oldData.channels),
                /**
                 * TODO: fix type error
                 */
                channel as any
            ],
            count: oldData.count + 1
        }
    }, options);
    /**
     * TODO: check if it'll not cause an error since the key isn't known by swr yet
     */
    await mutateChannel(channel.id, async () => {
        /**
         * TODO: fix type issue
         */
        return ({
            channel
        }) as any;
    }, options);
}

export async function channelUpdateMutate(channel: Channel, options?: MutatorOptions) {
    await mutateChannels(async (oldData) => {
        const newChannels = JSON.parse(JSON.stringify(oldData.channels)) as typeof oldData.channels;

        const channelIndex = newChannels.findIndex((c) => c.id === channel.id);

        newChannels[channelIndex] = (channel) as any;

        return {
            channels: newChannels,
            count: oldData.count
        }
    }, options);
    /**
     * TODO: check if it'll not cause an error since the key isn't known by swr yet
     */
    await mutateChannel(channel.id, async () => {
        return {
            channel: channel as any
        };
    }, options);
}

export async function channelDeleteMutate(channelId: string, options?: MutatorOptions) {
    await mutateChannels(async (oldData) => {
        const newChannels = JSON.parse(JSON.stringify(oldData.channels)) as typeof oldData.channels;

        const channelIndex = newChannels.findIndex((c) => c.id === channelId);

        newChannels.splice(channelIndex, 1)

        return {
            channels: newChannels,
            count: oldData.count - 1
        }
    }, options);
    /**
     * TODO: check if it'll not cause an error since the key isn't known by swr yet
     */
    await mutateChannel(channelId, async () => {
        return null;
    }, options);
}