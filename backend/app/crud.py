from datetime import date as dt_date
from sqlalchemy import func, or_
from sqlalchemy.orm import Session
from . import models, schemas


def create_patient(db: Session, patient: schemas.PatientCreate):

    new_patient = models.Patient(
        name=patient.name,
        age=patient.age,
        weight=patient.weight,
        height=patient.height,
        married=patient.married,
        allergies=patient.allergies,
        contact_details=patient.contact_details,
        email=patient.email,
        phone=patient.phone,
        date_of_birth=patient.date_of_birth,
        address=patient.address,
        registration_date=patient.registration_date
    )

    db.add(new_patient)

    db.commit()
    db.refresh(new_patient)

    return new_patient


def get_today_date_str():
    return dt_date.today().strftime("%Y-%m-%d")


def get_today_patients(db: Session):
    today_str = get_today_date_str()
    return db.query(models.Patient).filter(
        or_(
            models.Patient.registration_date == today_str,
            func.date(models.Patient.registration_date) == func.curdate()
        )
    ).all()


def get_patients(db: Session, date: str = None, month: str = None, today: bool = False):

    query = db.query(models.Patient)

    if today or date == "today":
        today_str = get_today_date_str()
        query = query.filter(
            or_(
                models.Patient.registration_date == today_str,
                func.date(models.Patient.registration_date) == func.curdate()
            )
        )
    elif date:
        query = query.filter(models.Patient.registration_date == date)
        
    if month:
        month_str = str(month).zfill(2)
        query = query.filter(models.Patient.registration_date.like(f"____-{month_str}-__"))

    return query.all()



def get_patient(db: Session, patient_id: int):

    patient = db.query(models.Patient).filter(
        models.Patient.id == patient_id
    ).first()

    return patient


def update_patient(
    db: Session,
    patient_id: int,
    patient_data: schemas.PatientCreate
):

    patient = db.query(models.Patient).filter(
        models.Patient.id == patient_id
    ).first()


    if patient:

        patient.name = patient_data.name
        patient.age = patient_data.age
        patient.weight = patient_data.weight
        patient.height = patient_data.height
        patient.married = patient_data.married
        patient.allergies = patient_data.allergies
        patient.contact_details = patient_data.contact_details
        patient.email = patient_data.email
        patient.phone = patient_data.phone
        patient.date_of_birth = patient_data.date_of_birth
        patient.address = patient_data.address
        patient.registration_date = patient_data.registration_date

        db.commit()
        db.refresh(patient)


    return patient



def delete_patient(db: Session, patient_id: int):

    patient = db.query(models.Patient).filter(
        models.Patient.id == patient_id
    ).first()

    if patient:
        db.delete(patient)
        db.commit()

    return patient

    