import sqlalchemy as sa
from sqlalchemy.orm import declarative_base

import os
from dotenv import load_dotenv

from Domain.User import User, Base
from Domain.City import City
from Domain.Recommend import Recommend


"""
Every class should inherit from the same Base,
the original Base is the one created in class User.
This script updates the ORM metadata, if you have added
new tables run the script so that DB is updated.
"""


def main():
    db = sa.create_engine(os.getenv('DB_URL'))
    # To drop a table use this command:
    #Base.metadata.tables["city"].drop(bind=db)
    Base.metadata.create_all(db)

if __name__ == "__main__":
    load_dotenv()
    print(os.getenv('DB_URL'))
    main()