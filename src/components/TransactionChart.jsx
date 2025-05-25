import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/id";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler);

const TransactionChart = ({ transactions }) => {
  const [timeRange, setTimeRange] = React.useState("day");

  const handleTimeRangeChange = (event, newValue) => {
    setTimeRange(newValue);
  };

  const chartData = useMemo(() => {
    let labels = [];
    let incomeData = [];
    let expenseData = [];

    const now = dayjs();
    let startDate;
    let format;

    switch (timeRange) {
      case "day":
        startDate = now.startOf("day");
        format = "HH:mm";
        for (let i = 0; i < 24; i++) {
          labels.push(now.hour(i).format(format));
          const hourTransactions = transactions.filter((t) => dayjs(t.date).isSame(now.hour(i), "hour"));
          incomeData.push(hourTransactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0));
          expenseData.push(hourTransactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0));
        }
        break;
      case "week":
        startDate = now.startOf("week");
        format = "ddd";
        for (let i = 0; i < 7; i++) {
          labels.push(now.day(i).format(format));
          const dayTransactions = transactions.filter((t) => dayjs(t.date).isSame(now.day(i), "day"));
          incomeData.push(dayTransactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0));
          expenseData.push(dayTransactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0));
        }
        break;
      case "month":
        startDate = now.startOf("month");
        format = "D";
        const daysInMonth = now.daysInMonth();
        for (let i = 1; i <= daysInMonth; i++) {
          labels.push(i.toString());
          const dayTransactions = transactions.filter((t) => dayjs(t.date).isSame(now.date(i), "day"));
          incomeData.push(dayTransactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0));
          expenseData.push(dayTransactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0));
        }
        break;
    }

    return {
      labels,
      datasets: [
        {
          label: "Pemasukan",
          data: incomeData,
          backgroundColor: "rgba(0, 153, 102, 0.8)",
          borderColor: "#009966",
          borderWidth: 2,
          borderRadius: 8,
          barThickness: 20,
          maxBarThickness: 30,
          minBarLength: 4,
          hoverBackgroundColor: "rgba(0, 153, 102, 1)",
          hoverBorderColor: "#009966",
          hoverBorderWidth: 3,
        },
        {
          label: "Pengeluaran",
          data: expenseData,
          backgroundColor: "rgba(245, 0, 87, 0.8)",
          borderColor: "#f50057",
          borderWidth: 2,
          borderRadius: 8,
          barThickness: 20,
          maxBarThickness: 30,
          minBarLength: 4,
          hoverBackgroundColor: "rgba(245, 0, 87, 1)",
          hoverBorderColor: "#f50057",
          hoverBorderWidth: 3,
        },
      ],
    };
  }, [transactions, timeRange]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 20,
            font: {
              size: 12,
              weight: "bold",
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#000",
          bodyColor: "#000",
          borderColor: "#ddd",
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += "Rp" + context.parsed.y.toLocaleString("id-ID");
              }
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 11,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            font: {
              size: 11,
            },
            callback: function (value) {
              return "Rp" + value.toLocaleString("id-ID");
            },
          },
        },
      },
    }),
    []
  );

  return (
    // <Paper elevation={0} sx={{ width: '100%', mt: 2, mb: 2, p: 2, borderRadius: 2 }}>
    <>
      <Typography variant="h6" gutterBottom>
        Grafik Transaksi
      </Typography>
      <Tabs
        value={timeRange}
        onChange={handleTimeRangeChange}
        centered
        sx={{
          mb: 2,
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: "medium",
            minWidth: 100,
          },
        }}
      >
        <Tab label="Hari Ini" value="day" />
        <Tab label="Minggu Ini" value="week" />
        <Tab label="Bulan Ini" value="month" />
      </Tabs>
      <Box sx={{ height: 300, position: "relative" }}>
        <Bar data={chartData} options={options} />
      </Box>
    </>

    // </Paper>
  );
};

export default TransactionChart;
