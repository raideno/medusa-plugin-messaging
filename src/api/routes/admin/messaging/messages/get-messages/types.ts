import MedusaPluginMessagingMessage from "../../../../../../models/message";

export type EndpointRequestQueryParamsType = {
    offset?: number | undefined;
    limit?: number | undefined;
};

export type EndpointRequestBodyType = void;

export type EndpointResponseBodyType = {
    count: number
    messages: MedusaPluginMessagingMessage[]
};