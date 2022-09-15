import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const ShowCharts = ({ allposts }) => {



  function formatXAxis(tickItem) {
    return moment(tickItem).format("MMM Do YY");


  }
  return (
      <div className="container" style={{ marginTop: "30px" }}>
        <LineChart
          width={500}
          height={500}
          data={allposts}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatXAxis} />
          <YAxis />

          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="title"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="des"
            stroke="red"
            activeDot={{ r: 8 }}
          />

          <Line
            type="monotone"
            dataKey="allposts.length"
            stroke="blue"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="address.geo.lat"
            stroke="orange"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>

  );
};
