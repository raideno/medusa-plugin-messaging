import { Request } from "express";

import Source from "@models/source";

type Handler = {
    id: string;
    name: string;
    description: string;
    onReceive: (request: Request) => Promise<boolean>;
    onSend: (content: string, source: Source) => Promise<boolean>;
}

export default Handler;