import { Select } from "@medusajs/ui";

type IntervalSelectProps = {}

const IntervalSelect = ({ }: IntervalSelectProps) => {
    return (
        <Select size="small" >
            <Select.Trigger>
                <Select.Value placeholder="Interval Select" />
            </Select.Trigger>
            <Select.Content>
                <Select.Item key={"hour"} value={"hour"}>
                    {"Hour"}
                </Select.Item>
                <Select.Item key={"day"} value={"day"}>
                    {"Day"}
                </Select.Item>
                <Select.Item key={"week"} value={"week"}>
                    {"Week"}
                </Select.Item>
                <Select.Item key={"month"} value={"month"}>
                    {"Month"}
                </Select.Item>
                <Select.Item key={"year"} value={"year"}>
                    {"Year"}
                </Select.Item>
            </Select.Content>
        </Select>
    )
}

export default IntervalSelect;