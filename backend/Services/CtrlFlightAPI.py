from dotenv import load_dotenv
import os
import requests

load_dotenv()
API_KEY = os.getenv('FLIGHT_API_KEY')
SECRET_KEY = os.getenv('FLIGHT_API_SECRET')


class CtrlFlightAPI():

    def __init__(self):
        pass


    def __get_access_token(self, api_key=API_KEY, secret_key=SECRET_KEY):
        url = 'https://test.api.amadeus.com/v1/security/oauth2/token'
        payload = {
            'grant_type': 'client_credentials',
            'client_id': API_KEY,
            'client_secret': SECRET_KEY
        }
        response = requests.post(url, data=payload)

        if response.status_code == 200:
            access_token = response.json()["access_token"]
            return access_token
        
        else:
            print("Error getting access token:", response.text)
            return None


    def get_flights_from_airports_and_dates(self, orig_dest_pairs, departure_date, return_date, min_price, max_price):
        token = self.__get_access_token()
        if token:
            flights = []
            headers = {
                    'Authorization': f'Bearer {token}'
            }
            for airport_orig, airport_dest in orig_dest_pairs:
                print(f"Querying flights for: {airport_orig} and {airport_dest}...")
                url = f"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode={airport_orig}&destinationLocationCode={airport_dest}&departureDate={departure_date}&returnDate={return_date}&adults=2&max=5"
                response = requests.get(url, headers=headers)
                #seen_flights = set()

                if response.status_code == 200:
                    json_response = response.json()
                    for flight in json_response["data"]:
                        price_info = flight["price"]
                        if float(price_info["total"]) >= min_price and float(price_info["total"]) <= max_price:
                            price = {
                                "currency": price_info["currency"],
                                "total": price_info["total"],
                            }

                            out_itinerary = flight["itineraries"][0]    # Only 1 way ticket
                            itinerary_details = {
                                "total_duration": out_itinerary["duration"],
                                "segments": []
                            }

                            for segment in out_itinerary["segments"]:
                                segment_details = {
                                    "origin": segment["departure"]["iataCode"],
                                    "destination": segment["arrival"]["iataCode"],
                                    "departure_time": segment["departure"]["at"],
                                    "arrival_time": segment["arrival"]["at"],
                                    "duration": segment["duration"],
                                }
                                itinerary_details["segments"].append(segment_details)
                                
                            new_flight = {
                                "originAirport": airport_orig,
                                "destinationAirport": airport_dest,
                                "itinerary": itinerary_details,
                                "price": price
                            }
                            if new_flight not in flights:
                                flights.append(new_flight)

                else:
                    raise Exception("Error retrieving flights with code: " + str(response.status_code))

            return flights