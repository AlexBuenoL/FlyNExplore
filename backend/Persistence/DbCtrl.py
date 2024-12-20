from dotenv import load_dotenv
import sqlalchemy as sa
import os

from Domain.User import Base, User
from Domain.Recommend import Recommend


load_dotenv()
db = sa.create_engine(os.getenv('DB_URL'))


class DbCtrl():

    def __init__(self, session=None):
        if session:
            self.session = session


    def insert_user(self, new_user):
        self.session.add(new_user)
        self.session.commit()
    
    
    def is_valid_user(self, email, pwd_introduced):
        user = self.session.query(User).filter_by(email=email).first()
        if user:
            return user.password == pwd_introduced, user.username
        else:
            return False, None 
    

    def modify_user(self, old_email, name=None, email=None, pwd=None):
        user = self.session.query(User).filter_by(email=old_email).first()

        if not user:
            return False
        
        if name:
            user.username = name
        if email:
            user.email = email
        if pwd:
            user.password = pwd
        
        self.session.commit()
        return True
    

    def get_cities(self):
        meta_data = sa.MetaData()
        meta_data.reflect(bind=db)
        CITY = meta_data.tables['city']
        query = sa.select(sa.distinct(CITY.c.name)).order_by(CITY.c.name)

        with db.connect() as connection:
            result = connection.execute(query)

        cities = []
        for record in result:
            cities.append(record[0])
        
        return cities

            
    # Returns the airports IATA codes for that city
    def get_airports_from_city(self, city_name):
        meta_data = sa.MetaData()
        meta_data.reflect(bind=db)
        CITY = meta_data.tables['city']
        query_orig = sa.select(CITY.c.IATA_code).where(CITY.c.name == city_name)
        airports = []

        with db.connect() as connection:
            result = connection.execute(query_orig)
            for row in result:
                airports.append(row[0])

        return airports
    

    def get_recommendations(self):
        result = self.session.query(Recommend).all()

        recs = []
        for record in result:
            recs.append({
                "name": record.name,
                "description": record.description,
                "image": record.img_path  
            })
        
        return recs

