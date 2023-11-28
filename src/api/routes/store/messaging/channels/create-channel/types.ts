import MedusaPluginMessagingChannel from "@models/channel";

export type EndpointRequestBodyType = Pick<MedusaPluginMessagingChannel, "customerId" | "metadata">;

export type EndpointResponseBodyType = {
    channel: MedusaPluginMessagingChannel
};

