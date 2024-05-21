import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";

const D3Component = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous drawings

      const width = 800;
      const height = 400;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.topic))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.intensity)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x));

      const yAxis = (g) =>
        g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

      svg
        .append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.topic))
        .attr("y", (d) => y(d.intensity))
        .attr("height", (d) => y(0) - y(d.intensity))
        .attr("width", x.bandwidth())
        .attr("fill", "steelblue");

      svg.append("g").call(xAxis);
      svg.append("g").call(yAxis);
    }
  }, [data]);

  return (
    <div>
      <h1>D3.js Bar Chart</h1>
      <svg ref={svgRef} width={800} height={400}></svg>
    </div>
  );
};

export default D3Component;
