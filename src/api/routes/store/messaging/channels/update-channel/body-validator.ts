import { IsString, IsObject, IsOptional } from "class-validator";

import { EndpointRequestBodyType } from "./types";

export class BodyValidator implements EndpointRequestBodyType {
    @IsObject()
    @IsOptional()
    metadata?: Record<string, unknown>;
}