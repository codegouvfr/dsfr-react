"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/PieChart/pie-chart.common";
import "@gouvfr/dsfr-chart/PieChart/pie-chart.css";
import {
    chartWrapper,
    ChartProps,
    IntrinsicGraphType,
    BaseChartProps,
    stringifyObjectValue
} from "./chartWrapper";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // https://github.com/GouvernementFR/dsfr-chart/blob/v1.0.0/src/components/PieChart.vue#L59
            "pie-chart": {
                fill?: string;
            } & IntrinsicGraphType;
        }
    }
}

export type PieChartBaseProps = {
    fill?: boolean;
				name?: string[];
} & ChartProps;

export type PieChartProps = PieChartBaseProps & BaseChartProps;

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-piechart> */
export const PieChart = chartWrapper(
    (props: PieChartBaseProps) => <pie-chart {...stringifyObjectValue(props)} />,
    "pie-chart"
);
PieChart.displayName = symToStr({ PieChart });

export default PieChart;
