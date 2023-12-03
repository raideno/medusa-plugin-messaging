import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { MedusaError } from "@medusajs/utils";
import MedusaPluginMessagingNoteService from "../../../../../../services/medusa-plugin-messaging-note";
import { EndpointRequestBodyType, EndpointRequestQueryParamsType, EndpointResponseBodyType } from "./types";
import { QueryParamsValidator } from "./query-params-validator";
import validate from "../../../../../helpers/validate";

export default async (req: Request, res: Response) => {
    const noteService: MedusaPluginMessagingNoteService = req.scope.resolve(
        "medusaPluginMessagingNoteService"
    );

    const userId = req.user.userId;

    const queryParams = (req.query || {}) as unknown as EndpointRequestQueryParamsType;

    const data = plainToInstance(QueryParamsValidator, queryParams);

    const validation = await validate(data);

    if (!validation.isValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "query-params-validation-failed.");

    const [notes, count] = await noteService.listAndCountTargetNotes(
        queryParams.targetId,
        {
            skip: parseInt(queryParams.offset as unknown as string),
            take: parseInt(queryParams.limit as unknown as string),
            order: {
                "created_at": "ASC"
            }
        }
    );

    const response: EndpointResponseBodyType = {
        count: count,
        notes: notes
    };

    res.status(200).json(response);
}