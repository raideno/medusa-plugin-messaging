/**
 * listAndCount
 * retrieve
 * listTargetNotes
 * create
 * update
 * delete
 */

import {
    FindConfig,
    Selector,
    TransactionBaseService,
    buildQuery,
} from "@medusajs/medusa"

import { EntityManager } from "typeorm";

import PluginOptions from "../types/plugin-options";

import Note from "../models/note"
import NoteRepository from "../repositories/note"

type InjectedDependencies = {
    manager: EntityManager;
    medusaPluginMessagingNoteRepository: typeof NoteRepository;
};

export default class MedusaPluginMessagingNoteService extends TransactionBaseService {

    protected options_: PluginOptions;
    protected noteRepository_: typeof NoteRepository;

    constructor(
        {
            manager,
            medusaPluginMessagingNoteRepository
        }: InjectedDependencies,
        options: PluginOptions,
    ) {
        super(arguments[0]);
        // super(...arguments);

        this.options_ = options;
        this.noteRepository_ = medusaPluginMessagingNoteRepository;
    }


    async listAndCount(
        selector?: Selector<Note>,
        config: FindConfig<Note> = {
            skip: 0,
            take: 20,
            relations: [],
        }): Promise<[Note[], number]> {
        const noteRepository = this.activeManager_.withRepository(
            this.noteRepository_
        );

        const query = buildQuery(selector, config);

        return noteRepository.findAndCount(query);
    }

    async retrieve(
        id: string,
        config?: FindConfig<Note>
    ): Promise<Note | null> {
        const noteRepository = this.activeManager_.withRepository(
            this.noteRepository_
        )

        const query = buildQuery({
            id,
        }, config)

        const note = await noteRepository.findOne(query)

        return note
    }

    async create(
        data: Pick<Note, "authorId" | "author" | "content" | "metadata" | "parent" | "children" | "targetId" | "channel" | "source" | "message">
    ): Promise<Note> {
        return this.atomicPhase_(async (manager) => {
            const noteRepository = manager.withRepository(
                this.noteRepository_
            )
            const note = noteRepository.create();

            note.authorId = data.authorId;
            note.author = data.author;
            note.content = data.content;
            note.metadata = data.metadata;
            note.parent = data.parent;
            note.children = data.children;
            note.targetId = data.targetId;
            note.channel = data.channel;
            note.source = data.source;
            note.message = data.message;

            const result = await noteRepository.save(note);

            return result;
        })
    }

    async update(
        noteId: string,
        data: Omit<Partial<Note>, "id">
    ): Promise<Note> {
        return await this.atomicPhase_(async (manager) => {
            const noteRepository = manager.withRepository(
                this.noteRepository_
            )
            const note = await this.retrieve(noteId)

            Object.assign(note, data)

            return await noteRepository.save(note)
        })
    }

    async delete(noteId: string) {
        return await this.atomicPhase_(async (manager) => {
            const noteRepository = manager.withRepository(
                this.noteRepository_
            )
            const note = await this.retrieve(noteId)

            await noteRepository.remove([note])
        })
    }

    /**
     * list notes                    X
     * retreive note by id           X
     * retreive a customer note      X
     * create a note                 x
     * create customer note          x
     * update a note                 X
     * delete a note                 X
     * 
     * get a note sources
     * get a note messages
     */

}