import { Column, Entity, OneToOne } from "typeorm"
import {
    Customer as MedusaCustomer,
} from "@medusajs/medusa"

import MedusaPluginMessagingChannel from "./channel";

@Entity()
export default class Customer extends MedusaCustomer {
    @Column({ type: "varchar", nullable: true })
    channelId?: string | null;

    @OneToOne(() => MedusaPluginMessagingChannel, (channel) => channel.customer, { nullable: true, onUpdate: "CASCADE", onDelete: "SET NULL" })
    channel?: MedusaPluginMessagingChannel | null;
}