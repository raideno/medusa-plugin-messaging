import { Request, Response } from "express";

import MedusaPluginMessagingChannelService from "@services/channel";

import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";

export default async (req: Request, res: Response): Promise<void> => {
    const channelService: MedusaPluginMessagingChannelService = req.scope.resolve(
        "medusaPluginMessagingChannelService"
    );

    const [channels, count] = await channelService.listAndCount();

    const response: EndpointResponseBodyType = {
        channels: channels,
        count: count
    };

    res.status(200).json(response);
};
