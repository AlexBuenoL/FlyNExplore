import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, sessionmaker, declarative_base
import os
from .Utils import Utils
from .User import Base

class City(Base):
    __tablename__ = "city"

    id: Mapped[int] = mapped_column(primary_key=True)
    IATA_code: Mapped[str] = mapped_column(sa.String(4), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(sa.String(255))

    def __init__(self, IATA_code, name=""):
        self.IATA_code = IATA_code
        self.name = name

    def __repr__(self) -> str:
        return f"<City(id={self.id}, IATA_code={self.IATA_code})"
    