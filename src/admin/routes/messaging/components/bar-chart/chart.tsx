import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip as ChartJsTooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, ChartJsTooltip, BarElement, Legend, LinearScale, CategoryScale);

type ChartProps = {

}

const Chart = ({ }: ChartProps) => {
    return (
        <div>
            <Bar
                data={{
                    labels: [2016, 2017, 2018, 2019, 2020, 2021, 2023, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
                    datasets: [
                        {
                            label: "channels-created",
                            data: [10, 15, 20, 10, 300, 10, 10, 15, 20, 15, 20, 10, 5, 14, 2],
                        }
                    ],
                }}
                options={{
                    scales: {
                        y: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    )
}

export default Chart;