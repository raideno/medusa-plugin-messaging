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
    TreeParent
} from 'typeorm';
import { User as MedusaStoreAdminUser, generateEntityId } from "@medusajs/medusa"

import Source from './source';
import Message from './message';
import Channel from './channel';

import {
    DATABASE_NOTE_TABLE_NAME,
} from "../constants";

@Entity({
    name: DATABASE_NOTE_TABLE_NAME
})
@Tree("closure-table")
export default class MedusaPluginMessagingNote {
    @PrimaryColumn({ type: "varchar", nullable: false, unique: true })
    id: string;

    @Column({ type: "varchar", nullable: false })
    authorId: string;

    @ManyToOne(() => MedusaStoreAdminUser, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "authorId", referencedColumnName: "id" })
    author: MedusaStoreAdminUser;

    @Column({ type: "varchar" })
    content: string;

    @Column({ type: "jsonb", nullable: true })
    metadata?: Record<string, unknown> | null;

    @TreeParent({
        onDelete: 'CASCADE',
    })
    parent: MedusaPluginMessagingNote;

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
}