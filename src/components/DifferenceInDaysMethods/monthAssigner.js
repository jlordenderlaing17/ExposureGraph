export const monthAssigner = (month, year, leapYearMonthDays, normalYearMonthDays) => {
  var returnNumber = 0;

  if(year % 4 === 0)
  {
    for(var i = 0; i < 12; i++)
    {
      if((month - 1) === i)
      {
        returnNumber = leapYearMonthDays[i];
      }
    }
  }

  else if(year % 4 !== 0)
  {
    for(var j = 0; j < 12; j++)
    {
      if((month - 1) === j)
      {
        returnNumber = normalYearMonthDays[j];
      }
    }
  }

  return returnNumber;

}

export default monthAssigner