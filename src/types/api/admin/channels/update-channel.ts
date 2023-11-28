import MedusaPluginMessagingChannel from "../../../../models/channel";

export type AdminMessagingUpdateChannelRequestBody = {
    channel: Omit<Partial<MedusaPluginMessagingChannel>, "id">
};

export type AdminMessagingUpdateChannelResponseBody = {
    channel: MedusaPluginMessagingChannel
};