import {
    VersionColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    Entity,
    PrimaryColumn,
    BeforeInsert,
    DeleteDateColumn,
} from "typeorm";

import { generateEntityId } from "@medusajs/medusa";

import {
    DATABASE_HANDLER_TABLE_NAME,
} from "../constants";

@Entity({
    name: DATABASE_HANDLER_TABLE_NAME
})
export default class MedusaPluginMessagingChannel {
    @PrimaryColumn({ type: "varchar", nullable: false, unique: true })
    id: string;

    @Column({ type: "varchar", nullable: false, unique: true })
    name: string;

    @Column({ type: "varchar", nullable: true })
    description?: string | null;

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
        this.id = generateEntityId(this.id, "medusa-plugin-messaging-handler")
    }
}