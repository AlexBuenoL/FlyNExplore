import requests
import csv
import pandas as pd
from Domain.City import City

import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker

from dotenv import load_dotenv
import os
import re


def init_cities():
    columns = ["IATA", "ICAO", "Airport name", "Country", "City", "Information"]
    df = pd.read_csv(url, names=columns, header=0)
    df = df.loc[:, ["IATA", "City"]]

    with Session() as session:
        for index, row in df.iterrows():
            if not pd.isna(df.iloc[index, 1]):
                city_name = re.sub(r'[^a-zA-z]', '', row.iloc[1])
                city = City(row.iloc[0], city_name)
                session.add(city)

        session.commit()


if __name__ == '__main__':

    load_dotenv()
    db = sa.create_engine(os.getenv('DB_URL'))
    Session = sessionmaker(bind=db)

    # URL of the dataset containing city IATA codes
    url = "https://www.worlddata.info/downloads/airports.csv"

    init_cities()
