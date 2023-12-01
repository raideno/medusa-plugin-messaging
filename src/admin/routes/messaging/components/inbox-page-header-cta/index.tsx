import { Link } from "react-router-dom"

import { Button, Container, Heading } from "@medusajs/ui"
import { ArrowRightMini, InboxSolid } from "@medusajs/icons"

import BodyTypography from "../../../../components/typography/body"
import TitleTypography from "../../../../components/typography/title"
import SmallTypography from "../../../../components/typography/small"

type InboxPageHeaderCtaProps = {

}

const InboxPageHeaderCta = ({ }: InboxPageHeaderCtaProps) => {

    const count = 23;

    return (
        <Link className="w-full" to={"/a/messaging/inbox"}>
            <Container className="w-full">
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <div className="w-12 h-12 p-1 flex justify-center items-center rounded-full bg-ui-bg-base shadow-elevation-card-rest">
                            <InboxSolid />
                        </div>
                        <div>
                            <TitleTypography weight="bold">Consult your Inbox</TitleTypography>
                            <SmallTypography>{count} new messages since your last visit.</SmallTypography>
                        </div>
                    </div>
                    <div>
                        <Button variant="primary">
                            Consult
                            <ArrowRightMini />
                        </Button>
                    </div>
                </div>
            </Container>
        </Link>
    )
}

export default InboxPageHeaderCta