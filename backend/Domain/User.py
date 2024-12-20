import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, sessionmaker, declarative_base
import os
from .Utils import Utils

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(sa.String(255), nullable=False)
    email: Mapped[str] = mapped_column(sa.String(255), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(sa.String(255), nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        if not Utils.email_validation(email):
            raise ValueError(f"The provided email '{email}' is not valid.")
        self.email = email
        self.password = password

    def __repr__(self) -> str:
        return f"<User(id={self.id}, username={self.username}, email={self.email})"
    