import { WidgetConfig, CustomerDetailsWidgetProps } from "@medusajs/admin"

export const config: WidgetConfig = {
    zone: "customer.details.before",
}

const CustomerDetailsBeforeWidget = ({
    customer,
    notify
}: CustomerDetailsWidgetProps) => {
    return (
        <div>customer-details-before</div>
    )
}

export default CustomerDetailsBeforeWidget;