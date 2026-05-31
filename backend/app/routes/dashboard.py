from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.controllers.dashboard import get_dashboard

router = APIRouter(
    prefix="/dashboard",
    tags = ["dashboard"]
)

@router.get("/dashboard")
def getDashboardRoute(
    db:Session = Depends(get_db)
):
    return get_dashboard(db)