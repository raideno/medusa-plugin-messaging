import { ArrowDownTray, PhotoSolid } from "@medusajs/icons";
import { IconButton, Tooltip } from "@medusajs/ui";
import BodyTypography from "../../../../components/typography/body";
import SmallTypography from "../../../../components/typography/small";

type SubHeaderProps = {

}

const SubHeader = ({ }: SubHeaderProps) => {
    return (
        <div className="w-full flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-1">
                <BodyTypography weight="bold">95</BodyTypography>
                <SmallTypography>New Channels</SmallTypography>
                <div>up/down</div>
            </div>
            <div className="flex flex-row items-center gap-1">
                <Tooltip content="Download Copy">
                    <IconButton>
                        <ArrowDownTray />
                    </IconButton>
                </Tooltip>
                <Tooltip content="ScreenShot">
                    <IconButton>
                        <PhotoSolid />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default SubHeader;