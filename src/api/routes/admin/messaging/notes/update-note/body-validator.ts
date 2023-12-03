import { IsString, IsObject, IsOptional } from "class-validator";

import { EndpointRequestBodyType } from "./types";

export class BodyValidator implements EndpointRequestBodyType {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsObject()
    @IsOptional()
    metadata?: Record<string, unknown>;
}