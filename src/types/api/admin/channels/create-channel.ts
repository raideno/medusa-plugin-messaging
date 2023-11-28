import MedusaPluginMessagingChannel from "../../../../models/channel";

export type AdminMessagingCreateChannelRequestBody = Pick<MedusaPluginMessagingChannel, "customerId" | "metadata">;

export type AdminMessagingCreateChannelResponseBody = { channel: MedusaPluginMessagingChannel };