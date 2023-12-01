import { InboxSolid } from "@medusajs/icons"
import { RouteProps, RouteConfig } from "@medusajs/admin"

import BarChart from "./components/bar-chart"
import InboxPageHeaderCta from "./components/inbox-page-header-cta"

export const config: RouteConfig = {
    link: {
        label: "Messaging",
        icon: InboxSolid,
    },
}

const MessagingPage = ({
    notify
}: RouteProps) => {

    return (
        <div className="flex flex-col gap-4">
            <InboxPageHeaderCta />
            <BarChart />
            <div className="h-xlarge w-full" />
        </div>
    )
}

export default MessagingPage;