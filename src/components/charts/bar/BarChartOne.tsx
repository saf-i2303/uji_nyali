"use client";
import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BarChartProps {
  borrowings: { month: number; total: number }[];
  returns: { month: number; total: number }[];
}

export default function BarChartOne({ borrowings, returns }: BarChartProps) {
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const borrowData = labels.map((_, idx) => {
    const found = borrowings.find(d => d.month === idx + 1);
    return found ? found.total : 0;
  });

  const returnData = labels.map((_, idx) => {
    const found = returns.find(d => d.month === idx + 1);
    return found ? found.total : 0;
  });

  const options: ApexOptions = {
    colors: ["#465fff", "#10b981"], // biru = peminjaman, hijau = pengembalian
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "39%", borderRadius: 5 },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } },
    legend: { show: true, position: "top", horizontalAlign: "left", fontFamily: "Outfit" },
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
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartOne" className="min-w-[1000px]">
        <ReactApexChart options={options} series={series} type="bar" height={180} />
      </div>
    </div>
  );
}
