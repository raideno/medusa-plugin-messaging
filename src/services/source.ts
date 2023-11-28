import {
    FindConfig,
    Selector,
    TransactionBaseService,
    buildQuery,
} from "@medusajs/medusa"

import { EntityManager } from "typeorm";

import PluginOptions from "@types/plugin-options";

import Source from "@models/source"
import SourceRepository from "@repositories/source"

type InjectedDependencies = {
    manager: EntityManager;
    medusaPluginMessagingSourceRepository: typeof SourceRepository;
};

/**
 * TODO: add following functions
 * * writeNote
 * * retreiveNote
 * * listNotes
 */

export default class MedusaPluginMessagingSourceService extends TransactionBaseService {

    protected options_: PluginOptions;
    protected sourceRepository_: typeof SourceRepository;

    constructor(
        {
            manager,
            medusaPluginMessagingSourceRepository
        }: InjectedDependencies,
        options: PluginOptions,
    ) {
        super(arguments[0]);
        // super(...arguments);

        this.options_ = options;
        this.sourceRepository_ = medusaPluginMessagingSourceRepository;
    }


    async listAndCount(
        selector?: Selector<Source>,
        config: FindConfig<Source> = {
            skip: 0,
            take: 20,
            relations: [],
        }): Promise<[Source[], number]> {
        const sourceRepository = this.activeManager_.withRepository(
            this.sourceRepository_
        );

        const query = buildQuery(selector, config);

        return sourceRepository.findAndCount(query);
    }

    async retrieve(
        id: string,
        config?: FindConfig<Source>
    ): Promise<Source | null> {
        const sourceRepository = this.activeManager_.withRepository(
            this.sourceRepository_
        )

        const query = buildQuery({
            id,
        }, config)

        const source = await sourceRepository.findOne(query)

        return source
    }

    /**
     * TODO: add a selector
     */
    async listCustomerSources(customerId: string, config?: FindConfig<Source>): Promise<[Source[], number]> {
        const sourceRepository = this.activeManager_.withRepository(
            this.sourceRepository_
        );

        const queryBuilder = sourceRepository.createQueryBuilder('source');

        queryBuilder.innerJoinAndSelect('source.channel', 'channel');

        queryBuilder.where('channel.customerId = :customerId', { customerId });

        /**
         * TODO: apply additional given selector and config
         */

        // config.order
        // config.relations
        // config.select
        // config.skip
        // config.take

        if (config && config.take)
            queryBuilder.take(config.take)

        if (config && config.skip)
            queryBuilder.skip(config.skip)

        return queryBuilder.getManyAndCount();
    }

    /**
     * TODO: add a selector
     */
    async listChannelSources(channelId: string, config?: FindConfig<Source>): Promise<[Source[], number]> {
        return this.listAndCount({
            channelId: channelId
        }, config)
    }

    async retreiveHandlerSource(handlerId: string, selector: Selector<Source>, config?: FindConfig<Source>): Promise<Source | null> {
        /**
         * TODO: check if implemented correctly
         */

        const sourceRepository = this.activeManager_.withRepository(
            this.sourceRepository_
        )

        const query = buildQuery({
            handlerId: handlerId,
            ...selector,
        }, config)

        const source = await sourceRepository.findOne(query);

        return source
    }

    async create(
        data: Pick<Source, "name" | "channelId" | "handlerId" | "context" | "externalId" | "metadata">
    ): Promise<Source> {
        return this.atomicPhase_(async (manager) => {
            const sourceRepository = manager.withRepository(
                this.sourceRepository_
            )
            const source = sourceRepository.create();

            source.name = data.name;
            source.channelId = data.channelId;
            source.context = data.context;
            source.externalId = data.externalId;
            source.handlerId = data.handlerId;
            source.metadata = data.metadata;

            const result = await sourceRepository.save(source);

            return result;
        })
    }

    async update(
        sourceId: string,
        data: Omit<Partial<Source>, "id">
    ): Promise<Source> {
        return await this.atomicPhase_(async (manager) => {
            const sourceRepository = manager.withRepository(
                this.sourceRepository_
            )
            const source = await this.retrieve(sourceId)

            Object.assign(source, data)

            return await sourceRepository.save(source)
        })
    }

    async delete(sourceId: string) {
        return await this.atomicPhase_(async (manager) => {
            const sourceRepository = manager.withRepository(
                this.sourceRepository_
            )
            const source = await this.retrieve(sourceId)

            await sourceRepository.remove([source])
        })
    }
}

/**
    * list sources
    * retreive source by id
    * retreive a customer sources
    * create a source
    * update a source
    * delete a source
    * 
    * get a handler source
    */