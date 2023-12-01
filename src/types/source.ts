import Channel from "./channel";

type Source = {
    id: string;

    name: string;

    channelId: string

    channel: Channel;

    handlerId?: string | null;

    context: string;

    externalId?: string | null;

    metadata?: Record<string, unknown> | null;

    version: number;

    created_at: Date;

    updated_at?: Date | null;

    deleted_at?: Date | null;
}

export default Source;