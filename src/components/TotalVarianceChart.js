import React, { Component } from 'react';
import { select } from 'd3-selection';
import createDisplayArray from '../components/TotalVarianceMethods/createDisplayArray';
import * as d3Axis from 'd3-axis';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';

let node;

class TotalVarianceChart extends Component {

    constructor(props)
    {
        super(props)
        this.createChart = this.createChart.bind(this)
    }

    componentDidMount()
    {
        this.createChart()
    }

    createChart() {
        node = this.node;

        var width = 446;
        var height = 239;

        var margin = {left: 100, right: 50, top: 15, bottom: 0};

        var wolffTeal = "#006679";
        var wolffNavy = "#002A42";

        var xAxisArray = ["Minuend", "Subtractend", "Difference"];

        var barLabelArray = [];
            barLabelArray.push(this.props.minuendName);
            barLabelArray.push(this.props.subtractendName);
            barLabelArray.push(this.props.differenceName);

        var yAxisArray = ["(-)", "(+)"];

        var TotalICApprovedProjectCosts = this.props.totalICApprovedProjectCosts;

        var TotalForecastedProjectCosts = this.props.totalForecastedProjectCosts;

        var TotalVariance = TotalICApprovedProjectCosts - TotalForecastedProjectCosts;

        var mathTotalVariance = Math.abs(TotalICApprovedProjectCosts - TotalForecastedProjectCosts);



        var boxValueArray = [];

        createDisplayArray(boxValueArray, TotalICApprovedProjectCosts, TotalForecastedProjectCosts, TotalVariance);


        var textColorArray = ["black", "black"];
        if(TotalVariance < 0)
        {
            textColorArray.push("red");
        }
        else{
            textColorArray.push("black")
        }

        var rectHeightArray = [Math.log(TotalICApprovedProjectCosts) * 5, Math.log(TotalForecastedProjectCosts) * 5, Math.log(mathTotalVariance) * 5];

        if(TotalVariance < 0)
        {
            var rectYPositionArray = [height/2 - rectHeightArray[0], height/2 - rectHeightArray[1], height/2 + rectHeightArray[2]/75];
        }
        else {
            var rectYPositionArray = [height/2 - rectHeightArray[0], height/2 - rectHeightArray[1], height/2 - rectHeightArray[2]];
        }

        var boxValueColorArray = [wolffNavy, wolffNavy, wolffTeal];

        var extraMargin = height + margin.top;
            var extraMargin2 = margin.left + 10;
            var extraMargin3 = margin.left + 5;
            var extraMargin4 = height + margin.top + 40;

        var rectXPositionArray = [];
        for(let i = 0; i < 3; i++)
        {
            if(i === 0)
            {
                rectXPositionArray.push((((width/3)/2)+extraMargin2) - (width/5)/2)
            }
            else{
                rectXPositionArray.push((((width/3)*i) + ((width/3)/2) ) + extraMargin2 - (width/5)/2)
            }
        }
    
        var textXPositionArray = [rectXPositionArray[0] - 25, rectXPositionArray[1] - 25, rectXPositionArray[2] + 15];

        var X = scaleBand()
                    .domain(xAxisArray)
                    .range([0, width])
                   

        var Y = scaleBand()
                    .domain(yAxisArray)
                    .range([height, 0])
                 
        select(node)
        .append("g")
        .attr("transform","translate("+margin.left+","+extraMargin+")")
        .style("font",".8em sans-serif")
        .call(axisBottom(X));

        select(node)
        .append("g")
        .attr("transform","translate("+margin.left+","+margin.top+")")
        .style("font","1.5em sans-serif")
        .call(axisLeft(Y));


        for(let i = 0; i < 3; i++)
        {
            select(node)
            .append("rect")
            .attr("width", (width/5))
            .attr("height", function(d){
                if(Math.abs(rectHeightArray[i])===0)
                {
                    return 1;
                }
                else{
                    return rectHeightArray[i];
                }
            })
            .attr("y", rectYPositionArray[i])
            .attr("x", rectXPositionArray[i])
            .attr("fill", boxValueColorArray[i])
            .on('mouseover', function(d){
                select(this)  
                    .attr('opacity', '0.85');
                //creates the tooltip gray rectangle
                select(node)
                    .append('rect')
                    .attr('x', rectXPositionArray[i] + (width/5))
                    .attr('y', rectYPositionArray[i] + rectHeightArray[i])
                    .attr('class', 'tooltip')
                    .attr('width', boxValueArray[i].length * 10)
                    .attr('height', '25px')
                    .attr('fill', 'lightsteelblue')
                    .attr('opacity', '0.95')
                    //creates the tooltips text
                    select(node)
                        .append('text')
                        .attr('x', rectXPositionArray[i] + (width/5) + 5)
                        .attr('y', 18 + rectYPositionArray[i] + rectHeightArray[i])
                        .text(boxValueArray[i])
                        .attr('class', 'tooltip')
                        .attr('fill', textColorArray[i])
                        .style("font","18px sans-serif")
                    select(node)
                    .append("text")
                    .attr("x", rectXPositionArray[i] - (barLabelArray[i].length/2))
                    .attr("y", rectYPositionArray[i] -12)
                    .attr("fill", "black")
                    .attr('class', 'tooltip')
                    .style("font",".8em sans-serif")
                    .text(barLabelArray[i]);
            })
            //end on hover event
            .on('mouseout', function(d,i){
                select(this)
                .attr('opacity', '1')
                select(node)
                .selectAll('.tooltip').remove()
            })
          
          
        }

        select(node)
            .append("line")
            .attr("x1", margin.left)
            .attr("y1", height/2)
            .attr("x2", width + margin.left)
            .attr("y2", height/2)
            .attr("stroke", "gray")
            .attr("stroke-width", "1")
            .attr("stroke-dasharray", "9,9");
        
    }

    render()
    {
        return(
            <svg ref={node => this.node = node}
            width={1400} height={500}>
            </svg>
        )
    }

}



export default TotalVarianceChart;

