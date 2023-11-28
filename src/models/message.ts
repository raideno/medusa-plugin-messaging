import { User as MedusaStoreAdminUser, generateEntityId } from "@medusajs/medusa";
import {
    JoinColumn,
    ManyToOne,
    VersionColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    Entity,
    PrimaryColumn,
    BeforeInsert,
    DeleteDateColumn,
    AfterInsert,
    AfterRemove,
    AfterUpdate
} from "typeorm";

import {
    DATABASE_MESSAGE_TABLE_NAME,
} from "../constants";

import MedusaPluginMessagingSource from "./source";
import { medusaPluginMessagingMessageEvents } from "@api/events/message";

/**
 * IMPORTANT: only one channel per customer
 */
@Entity({
    name: DATABASE_MESSAGE_TABLE_NAME
})
export default class MedusaPluginMessagingMessage {
    @PrimaryColumn({ type: "varchar" })
    id: string;

    @Column(() => MessageAuthor)
    author: MessageAuthor;

    /**
     * TODO: make type longer
     */
    @Column({ type: "varchar", nullable: false })
    content: string;

    @Column({ type: "varchar", nullable: false })
    sourceId: string;

    @ManyToOne(() => MedusaPluginMessagingSource, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "sourceId", referencedColumnName: "id" })
    source: MedusaPluginMessagingSource;

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
        this.id = generateEntityId(this.id, "medusa-plugin-messaging-message")
    }

    @AfterInsert()
    private afterInsert() {
        medusaPluginMessagingMessageEvents.emit("medusa-plugin-messaging-message-insert-event", this);
    }

    @AfterUpdate()
    private afterUpdate() {
        medusaPluginMessagingMessageEvents.emit("medusa-plugin-messaging-message-update-event", this);
    }

    @AfterRemove()
    private afterRemove() {
        medusaPluginMessagingMessageEvents.emit("medusa-plugin-messaging-message-delete-event", this);
    }
}

export enum AuthorType {
    SYSTEM,
    STAFF,
    AUTOMATIC,
    CUSTOMER,
    UNKNOWN
};

/**
 * if
 * * authorType = SYSTEM | AUTOMATIC | UNKNOWN => can contain author name, description and avatar url.
 * * authorType = STAFF => contain authorId and author and possibly name, description and avatar url (name, description and avatar url are previligged to the one of the author).
 * * authorType = CUSTOMER => all fields are null
 */
export class MessageAuthor {
    @Column({
        type: "enum",
        enum: AuthorType,
        default: AuthorType.UNKNOWN,
        nullable: false
    })
    type: AuthorType;

    /*---*/

    @Column({ type: "varchar", nullable: true })
    userId?: string;

    @ManyToOne(() => MedusaStoreAdminUser, { nullable: true, onUpdate: "CASCADE", onDelete: "SET NULL" })
    /**
     * ERROR: join-column name should be id, userId or what ?
     * SOLUTION: since migrations are created manually you can name userId
     */
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user?: MedusaStoreAdminUser;

    /*---*/

    @Column({ type: "varchar", nullable: true })
    name?: string | null;

    @Column({ type: "varchar", nullable: true })
    description?: string | null;

    @Column({ type: "varchar", nullable: true })
    avatarUrl?: string | null;
}