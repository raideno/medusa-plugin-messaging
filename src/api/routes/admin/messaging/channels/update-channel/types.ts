import MedusaPluginMessagingChannel from "../../../../../../models/channel";

export type EndpointRequestBodyType = Pick<MedusaPluginMessagingChannel, "metadata">;

export type EndpointResponseBodyType = {
    channel: MedusaPluginMessagingChannel
};

