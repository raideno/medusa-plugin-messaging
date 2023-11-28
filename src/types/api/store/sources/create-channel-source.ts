import MedusaPluginMessagingSource from "../../../../models/source";

export type StoreMessagingCreateChannelSourceRequestBody = Omit<MedusaPluginMessagingSource, "id" | "created_at" | "updated_at" | "deleted_at">;

export type StoreMessagingCreateChannelSourceResponseBody = { source: MedusaPluginMessagingSource };