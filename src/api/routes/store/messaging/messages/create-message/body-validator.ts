import { IsEnum, ValidateNested, IsString, IsObject, IsOptional } from "class-validator";

import { EndpointRequestBodyType } from "./types";

export class BodyValidator implements EndpointRequestBodyType {
    @IsString()
    content: string;

    @IsString()
    sourceId: string;

    @IsObject()
    @IsOptional()
    metadata?: Record<string, unknown>;
}