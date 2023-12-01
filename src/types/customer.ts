import { Customer as MedusaCustomer } from "@medusajs/medusa";

import Channel from "./channel";

type Customer = MedusaCustomer & {
    channelId?: string | null;
    channel?: Channel | null;
}

export default Customer;