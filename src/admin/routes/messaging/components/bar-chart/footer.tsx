import { IconButton, Tooltip } from "@medusajs/ui";
import { ArrowLeftMini, ArrowRightMini } from "@medusajs/icons";

type FooterProps = {

}

const Footer = ({ }: FooterProps) => {
    return (
        <div className="w-full flex flex-row items-center justify-between">
            <div>23-11-2023 30-11-2023</div>
            <div className="flex flex-row items-center gap-1">
                <Tooltip content="Previous Page">
                    <IconButton>
                        <ArrowLeftMini />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Next Page">
                    <IconButton>
                        <ArrowRightMini />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default Footer;