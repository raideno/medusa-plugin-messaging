import MedusaPluginMessagingSource from "../../../../../../models/source";

export type EndpointRequestBodyType = Pick<MedusaPluginMessagingSource, "name" | "channelId" | "handlerId" | "context" | "externalId" | "metadata">;

export type EndpointResponseBodyType = {
    source: MedusaPluginMessagingSource
};

