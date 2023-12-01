import { IsNumber, IsOptional } from "class-validator";

import { EndpointRequestQueryParamsType } from "./types";

export class QueryParamsValidator implements EndpointRequestQueryParamsType {
    @IsOptional()
    @IsNumber()
    offset: number;

    @IsOptional()
    @IsNumber()
    limit: number;
}