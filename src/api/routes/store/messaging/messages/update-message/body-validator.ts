import { IsEnum, ValidateNested, IsString, IsObject, IsOptional } from "class-validator";

import { EndpointRequestBodyType } from "./types";
import { AuthorType, MessageAuthor } from "@models/message";


export class BodyValidator implements EndpointRequestBodyType {
    @IsString()
    content: string;

    @IsObject()
    @IsOptional()
    metadata?: Record<string, unknown>;
}