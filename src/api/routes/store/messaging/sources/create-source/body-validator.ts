import { IsEnum, ValidateNested, IsString, IsObject, IsOptional } from "class-validator";

import { EndpointRequestBodyType } from "./types";

export class BodyValidator implements EndpointRequestBodyType {
    @IsString()
    name: string;

    @IsString()
    channelId: string;

    @IsOptional()
    @IsString()
    handlerId?: string;

    @IsString()
    context: string;

    @IsOptional()
    @IsString()
    externalId?: string;

    @IsObject()
    @IsOptional()
    metadata?: Record<string, unknown>;
}