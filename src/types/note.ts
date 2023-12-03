import { User } from "@medusajs/medusa";

type Note = {
    id: string;

    authorId: string;

    author: User;

    title: string;

    content: string;

    metadata?: Record<string, unknown> | null;

    parentId?: string | null;

    parent?: Note | null;

    children?: Note[];

    targetId: string;

    version: number;

    created_at: Date;

    updated_at?: Date | null;

    deleted_at?: Date | null;
}

export default Note;