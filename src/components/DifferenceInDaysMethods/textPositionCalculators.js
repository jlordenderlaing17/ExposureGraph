export const middleTextPositionCalculator = (dayString, graph1XPositionArray) => {
    var returnNum = 0;

    if(dayString.length === 5)
    {
      returnNum = graph1XPositionArray[1] * 0.9;
    }
    else if(dayString.length === 6)
    {
      returnNum = graph1XPositionArray[1] * 0.9;
    }
    else if(dayString.length === 7)
    {
      returnNum = graph1XPositionArray[1] * 0.89;
    }
    else if(dayString.length === 8)
    {
      returnNum = graph1XPositionArray[1] * 0.866;
    }
    else if(dayString.length === 10)
    {
      returnNum = graph1XPositionArray[1] * 0.85;
    }
    else if(dayString.length === 11)
    {
      returnNum = graph1XPositionArray[1] * 0.845
    }

    return returnNum;
} 

export const lastTextPositionCalculator = (numberOfDays, graph1XPositionArray) => {
  var returnNum = 0;
  if(numberOfDays === 0)
  {
    returnNum = graph1XPositionArray[2] * 0.9;
  }
  else{
    returnNum = graph1XPositionArray[2] * 0.9 + Math.log(numberOfDays) * 3;
  }

  return returnNum;


}
