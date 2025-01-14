import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'imazh.settings')
app = Celery('imazh')
app.config_from_object('django.conf:settings', namespace='CELERY')



app.autodiscover_tasks()


app.conf.beat_schedule={
    'reminder_task':{
        'task':'base.tasks.reminder',
        'schedule':crontab(minute='*/30', hour='*/1'),
    },
    'otp_handlertask':{
        'task':'base.tasks.handleOTP',
        'schedule':crontab(minute='*/2')
    },
    'appointment_expiration':{
        'task':'base.tasks.check_appointment_expiration',
        'schedule':crontab(minute='0', hour='*/1')
    }
}
