import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";

const D3Component = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });
  const svgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/data");
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filteredData.length > 0) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); 

      const width = 1200;
      const height = 600;
      const margin = { top: 20, right: 30, bottom: 100, left: 50 };

      const x = d3
        .scaleBand()
        .domain(filteredData.map((d) => d.topic))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(filteredData, (d) => d.intensity)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("transform", "rotate(-45)")
          .style("text-anchor", "end");

      const yAxis = (g) =>
        g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

      svg
        .append("g")
        .selectAll("rect")
        .data(filteredData)
        .join("rect")
        .attr("x", (d) => x(d.topic))
        .attr("y", (d) => y(d.intensity))
        .attr("height", (d) => y(0) - y(d.intensity))
        .attr("width", x.bandwidth())
        .attr("fill", "steelblue");

      svg.append("g").call(xAxis);
      svg.append("g").call(yAxis);
    }
  }, [filteredData]);

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  useEffect(() => {
    const filtered = data.filter((item) => {
      return (
        (filters.endYear ? item.end_year === filters.endYear : true) &&
        (filters.topic ? item.topic === filters.topic : true) &&
        (filters.sector ? item.sector === filters.sector : true) &&
        (filters.region ? item.region === filters.region : true) &&
        (filters.pestle ? item.pestle === filters.pestle : true) &&
        (filters.source ? item.source === filters.source : true) &&
        (filters.swot ? item.swot === filters.swot : true) &&
        (filters.country ? item.country === filters.country : true) &&
        (filters.city ? item.city === filters.city : true)
      );
    });
    setFilteredData(filtered);
  }, [filters, data]);

  return (
    <div className="container mx-auto p-4  justify-center">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {" "}
        Visualization Dashboard
      </h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-100 p-4 rounded">
          <label className="block mb-2 font-semibold text-gray-700">
            End Year:
          </label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={filters.endYear}
            onChange={(e) => handleFilterChange("endYear", e.target.value)}
          />
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <label className="block mb-2 font-semibold text-gray-700">
            Topic:
          </label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={filters.topic}
            onChange={(e) => handleFilterChange("topic", e.target.value)}
          />
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <label className="block mb-2 font-semibold text-gray-700">
            Sector:
          </label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={filters.sector}
            onChange={(e) => handleFilterChange("sector", e.target.value)}
          />
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <label className="block mb-2 font-semibold text-gray-700">
            Region:
          </label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={filters.region}
            onChange={(e) => handleFilterChange("region", e.target.value)}
          />
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <label className="block mb-2 font-semibold text-gray-700">
            PEST:
          </label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={filters.pestle}
            onChange={(e) => handleFilterChange("pestle", e.target.value)}
          />
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <label className="block mb-2 font-semibold text-gray-700">
            Source:
          </label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={filters.source}
            onChange={(e) => handleFilterChange("source", e.target.value)}
          />
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <label className="block mb-2 font-semibold text-gray-700">
            SWOT:
          </label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={filters.swot}
            onChange={(e) => handleFilterChange("swot", e.target.value)}
          />
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <label className="block mb-2 font-semibold text-gray-700">
            Country:
          </label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={filters.country}
            onChange={(e) => handleFilterChange("country", e.target.value)}
          />
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <label className="block mb-2 font-semibold text-gray-700">
            City:
          </label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
          />
        </div>
      </div>
      <div
        id="chart-container"
        className="w-full overflow-x-auto  flex justify-center  bg-white p-4 rounded shadow-lg"
      >
        <svg ref={svgRef} width="1200" height="600"></svg>
      </div>
    </div>
  );
};

export default D3Component;
