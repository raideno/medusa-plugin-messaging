import { IsString, IsObject, IsOptional } from "class-validator";

import { EndpointRequestBodyType } from "./types";

export class BodyValidator implements EndpointRequestBodyType {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsOptional()
    @IsObject()
    metadata?: Record<string, unknown>;

    @IsString()
    targetId: string;

    @IsOptional()
    @IsString()
    parentId?: string;
}