# 🏥 CareAxis HMS - Hospital Management System

A full-stack **Hospital Management System** for registering, managing, searching, and maintaining patient records.

Built with AI Powered (**React.js), FastAPI, and MySQL**, CareAxis HMS provides an efficient patient management workflow through REST APIs.

---

## Features

* Patient registration
* View all patient records
* View today's patients
* Filter records by date and month
* Search patients by name or phone
* View detailed patient information
* Update patient records
* Delete patient records
* Automatic BMI calculation
* Form validation
* User feedback for CRUD operations
* REST API integration
* MySQL database persistence

---

##  Tech Stack

| Technology   | Purpose           |
| ------------ | ----------------- |
| React.js     | Frontend          |
| Vite         | Build Tool        |
| FastAPI      | Backend API       |
| Python       | Backend           |
| MySQL        | Database          |
| SQLAlchemy   | ORM               |
| Pydantic     | Data Validation   |
| Axios        | API Communication |
| React Router | Routing           |
| CSS          | Styling           |
| PyMySQL      | MySQL Driver      |

---

##  Architecture

```text
React.js
   │
   │ Axios / REST API
   ▼
FastAPI
   │
   │ SQLAlchemy
   ▼
MySQL
   │
   ▼
Patient Records
```

---

## Project Structure

```text
HMS/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   └── patients.py
│   │   ├── config.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── requirements.txt
│   └── reset_db.py
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── IntroScreen.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── RegisterPatient.jsx
│   │   │   ├── PatientRecords.jsx
│   │   │   ├── PatientDetails.jsx
│   │   │   └── EditPatient.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## REST API

**Base URL:** `http://localhost:8000`

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| POST   | `/patients`                 | Create patient       |
| GET    | `/patients`                 | Get all patients     |
| GET    | `/patients/today`           | Get today's patients |
| GET    | `/patients?date=YYYY-MM-DD` | Filter by date       |
| GET    | `/patients?month=MM`        | Filter by month      |
| GET    | `/patients/{id}`            | Get patient details  |
| PUT    | `/patients/{id}`            | Update patient       |
| DELETE | `/patients/{id}`            | Delete patient       |

Interactive API documentation:

```text
http://localhost:8000/docs
```

---

## Database

CareAxis HMS uses **MySQL** with a `patients` table.

### Main Fields

```text
id
name
age
weight
height
married
allergies
contact_details
email
phone
date_of_birth
address
registration_date
```

BMI is calculated dynamically using the patient's height and weight.

---

## Testing

The API can be tested using FastAPI's interactive Swagger documentation:

```text
http://localhost:8000/docs
```

### CRUD Operations

* Create patient
* Get patients
* Search and filter patients
* Get patient details
* Update patient
* Delete patient

---

## Future Improvements

* Authentication & Authorization
* Appointment Scheduling
* Prescription Management
* Billing & Payments
* Bed Management

---

## Project Goals

* Digitize and centralize patient records
* Simplify patient search and management
* Demonstrate full-stack development with REST APIs and database integration

---

## Developer

**Mauli Gundawar**

2nd Year BCA Student | AI Full Stack Developer

**Skills:** AI-Powered (React.js) • Python • FastAPI • REST APIs • MySQL • SQLAlchemy • Pydantic • JavaScript • Git

---

## 📄 License

This project is developed for **educational and portfolio purposes**.
