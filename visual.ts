/* eslint-disable @typescript-eslint/no-unused-vars */

"use strict";
// Import interfaces from the Power BI SDK
import powerbiVisualApi from "powerbi-visuals-api";
// import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import DataView = powerbiVisualsApi.DataView;
import * as d3 from "d3";
import powerbiVisualsApi from "powerbi-visuals-api";

// import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
    private target: HTMLElement;
    private updateCount: Number;
    private host: IVisualHost;


    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.target = options.element;
        this.updateCount = 0;
        this.host = options.host;
    }
    
    public update(options: VisualUpdateOptions) {
        const DataView = options.dataViews[0];
        const categories = DataView.categorical.categories[0];
        const values =categories.values;
        const colors = categories.objects.map((obj: any)=>obj.color);

        d3.select(this.target).selectAll('*').remove();
        const svg = d3.select(this.target)
        .append('svg')
        .attr('width', options.viewport.width)
        .attr('height', options.viewport.height);

        svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('x',(d,i) =>i * 20)
        .attr('y',0)
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', (d,i) => colors[i]);
        

    
            }
        }
