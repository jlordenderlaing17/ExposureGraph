import { differenceBetweenTwoDatesInDays } from "./differenceBetweenTwoDatesInDays";

export const textSizeCalculator = (dayString) => {

    var returnString = "";

    if(dayString.length === 5)
    {
        returnString = ".95em sans-serif"
    }

    else if(dayString.length === 6)
    {
        returnString = ".975em sans-serif"
    }

    else if(dayString.length === 7)
    {
        returnString = "1.1em sans-serif"
    }

    else if(dayString.length === 8)
    {
        returnString = "1.25em sans-serif"
    }

    else if(dayString.length === 10)
    {
        returnString = "1.35em sans-serif"
    }

    else if(dayString.length === 11)
    {
        returnString = "1.5em sans-serif"
    }
    return returnString;
}

export default textSizeCalculator