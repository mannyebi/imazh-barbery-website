from django import template



register = template.Library()


def multiply(a, b):
    return a*b





def hour_minutes(seconds):
    hours = int(seconds / 60)
    minutes = int(seconds % 60)

    if hours > 0 and hours < 24 and minutes > 0:
        return f"{hours} ساعت و {minutes} دقیقه"
    elif hours <= 0 and minutes >= 0:
        return f"{minutes} دقیقه"
    elif hours >= 24:
        return f"{hours//24} روز"




register.filter('multiply', multiply)
register.filter('hour_minutes', hour_minutes)
