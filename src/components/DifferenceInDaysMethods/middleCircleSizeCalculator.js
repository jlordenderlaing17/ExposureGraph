export const middleCircleSizeCalculator = (numberOfDays, baseRadius) => {
 
  if(numberOfDays === 0)
  {
    return baseRadius;
  }
  else {
    return baseRadius + Math.log(numberOfDays)*15;
  }

}

export default middleCircleSizeCalculator