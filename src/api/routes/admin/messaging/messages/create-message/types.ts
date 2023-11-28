import MedusaPluginMessagingMessage from "@models/message";

export type EndpointRequestBodyType = Pick<MedusaPluginMessagingMessage, "author" | "content" | "sourceId" | "metadata">;

export type EndpointResponseBodyType = {
    message: MedusaPluginMessagingMessage
};

