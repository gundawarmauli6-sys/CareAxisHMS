from sqlalchemy import Column, Integer, String, Boolean, Float
from .database import Base


class Patient(Base):

    __tablename__ = "patients"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=True
    )

    age = Column(
        Integer,
        nullable=True,
        default=0
    )

    weight = Column(
        Float,
        nullable=True,
        default=0.0
    )

    height = Column(
        Float,
        nullable=True,
        default=0.0
    )

    married = Column(
        Boolean,
        default=False,
        nullable=True
    )

    allergies = Column(
        String(255),
        nullable=True
    )

    contact_details = Column(
        String(100),
        nullable=True
    )

    first_name = Column(
        String(100),
        nullable=True
    )

    last_name = Column(
        String(100),
        nullable=True
    )

    email = Column(
        String(100),
        nullable=True
    )

    phone = Column(
        String(20),
        nullable=True
    )


    date_of_birth = Column(
        String(20),
        nullable=True
    )

    address = Column(
        String(255),
        nullable=True
    )

    registration_date = Column(
        String(20),
        nullable=True
    )