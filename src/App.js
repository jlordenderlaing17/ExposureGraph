import React, { Component } from 'react';
import './App.css';
import DifferenceInDays from './components/DifferenceInDays';
import TotalVarianceChart from './components/TotalVarianceChart';
import ExposureAnalysisGraph from './components/ExposureAnalysisGraph';


class App extends Component {
  // style={{ height: "10%"}}>
  render() {
    return (
      <div className="App" id="App" style={{ width: "70%", height: "80vh", overflowY: "auto", overflowX: "auto"}}>
        {/* <DifferenceInDays
          startDate={"07/05/2018"}
          endDate={"08/12/2018"}
        <TotalVarianceChart
          totalICApprovedProjectCosts={52148939}
          totalForecastedProjectCosts={56148938}
          minuendName = {"Total IC Approved Project Costs"}
          subtractendName = {"Total Forecasted Project Costs"}
          differenceName = {"Total Variance"}
          /> */}
        <ExposureAnalysisGraph
          values = {[
            {fkEvent: "mvewjnvndsnm", eventName: "LOI Deal Brief", eventSubtitle: "Earnest Money Deposit", eventDate: "2018-06-18 10:28:41.810", costAmount: 100000, 
                  stats: [{account: "fhvnbd", accountName: "Architecture", amount: 18576}, 
                          {account: "bdfbnsjkbngjkv", accountName: "Legal", amount: 42021},
                          {account: "dnvfjkbknb", accountName: "Market Study", amount: 2002},
                          {account: "daruyde", accountName: "Overhead Reimbursement", amount: 9012},
                          {account: "nshjvdn", accountName: "Travel", amount: 12074}, 
                          {account: "cfdnjehnrjgfv", accountName: "Other DD", amount: 6674}, 
                          {account: "ndefhjnsjfdhjf", accountName: "Property Taxes", amount: 9001}]}, 
            {fkEvent: "DCDWHJCBXDBSJW", eventName: "Soft IC", eventSubtitle: "Concept Design", eventDate: "05/05/2018", costAmount: 200000, 
                  stats: [{account: "fhvnbd", accountName: "rchitecture", amount: 18076}, 
                          {account: "bdfbnsjkbngjkv", accountName: "Legal", amount: 42021},
                          {account: "dnvfjkbknb", accountName: "Market Study", amount: 2202},
                          {account: "daruyde", accountName: "Overhead Reimbursement", amount: 9212},
                          {account: "nshjvdn", accountName: "Travel", amount: 12074}, 
                          {account: "cfdnjehnrjgfv", accountName: "Other DD", amount: 6674}, 
                          {account: "ndefhjnsjfdhjf", accountName: "Property Taxes", amount: 9001}]}, 
            {fkEvent: "ndjkcnc dn cd ncnmdnc", eventName: "Initial IC", eventSubtitle: "100% SD/Firm Commitment", eventDate: "06/05/2018", costAmount: 2000000, 
                  stats: [{account: "fhvnbd", accountName: "brchitecture", amount: 18576}, 
                          {account: "bdfbnsjkbngjkv", accountName: "Legal", amount: 42021},
                          {account: "dnvfjkbknb", accountName: "Market Study", amount: 2002},
                          {account: "daruyde", accountName: "Overhead Reimbursement", amount: 9012},
                          {account: "nshjvdn", accountName: "Travel", amount: 12074}, 
                          {account: "cfdnjehnrjgfv", accountName: "Other DD", amount: 6674}, 
                          {account: "ndefhjnsjfdhjf", accountName: "Property Taxes", amount: 9001}]}, 
            {fkEvent: "bbbbbbbbbbbbbbb", eventName: "Land Closing", eventSubtitle: "Entitlement Risk", eventDate: "07/05/2018", costAmount: 1190000, 
                  stats: [{account: "fhvnbd", accountName: "Akchitecture", amount: 18576}, 
                          {account: "bdfbnsjkbngjkv", accountName: "Legal", amount: 42021},
                          {account: "dnvfjkbknb", accountName: "Market Study", amount: 2002},
                          {account: "daruyde", accountName: "Overhead Reimbursement", amount: 9012},
                          {account: "nshjvdn", accountName: "Travel", amount: 12074}, 
                          {account: "cfdnjehnrjgfv", accountName: "Other DD", amount: 6674}, 
                          {account: "ndefhjnsjfdhjf", accountName: "Property Taxes", amount: 9001}]}]}
          currentValue={500000000}
          evaluationBox={"low"}
          grayedOutText={"Forecasted Spend"}
          textThatTheGrayRectangleIsInbetween = {["Initial IC", "Land Closing"]}
          circleRadius = {5.5}
          mainDotColor = {'#000080'}
          forecastedDotColor = {"green"}
        />
      </div>
    );
  }
}
export default App;
