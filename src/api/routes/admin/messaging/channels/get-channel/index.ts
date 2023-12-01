import { Request, Response } from "express";

import { MedusaError } from "@medusajs/utils";

import validateChannelId from "../../../../../../api/validators/validate-channel-id";

import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";

export default async (req: Request, res: Response): Promise<void> => {
    const channelId = req.params["channelId"] || "";

    const isChannelIdValid = await validateChannelId(req.scope, channelId);

    if (!isChannelIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid channelId provided.");

    const channel = isChannelIdValid;

    const response: EndpointResponseBodyType = {
        channel: channel
    }

    res.status(200).json(response);
};
