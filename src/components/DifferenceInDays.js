import React, { Component } from 'react';
import { select } from 'd3-selection';
//import moment from 'moment';
import differenceBetweenTwoDatesInDays from '../components/DifferenceInDaysMethods/differenceBetweenTwoDatesInDays';
import middleCircleSizeCalculator from '../components/DifferenceInDaysMethods/middleCircleSizeCalculator'
import { middleTextPositionCalculator, lastTextPositionCalculator } from '../components/DifferenceInDaysMethods/textPositionCalculators';
import textSizeCalculator from '../components/DifferenceInDaysMethods/textSizeCalculator';

let node;

let normalYearMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let leapYearMonthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let normalYearDays = 365;
let leapYearDays = 366;

var wolffTeal = "#006679";
var wolffNavy = "#002A42";

var margin = {left: 100, right: 50, top: 15, bottom: 0};

var grah1ColorArray = [wolffTeal, wolffNavy, wolffTeal];

var stringNumberOfDays = "";

var dateRadii = 50;



class DifferenceInDays extends Component {

    constructor(props)
    {
        super(props)
        this.createVisual = this.createVisual.bind(this)
    }

    componentDidMount(){
        this.createVisual()
    }

    createVisual() {
        node = this.node;
        
        var numberOfDays = differenceBetweenTwoDatesInDays(this.props.startDate, this.props.endDate, leapYearDays, normalYearDays, leapYearMonthDays, normalYearMonthDays);
        var mainRadius = middleCircleSizeCalculator(numberOfDays, dateRadii);

        if(numberOfDays!==1){
            stringNumberOfDays = numberOfDays.toLocaleString() + " days";
        }
        else {
            stringNumberOfDays = numberOfDays.toLocaleString() + " day";
        }

        var radiiArray = [dateRadii, mainRadius, dateRadii];


        var graph1TextArray = [this.props.startDate,"",this.props.endDate];
        //this.props.startDate
        //this.props.endDate

        var graph1XPositionArray = [margin.left * 1.5, margin.left * 1.5 + dateRadii + mainRadius, margin.left * 1.5 + (dateRadii*2) + (mainRadius*2)]

        var graph1TextPositionArray = [graph1XPositionArray[0] * 0.75, middleTextPositionCalculator(stringNumberOfDays, graph1XPositionArray), lastTextPositionCalculator(numberOfDays, graph1XPositionArray)];

        var graph1YPosition = mainRadius + margin.top * 2;


        for(var i = 0; i < 3; i++){
        select(node)
        .append("circle")
        .attr("cx", graph1XPositionArray[i])
        .attr("cy", graph1YPosition)
        .attr("r", radiiArray[i])
        .attr("fill", grah1ColorArray[i]);

        select(node)
        .append("text")
        .attr("x", graph1TextPositionArray[i])
        .attr("y", graph1YPosition)
        .attr("fill", "white")
        .style("font", ".95em sans-serif")
        .text(graph1TextArray[i]);
        }
        
        
        select(node)
        .append("text")
        .attr("x", graph1TextPositionArray[1])
        .attr("y", graph1YPosition)
        .attr("fill", "white")
        .style("font", textSizeCalculator(stringNumberOfDays))
        .text(stringNumberOfDays);


        select(node)
        .append("text")
        .attr("x", graph1TextPositionArray[1])
        .attr("y", graph1YPosition + (mainRadius * 2 * 0.15))
        .attr("fill", "white")
        .style("font", textSizeCalculator(stringNumberOfDays))
        .text("delayed")
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

export default DifferenceInDays;



