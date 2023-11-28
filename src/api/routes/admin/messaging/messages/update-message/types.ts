import MedusaPluginMessagingMessage from "@models/message";

export type EndpointRequestBodyType = Pick<MedusaPluginMessagingMessage, "content" | "metadata">;

export type EndpointResponseBodyType = {
    message: MedusaPluginMessagingMessage
};

