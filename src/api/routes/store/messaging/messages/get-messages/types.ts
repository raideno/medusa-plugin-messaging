import MedusaPluginMessagingMessage from "@models/message";

export type EndpointRequestBodyType = void;

export type EndpointResponseBodyType = {
    count: number
    messages: MedusaPluginMessagingMessage[]
};

