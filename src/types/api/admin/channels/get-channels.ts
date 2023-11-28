import MedusaPluginMessagingChannel from "../../../../models/channel";

export type AdminMessagingGetChannelsRequestBody = void;

export type AdminMessagingGetChannelsResponseBody = {
    channel: MedusaPluginMessagingChannel[]
};