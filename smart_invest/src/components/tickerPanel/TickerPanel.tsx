// not in use
// placeholder for further customization

import "./tickerPanel.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
    color: string;
    icon: string;
    title: string;
    number: number | string;
    percentage: number;
    chartData: object[];
    dataKey: string;
};

const TickerPanel = (props: Props) => {
  return (
    <div className="tickerPanel">
      <div className="boxInfo">
        <div className="title">
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
        
        <h1>ticker panel</h1>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
                <Tooltip 
                contentStyle={{ backgroundColor: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 60 }} 
                />
            <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
            />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span className="percentage" style={{color: props.percentage<0 ? "tomato" : "limegreen"}}></span>
          <span className="duration"></span>
        </div>
      </div>
    </div>
  );
};

export default TickerPanel;
