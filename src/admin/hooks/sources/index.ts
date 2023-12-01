/**
 * TODO: global mutation function
 */

import { MutatorOptions } from "swr";

import Source from "../../../types/source";
import { mutateSource } from "./use-source";
import { mutateSources } from "./use-sources";

/**
 * a function to mutate data on both use-source and use-sources
 * 
 * we call mutator when we update, add or delete
 * 
 * we gonna have three functions:
 * * sourcesCreateMutate(source: Source);
 * * * it'll add the given source to the use-sources and use-source
 * * sourcesDeleteMutate(source: Source);
 * * * it'll remove the source from the use-sources and make it undefined || null on the use-source
 * * sourcesUpdateMutate(source: Source);
 * * * it'll update the source on both use-source and use-sources
 */

export async function sourceCreateMutate(channelId: string, source: Source, options?: MutatorOptions) {
    await mutateSources(channelId, async (oldData) => {
        return {
            /**
             * TODO: check if we need to mutate or it's not necessary
             */
            sources: [
                ...(JSON.parse(JSON.stringify(oldData.sources)) as typeof oldData.sources),
                /**
                 * TODO: fix type error
                 */
                source as any
            ],
            count: oldData.count + 1
        }
    }, options);
    /**
     * TODO: check if it'll not cause an error since the key isn't known by swr yet
     */
    await mutateSource(channelId, source.id, async () => {
        /**
         * TODO: fix type issue
         */
        return ({
            source
        }) as any;
    }, options);
}

export async function sourceUpdateMutate(channelId: string, source: Source, options?: MutatorOptions) {
    await mutateSources(channelId, async (oldData) => {
        const newSources = JSON.parse(JSON.stringify(oldData.sources)) as typeof oldData.sources;

        const sourceIndex = newSources.findIndex((c) => c.id === source.id);

        newSources[sourceIndex] = (source) as any;

        return {
            sources: newSources,
            count: oldData.count
        }
    }, options);
    /**
     * TODO: check if it'll not cause an error since the key isn't known by swr yet
     */
    await mutateSource(channelId, source.id, async () => {
        return {
            source: source as any
        };
    }, options);
}

export async function sourceDeleteMutate(channelId: string, sourceId: string, options?: MutatorOptions) {
    await mutateSources(channelId, async (oldData) => {
        const newSources = JSON.parse(JSON.stringify(oldData.sources)) as typeof oldData.sources;

        const sourceIndex = newSources.findIndex((c) => c.id === sourceId);

        newSources.splice(sourceIndex, 1)

        return {
            sources: newSources,
            count: oldData.count - 1
        }
    }, options);
    /**
     * TODO: check if it'll not cause an error since the key isn't known by swr yet
     */
    await mutateSource(channelId, sourceId, async () => {
        return null;
    }, options);
}