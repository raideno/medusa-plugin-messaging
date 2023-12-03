import { IsNumberString, IsOptional } from "class-validator";

import { EndpointRequestQueryParamsType } from "./types";

export class QueryParamsValidator implements EndpointRequestQueryParamsType {
    @IsOptional()
    @IsNumberString()
    offset?: number;

    @IsOptional()
    @IsNumberString()
    limit?: number;
}