import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";

const D3Component = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 2 seconds timeout

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
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
    <div className="container mx-auto p-4 justify-center">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Visualization Dashboard
      </h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[
          { label: "End Year", field: "endYear" },
          { label: "Topic", field: "topic" },
          { label: "Sector", field: "sector" },
          { label: "Region", field: "region" },
          { label: "PEST", field: "pestle" },
          { label: "Source", field: "source" },
          { label: "SWOT", field: "swot" },
          { label: "Country", field: "country" },
          { label: "City", field: "city" },
        ].map(({ label, field }) => (
          <div key={field} className="bg-gray-100 p-4 rounded">
            <label className="block mb-2 font-semibold text-gray-700">
              {label}:
            </label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full rounded"
              value={filters[field]}
              onChange={(e) => handleFilterChange(field, e.target.value)}
            />
          </div>
        ))}
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <button
            disabled
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>
        </div>
      ) : (
        <div
          id="chart-container"
          className="w-full overflow-x-auto flex justify-center bg-white p-4 rounded shadow-lg"
        >
          <svg ref={svgRef} width="1200" height="600"></svg>
        </div>
      )}
    </div>
  );
};

export default D3Component;
