import { IsEnum, ValidateNested, IsString, IsObject, IsOptional } from "class-validator";

import { EndpointRequestBodyType } from "./types";

export class BodyValidator implements EndpointRequestBodyType {
    @IsString()
    name: string;

    @IsOptional()
    metadata?: Record<string, unknown>;
}