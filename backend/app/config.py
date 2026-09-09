import os
from dotenv import load_dotenv

load_dotenv()

APP_NAME = os.getenv("APP_NAME", "Hospital Management System")
DEBUG = os.getenv("DEBUG", "True") == "True"
