import sys
import os

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine
from app.models import Base

print("Dropping existing tables...")
Base.metadata.drop_all(bind=engine)
print("Creating new tables...")
Base.metadata.create_all(bind=engine)
print("Database tables reset successfully!")
