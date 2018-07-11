export const createDisplayArray = (boxValueArray, TotalICApprovedProjectCosts, TotalForecastedProjectCosts, TotalVariance) =>
{
  boxValueArray.push("$" + TotalICApprovedProjectCosts.toLocaleString());
  boxValueArray.push("$" + TotalForecastedProjectCosts.toLocaleString());
  TotalVariance = TotalICApprovedProjectCosts - TotalForecastedProjectCosts;
  var absTotalVariance = Math.abs(TotalVariance);

  if(TotalVariance > 0)
  {
    boxValueArray.push("$" + absTotalVariance.toLocaleString());
  }
  else if(TotalVariance < 0) {
    boxValueArray.push("($" + absTotalVariance.toLocaleString() + ")");
  }
  else {
    boxValueArray.push(0);
  }
}

export default createDisplayArray