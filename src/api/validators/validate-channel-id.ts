import { MedusaContainer } from "@medusajs/medusa"

import Channel from "../../models/channel";
import ChannelService from "../../services/medusa-plugin-messaging-channel";

export default async (container: MedusaContainer, channelId: string): Promise<Channel | null | undefined> => {
    const channelService: ChannelService = container.resolve("medusaPluginMessagingChannelService");

    let channel: undefined | Channel | null = undefined;

    try {
        channel = await channelService.retrieve(channelId);
    } catch {
        channel = null;
    }

    return channel;
}