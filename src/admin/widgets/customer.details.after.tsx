import { WidgetConfig, CustomerDetailsWidgetProps } from "@medusajs/admin"

export const config: WidgetConfig = {
    zone: "customer.details.after",
}

const CustomerDetailsAfterWidget = ({
    customer,
    notify
}: CustomerDetailsWidgetProps) => {
    return (
        <div>customer-details-after</div>
    )
}

export default CustomerDetailsAfterWidget;