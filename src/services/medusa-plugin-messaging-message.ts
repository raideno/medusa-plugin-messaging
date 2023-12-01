import {
    FindConfig,
    Selector,
    TransactionBaseService,
    buildQuery,
} from "@medusajs/medusa"

import { EntityManager } from "typeorm";

import PluginOptions from "../types/plugin-options";

import Message from "../models/message"
import MessageRepository from "../repositories/medusa-plugin-messaging-message"

type InjectedDependencies = {
    manager: EntityManager;
    medusaPluginMessagingMessageRepository: typeof MessageRepository;
};

/**
 * TODO: add following functions
 * * writeNote
 * * retreiveNote
 * * listNotes
 */

export default class MedusaPluginMessagingMessageService extends TransactionBaseService {

    protected options_: PluginOptions;
    protected messageRepository_: typeof MessageRepository;

    constructor(
        {
            manager,
            medusaPluginMessagingMessageRepository
        }: InjectedDependencies,
        options: PluginOptions,
    ) {
        super(arguments[0]);
        // super(...arguments);

        this.options_ = options;
        this.messageRepository_ = medusaPluginMessagingMessageRepository;
    }


    async listAndCount(
        selector: Selector<Message> = {},
        config: FindConfig<Message> = {
            skip: 0,
            take: 20,
            relations: [],
        }): Promise<[Message[], number]> {
        const messageRepository = this.activeManager_.withRepository(
            this.messageRepository_
        );

        const query = buildQuery(selector, config);

        return messageRepository.findAndCount(query);
    }

    async retrieve(
        id: string,
        config?: FindConfig<Message>
    ): Promise<Message | null> {
        const messageRepository = this.activeManager_.withRepository(
            this.messageRepository_
        )

        const query = buildQuery({
            id,
        }, config)

        const message = await messageRepository.findOne(query)

        return message
    }

    async retrieveSourceMessages(sourceId: string, config?: FindConfig<Message>): Promise<Message[]> {
        const messageRepository = this.activeManager_.withRepository(
            this.messageRepository_
        )

        const message = await messageRepository.find({
            where: {
                sourceId: sourceId,
            },
            ...config
        });

        return message;
    }

    async create(
        data: Pick<Message, "author" | "content" | "sourceId" | "metadata">
    ): Promise<Message> {
        return this.atomicPhase_(async (manager) => {
            const messageRepository = manager.withRepository(
                this.messageRepository_
            )
            const message = messageRepository.create();

            message.author = data.author;
            message.content = data.content;
            message.sourceId = data.sourceId;
            message.metadata = data.metadata;

            const result = await messageRepository.save(message);

            return result;
        })
    }

    async update(
        messageId: string,
        data: Omit<Partial<Message>, "id">
    ): Promise<Message> {
        return await this.atomicPhase_(async (manager) => {
            const messageRepository = manager.withRepository(
                this.messageRepository_
            )
            const message = await this.retrieve(messageId)

            Object.assign(message, data)

            return await messageRepository.save(message)
        })
    }

    async delete(messageId: string) {
        return await this.atomicPhase_(async (manager) => {
            const messageRepository = manager.withRepository(
                this.messageRepository_
            )
            const message = await this.retrieve(messageId)

            await messageRepository.remove([message])
        })
    }


}

/**
   * list messages
   * retreive message by id
   * create a message
   * update a message
   * delete a message
   * 
   * get a message source
   */