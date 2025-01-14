from urllib.parse import urlparse
from django.shortcuts import render, HttpResponse, redirect
from .models import Profile, Information, Weblog, Appointment, User, OTP, deactive_days
from datetime import datetime, timedelta, date
import time
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
import requests
from django.utils import timezone
import convert_numbers
from django.utils.crypto import get_random_string
import locale
from django.db.models import Q
from datetime import date
import jdatetime



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


def jformat(value):
    if value in (None, ""):
        return "empty"
    try:
        result = value.split("-")
        year = int(result[0])
        month = int(result[1])
        day = int(result[2])
        thdate = date(year, month, day)
        jdate = jdatetime.date.fromgregorian(date=thdate)
        return jdate.strftime("%B %d")
    except AttributeError:
        return ""


def BookingTimes():
    timeslist = ["9:00 AM", "10:00 AM",  "11:00 AM",  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"]
    return timeslist



def sendsms(user, text):
    #use celery for sending sms later. this is temporary :)
    print('sms sent')
    apikey = "263963-7695adf4833243238421d2ed766c21f5"
    response = requests.get(f"http://api.sms-webservice.com/api/V3/Send?ApiKey={apikey}&Text={text}&Sender=50004075008757&Recipients={user}")
    print(f'reminder sms response text :    {response.text}     | sms text : {text}')



def indexPage(request):
    users = Profile.objects.filter(Q(level="3") | Q(level="2"))
    information = Information.objects.first()
    blogs = Weblog.objects.all().order_by('-created')[:3]
    if request.user.is_authenticated:
        user_requested = Profile.objects.get(user=request.user)
    else:
        user_requested = None
    
    context = {'users':users, "information":information, "blogs":blogs, "user":user_requested}
    return render(request, 'base/index.html', context)


def send_otp_valid_users(user):
    generated_otp = get_random_string(length=6, allowed_chars="01234567")

    otp_instance = OTP.objects.create(user=user, otp=generated_otp)


    #send sms function :
    phoneNum = user.username
    text = f"ایماژ\n code:{generated_otp}"
    sendsms(phoneNum, text)
    #this print operation should be deleted later. my sms panel has been limited so I should see the otp in terminal.
    print(f'{generated_otp}---------------------------------')
    return generated_otp


def send_otp_new_users(request, phonenum):
    generated_otp = get_random_string(length=6, allowed_chars="01234567")

    #send sms function :
    request.session['otp'] = generated_otp
    phoneNum = phonenum
    text = f"ایماژ\n code:{generated_otp}"
    sendsms(phoneNum, text)

    print(f'{generated_otp}---------------------------------')
    return generated_otp


def Authcheck(request):
    #this function is just gonna get users number and send the user to the related page whether the login or the sign up page.
    if request.user.is_authenticated:
        # redirect the authenticated users to index page
        return redirect('indexPage')
    else:
        if request.method == 'POST':
            phoneNuminput = request.POST.get('phonenumber')
            phoneNum = convert_numbers.persian_to_english(phoneNuminput)
            if phoneNum:
                usercheck = User.objects.filter(username=phoneNum).exists()
                if usercheck:
                    #for users who signed up before. 
                    try:
                        send_otp_valid_users(User.objects.get(username=phoneNum))
                        request.session['phoneNum'] = phoneNum
                        return redirect('verifysuser')
                    except:
                        messages.error(request, "برای این شماره کد ارسال شده است. دو دقیقه صبر کنید و سپس درخواست خود را ارسال کنید")
                else:
                    send_otp_new_users(request, phoneNum)
                    request.session['phoneNum'] = phoneNum
                    return redirect('check_otp')
            else:
                messages.error(request, "شماره موبایل را وارد کنید")
        return render(request, 'base/auth.html')
    


def check_otp_new_user(request):
    if request.user.is_authenticated:
        return redirect('indexPage')
    
    generated_otp = request.session.get('otp')

    if request.method == "POST":
        user_otp = request.POST.get('otp')

        if user_otp != "":
            if generated_otp == user_otp:
                request.session['otp'] = None
                return redirect("createuser")
            else:
                messages.error(request, "کد وارد شده اشتباه است")
        else:
            messages.error(request, 'لطفا کد را وارد کنید')

    return render(request, 'base/otp_check.html')

    

def create_new_user(request):
    if request.user.is_authenticated:
        return redirect('indexPage')
    else:
        phoneNum = request.session.get('phoneNum')
        if request.method=="POST":
            if phoneNum is not None or phoneNum != "" :
                name = request.POST.get('name')
                lastname = request.POST.get('lastname')
                user = User.objects.create(name=name, last_name=lastname, username=phoneNum)
                user.save()
                request.session['phoneNum'] = None


                if name != "" and lastname != "":
                    login(request, user)
                    messages.success(request, f"{name} جان خوش آمدید")
                    request.session['phoneNum'] = None
                    return redirect('booking')
                else:
                    messages.error(request, "لطفا اطلاعات را درست وارد کنید.")
            else:
                messages.error(request, "شماره موبایل وارد نشده است")

        return render(request, 'base/createUser.html')
    

def verify_signedup_user(request):
    if request.user.is_authenticated:
        return redirect('indexPage')
    else:
        try:
            user = User.objects.get(username=request.session.get('phoneNum'))
            userProfile = Profile.objects.get(user=user)
            if request.method == "POST":
                generated_otp = OTP.objects.get(user=user)
                userotp = request.POST.get('otp')
                if not generated_otp.is_expired() and userotp == generated_otp.otp:
                    login(request, user)
                    messages.success(request, f"{user.name} خوش آمدید.")
                    request.session['phoneNum'] = None
                    if userProfile.level == "2" or userProfile.level == "3":
                        return redirect('adminDash')
                    elif userProfile.level == "1":
                        return redirect("booking")
                else:
                    messages.error(request, "کد وارد شده نادرست است")
        except:
            messages.error(request, "مشکلی پیش آمده")
        return render(request, 'base/signUp.html')



def blogs(request):
    if request.user.is_authenticated:
        user_requested = Profile.objects.get(user=request.user)
    else:
        user_requested = None
    blogs = Weblog.objects.all().order_by('-created')


    context = {"blogs":blogs, 'user':user_requested}
    return render(request, 'base/blogs.html', context)


def BlogPage(request, pk):
    if request.user.is_authenticated:
        user_requested = Profile.objects.get(user=request.user)
    else:
        user_requested = None

    blog = Weblog.objects.get(id = pk)

    context = {"blog":blog, "user":user_requested}
    return render(request, 'base/BlogPage.html', context)


def VirtualTour(request):
    if request.user.is_authenticated:
        user_requested = Profile.objects.get(user=request.user)
    else:
        user_requested = None


    #this is gonna be a 360 degree image of the salon but the js packages that gives us the embed code for this are all filterd therefore the users just can see the virtualtour with VPN which is not intresting :) I should find anohter solution 
    info = Information.objects.first()

    return render(request, "base/virtualTour.html", {"info":info, "user":user_requested})



@login_required(login_url= "../Authcheck/?next=booking")
def Booking(request):
    if request.user.is_authenticated and request.user.banned == False:
        user_requested = Profile.objects.get(user=request.user)


        #This Will Give us every weekday till next 21 day
        Weekdays = validWeekdays(22)

        #as far as we have 12 available appointment for each day, we should check if a day in our calendar have been reserved more or equal to 12 times we should remove that day from our resrving list
        validateWeekdays = isWeekdayValid(Weekdays)


        if request.method == "POST":
            day = request.POST.get('day')
            if day == None:
                messages.error(request, 'لطفا یک روز را انتخاب کنید')
                return redirect('booking')
            
            request.session['day'] = day
            return redirect('bookingSubmit')

        context = {"validateWeekdays":validateWeekdays, "today":datetime.now(), "user":user_requested}
        return render(request, 'base/booking.html', context)
    else:
        messages.error(request, 'متاسقانه شما اجازه ورود به این بخش را ندارید')
        return redirect('Authcheck')


@login_required(login_url= "../Authcheck/?next=booking") #type:ignore
def bookingSubmit(request):
    try:
        referring_page = request.META.get('HTTP_REFERER')
        referer_path = urlparse(referring_page).path
        if '/booking' in referer_path:
            day = request.session.get('day')
            result = str.split(day, "-")
            if request.user.is_authenticated and day != "":
                user_requested = Profile.objects.get(user=request.user)
                user = request.user
                times = BookingTimes()
                today = datetime.now()
                minDate = today.strftime('%Y-%m-%d')
                deltatime = today + timedelta(days = 21)
                strdeltatime = deltatime.strftime("%Y-%m-%d")
                maxDate = strdeltatime


                #Get stored data from django session:
                daytoshow = datetime(int(result[0]),int(result[1]),int(result[2]))
                #day format is : 2024-01-30



                #only show the availabel times
                hours = checkTime(times, day)
                if request.method == "POST":
                    thetime = request.POST.get('time')


                    original_locale = locale.getlocale()
                    locale.setlocale(locale.LC_TIME, 'C')   
                    today = datetime.now()
                    appointment_time = time.strptime(thetime, '%I:%M %p')
                    appointment_time_datetime = datetime(today.year, today.month, today.day, appointment_time.tm_hour, appointment_time.tm_min)
                    time_time = str(appointment_time_datetime.time())
                    locale.setlocale(locale.LC_TIME, original_locale)
                    

                    if day <= maxDate and day >= minDate:
                        if Appointment.objects.filter(day=day).count() < 16:
                            if Appointment.objects.filter(day=day, time=time).count() < 1:
                                Appointmentform = Appointment.objects.get_or_create(
                                    user = user,
                                    time_datetime=time_time,
                                    day = day,
                                    time = thetime,
                                )
                                messages.success(request, f"نوبت با موفقیت ثبت رزرو شد.")
                                text = f"مانی عزیز نوبت تاریخ {jformat(day)} و ساعت {import12to24(thetime)} ثبت شد"
                                sendsms(user.username, text)
                                return redirect('indexPage')
                            else:
                                messages.error(request, 'این تایم رزرو شده')
                        else:
                            messages.error(request, 'روز انتخاب شده رزرو شده است')
                    else:
                        messages.error(request, 'زمان انتخاب شده منقضی شده است')


                context = {'times':hours, 'day':day,"daytoshow":daytoshow, 'user':user_requested}
                return render(request, "base/BookingSubmit.html", context)
            else:
                user_requested = None
                return redirect("Authcheck")
    except:
        return redirect('booking')


def validWeekdays(days):
    today = date.today()
    weekdays = []
    original_locale = locale.getlocale()
        # Set the default locale temporarily
    locale.setlocale(locale.LC_TIME, 'C') 
    for i in range (0, days):
        x = today + timedelta(days=i)
        
        y = x.strftime('%A')
        if y != "Friday":
            weekdays.append(x)
    locale.setlocale(locale.LC_TIME, original_locale)
        
    return weekdays



def checkTime(times, day):
    #both times and days are strings
    z = []
    x = []
    today = date.today()
    
    for Time in times:
        #check if this time has been booked or not
        if Appointment.objects.filter(day=day, time=Time).count() < 1:
            #if not bookend then do this :
            z.append(Time)
    #z will return free times
    original_locale = locale.getlocale()
    # Set the default locale temporarily
    locale.setlocale(locale.LC_TIME, 'C') 
    #in persian locale setting we dont have AM/PM therfore the strptime does not accept this. for solving this we change the locale setting here to default local and after this opperasion we change it back to persian.
    for k in z:
        if day == str(today):
            result = (time.strptime(f"{k}", "%I:%M %p"))
            strfTime = datetime(timezone.now().year, timezone.now().month, today.day, result.tm_hour, result.tm_min, result.tm_sec)
            maxTime = strfTime-timedelta(minutes=30)
            targetTime = maxTime-datetime.now()
            if targetTime.total_seconds() >= 0:
                x.append(k)
            else:
                pass
        else:
            x.append(k)
    locale.setlocale(locale.LC_TIME, original_locale)
    return x



def isWeekdayValid(weekdays):
    times = BookingTimes()
    validateWeekdays=[]

    deactive_Days = [str(deactiveday) for deactiveday in deactive_days.objects.all()]
    for day in weekdays:
        freeTimes = checkTime(times, str(day))
        if len(freeTimes) > 0 and str(day) not in deactive_Days :
            validateWeekdays.append(day)
            
    return validateWeekdays





def academy(request):
    if request.user.is_authenticated:
        user_requested = Profile.objects.get(user=request.user)
    else:
        user_requested = None
    context = {'user':user_requested}
    return render(request, 'base/academy.html', context)
