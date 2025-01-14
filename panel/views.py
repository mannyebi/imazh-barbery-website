from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from base.models import Profile, Appointment, User, Weblog, deactive_days
from django.contrib.auth import logout
from datetime import timedelta, date
import datetime
from django.utils import timezone
from datetime import timedelta
from django.db.models import Q
import time
import locale
from django.db.models import Count, Max
from django.contrib import messages
from base.views import checkTime
from .forms import add_blog_form, Appointment_form, User_form
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from base.tasks import sendsms


import jdatetime


# Create your views here.

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


def custom_weekday(date):
    # Get the weekday index (0 for Monday, 1 for Tuesday, ..., 6 for Sunday)
    weekday_index = date.weekday()

    convert_weekday = {5:0, 6:1, 0:2, 1:3, 2:4, 3:5, 4:6}
    return convert_weekday[weekday_index]
    

@login_required(login_url="Authcheck")
def adminDash(request):
    userRequested = request.user
    try:
        userProfile = Profile.objects.get(user=userRequested)
    except:
        pass
    if userProfile.level == "2" or userProfile.level == "3":
        difference_list = []
        user = request.user
        app = None

        todyas_appointment = []
        yesterday_Appointments = []
        weeks_Appointments = []
        closed_Appointements = []

        today = datetime.datetime.now().date() 
        start_of_week = today - timedelta(days=custom_weekday(today))
        end_of_week = start_of_week + timedelta(days=6)


        profile = Profile.objects.get(user=user)

        appointments_this_week = Appointment.objects.filter(Q(day__gte=str(start_of_week))&Q(day__lte=str(end_of_week))).order_by("time_datetime")
        

        for appointment in appointments_this_week:
            weeks_Appointments.append(appointment)
            if appointment.day == today:
                todyas_appointment.append(appointment)
                if appointment.status == "closed":
                    closed_Appointements.append(appointment)
            elif appointment.day == today-timedelta(days=1):
                yesterday_Appointments.append(appointment)


        #counting appointments :
                
        appointment_counts = {day: 0 for day in range(7)}
        
        for appointment in appointments_this_week:
            day_of_week = custom_weekday(appointment.day)
            appointment_counts[day_of_week] += 1
        weekly_count_list = [appointment_counts[day] for day in range(6)]

        #done

        progress = (len(todyas_appointment)-len(yesterday_Appointments))/len(yesterday_Appointments)*100 if len(yesterday_Appointments) != 0 else 0

        original_locale = locale.getlocale()
        # Set the default locale temporarily
        locale.setlocale(locale.LC_TIME, 'C')
        smallest = float('inf')
        for appointment in todyas_appointment:
            booked_time_strp = (time.strptime(f"{appointment.time}", "%I:%M %p"))
            booked_time_strf = datetime.datetime(timezone.now().year, timezone.now().month, appointment.day.day,booked_time_strp.tm_hour,booked_time_strp.tm_min,booked_time_strp.tm_sec)

            difference = booked_time_strf - timezone.now()
            difference_list.append(difference.total_seconds())
            if difference.total_seconds() < smallest and appointment.status != "closed":
                smallest = difference.total_seconds()
                app = appointment
        locale.setlocale(locale.LC_TIME, original_locale)
        context = {'user':profile, "appointments":todyas_appointment,"weekly_count_list":weekly_count_list, "progress":progress, 
                "closedAppointments":closed_Appointements, "next_app":app, "today":datetime.datetime.now()}
        return render(request, "panel/Admindash.html", context)
    else:
        return HttpResponse("این آدرس برای شما مجاز نیست")


@login_required(login_url="Authcheck")
def logoutUser(request):
    logout(request)
    return redirect("indexPage")


@login_required(login_url="Authcheck")
def Users(request):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3":
        q = request.GET.get('q', '')
        b = request.GET.get('b')
        a = request.GET.get('a')

        user = request.user
        profile = Profile.objects.get(user=user)
        users = User.objects.annotate(num_appointments=Count("appointment"), latest_appointment=Max("appointment__day")).order_by("-created").filter(Q(name__icontains=q)|Q(last_name__icontains=q))
        free_appointments = Appointment.objects.filter(status="free")
        free_appointments_list = [appointment.user for appointment in free_appointments]
        free_appointments_list_id = [appointment.user.id for appointment in free_appointments]#type:ignore

        today = datetime.datetime.now()

        if b == "True":
            users = User.objects.filter(banned=True)

        if a == "True":
            users = User.objects.filter(id__in=free_appointments_list_id)


        context = {'user':profile, 'profiles':users, "free_appointments":free_appointments_list, "today":today}
        return render(request, "panel/users.html", context)
    else:
        return HttpResponse("این آدرس برای شما مجاز نیست")
    

@login_required(login_url="Authcheck")
def Users_detail(request, pk):
    requested = request.user
    user = Profile.objects.get(user=requested)
    userinfo = User.objects.get(id=pk)
    profile = Profile.objects.annotate(num_appointments=Count("user__appointment"), latest_app=Max("user__appointment__day")).get(user=userinfo)
    free_appointments = Appointment.objects.filter(user__id=pk,status="free")
    appointments = userinfo.appointment_set.all().order_by("-status") #type:ignore

    Weekdays = validWeekdays(22)

    validateWeekdays = isWeekdayValid(Weekdays)

    users = User.objects.all()


    context = {"theuser":profile,"user":user, "free_appointments":free_appointments,"validateWeekdays":validateWeekdays, "all_appointments":appointments, "info":userinfo,"users":users, "now":datetime.datetime.now()}
    return render(request, "panel/users_detail.html", context)


@login_required(login_url="Authcheck")
def User_Edit(request, pk):
    try:
        user = User.objects.get(id=pk)
        userProfile = Profile.objects.get(user=user)

        if request.method == "POST":
            form = User_form(request.POST, instance=user)
            avatar = request.FILES.get('avatar')
            if form.is_valid():
                form.save()
                userProfile.avatar = avatar
                userProfile.save()
                messages.success(request, "اطلاعات با موفقیت ویرایش شد")
                return redirect("Users_detail", user.id) #type:ignore
    except:
        messages.error(request, "مشکلی پیش آمده")
    return redirect('Users_detail', user.id) #type:ignore



@login_required(login_url="Authcheck")
def addUsers(request):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3":
        if request.method == "POST":
            name = request.POST.get("name")
            last_name = request.POST.get("last_name")
            phoneNum = request.POST.get("phonenum")
            if len(phoneNum) == 11 and phoneNum.startswith("09"):
                try:
                    user = User.objects.get(username=phoneNum)
                    messages.error(request, "این کاربر با این شماره قبلا ثبت نام کرده است .")
                except:
                    User.objects.create(
                        name = name,
                        last_name = last_name,
                        username=phoneNum
                    )
                    messages.success(request, "کاربر با موفقیت افزوده شد .")
            else:
                messages.error(request, "شماره تلفن باید حداقل 11 رقم بوده و با 09 شروع شود")
        return redirect('users')
    else:
        return HttpResponse("این آدرس برای شما مجاز نیست")


@login_required(login_url="Authcheck")
def bannUsers(request, pk):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3" and request.method == "POST":
        referring_page = request.META.get('HTTP_REFERER')
        user = User.objects.get(id=pk)
        if user.banned == False:
            user.banned = True
            user.save()
            messages.success(request, f"{user.name} {user.last_name} بن شد")
        else:
            user.banned = False
            user.save()
            messages.success(request, f"{user.name} {user.last_name} آنبن شد")

        return redirect(referring_page)
    else:
        return HttpResponse("این آدرس برای شما مجاز نیست")


@login_required(login_url="Authcheck")
def deleteUsers(request, pk):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3":
        user = User.objects.get(id=pk)
        if request.method=="POST":
            user.delete()
            messages.success(request, f"{user.name} {user.last_name} حذف شد")
        return redirect("users")
    else:
        return HttpResponse("این آدرس برای شما مجاز نست")
    


@login_required(login_url="Authcheck")
def active_Appointments(request):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3":
        t = request.GET.get("t")
        a = request.GET.get("a")
        user = request.user
        profile = Profile.objects.get(user=user)
        
        if t == "True":
            appointments = Appointment.objects.filter(status='free', day=date.today()).order_by("day","time_datetime")
        elif a  ==  "True":
            appointments = Appointment.objects.filter(status='free', day=date.today()+timedelta(days=1)).order_by("day","time_datetime")
        else:
            appointments = Appointment.objects.filter(status="free").order_by("day","time_datetime")
        paginator = Paginator(appointments, 16)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)


        all_users = User.objects.all()

        Weekdays = validWeekdays(22)

        validateWeekdays = isWeekdayValid(Weekdays)

        context = {'user':profile, "users":all_users, "now":datetime.datetime.now(), "validateWeekdays":validateWeekdays, "page_obj":page_obj}
        return render(request, 'panel/Appointments.html', context)
    else:
        return HttpResponse("این آدرس برای شما مجاز نیست")



@login_required(login_url="Authcheck")
def expired_Appointments(request):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3":
        t = request.GET.get("t")
        a = request.GET.get("a")
        user = request.user
        profile = Profile.objects.get(user=user)
        
        if t == "True":
            appointments = Appointment.objects.filter(status='closed', day=date.today()).order_by("day","time_datetime")
        elif a  ==  "True":
            appointments = Appointment.objects.filter(status='closed', day=date.today()+timedelta(days=1)).order_by("day","time_datetime")
        else:
            appointments = Appointment.objects.filter(status="closed").order_by("day","time_datetime")
        paginator = Paginator(appointments, 16)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)


        all_users = User.objects.all()

        Weekdays = validWeekdays(22)

        validateWeekdays = isWeekdayValid(Weekdays)

        context = {'user':profile, "users":all_users, "now":datetime.datetime.now(), "validateWeekdays":validateWeekdays, "page_obj":page_obj}
        return render(request, 'panel/expAppointments.html', context)
    else:
        return HttpResponse("این آدرس برای شما مجاز نیست")


@login_required(login_url="Authcheck")
def DeleteAppointment(request, pk):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3":
        referring_page = request.META.get('HTTP_REFERER')
        appointment = Appointment.objects.get(id=pk)

        if request.method == "POST":
            appointment.delete()
            messages.success(request, "نوبت حذف شد")
            return redirect(referring_page)

        return redirect(referring_page)

    else:
        return HttpResponse("این آدرس برای شما مجاز نیست")


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
            strfTime = datetime.datetime(timezone.now().year, timezone.now().month, today.day, result.tm_hour, result.tm_min, result.tm_sec)
            maxTime = strfTime-timedelta(minutes=30)
            targetTime = maxTime-datetime.datetime.now()
            if targetTime.total_seconds() >= 0:
                x.append(k)
            else:
                pass
        else:
            x.append(k)
    locale.setlocale(locale.LC_TIME, original_locale)
    return x


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

def import12to24(value):
    givenDate = value
    output = givenDate.split(" ")
    if output[1] == "PM":
        Time = output[0].split(":")
        hour = int(Time[0])+12 if int(Time[0])+12<24 else 12
        result = datetime.datetime(2023, 1, 1, int(hour), int(Time[1]))
        return datetime.datetime.strftime(result, "%H:%M")
    else:
        Time = output[0].split(":")
        if int(Time[0]) == int(12):
            result = datetime.datetime(2023, 1, 1, 0, int(Time[1]))
            return datetime.datetime.strftime(result, '%H:%M')
        else:
            result = datetime.datetime(2023, 1, 1, int(Time[0]), int(Time[1]))
            return datetime.datetime.strftime(result, '%H:%M')


def get_free_time_ajax(request):
    if request.method == "POST" and is_ajax(request=request):
        result = []
        show = []
        day = request.POST.get('day')
        if day != "#":
            times = BookingTimes()
            free_apps = checkTime(times, day)
            for free_app in free_apps:
                result.append(import12to24(free_app))
                show.append(free_app)
            return JsonResponse({"free_apps":result, "show":show})
        else:
            return JsonResponse({"free_apps":None})

    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)


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


def isWeekdayValid(weekdays):
    times = BookingTimes()
    validateWeekdays=[]

    deactive_Days = [str(deactiveday) for deactiveday in deactive_days.objects.all()]
    for day in weekdays:
        freeTimes = checkTime(times, str(day))
        if len(freeTimes) > 0 and str(day) not in deactive_Days :
            validateWeekdays.append(day)
            
    return validateWeekdays


@login_required(login_url="Authcheck")
def AddAppointment(request):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3":
        if request.method=="POST":
            referring_page = request.META.get('HTTP_REFERER')
            thetime = request.POST.get('time')
            original_locale = locale.getlocale()
            locale.setlocale(locale.LC_TIME, 'C') 

            today = datetime.datetime.now()
            
            day = request.POST.get('day')
            user_id = request.POST.get('user')
            user = User.objects.get(id=user_id)

            
            if thetime is not None and day is not None and user is not None :
                if user.banned == False:
                    appointment_time = time.strptime(thetime, '%I:%M %p')
                    appointment_time_datetime = datetime.datetime(today.year, today.month, today.day, appointment_time.tm_hour, appointment_time.tm_min)
                    time_time = str(appointment_time_datetime.time())#type:ignore
                    locale.setlocale(locale.LC_TIME, original_locale)
                    #if date.today().strftime("%A") != "جمعه":
                    Appointment.objects.create(
                        time = thetime,
                        time_datetime = str(time_time),#type:ignore
                        day = day,
                        user = user
                    )   
                    messages.success(request, f'نوبت با موفقیت ثبت شد .')
                    #else:
                        #messages.error(request, "برای روز جمعه نباید نوبتی ثبت شود")
                else:
                    messages.error(request, "این کاربر بن شده است .")
            else:
                messages.error(request, "اطلاعات درست وارد نشده است.")
    else:
        return HttpResponse("این آدرس برای شما مجاز نیست")

    return redirect(referring_page)

@login_required(login_url="Authcheck")
def blogs(request):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3":
        user = request.user
        profile = Profile.objects.get(user=user)
        blogs = Weblog.objects.all()
        paginator = Paginator(blogs, 8)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        
        
        if request.method == 'POST':
            form = add_blog_form(request.POST, request.FILES)
    
            if form.is_valid():
                form.save()
                messages.success(request, "بلاگ با موفقیت اضافه شد .")
                return redirect('panelblogs')
        else:
            form = add_blog_form()
        
        context = {"user":profile, "page_obj":page_obj, "form":form}
        return render(request,"panel/blogs.html", context)
    else:
        return HttpResponse("این آدرس برای شما مجاز نیست")



@login_required(login_url="Authcheck")
def deleteBlog(request, pk):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3":
        blog = Weblog.objects.get(id=pk)

        if request.method == 'POST':
            blog.image.delete(save=False)
            blog.delete()
            messages.success(request, f"بلاگ {blog.title} با موفقیت حذف شد")
            return redirect("panelblogs")
        return redirect("panelblogs")
    else:
        return HttpResponse("این آدرس برای شما مجاز نیست")


@login_required(login_url="Authcheck")
def UpdateBlogs(request, pk):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3":
        Mainblog = Weblog.objects.get(id=pk)
        if request.method == 'POST':
            form = add_blog_form(request.POST, request.FILES, instance=Mainblog)

            if 'image' in request.FILES and request.FILES['image']:
                if form.is_valid():
                    form.save()
                    messages.success(request, f"بلاگ {Mainblog.title} با موفقیت آپدیت شد. ")
                    return redirect('panelblogs')
            else:
                if form.is_valid():
                    blog = form.save(commit=False)
                    blog.image = Mainblog.image
                    blog.save()
                    messages.success(request, f"بلاگ {Mainblog.title} با موفقیت آپدیت شد. ")
                    return redirect('panelblogs')
            
            
        else:
            form = add_blog_form()

        return redirect("panelblogs")
    else:
        return HttpResponse("این آدرس برای شما مجاز نیست")


@login_required(login_url="Authcheck") #type:ignore
def UpdateAppointments(request, pk):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3":
        referring_page = request.META.get("HTTP_REFERER")
        appointment = Appointment.objects.get(id=pk)
        if request.method == "POST":
            form = Appointment_form(request.POST, instance=appointment)
            if form.is_valid():
                app = form.save()
                messages.success(request, "نوبت با موفقیت آپدیت شد")
                text = f"{appointment.user.name} عزیز نوبت تاریخ {jformat(appointment.day)}, به ساعت {import12to24(appointment.time)} تغییر یافت"#type:ignore
                sendsms.delay(appointment.user.username, text) #type:ignore
                return redirect(referring_page)
            else:
                messages.error(request, f"اطلاعات را درست وارد نکردید !")
                return redirect(referring_page)
        else:
            return redirect(referring_page)



@login_required(login_url="Authcheck") #type:ignore
def userDash(request, pk):
    try:
        userPage = User.objects.get(id=pk)
        if request.user == userPage:
            today = date.today()
            t = request.GET.get("t")
            a = request.GET.get("a")

            user = Profile.objects.get(user=userPage)
            if t == 'True':
                active_appointments = Appointment.objects.filter(Q(user=userPage)&Q(status="free")&Q(day=today)).order_by("day","time_datetime")
            elif a == "True":
                active_appointments = Appointment.objects.filter(Q(user=userPage)&Q(status="free")&Q(day=today+timedelta(days=1))).order_by("day","time_datetime")
            else:
                active_appointments = Appointment.objects.filter(Q(user=userPage)&Q(status="free")).order_by("day","time_datetime")
            now = datetime.datetime.now()

            Weekdays = validWeekdays(22)

            validateWeekdays = isWeekdayValid(Weekdays)

            context = {"user":user, "active_appointments":active_appointments, "now":now, "validateWeekdays":validateWeekdays}
        else:
            return HttpResponse("این آدرس برای شما مجاز نیست")
    except:
        messages.error(request, "مشکلی پیش آمده")

    return render(request, 'panel/User_dash.html', context)



@login_required(login_url="Authcheck") #type:ignore
def UpdateAppointmentuser(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment_owner = appointment.user
        if request.user == appointment_owner:
            if request.method == "POST":
                form = Appointment_form(request.POST, instance=appointment)
                if form.is_valid():
                    form.save()
                    messages.success(request, f' نوبت با موفقیت تغییر یافت')
                else:
                    messages.error(request, "ارور")
        else:
            return HttpResponse('این آدرس برای شما مجاز نیست')
    except:
        messages.error(request, "مشکلی پیش آمده")

    return redirect(userDash, appointment_owner.id) #type:ignore


@login_required(login_url="Authcheck") #type:ignore
def cancelAppointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment_owner = appointment.user
        if request.user == appointment_owner:
            if request.method == "POST":
                appointment.delete()
                messages.success(request, "نوبت با موفقیت کنسل شد")
        else:
            return HttpResponse("این آدرس برای شما مجاز نیست")
    except:
        messages.error(request, "مشکلی پیش آمده")

    return redirect(userDash, appointment_owner.id) #type:ignore


@login_required(login_url="Authcheck") #type:ignore
def history_appointments(request, pk):
    try:
        userPage = User.objects.get(id=pk)
        user = Profile.objects.get(user=userPage)
        today = datetime.datetime.now()
        if request.user == userPage:
            appointments = Appointment.objects.filter(user=userPage).order_by("day","-status", "time_datetime")
            paginator = Paginator(appointments, 10)
            page_number = request.GET.get('page')
            page_obj = paginator.get_page(page_number)
        else:
            return HttpResponse("این آدرس برای شما مجاز نیست")
    except:
        messages.error(request, "مشکلی پیش آمده")
    
    context = {"user":user, "page_obj":page_obj, "today":today}
    return render(request, 'panel/history.html', context)



@login_required(login_url="Authcheck") #type:ignore
def academy(request, pk):
    try:
        userPage = User.objects.get(id=pk)
        user = Profile.objects.get(user=userPage)
        if request.user == userPage:
            today = datetime.datetime.now()

        else:
            return HttpResponse("این آدرس برای شما مجاز نیست")
    except:
        messages.error(request, "مشکلی پیش آمده")


    context = {"user":user, "today":today}
    return render(request, "panel/academy.html", context)


@login_required(login_url="Authcheck") #type:ignore
def send_sms_to_users(request, pk):
    theuser = request.user
    user = Profile.objects.get(user=theuser)
    if user.level == "2" or user.level == "3":
        if request.method == "POST":
            users = []
            if pk=="all":
                users = User.objects.all()
            else:
                users = User.objects.filter(id=pk)
            admin_text = request.POST.get("text")
            if admin_text is not None:
                for user in users:
                    text = f"{user.name} عزیز \n {admin_text}"
                    sendsms.delay(user.username, text)
            else:
                messages.error(request, "لطفا متن پیامک را با دقت وارد کنید")
    else:
        messages.error(request, "این آدرس برای شما مجاز نمی باشد")
    return redirect("users")


@login_required(login_url="Authcheck")
def admins(request):
    referring_page = request.META.get('HTTP_REFERER')
    try:
        user = Profile.objects.get(user = request.user)
        profiles = Profile.objects.all().order_by('-level')

        context = {"profiles":profiles, "user":user}
    except:
        messages.error(request, "مشکلی ایجاد شده")
    if user.level == "2" or user.level == "3":
        if request.method == "POST":
            user_id = request.POST.get("user")
            user_title = request.POST.get('title')
            if user_id is not None and user_title != "":
                try:
                    target_user = User.objects.get(id=user_id)
                    target_user_profile = Profile.objects.get(user=target_user)
                    if target_user_profile.level == "1":
                        target_user_profile.level = "2"
                        target_user_profile.title = user_title
                        target_user_profile.save()
                        messages.success(request, f"{target_user.name} {target_user.last_name} به عنوان ادمین ثبت شد")
                        return redirect(referring_page)
                    elif target_user_profile.level == "2" or target_user_profile.level == "3":
                        target_user_profile.level = "1"
                        target_user_profile.save()
                        messages.success(request, f"{target_user.name} {target_user.last_name} دیگر ادمین نیست")
                        return redirect(referring_page)
                except:
                    messages.error(request, "مشکلی پیش آمده")
            else:
                messages.error(request, "اطلاعات را کامل وارد نکردید")
        return render(request, "panel/admins.html", context)
    else:
        return HttpResponse("این آدرس برای شما مجاز نیست")



def deactiveDays(request):
        user = Profile.objects.get(user = request.user)
        if user.level == "2" or user.level == "3":
            deactivedDays = deactive_days.objects.all().order_by("day")
            Weekdays = validWeekdays(7)

            validateWeekdays = isWeekdayValid(Weekdays)

            if request.method == "POST":
                worker = request.POST.get("worker")
                if worker == "add":
                    day = request.POST.get('day')
                    if day != "":
                        deactive_days.objects.create(day=day)
                        messages.success(request, f"روز {day} با موفقیت غیرفعال شد")
                        return redirect(deactiveDays)
                    else:
                        messages.error(request, "لطفا روز را انتخاب کنید")
                else:
                    day = request.POST.get('day')
                    if day != "":
                        deactive_day = deactive_days.objects.get(day=day)
                        deactive_day.delete()
                        messages.success(request, "با موفقیت فعال شد")
                        return redirect(deactiveDays)
                    else:
                        messages.error(request, "!")
            context = {"user":user, "days":deactivedDays, "available_days":validateWeekdays}
            return render(request, "panel/deactive_days.html", context)
        else:
            return HttpResponse("این آدرس برای شما مجاز نیست")
    

    