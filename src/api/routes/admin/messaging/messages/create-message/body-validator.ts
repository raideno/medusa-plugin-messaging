import { IsEnum, ValidateNested, IsString, IsObject, IsOptional } from "class-validator";

import { EndpointRequestBodyType } from "./types";
import { AuthorType, MessageAuthor } from "@models/message";

/**
 * AUTHOR TYPE CAN'T BE CUSTOMER
 */

class MessageAuthorValidator implements MessageAuthor {
    @IsString()
    @IsEnum(AuthorType)
    type: AuthorType;

    /*---*/

    @IsString()
    @IsOptional()
    userId?: string;

    /*---*/

    @IsString()
    @IsOptional()
    name?: string | null;

    @IsString()
    @IsOptional()
    description?: string | null;

    @IsString()
    @IsOptional()
    avatarUrl?: string | null;
}

export class BodyValidator implements EndpointRequestBodyType {
    @ValidateNested()
    author: MessageAuthorValidator;

    @IsString()
    content: string;

    @IsString()
    sourceId: string;

    @IsObject()
    @IsOptional()
    metadata?: Record<string, unknown>;
}