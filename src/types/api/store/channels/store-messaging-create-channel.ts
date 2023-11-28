import MedusaPluginMessagingChannel from "../../../../models/channel";

export type StoreMessagingCreateChannelRequestBody = Omit<MedusaPluginMessagingChannel, "id" | "created_at" | "updated_at" | "deleted_at">;

export type StoreMessagingCreateChannelResponseBody = { channel: MedusaPluginMessagingChannel };