import "./barChartBox.scss" 
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';
import { barChartBoxRevenue,   } from "../../data";

type Props ={

    title: string;
    dataKey: string;
    color: string;
    chartData: object[];

};


const BarChartBox = (props: Props) => {
    return (
        <div className="barChartBox">
        
            <h1>{props.title}</h1>
            <div className="chart">
            <ResponsiveContainer width="100%" height={150}>
                <BarChart data={props.chartData}>
                    <Tooltip
                    contentStyle= {{backgroundColor: "#2a3447", borderRadius: "5px"}}
                    labelStyle={{ display:"none" }}
                    cursor={{ fill:"none" }}
                    />
                <Bar dataKey={props.dataKey} fill={props.color} />
                 </BarChart>
            </ResponsiveContainer>
            </div>
        

        </div>
    );
    };


export default BarChartBox;