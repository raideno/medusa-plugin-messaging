import MedusaPluginMessagingMessage from "../../../../models/message";

export type AdminMessagingSendMessageRequestBody = {
    message: Pick<MedusaPluginMessagingMessage, "content" | "sourceId" | "metadata">
};

export type AdminMessagingSendMessageResponseBody = {
    message: MedusaPluginMessagingMessage
};