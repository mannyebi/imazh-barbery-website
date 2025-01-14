from django.urls import path
from .views import Users,get_free_time_ajax,send_sms_to_users,admins,admins,deactiveDays, addUsers,history_appointments,academy,User_Edit, adminDash,UpdateAppointments, expired_Appointments, bannUsers,cancelAppointment, deleteUsers, logoutUser, active_Appointments, DeleteAppointment, AddAppointment, blogs, deleteBlog, UpdateBlogs, Users_detail, userDash, UpdateAppointmentuser


urlpatterns = [
    path('Admin Dashboard/', adminDash, name='adminDash'),
    path('active appointments/', active_Appointments, name='Appointments'),
    path('expired appointments/', expired_Appointments, name='expAppointments'),
    path('Users/', Users, name='users'),
    path('User /<str:pk>', Users_detail, name='Users_detail'),
    path('User edit/<str:pk>', User_Edit, name='User_edit'),
    path('Blogs/', blogs, name='panelblogs'),
    path('Admins/', admins, name='Admins'),
    path('deactive Days/', deactiveDays, name='deactiveDays'),#type:ignore

    path('Delete Appointment/<str:pk>', DeleteAppointment, name='DeleteAppointment'),
    path('Add Appointment/', AddAppointment, name='AddAppointment'),

    path('get_free_times/', get_free_time_ajax, name='get_free_times'),
    path('send_sms_to_users/<str:pk>', send_sms_to_users, name='send_sms_to_users'),
    
    path('logoutUser/', logoutUser, name='Logout'),
    path('add User/', addUsers, name='addUsers'),
    path('bann User/<int:pk>', bannUsers, name="bannUser"),
    path('delete User/<int:pk>', deleteUsers, name="deleteUsers"),
    path('delete Blog/<int:pk>', deleteBlog, name="deleteBlog"),
    path('update Blog/<int:pk>', UpdateBlogs, name="UpdateBlogs"),
    path('update appointments/<int:pk>', UpdateAppointments, name="UpdateAppointments"),


    path('User Dashboard/<str:pk>', userDash, name='userDash'),
    path('Update Appointment/<str:pk>', UpdateAppointmentuser, name='UpdateAppointmentuser'),
    path('delete Appointment/<str:pk>', cancelAppointment, name='cancelAppointment'),
    path('history Appointments/<str:pk>', history_appointments, name='history_appointments'),
    path('Academy/<str:pk>', academy, name='Academy'),
]
