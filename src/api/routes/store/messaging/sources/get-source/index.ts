import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingSourceService from "../../../../../../services/medusa-plugin-messaging-source";

import validate from "../../../../../../api/helpers/validate";
import validateChannelId from "../../../../../../api/validators/validate-channel-id";

import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import validateSourceId from "../../../../../../api/validators/validate-source-id";

export default async (req: Request, res: Response): Promise<void> => {
    const customerId = req.user.customer_id;

    const channelId = req.params["channelId"] || "";
    const sourceId = req.params["sourceId"] || "";

    const isChannelIdValid = await validateChannelId(req.scope, channelId);

    if (!isChannelIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid channelId provided.");

    const channel = isChannelIdValid;

    if (channel.customerId !== customerId)
        throw new MedusaError(MedusaError.Types.NOT_ALLOWED, "you can't get a source of a channel you don't own.")

    const isSourceIdValid = await validateSourceId(req.scope, sourceId);

    if (!isSourceIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid sourceId provided.");

    const source = isSourceIdValid;

    if (source.channelId !== channel.id)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "given sourceId isn't a part of the given channelId.");

    const response: EndpointResponseBodyType = {
        source: source
    };

    res.status(202).json(response);
};
