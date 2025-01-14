from django import template
from datetime import date, datetime, timezone



register = template.Library()

def PersianTimesince(value):
    CurrentDate = datetime.now()
    GivenDate = value
    ResultHours = (CurrentDate - GivenDate).total_seconds()/3600

    if ResultHours > 24 : 
        reuslt = str(int(ResultHours/12)) + "روز قبل"
        return (reuslt) 
    elif ResultHours < 1:
        return ("به تازگی")
    else : 
        result = str(int(ResultHours)) + "ساعت قبل"
        return (result)
    


def import12to24(value):
    givenDate = value
    output = givenDate.split(" ")
    if output[1] == "PM":
        Time = output[0].split(":")
        hour = int(Time[0])+12 if int(Time[0])+12<24 else 12
        result = datetime(2023, 1, 1, int(hour), int(Time[1]))
        return datetime.strftime(result, "%H:%M")
    else:
        Time = output[0].split(":")
        if int(Time[0]) == int(12):
            result = datetime(2023, 1, 1, 0, int(Time[1]))
            return datetime.strftime(result, '%H:%M')
        else:
            result = datetime(2023, 1, 1, int(Time[0]), int(Time[1]))
            return datetime.strftime(result, '%H:%M')



register.filter('PersianTimesince', PersianTimesince)
register.filter('import12to24', import12to24)