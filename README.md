
# Imazh Barbery Website

Imazh Barbery is a modern and professional website designed for a barbery business. The website showcases various services offered by the barbery, including tattoo, haircut, skincare, and bridal services. It also features an academy for aspiring barbers and a blog section to keep clients informed about the latest trends and tips in the beauty industry.

## Features

- **Admin Panel:** An interactive admin panel for controlling over all users and their appointments
- **Users Panel:** User's panel designed with the simplest ux for easier access. they can delete or edit their appointments with some rules. they're also able to see their appointments history
- **S.M.S Reminder:** both admin/admins and user will notify if a new appointment book, also changing the appointment from user or admin will notify both of them. 30 minute before the appointment an sms message will remind the user.

## Technologies Used

- **Django:**: web development framework.
- **celery and celery-beat:** for sending scheduled SMS messages to users.
- **Redis:** in-memory data storage for celery.
- **Docker:** for easier deployment.
- **JavaScript:**  Interactive elements and functionalities.
- **Sqlite:** a light weight database for storing data.
