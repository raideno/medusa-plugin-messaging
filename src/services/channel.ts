import {
    FindConfig,
    Selector,
    TransactionBaseService,
    buildQuery,
} from "@medusajs/medusa"

import { EntityManager } from "typeorm";

import PluginOptions from "../types/plugin-options";

import Channel from "../models/channel"
import ChannelRepository from "../repositories/channel"

type InjectedDependencies = {
    manager: EntityManager;
    medusaPluginMessagingChannelRepository: typeof ChannelRepository;
};

export default class MedusaPluginMessagingChannelService extends TransactionBaseService {

    protected options_: PluginOptions;
    protected channelRepository_: typeof ChannelRepository;

    constructor(
        {
            manager,
            medusaPluginMessagingChannelRepository
        }: InjectedDependencies,
        options: PluginOptions,
    ) {
        super(arguments[0]);
        // super(...arguments);

        this.options_ = options;
        this.channelRepository_ = medusaPluginMessagingChannelRepository;
    }


    async listAndCount(
        selector?: Selector<Channel>,
        config: FindConfig<Channel> = {
            skip: 0,
            take: 20,
            relations: [],
        }): Promise<[Channel[], number]> {
        const channelRepository = this.activeManager_.withRepository(
            this.channelRepository_
        );

        const query = buildQuery(selector, config);

        return channelRepository.findAndCount(query);
    }

    async retrieve(
        id: string,
        config?: FindConfig<Channel>
    ): Promise<Channel | null> {
        const channelRepository = this.activeManager_.withRepository(
            this.channelRepository_
        )

        const query = buildQuery({
            id,
        }, config)

        const channel = await channelRepository.findOne(query)

        return channel
    }

    async retrieveCustomerChannel(customerId: string, config?: FindConfig<Channel>): Promise<Channel | null> {
        const channelRepository = this.activeManager_.withRepository(
            this.channelRepository_
        )

        const channel = await channelRepository.findOne({
            where: {
                customerId: customerId,
            },
            ...config
        });

        return channel;
    }

    async create(
        data: Pick<Channel, "customerId" | "metadata">
    ): Promise<Channel> {
        return this.atomicPhase_(async (manager) => {
            const channelRepository = manager.withRepository(
                this.channelRepository_
            )
            const channel = channelRepository.create();

            channel.customerId = data.customerId;
            channel.metadata = data.metadata;

            const result = await channelRepository.save(channel);

            return result;
        })
    }

    async update(
        channelId: string,
        data: Omit<Partial<Channel>, "id">
    ): Promise<Channel> {
        return await this.atomicPhase_(async (manager) => {
            const channelRepository = manager.withRepository(
                this.channelRepository_
            )
            const channel = await this.retrieve(channelId)

            Object.assign(channel, data)

            return await channelRepository.save(channel)
        })
    }

    async delete(channelId: string) {
        return await this.atomicPhase_(async (manager) => {
            const channelRepository = manager.withRepository(
                this.channelRepository_
            )
            const channel = await this.retrieve(channelId)

            await channelRepository.remove([channel])
        })
    }

    /**
     * list channels                    X
     * retreive channel by id           X
     * retreive a customer channel      X
     * create a channel                 x
     * create customer channel          x
     * update a channel                 X
     * delete a channel                 X
     * 
     * get a channel sources
     * get a channel messages
     */

}