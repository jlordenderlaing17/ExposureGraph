export const calculateMax = (valueArray) => {
    let max = valueArray[0];
    for(let i = 1; i < valueArray.length; i++){
        if(valueArray[i] > max)
        {
            max = valueArray[i]
        }
    }
    return max;
}

export default calculateMax;