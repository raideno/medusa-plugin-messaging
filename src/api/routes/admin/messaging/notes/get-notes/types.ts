import MedusaPluginMessagingNote from "../../../../../../models/note";

export type EndpointRequestQueryParamsType = {
    offset?: number | undefined;
    limit?: number | undefined;
    targetId: string;
};

export type EndpointRequestBodyType = void;

export type EndpointResponseBodyType = {
    count: number
    notes: MedusaPluginMessagingNote[]
};