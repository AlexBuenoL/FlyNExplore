from flask import Flask, request, jsonify
from flask_cors import CORS

import os
from dotenv import load_dotenv

import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError

from Domain.User import User, Base
from Services.CtrlFlightAPI import CtrlFlightAPI
from Persistence.DbCtrl import DbCtrl


load_dotenv()
db = sa.create_engine(os.getenv('DB_URL'))
Session = sessionmaker(bind=db)

app = Flask(__name__)
CORS(app)


@app.route('/register', methods=['POST'])
def register():
    name = request.json['name']
    email = request.json['email']
    pwd = request.json['pwd']

    if not name or not email or not pwd:
        return {"error": "name, email and pwd are required"}, 400
    
    new_user = User(username=name, email=email, password=pwd)
    
    try:
        with Session() as session:
            db_ctrl = DbCtrl(session)
            db_ctrl.insert_user(new_user)
            return {'message': 'Register succesful'}, 200

    except IntegrityError:
        return {'message': 'Email already exists'}, 409
    
    except Exception as e:
        return {'message': 'Error in database query'}, 500


@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    pwd = request.json['pwd']

    if not email or not pwd:
        return {"error": "email and pwd are required"}, 400
    
    try:
        with Session() as session:
            db_ctrl = DbCtrl(session)
            is_valid, name_user = db_ctrl.is_valid_user(email, pwd)
            if is_valid:
                return {
                    'message': 'Login succesful',
                    'nameUser': name_user}, 200
            else:
                return {"message": "invalid credentials"}, 404

    except Exception as e:
        return {'message': 'Error in database query'}, 500
    

@app.route('/modifyUserInfo', methods=['POST'])
def modifyUserInfo():
    old_email = request.json['oldEmail']
    name = request.json['newName']
    email = request.json['newEmail']

    if not old_email or not name or not email:
        return {"error": "some fields are missing"}, 400

    try:
        with Session() as session:
            db_ctrl = DbCtrl(session)
            user_found = db_ctrl.modify_user(old_email=old_email, name=name, email=email)

            if not user_found:
                return {"error": "User not found"}, 404
            else:
                return {"message": "User updated successfully"}, 200

    except IntegrityError:
        return {"error": "The new email already exists"}, 409

    except Exception as e:
        return {"error": f"Error in database query: {str(e)}"}, 500
    

@app.route('/modifyUserPwd', methods=['POST'])
def modifyUserPwd():
    old_email = request.json['oldEmail']
    pwd = request.json['newPwd1']

    if not old_email or not pwd:
        return {"error": "some fields are missing"}, 400

    try:
        with Session() as session:
            db_ctrl = DbCtrl(session)
            user_found = db_ctrl.modify_user(old_email=old_email, pwd=pwd)

            if not user_found:
                return {"error": "User not found"}, 404
            else:
                return {"message": "User updated successfully"}, 200

    except Exception as e:
        return {"error": f"Error in database query: {str(e)}"}, 500


@app.route('/cities/available', methods=['GET'])
def get_available_cities():
    try:
        db_ctrl = DbCtrl()
        cities = db_ctrl.get_cities()  
        return jsonify({'cities': cities}), 200
    
    except Exception as e:
        return jsonify({'error': f"An error occurred: {str(e)}"}), 500


@app.route('/searchFlights', methods=['GET'])
def get_flights():
    origin_city = request.args.get("originCity")
    destination_city = request.args.get("destinationCity")
    departure_date = request.args.get("departureDate")
    return_date = request.args.get("returnDate")
    min_price = request.args.get("minPrice")
    max_price = request.args.get("maxPrice")

    if (not origin_city or not destination_city or not departure_date or not return_date or not min_price or not max_price):
        return {"error": "originCity, destinationCity, departureDate, returnDate, minPrice and maxPrice required"}, 400

    db_ctrl = DbCtrl()
    airports_orig = db_ctrl.get_airports_from_city(origin_city)
    airports_dest = db_ctrl.get_airports_from_city(destination_city)
    orig_dest_pairs = [(airport_orig, airport_dest) for airport_orig in airports_orig for airport_dest in airports_dest]

    flight_api_ctrl = CtrlFlightAPI()
    
    try:
        flights = flight_api_ctrl.get_flights_from_airports_and_dates(orig_dest_pairs, departure_date, return_date, int(min_price), int(max_price))
        return flights, 200
    
    except:
        return {[]}, 500

   


@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    try:
        with Session() as session:
            db_ctrl = DbCtrl(session)
            recommendations = db_ctrl.get_recommendations()  
            return jsonify(recommendations), 200  
    
    except Exception as e:
        return jsonify({'error': f"An error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)