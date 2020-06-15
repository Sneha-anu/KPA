import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  // Legend,
} from "recharts";

export const BarCustomChart = ({ data }) => {
  const COLOR = data.length > 0 ? data[1].color : { main: "", dark: "" };

  return (
    <ResponsiveContainer className="card" width="100%" height="100%">
      <BarChart
        //   width={500}
        //   height={300}
        data={data[0]}
        layout="vertical"
        margin={{
          top: 10,
          right: 10,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis type="number" tick={false} domain={[0, data.pending]} />
        <YAxis
          dataKey="name"
          tickLine={false}
          tickFormatter={(text) => text.substr(0, 6) + ".."}
          type="category"
        />
        <Tooltip />
        {/* <Legend wrapperStyle={{ fontSize: "12px", top: "1px", right: "5px" }} /> */}
        <Bar dataKey="completed" stackId="a" fill={COLOR.primaryColor} />
        <Bar dataKey="pending" stackId="a" fill={COLOR.secondaryColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};
