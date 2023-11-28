import MedusaPluginMessagingMessage from "@models/message";

export type EndpointRequestBodyType = Pick<MedusaPluginMessagingMessage, "content" | "sourceId" | "metadata">;

export type EndpointResponseBodyType = {
    message: MedusaPluginMessagingMessage
};

