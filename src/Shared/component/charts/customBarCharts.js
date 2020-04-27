import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export const BarCustomChart = ({ data }) => {
  return (
    <ResponsiveContainer className="card" width="100%" height="100%">
      <BarChart
        //   width={500}
        //   height={300}
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          type="number"
          tick={false}
          domain={[0, data.pending]}
          height={3}
        />
        <YAxis
          dataKey="name"
          tickLine={false}
          tickFormatter={(text) => text.substr(0, 6) + ".."}
          type="category"
        />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: "12px", top: "1px", right: "5px" }} />
        <Bar dataKey="completed" stackId="a" fill="rgb(71, 145, 219)" />
        <Bar dataKey="pending" stackId="a" fill="#f05b4f" />
        {/* <Bar dataKey="amt" stackId="a" fill="#F2726F" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};
