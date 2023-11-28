import { MedusaContainer, CustomerService } from "@medusajs/medusa"

import Customer from "@models/customer";

export default async (container: MedusaContainer, customerId: string): Promise<Customer | null | undefined> => {
    const customerService: CustomerService = container.resolve("customerService");

    let customer: undefined | Customer | null = undefined;

    try {
        customer = await customerService.retrieve(customerId);
    } catch {
        customer = null;
    }

    return customer;
}