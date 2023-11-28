import MedusaPluginMessagingMessage from "../../../../models/message";

export type StoreMessagingSendMessageOnChannelSourceRequestBody = Omit<MedusaPluginMessagingMessage, "id" | "author_id" | "created_at" | "updated_at" | "deleted_at">;

export type StoreMessagingSendMessageOnChannelSourceResponseBody = { message: MedusaPluginMessagingMessage };