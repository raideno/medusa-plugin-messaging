import { Button, Container, Toaster } from "@medusajs/ui";
import { WidgetConfig, WidgetProps } from "@medusajs/admin"

import CreateCustomerModal from "../components/complex/create-customer-modal";

export const config: WidgetConfig = {
    zone: "customer.list.before",
}

const CustomerListBeforeWidget = ({
    notify,
    ...props
}: WidgetProps) => {

    return (
        <>
            <Container>
                <div className="w-full flex flex-row items-center justify-end">
                    <CreateCustomerModal>
                        <Button variant="primary">
                            Create Customer
                        </Button>
                    </CreateCustomerModal>
                </div>
            </Container>
            <Toaster />
        </>

    )
}

export default CustomerListBeforeWidget;