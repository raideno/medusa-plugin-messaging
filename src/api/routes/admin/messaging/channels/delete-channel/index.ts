import { Request, Response } from "express";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingChannelService from "@services/channel";

import validateChannelId from "@api/validators/validate-channel-id";

import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";

export default async (req: Request, res: Response): Promise<void> => {
    const channelService: MedusaPluginMessagingChannelService = req.scope.resolve(
        "medusaPluginMessagingChannelService"
    );

    const channelId = req.params["channelId"] || "";

    const isChannelIdValid = await validateChannelId(req.scope, channelId);

    if (!isChannelIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid channelId provided.");

    const channel = isChannelIdValid;

    /**
     * TODO: should we wrap it with a try catch ?
     */
    await channelService.delete(channelId);

    // const response: EndpointResponseBodyType

    res.sendStatus(200);
};
