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
const now = new Date();
const sevenMinutesAgo = new Date(now.getTime() - 7 * 60 * 1000);
const Chart: React.FC = () => {
  const [data, setData] = React.useState();
  useEffect(() => {
    getDataFileredByOnSnapshot(
      "charts",
      [["created_at", ">=", Number(sevenMinutesAgo.getTime())]],
      (docs) => {
        console.log(docs);
      }
    );
  }, []);
  console.log(sevenMinutesAgo.getTime());
  useEffect(() => {
    var chartDom = document.getElementById("main")!;
    var myChart = echarts.init(chartDom);

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 2000],
          type: "line",
          areaStyle: {},
        },
      ],
    };
    option && myChart.setOption(option);
  }, []);

  return <div id="main" style={{ width: "100%", height: "300px" }}></div>;
};

export default Chart;
