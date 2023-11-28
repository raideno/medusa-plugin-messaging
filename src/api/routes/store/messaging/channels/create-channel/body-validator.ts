import { IsString, IsObject, IsOptional } from "class-validator";

import { EndpointRequestBodyType } from "./types";

export class BodyValidator implements EndpointRequestBodyType {
    @IsString()
    customerId: string;

    @IsObject()
    @IsOptional()
    metadata?: Record<string, unknown>;
}