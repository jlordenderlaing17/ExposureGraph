export const valueDisplayFormatter = (dollarAmmount) => {

    let testString = dollarAmmount.toString();
    let returnString = "";
    let realReturnString = "";
    for(let i = 0; i < testString.length; i++)
    {
        if(testString.charAt(i) !== ".")
        {
            returnString = returnString + testString.charAt(i);
        }
        else{
            break;
        }
    }
    if(returnString.length === 10)
    {
        realReturnString = "$" + returnString.charAt(0) + "." + returnString.charAt(1) + "B";
    }

    if(returnString.length === 9)
    {
        if(returnString.charAt(3) != 0)
        {
            if(returnString.charAt(4) != 0)
            {
                realReturnString = "$" + returnString.charAt(0) + returnString.charAt(1) + returnString.charAt(2) + "." + returnString.charAt(3) + returnString.charAt(4) + "MM";
            }
            else{
                realReturnString = "$" + returnString.charAt(0) + returnString.charAt(1) + returnString.charAt(2) + "." + returnString.charAt(3) + "MM";
            }
        }
        else{
            realReturnString = "$" + returnString.charAt(0) + returnString.charAt(1) + returnString.charAt(2) + "MM";
        }
    }
    
    if(returnString.length === 8)
    {
        if(returnString.charAt(3) != 0)
        {
            realReturnString = "$" + returnString.charAt(0) + returnString.charAt(1) + "." + returnString.charAt(2) + returnString.charAt(3) + "MM"
        }
        else if(returnString.charAt(2) != 0){
            realReturnString = "$" + returnString.charAt(0) + returnString.charAt(1) + "." + returnString.charAt(2) + "MM"
        }
        else
        {
            realReturnString = "$" + returnString.charAt(0) + returnString.charAt(1) + "MM";
        }
    }
    
    if(returnString.length === 7)
    {
        if(returnString.charAt(2) != 0)
        {
            realReturnString = "$" + returnString.charAt(0) + "." + returnString.charAt(1) + returnString.charAt(2) + "MM"
        }
        else if(returnString.charAt(1) != 0){
            realReturnString = "$" + returnString.charAt(0) + "." + returnString.charAt(1) + "MM" 
        }
        else{
            realReturnString = "$" + returnString.charAt(0) + "MM";
        }
        
    }

    if(returnString.length === 6)
    {
        realReturnString = "$" + returnString.charAt(0) + returnString.charAt(1) + returnString.charAt(2) + "k"
    }

    if(returnString.length === 5)
    {
        realReturnString = "$" + returnString.charAt(0) + returnString.charAt(1) + "k"
    }
        
    if(returnString.length === 4)
    {
        realReturnString = "$" + returnString.charAt(0) + "k"
    }

    if(returnString.length === 5)
    {
        realReturnString = "$" + returnString; 
    }
    return realReturnString; 
    }


export default valueDisplayFormatter;
