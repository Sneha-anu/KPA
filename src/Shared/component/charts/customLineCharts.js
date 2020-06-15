import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { startCase, camelCase } from "lodash";

export const CustomLineCharts = ({ data }) => {
  return (
    <ResponsiveContainer className="card" mt={2} width="100%" height="100%">
      <LineChart
        //   className="card"
        //   width={500}
        // height={190}
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: 5,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="month"
          height={1}
          tickFormatter={(text) => text.substr(0, 3)}
        />
        <YAxis tickLine={false} tick={false} width={2} />
        <Tooltip
          formatter={(value, name, props) => [
            value,
            startCase(camelCase(name)),
          ]}
        />
        <Legend
          wrapperStyle={{ fontSize: "11px", top: "1px" }}
          formatter={(value) => startCase(camelCase(value))}
        />
        <Line
          type="monotone"
          dataKey="component"
          stroke="#115293"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Tech_session" stroke="red" />
        <Line type="monotone" dataKey="Master_class" stroke="#FFC533" />
        <Line type="monotone" dataKey="case_study" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
