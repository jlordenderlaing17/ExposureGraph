import monthAssigner from '../DifferenceInDaysMethods/monthAssigner';


export const differenceBetweenTwoDatesInDays = (date1, date2, leapYearDays, normalYearDays, leapYearMonthDays, normalYearMonthDays) => {
        
        var month1 = parseInt(date1.substring(0, 2));
        var month2 = parseInt(date2.substring(0, 2));


        var day1 = parseInt(date1.substring(3, 5));
        var day2 = parseInt(date2.substring(3, 5));

        var year1 = parseInt(date1.substring(6, 10));
        var year2 = parseInt(date2.substring(6, 10));

        var numberOfDays = 0;

        if(month1 !== month2)
        {
            while(true)
            {
            if(year2 > (year1 + 1) && (year2 - 1) % 4 === 0)
            {
                numberOfDays += leapYearDays;
                year2--;
            }
            else if(year2 > (year1 + 1) && (year2 - 1) % 4 !== 0)
            {
                numberOfDays += normalYearDays;
                year2--;
            }
            else if(year2-1 === year1 && month2 >= month1 && day2 >= day1 && (year2-1) % 4 === 0)
            {
                numberOfDays += leapYearDays;
                year2--;
            }
            else if(year2-1 === year1 && month2 >= month1 && day2 >= day1 && (year2-1) % 4 !== 0)
            {
                numberOfDays += normalYearDays;
                year2--;
            }
            else{
                break;
            }

            }

            numberOfDays += day2;

            month2--;

            while(year2 > year1)
            {

            numberOfDays += monthAssigner(month2, year2, leapYearMonthDays, normalYearMonthDays);
            month2--;
            if(month2 === 0)
            {
                month2 = 12;
                year2--;
            }
            }

            while(month2 > month1)
            {
            numberOfDays += monthAssigner(month2, year2, leapYearMonthDays, normalYearMonthDays);
            month2--;
            }

            numberOfDays += (monthAssigner(month2, year2, leapYearMonthDays, normalYearMonthDays)) - day1;
        }

        else if(month1 === month2)
        {
            while(true)
            {
            if(year2 > (year1 + 1) && (year2 - 1) % 4 === 0)
            {
                numberOfDays += leapYearDays;
                year2--;
            }
            else if(year2 > (year1 + 1) && (year2 - 1) % 4 !== 0)
            {
                numberOfDays += normalYearDays;
                year2--;
            }
            else if(year2-1 === year1 && month2 >= month1 && day2 >= day1 && (year2-1) % 4 === 0)
            {
                numberOfDays += leapYearDays;
                year2--;
            }
            else if(year2-1 === year1 && month2 >= month1 && day2 >= day1 && (year2-1) % 4 !== 0)
            {
                numberOfDays += normalYearDays;
                year2--;
            }
            else{
                break;
            }

            }

            numberOfDays += day2-day1;
        }

        return numberOfDays;
}

export default differenceBetweenTwoDatesInDays