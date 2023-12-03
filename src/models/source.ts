import {
    BeforeInsert,
    ManyToOne,
    JoinColumn,
    VersionColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    Entity,
    PrimaryColumn,
    DeleteDateColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove
} from "typeorm";
import generateEntityId from "../helpers/generate-entity-id";


import {
    DATABASE_SOURCE_TABLE_NAME,
    DEFAULT_MEDUSA_PLUGIN_MESSAGING_SOURCE_TITLE,
    DEFAULT_MEDUSA_PLUGIN_MESSAGING_SOURCE_HANDLER_ID
} from "../constants";

import MedusaPluginMessagingChannel from "./channel";
import Source from "../types/source";
import { medusaPluginMessagingSourceEvents } from "../api/events/source";

/**
 * TODO: only one channel per customer
 */

@Entity({
    name: DATABASE_SOURCE_TABLE_NAME,
})
export default class MedusaPluginMessagingSource implements Source {
    @PrimaryColumn({ type: "varchar", nullable: false, unique: true })
    id: string;

    @Column({ type: "varchar", nullable: false, default: DEFAULT_MEDUSA_PLUGIN_MESSAGING_SOURCE_TITLE })
    name: string;

    @Column({ type: "varchar", nullable: false })
    channelId: string

    @ManyToOne(() => MedusaPluginMessagingChannel, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "channelId", referencedColumnName: "id" })
    channel: MedusaPluginMessagingChannel;;

    @Column({ type: "varchar", nullable: true, default: DEFAULT_MEDUSA_PLUGIN_MESSAGING_SOURCE_HANDLER_ID })
    handlerId?: string | null;

    @Column({ type: "varchar", nullable: false })
    context: string;

    @Column({ type: "varchar", nullable: true })
    externalId?: string | null;

    @Column({ type: "jsonb", nullable: true })
    metadata?: Record<string, unknown> | null;

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
        this.id = generateEntityId(this.id, "medusa-plugin-messaging-source")
    }

    @AfterInsert()
    private afterInsert() {
        medusaPluginMessagingSourceEvents.emit("medusa-plugin-messaging-source-insert-event", this);
    }

    @AfterUpdate()
    private afterUpdate() {
        medusaPluginMessagingSourceEvents.emit("medusa-plugin-messaging-source-update-event", this);
    }

    @AfterRemove()
    private afterRemove() {
        medusaPluginMessagingSourceEvents.emit("medusa-plugin-messaging-source-delete-event", this);
    }
}