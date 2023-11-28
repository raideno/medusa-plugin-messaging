import { Request, Response } from "express";

import { MedusaError } from "@medusajs/utils";

export default async (req: Request, res: Response): Promise<void> => {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "route haven't been implemented yet.");
};
