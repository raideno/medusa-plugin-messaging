import MedusaPluginMessagingChannel from "../../../../../../models/channel";

export type EndpointRequestBodyType = void;

export type EndpointResponseBodyType = {
    count: number
    channels: MedusaPluginMessagingChannel[]
};

