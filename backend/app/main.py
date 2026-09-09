from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import patients
from .database import engine
from .models import Base


Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patients.router)


@app.get("/")
def home():
    return {
        "message": "Hospital Management API Running - Updated"
    }