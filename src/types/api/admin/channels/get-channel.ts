import MedusaPluginMessagingChannel from "../../../../models/channel";

export type AdminMessagingGetChannelRequestBody = void;

export type AdminMessagingGetChannelResponseBody = {
    channel: MedusaPluginMessagingChannel
};