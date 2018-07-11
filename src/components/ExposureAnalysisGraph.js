import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand, tickFormat } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { format } from 'd3-format';
import valueDisplayFormatter from '../components/ExposureAnalysisGraphMethods/valueDisplayFormatter';
import calculateMax from '../components/ExposureAnalysisGraphMethods/calculateMax';
import moment from 'moment';
import windowSize from 'react-window-size';

let node;

class ExposureAnalysisGraph extends Component {
    
    constructor(props)
    {
        super(props)
        this.createGraph = this.createGraph.bind(this)
        this.state = {
            screenWidth: 800, 
            screenHeight: 450,
            svgWidth: 920,
            svgHeight: 570
        }
    }


componentDidUpdate() {
    select(node)
        .selectAll("#updateSize").remove()
    this.createGraph();
}


componentDidMount()
{
    this.updateWidth();
    this.updateHeight();
    window.addEventListener("resize", this.updateWidth);
    window.addEventListener("resize", this.updateHeight);
}

componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
    window.removeEventListener("resize", this.updateHeight);
}


updateWidth = () => {
   
    const width = document.getElementById('App').clientWidth;
    if(width <= 620)
    {
        this.setState({svgWidth: 750})
    }
    else{
        this.setState({svgWidth: width})
    }
    if(width <= 705)
    {
        this.setState({screenWidth: 705-200});
    }
    else{
        this.setState({screenWidth: width - 200})
    }

}
updateHeight = () => {
    const height = document.getElementById('App').clientHeight;
    if(height <= 350)
    {
        this.setState({svgHeight: 350})
    }
    else{
        this.setState({svgHeight: height})
    }
    console.log(height)
    if(height <= 430)
    {
        this.setState({screenHeight: 430 - 200})
    }
    else{
        this.setState({screenHeight: height - 200})
    }
}

createGraph() {
    node = this.node;
        //WIDTH AND HEIGHT OF THE GRAPH:
        var width = this.state.screenWidth
        var height = this.state.screenHeight 
        //WIDTH AND HEIGHT OF THE GRAPH.

        //MARGIN VARIABLES FOR FORMATTING:
        var margin = {left: 100, right: 50, top: 15, bottom: 0};
        //MARGIN VARIABLES FOR FORMATTING.

        //VARIABLE USED FOR THE RADIUS OF THE CIRCLES:
        var circleMainRadius = this.props.circleRadius;
        //VARIABLE USED FOR THE RADIUS OF THE CIRCLES.

        //CREATION OF MANY ARRAYS FOR THE X AXIS, CIRCLE VALUES, DATE, AND COLORS USED:
        let xAxisTextArray1 = [];
        let xAxisTextArray2 = [];
        let circleValues = [];
        var colorArray = [];
        let dateArray = [];
        if(this.props.values)
        {
   
            for(let i = 0; i < this.props.values.length; i++)
            {
                xAxisTextArray1.push(this.props.values[i].eventName);
                xAxisTextArray2.push(this.props.values[i].eventSubtitle);
                circleValues.push(this.props.values[i].costAmount);
                dateArray.push(moment(this.props.values[i].eventDate).format('L'));
                
                if(i+1 === this.props.values.length)
                {
                    colorArray.push(this.props.forecastedDotColor)
                }

                else{
                    colorArray.push(this.props.mainDotColor)
                }
                
            }
        }
        //CREATION OF MANY ARRAYS FOR THE X AXIS, CIRCLE VALUES, DATE, AND COLORS USED.
        
        //CREATES VARIABLE FOR THE HEIGHT OF THE CURRENT VALUE LINE:
        let currentLineValue = this.props.currentValue;
        //CREATES VARIABLE FOR THE HEIGHT OF THE CURRENT VALUE LINE.

        //VARIABLE USED FOR THE POSITIONING OF THE GRAY FORECAST RECTANGLE:
        let stringFinder = this.props.textThatTheGrayRectangleIsInbetween[0];
        //VARIABLE USED FOR THE POSITIONING OF THE GRAY FORECAST RECTANGLE.

        //TEXT USED FOR THE TINY BOX IN THE LOWER RIGHT CORNER OF THE VISUAL:
        let evaluationBoxText = this.props.evaluationBox.toUpperCase();
        //TEXT USED FOR THE TINY BOX IN THE LOWER RIGHT CORNER OF THE VISUAL.

        //INITIALIZING THE TEXT THAT THE GRAY RECTANGLE WILL BE IN BETWEEN:
        let grayBoxText1 = this.props.textThatTheGrayRectangleIsInbetween[0];
        let grayBoxText2 = this.props.textThatTheGrayRectangleIsInbetween[1];
        //INITIALIZING THE TEXT THAT THE GRAY RECTANGLE WILL BE IN BETWEEN.

        //DECLARES AND INITIALIZES THE VARIABLE THAT WILL BE THE COLOR OF THE SMALL BOX IN THE LOWER LEFT CORNER BASESD OFF THE TEXT:
        let smallBoxColor = "";
        if(evaluationBoxText === "LOW")
        {
            smallBoxColor = "#FFD700";
        }
        else if(evaluationBoxText === "HIGH")
        {
            smallBoxColor = "#B20000";
        }
        //DECLARES AND INITIALIZES THE VARIABLE THAT WILL BE THE COLOR OF THE SMALL BOX IN THE LOWER LEFT CORNER BASESD OFF THE TEXT.

        //TEXT USED FOR ABOVE THE GRAYED OUT BOX:
        let grayedOutText = this.props.grayedOutText;
        //TEXT USED FOR ABOVE THE GRAYED OUT BOX.

        //DECLARING, BUT NOT INITIALIZING ARRAY THAT WILL HOLD THE VALUES SHOWING FOR EACH DOT:
        let circleDisplayValues = [];
        //DECLARING, BUT NOT INITIALIZING ARRAY THAT WILL HOLD THE VALUES SHOWING FOR EACH DOT.

        //HEIGHT OF THE Y AXIS IN PIXELS:
        let rangeValue = 307.35;
        //HEIGHT OF THE Y AXIS IN PIXELS.
        
        //CALLS CUSTOM METHOD TO GET THE LARGEST VALUE AMONG THE DOT VALUES:
        let max = calculateMax(circleValues);
        //CALLS CUSTOM METHOD TO GET THE LARGEST VALEU AMONG THE DOT VALUES.

        //MULTIPLIER IS USED FOR SCALING PURPOSES, SO THE POSITION OF THE DOTS IS ACCURATE:
        let multiplier = height/max;
        //MULITPLIER IS USED FOR SCALING PURPOSES, SO THE POSITION OF THE DOTS IS ACCURATE.

        //SIMPLE ARRAY USED FOR THE DOMAIN OF THE Y AXIS:
        var yAxisArray = [0, max];
        //SIMPLE ARRAY USED FOR THE DOMAIN OF THE Y AXIS.

        // //ARRAY TO HOLD THE CATEGORIES FOR THE STATS IN THE STAT BOX:
        // var tempStatBoxArray = [];
        // var tempStatCashArray = [];
        // let statBoxArray = [];
        // let statCashArray = [];
        // if(this.props.values[0].stats)
        // {
        //     for(let i = 0; i < this.props.values.length; i++)
        //     {
        //         for(let j = 0; j < this.props.values[i].stats.length; j++)
        //         {
        //             tempStatBoxArray.push(this.props.values[i].stats[j].accountName);
        //         }
                
        //     }
        //     for(let i = 0; i < this.props.values.length; i++)
        //     {
        //         for(let j = 0; j < this.props.values[i].stats.length; j++)
        //         {
        //             tempStatCashArray.push("$" + this.props.values[i].stats[j].amount.toLocaleString());
        //         }
               
        //     }
        
        // for(let i = 0; i < this.props.values.length; i++)
        // {
        //     let tempArray = tempStatBoxArray.splice(0, this.props.values[i].stats.length)
        //     statBoxArray.push(tempArray);
        //     tempArray = tempStatCashArray.splice(0, this.props.values[i].stats.length)
        //     statCashArray.push(tempArray);
        // }

        // }

        // //ARRAY TO HOLD THE CATEGORIES FOR THE STATS IN THE STAT BOX.

        //ARRAY USED FOR THE HORIZONTAL POSITIONING OF ELEMENTS IN THE GRAPH:
        var circleXPositionArray = []
        for(let i = 0; i < circleValues.length; i++)
        {
            if(i === 0)
            {
                circleXPositionArray.push(((width/circleValues.length)/2)+margin.left)
            }
            else{
                circleXPositionArray.push((((width/circleValues.length)*i) + ((width/circleValues.length)/2) ) + margin.left)
            }
        }
        //ARRAY USED FOR THE HORIZONTAL POSITIONING OF ELEMENTS IN THE GRAPH.

        //ARRAY USED FOR THE VERTICAL POSITIONING OF ELEMENTS IN THE GRAPH:
        var circleYPositionArray = []
            for(let i = 0; i < circleValues.length; i++)
            {
                circleYPositionArray.push((height + margin.top)-(circleValues[i] * multiplier));
            }
        //ARRAY USED FOR THE VERTICAL POSITIONING OF ELEMENTS IN THE GRAPH.
        
        //FOR LOOP CALLING CUSTOM FUNCTIONS IN ORDER TO FORMAT THE TEXT NEAR EACH OF THE CIRCLES:
        for(let i = 0; i < circleValues.length; i++)
        {
            circleDisplayValues.push(valueDisplayFormatter(circleValues[i]));
        }
        //FOR LOOP CALLING CUSTOM FUNCTIONS IN ORDER TO FORMAT THE TEXT NEAR EACH OF THE CIRCLES.

        //ARRAY USED FOR THE CREATION OF THE MAIN LINE OF THE GRAPH:
        let pathDataArray = [{'x':margin.left, 'y':height + margin.top}]
            for(let i = 0; i < circleValues.length; i++)
            {
                pathDataArray.push({'x':circleXPositionArray[i], 'y':circleYPositionArray[i]});
            }
        //ARRAY USED FOR THE CREATION OF THE MAIN LINE OF THE GRAPH.
        
        //CREATION OF ARRAYS USED FOR THE POSITIONING OF THE TEXT NEAR THE CIRCLES:
        
        var circleLabelYArray = []
            for(let i = 0; i < circleValues.length; i++)
            {
                if(circleYPositionArray[i] <= rangeValue/2)
                {
                    circleLabelYArray.push(circleYPositionArray[i] + 20)
                }
                else{
                    circleLabelYArray.push(circleYPositionArray[i] - 10)
                }
                
            }
        //CREATION OF ARRAYS USED FOR THE POSITIONING OF THE TEXT NEAR THE CIRCLES.

        //CREATION OF ARRAY USED FOR THE POSITIONING OF THE SECOND ROW OF TEXT BELOW THE X AXIS:
        var axisLabelPositionArray = []
        for(let i = 0; i < xAxisTextArray1.length; i++)
        {
            axisLabelPositionArray.push(((margin.left + 10)+ width/xAxisTextArray1.length)*(i+1));
        }
        //CREATION OF ARRAY USED FOR THE POSITIONING OF THE SECOND ROW OF TEXT BELOW THE X AXIS.

        //ARRAY USED FOR THE POSITIONING OF THE STATS IN THE STAT BOX:
        var textHeightArray = [];
        if(this.props.values[0].stats)
        {
        for(let i = 0; i < this.props.values.length; i++)
        {
            for(let j = 0; j < this.props.values[i].stats.length; j++)
            {
                textHeightArray.push(margin.top*2 + 20 + j*20)
            }
        }
        }
        //ARRAY USED FOR THE POSITIONING OF THE STATS IN THE STAT BOX.

        //CREATION BOTH X AND Y AXIS:
        var x = scaleBand()
                .domain(xAxisTextArray1)
                .range([0, width])
                
                

        var y = scaleLinear()
                .domain(yAxisArray)
                .range([height, 0])

        select(node)
            .append('g')
            .attr("transform","translate("+margin.left+","+(height + 15)+")")
            .style("font",".8em sans-serif")
            .call(axisBottom(x))
            .attr("id", "updateSize")
            .attr("class", 'xAxis');


        select(node)
            .append('g')
            .attr("transform","translate("+margin.left+","+(margin.top)+")")
            .style("font",".8em sans-serif")
            .call(axisLeft(y))
            .attr("id", "updateSize")
            .attr('class', "yAxis");
        //CREATION OF BOTH X AND Y AXIS.

        //CREATION OF THE MAIN LINE:
        for(let i = 0; i < circleValues.length; i++)
        {
            select(node)
                .append("line")
                .attr("stroke", "black")
                .attr("x1", pathDataArray[i].x)
                .attr("y1", pathDataArray[i].y)
                .attr("x2", pathDataArray[i+1].x)
                .attr("y2", pathDataArray[i+1].y)
                .attr('stroke-width', '0.75px')
                .attr("id", "updateSize")
                .attr('class', 'mainLine');
        }
        //CREATION OF THE MAIN LINE.

        //CURRENT VALUE LINE:
        select(node)
            .append("line")
            .attr("x1", margin.left)
            .attr("y1", (height + margin.top) - currentLineValue * multiplier)
            .attr("x2", margin.left + width)
            .attr("y2", (height + margin.top) - currentLineValue * multiplier)
            .attr("stroke", "red")
            .attr("stroke-width" , "1")
            .attr("stroke-dasharray", "9,9")
            .attr("id", "updateSize")
            .attr('class', 'currentValueLine');
        //CURRENT VALUE LINE.

        //CREATION OF THE GRAY RECTANGLE:
        let tempIndex = 0;
        let rectWidth = (width/xAxisTextArray1.length);

        let rect = select(node)
                    .append("rect")
                    .attr("width", (width/xAxisTextArray1.length))
                    .attr("height", height)
                    .attr("y", margin.top)
                    .attr("x", function(d){
                        for(let i = 0; i < xAxisTextArray1.length; i++)
                        {
                            if(stringFinder === xAxisTextArray1[i])
                            {
                                tempIndex = i;
                            }
                        }
                        return circleXPositionArray[tempIndex]
                    })
                    .attr("fill", "#d3d3d3")
                    .attr("opacity", "0.2")
                    .attr("id", "updateSize")
                    .attr('class', 'forecastedSpendRectangle')
        //CREATION OF THE GRAY RECTANGLE.


        //CREATION OF THE TEXT ABOVE THE GRAY RECTANGLE:
        select(node)
            .append("text")
            .attr("x", (circleXPositionArray[tempIndex]) + (rectWidth/4))
            .attr("y", (margin.top - 5))
            .attr("fill", "black")
            .text("Forecasted Spend")
            .style("font",".8em sans-serif")
            .attr("id", "updateSize")
            .attr('class', 'forecastedSpendText')
        //CREATION OF THE TEXT ABOVE THE GRAY RECTANGLE.

        //CREATION OF THE CIRCLES:
        if(this.props.values[0].stats){
            
        for(let i = 0; i < circleValues.length; i++)
        {
            const tempArray = this.props.values[i].stats;
            select(node)
                .append("circle")
                .attr("cx", circleXPositionArray[i])
                .attr("cy", circleYPositionArray[i])
                .attr("r", circleMainRadius)
                .attr("fill", colorArray[i])
                .attr('id', "updateSize")
                .attr('class', 'dots')
                .on('mouseover', function(d) {
                        select(this)
                        .attr("r", circleMainRadius * 1.2)})
                .on('mouseout', function(d) {
                        select(this)
                        .attr("r", circleMainRadius)})
                .on('click', function(d){
                        select(node)
                        .selectAll("#graphText").remove();
                //     for(var j=0; j<tempArray.length; j++)
                // {
                //             select(node)
                //                 .append("text")
                //                 .attr("id", "graphText")
                //                 .attr("x", width + 160)
                //                 .attr("y", textHeightArray[j])
                //                 .style("font", ".8em sans-serif")
                //                 .text(statBoxArray[i][j])
                //                 .attr("fill", "black");
                // }
                //     for(var k=0; k<tempArray.length; k++)
                // {
                //                 select(node)
                //                 .append("text")
                //                 .attr("id", "graphText")
                //                 .attr("x", width + 375)
                //                 .attr("y", textHeightArray[k])
                //                 .style("font", ".8em sans-serif")
                //                 .text(statCashArray[i][k])
                //                 .attr("fill", "black");
                // }
                
                
                });
        }
    }
                    
        //CREATION OF THE CRICLES.
           
        //CREATION OF THE LABLES FOR THE CIRCLES:
        for(let i = 0; i < circleValues.length; i++)
        {
            select(node)
                .append("text")
                .attr("x", circleXPositionArray[i])
                .attr("y", circleLabelYArray[i])
                .attr("fill", colorArray[i])
                .text(circleDisplayValues[i])
                .style("font",".8em sans-serif")
                .attr("id", "updateSize")
                .attr('class', 'dotLabels');
        }
        //CREATION OF THE LABELS FOR THE CIRCLES.
        
        //CREATION OF THE SECOND ROW OF TEXT BENEATH THE X AXIS:
        for(let i = 0; i < xAxisTextArray2.length; i++)
        {
            select(node)
                .append("text")
                .attr("x", circleXPositionArray[i] - (xAxisTextArray2[i].length/2)*5.5)
                .attr("y", (height + 55))
                .attr("fill", "black")
                .style("font",".7em sans-serif")
                .text(xAxisTextArray2[i])
                .attr("id", "updateSize")
                .attr('class', 'xAxisSubtitleRowText');
        }
        //CREATION OF THE SECOND ROW OF TEXT BENEATH THE X AXIS.

        //PUTS THE DATE IN AS THE THIRD ROW OF TEXT BENEATH THE X AXIS:
        for(var i = 0; i < circleValues.length; i++)
        {
        select(node)
            .append("text")
            .attr("x", circleXPositionArray[i] - 32)
            .attr("y", (height + 80))
            .style("font", ".8em sans-serif")
            .attr("fill", "black")
            .text(dateArray[i])
            .attr("id", "updateSize")
            .attr('class', 'xAxisDateText');
        }
        //PUTS THE DATE IN AS THE THIRD ROW OF TEXT BENEATH THE X AXIS.
        
        //CODE FOR THE SMALL RECTANGLE IN THE LOWER RIGHT CORNER OF THE VISUAL:
        select(node)
            .append("rect")
            .attr("x", circleXPositionArray[circleXPositionArray.length - 1] - 15)
            .attr("y", (height + 90))
            .attr("width", "35")
            .attr("height", "15")
            .attr("id", "")
            .attr("fill", smallBoxColor)
            .attr('id', "updateSize")
            .attr('class', 'entitlementRiskBox');
        //CODE FOR THE SMALL RECTANGLE IN THE LOWER RIGHT CORNER OF THE VISUAL.

        //CODE FOR THE TEXT IN THE SMALL RECTANGLE IN THE LOWER RIGHT CORNER OF THE VISUAL:
        select(node)            
            .append("text")
            .attr("x", circleXPositionArray[circleXPositionArray.length - 1] - 8)
            .attr("y", (height + 100))
            .style("font", ".55em sans-serif")
            .text(evaluationBoxText)
            .attr("fill", "white")
            .attr("id", "updateSize")
            .attr('class', "entitlementRiskText");
        //CODE FOR THE TEXT IN THE SMALL RECTANGLE IN THE LOWER RIGHT CORNER OF THE VISUAL.
        
        //MAKES TEXT FOR THE MAIN HEADER OF THE STAT BOX, AND THE LINE RIGHT UNDER IT:
        // select(node)
        //     .append("text")
        //     .attr("x", width + 160)
        //     .attr("y", margin.top*2 - 15)
        //     .style("font", ".8em sans-serif")
        //     .text("Cost Summary: Pending IC")
        //     .attr("fill", "black");
        // select(node)
        //     .append("line")
        //     .attr("x1", width + 160)
        //     .attr("y1", margin.top*2)
        //     .attr("x2", width + 420)
        //     .attr("y2", margin.top*2)
        //     .attr("stroke", "black")
        //     .attr("stroke-width", "0.5");
        //MAKES TEXT FOR THE MAIN HEADER OF THE STAT BOX, AND THE LINE RIGHT UNDER IT.

    }

    render()
    {
        return(
            
            <svg ref={node => this.node = node}
            width={this.state.svgWidth} height={this.state.svgHeight}>
            </svg>
            
        )
    }
}

export default ExposureAnalysisGraph