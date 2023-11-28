import {
    VersionColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    Entity,
    PrimaryColumn,
    BeforeInsert,
    DeleteDateColumn,
    JoinColumn,
    OneToOne
} from "typeorm";

import { generateEntityId } from "@medusajs/medusa";

import {
    DATABASE_CHANNEL_TABLE_NAME,
} from "../constants";

import Customer from "./customer";

@Entity({
    name: DATABASE_CHANNEL_TABLE_NAME
})
export default class MedusaPluginMessagingChannel {
    @PrimaryColumn({ type: "varchar", nullable: false, unique: true })
    id: string;

    /**
     * TODO: make it as the id of the relation ?
     */
    @Column({ type: "varchar", nullable: false, unique: true })
    customerId: string;

    @OneToOne(() => Customer, (customer) => customer.channel, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "customerId", referencedColumnName: "id" })
    customer: Customer;

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
        this.id = generateEntityId(this.id, "medusa-plugin-messaging-channel")
    }
}