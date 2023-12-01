import { Container } from "@medusajs/ui"

import Separator from "../../../../components/ui/separator"

import Header from "./header"
import SubHeader from "./sub-header"
import Chart from "./chart";
import Footer from "./footer"

type BarChartProps = {

}

const BarChart = ({ }: BarChartProps) => {
    return (
        <Container className="w-full">
            <div className="w-full flex flex-col gap-4">
                <Header />
                <Separator className="w-full" />
                <SubHeader />
                <Separator className="w-full" />
                <Chart />
                <Separator className="w-full" />
                <Footer />
            </div>
        </Container>
    )
}

export default BarChart;