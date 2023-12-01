import { Request, Response } from "express";

import { MedusaError } from "@medusajs/utils";

import { plainToInstance } from "class-transformer";

import MedusaPluginMessagingChannelService from "../../../../../../services/medusa-plugin-messaging-channel";

import { EndpointRequestBodyType, EndpointResponseBodyType, EndpointRequestQueryParamsType } from "./types";
import { QueryParamsValidator } from "./query-params-validator";
import validate from "../../../../../helpers/validate";

export default async (req: Request, res: Response): Promise<void> => {
    const channelService: MedusaPluginMessagingChannelService = req.scope.resolve(
        "medusaPluginMessagingChannelService"
    );

    const queryParams = (req.query || {}) as any as EndpointRequestQueryParamsType;

    const data = plainToInstance(QueryParamsValidator, queryParams);

    const validation = await validate(data);

    if (!validation.isValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "query-params-validation-failed.");

    const statistics = await channelService.listChannelsCreationStatistics(queryParams.interval, queryParams.startDate, queryParams.endDate);

    const response: EndpointResponseBodyType = {
        interval: queryParams.interval,
        end: queryParams.startDate,
        start: queryParams.endDate,
        statistics: statistics
    };

    res.status(200).json(response);
};
