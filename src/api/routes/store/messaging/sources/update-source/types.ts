import MedusaPluginMessagingSource from "@models/source";

/**
 * should we allow the handlerId, externalId and context to be updated ?
 */
export type EndpointRequestBodyType = Pick<MedusaPluginMessagingSource, "name" | "metadata">;

export type EndpointResponseBodyType = {
    source: MedusaPluginMessagingSource
};

