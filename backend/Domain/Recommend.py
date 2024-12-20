import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, sessionmaker, declarative_base
import os
from .Utils import Utils
from .User import Base

class Recommend(Base):
    __tablename__ = "recommends"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(sa.String(255), nullable=False)
    description: Mapped[str] = mapped_column(sa.String(255), nullable=False)
    img_path: Mapped[str] = mapped_column(sa.String(255), nullable=False)

    def __init__(self, name, description, img_path):
        self.name = name
        self.description = description
        self.img_path = img_path

    def __repr__(self) -> str:
        return f"<Recommend(id={self.id}, name={self.name}, description={self.description}, img path={self.img_path})"
    