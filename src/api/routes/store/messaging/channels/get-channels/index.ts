import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingChannelService from "../../../../../../services/medusa-plugin-messaging-channel";

import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";

export default async (req: Request, res: Response): Promise<void> => {
    const channelService: MedusaPluginMessagingChannelService = req.scope.resolve(
        "medusaPluginMessagingChannelService"
    );

    const customerId = req.user.customer_id;

    if (!customerId)
        throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "you must be logged in.")

    const [channels, count] = await channelService.listAndCount({
        customerId: customerId
    })

    const response: EndpointResponseBodyType = {
        count: count,
        channels: channels
    };

    res.status(202).json(response);
};
