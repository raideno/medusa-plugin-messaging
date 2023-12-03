import {
    VersionColumn,
    BeforeInsert,
    Tree,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    TreeChildren,
    TreeParent,
    AfterInsert,
    AfterUpdate,
    AfterRemove
} from 'typeorm';
import { User as MedusaStoreAdminUser } from "@medusajs/medusa"
import generateEntityId from "../helpers/generate-entity-id";


import Source from './source';
import Message from './message';
import Channel from './channel';

import {
    DATABASE_NOTE_TABLE_NAME,
    DEFAULT_NOTE_TITLE
} from "../constants";
import { medusaPluginMessagingNoteEvents } from '../api/events/note';
import Note from '../types/note';


@Entity({
    name: DATABASE_NOTE_TABLE_NAME
})
@Tree("closure-table")
export default class MedusaPluginMessagingNote implements Note {
    @PrimaryColumn({ type: "varchar", nullable: false, unique: true })
    id: string;

    @Column({ type: "varchar", nullable: false })
    authorId: string;

    @ManyToOne(() => MedusaStoreAdminUser, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "authorId", referencedColumnName: "id" })
    author: MedusaStoreAdminUser;

    @Column({ type: "varchar", nullable: false, default: DEFAULT_NOTE_TITLE })
    title: string;

    @Column({ type: "varchar", nullable: false })
    content: string;

    @Column({ type: "jsonb", nullable: true })
    metadata?: Record<string, unknown> | null;

    @Column({ name: "parentId", type: "varchar", nullable: true })
    parentId?: string | null;

    @TreeParent({
        onDelete: 'CASCADE',
    })
    parent?: MedusaPluginMessagingNote | null;

    @TreeChildren({
        cascade: true
    })
    children: MedusaPluginMessagingNote[];

    @Column({ type: "varchar", nullable: false })
    targetId: string;

    @ManyToOne(() => Channel, { nullable: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: 'targetId', referencedColumnName: 'id' })
    channel?: Channel;

    @ManyToOne(() => Source, { nullable: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: 'targetId', referencedColumnName: 'id' })
    source?: Source;

    @ManyToOne(() => Message, { nullable: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: 'targetId', referencedColumnName: 'id' })
    message?: Message;

    @VersionColumn()
    version: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at?: Date | null;

    @DeleteDateColumn()
    deleted_at?: Date | null;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "medusa-plugin-messaging-note")
    }

    @AfterInsert()
    private afterInsert() {
        medusaPluginMessagingNoteEvents.emit("medusa-plugin-messaging-note-insert-event", this);
    }

    @AfterUpdate()
    private afterUpdate() {
        medusaPluginMessagingNoteEvents.emit("medusa-plugin-messaging-note-update-event", this);
    }

    @AfterRemove()
    private afterRemove() {
        medusaPluginMessagingNoteEvents.emit("medusa-plugin-messaging-note-delete-event", this);
    }
}