"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamic import ReactApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MonthData {
  month: number;
  total: number;
}

interface DashboardChartData {
  borrowingsPerMonth: MonthData[];
  returnsPerMonth: MonthData[];
}

export default function PetugasCharts() {
  const [chartData, setChartData] = useState<DashboardChartData>({
    borrowingsPerMonth: [],
    returnsPerMonth: [],
  });

  // Fetch dashboard chart data
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/petugas/dashboard");
        const data = await res.json();
        setChartData({
          borrowingsPerMonth: data.borrowingsPerMonth || [],
          returnsPerMonth: data.returnsPerMonth || [],
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    }
    fetchDashboard();
  }, []);

  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const borrowData = labels.map((_, idx) => {
    const found = chartData.borrowingsPerMonth.find(d => d.month === idx + 1);
    return found ? found.total : 0;
  });

  const returnData = labels.map((_, idx) => {
    const found = chartData.returnsPerMonth.find(d => d.month === idx + 1);
    return found ? found.total : 0;
  });

  const options: ApexOptions = {
    colors: ["#465fff", "#10b981"],
    chart: { type: "bar", height: 300, toolbar: { show: false }, fontFamily: "Outfit, sans-serif" },
    plotOptions: { bar: { horizontal: false, columnWidth: "39%", borderRadius: 5 } },
    dataLabels: { enabled: false },
    xaxis: { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } },
    legend: { show: true, position: "top", horizontalAlign: "left" },
    yaxis: { title: { text: undefined } },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val: number) => `${val}` } },
  };

  const series = [
    { name: "Peminjaman", data: borrowData },
    { name: "Pengembalian", data: returnData },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full max-w-full overflow-x-auto custom-scrollbar">
      <ReactApexChart options={options} series={series} type="bar" height={300} width="100%" />
    </div>
  );
}
