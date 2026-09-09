from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import schemas, crud
from ..database import get_db


router = APIRouter(
    prefix="/patients",
    tags=["Patients"]
)


# Create Patient
@router.post("", response_model=schemas.PatientResponse)
def create_patient(
    patient: schemas.PatientCreate,
    db: Session = Depends(get_db)
):
    return crud.create_patient(db, patient)



# Get All Patients
@router.get("", response_model=List[schemas.PatientResponse])
def get_patients(
    date: Optional[str] = None,
    month: Optional[str] = None,
    today: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    return crud.get_patients(db, date=date, month=month, today=today)



# Get Today's Patients
@router.get("/today", response_model=List[schemas.PatientResponse])
def get_today_patients(
    db: Session = Depends(get_db)
):
    return crud.get_today_patients(db)



# Get Single Patient
@router.get("/{patient_id}", response_model=schemas.PatientResponse)
def get_patient(
    patient_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_patient(db, patient_id)



# Update Patient
@router.put("/{patient_id}", response_model=schemas.PatientResponse)
def update_patient(
    patient_id: int,
    patient: schemas.PatientCreate,
    db: Session = Depends(get_db)
):
    return crud.update_patient(
        db,
        patient_id,
        patient
    )



# Delete Patient
@router.delete("/{patient_id}", response_model=schemas.PatientResponse)
def delete_patient(
    patient_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_patient(
        db,
        patient_id
    )