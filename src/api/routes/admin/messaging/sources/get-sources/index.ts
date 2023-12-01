import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingSourceService from "../../../../../../services/medusa-plugin-messaging-source";

import validate from "../../../../../../api/helpers/validate";
import validateChannelId from "../../../../../../api/validators/validate-channel-id";

import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import validateSourceId from "../../../../../../api/validators/validate-source-id";

export default async (req: Request, res: Response): Promise<void> => {
    const sourceService: MedusaPluginMessagingSourceService = req.scope.resolve(
        "medusaPluginMessagingSourceService"
    );

    const userId = req.user.userId;

    const channelId = req.params["channelId"] || "";

    const isChannelIdValid = await validateChannelId(req.scope, channelId);

    if (!isChannelIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid channelId provided.");

    const channel = isChannelIdValid;

    const [sources, count] = await sourceService.listAndCount({
        channelId: channelId
    });

    const response: EndpointResponseBodyType = {
        count: count,
        sources: sources
    };

    res.status(202).json(response);
};
