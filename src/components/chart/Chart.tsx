import React, { useEffect } from "react";
import * as echarts from "echarts/core";
import {
  GridComponent,
  GridComponentOption,
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";
import { LineChart, LineSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { DocumentData } from "firebase/firestore";

import dayjs from "dayjs";
import HeaderChart from "./HeaderChart";

echarts.use([
  GridComponent,
  ToolboxComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LineSeriesOption
>;

const Chart: React.FC = () => {
  const [chartData, setChartData] = React.useState<DocumentData[]>([]);

  const dataHeaderRef = React.useRef<{ time: string; price: number | null }>({
    time: "",
    price: null,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const sevenMinutesAgo = new Date(now.getTime() - 7 * 60 * 1000);
      getDataFileredByOnSnapshot(
        "charts",
        [["created_at", ">=", sevenMinutesAgo.getTime() / 1000]],
        (docs) => {
          setChartData(docs);
        }
      );
      return () => clearInterval(interval);
    }, 2000);
  }, []);

  useEffect(() => {
    var chartDom = document.getElementById("main")!;
    var myChart = echarts.init(chartDom);

    let time: any = [];
    let price: any = [];
    let min = 100000;
    let max = 0;

    chartData?.map((chart) => {
      const _price = chart.price / 10 ** 8;
      min = _price < min ? _price : min;
      max = _price > max ? _price : max;

      time = [...time, dayjs(chart.created_at * 1000).format("h:mm A")];
      price = [...price, _price];
    });

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
        formatter: (params: any) => {
          dataHeaderRef.current = {
            price: params?.[0]?.data.toFixed(4),
            time: params?.[0]?.axisValue,
          };

          return `${params?.[0]?.axisValue}<br><b>${params?.[0]?.data.toFixed(
            4
          )} BNB/USD</b>`;
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: time,
        axisLabel: {
          color: "#9a6aff",
          fontWeight: 500,
        },
      },
      yAxis: {
        show: true,
        type: "value",
        position: "right",
        min: min,
        max: max,
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: "#9a6aff",
          fontWeight: 500,
        },
      },
      series: [
        {
          data: price,
          type: "line",
          areaStyle: {},
          itemStyle: { borderColor: "#ffc700" },
          lineStyle: { color: "#19c0cc" },
        },
      ],
      color: ["#53dee9"],
    };
    option && myChart.setOption(option);
  }, [chartData]);

  return (
    <div>
      <HeaderChart
        time={dataHeaderRef.current.time}
        price={dataHeaderRef.current.price ?? 0}
      />
      <div id="main" style={{ width: "100%", height: "300px" }}></div>
    </div>
  );
};

export default Chart;
