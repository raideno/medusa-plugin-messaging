import Customer from "./customer";

type Channel = {
    id: string;

    customerId: string;

    customer: Customer;

    metadata?: Record<string, unknown> | null;

    version: number;

    created_at: Date;

    updated_at?: Date | null;

    deleted_at?: Date | null;
}

export default Channel;