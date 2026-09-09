from pydantic import BaseModel, ConfigDict, computed_field, model_validator


class PatientCreate(BaseModel):
    name: str = ""
    age: int = 0
    weight: float = 0.0
    height: float = 0.0
    married: bool = False
    allergies: str | None = None
    contact_details: str | None = None
    email: str | None = None
    phone: str | None = None
    date_of_birth: str | None = None
    address: str | None = None
    registration_date: str | None = None

    @model_validator(mode="before")
    @classmethod
    def normalize_payload(cls, values):
        if not isinstance(values, dict):
            return values

        payload = dict(values)

        payload.setdefault("name", "Unknown")
        payload.setdefault("age", 0)
        payload.setdefault("weight", 0.0)
        payload.setdefault("height", 0.0)
        payload.setdefault("married", False)

        return payload


class PatientResponse(PatientCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)

    @computed_field
    @property
    def bmi(self) -> str:
        if self.height and self.weight:
            height_m = self.height / 100 if self.height > 3 else self.height
            return f"{self.weight / (height_m ** 2):.2f}"
        return "N/A"
