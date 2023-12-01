import { Text } from "@medusajs/ui";
import { BookOpen } from "@medusajs/icons";

import IntervalSelect from "./interval-select";
import TitleTypography from "../../../../components/typography/title";
import BodyTypography from "../../../../components/typography/body";

type HeaderProps = {

}

const Header = ({ }: HeaderProps) => {
    return (
        <div className="w-full flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
                <div className="w-10 h-10 p-1 flex justify-center items-center rounded bg-ui-bg-base shadow-elevation-card-rest">
                    <BookOpen />
                </div>
                <div>
                    <TitleTypography weight="bold">Channels Creation</TitleTypography>
                </div>
            </div>
            <div>
                {/* TODO: radio select */}
                <IntervalSelect />
            </div>
        </div>
    )
}

export default Header;