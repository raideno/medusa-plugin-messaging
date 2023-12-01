import { User } from "@medusajs/medusa"
import Source from "./source";

export enum AuthorType {
    SYSTEM = "SYSTEM",
    STAFF = "STAFF",
    AUTOMATIC = "AUTOMATIC",
    CUSTOMER = "CUSTOMER",
    UNKNOWN = "UNKNOWN",
};

type Message = {
    id: string;

    author: {
        type: AuthorType;

        userId?: string;

        user?: User;

        name?: string | null;

        description?: string | null;

        avatarUrl?: string | null;
    };

    content: string;

    sourceId: string;

    source: Source;

    metadata?: Record<string, unknown> | null;

    version: number;

    created_at: Date;

    updated_at?: Date | null;

    deleted_at?: Date | null;
}

export default Message;