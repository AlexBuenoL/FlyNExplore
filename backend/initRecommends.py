import json
import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from Domain.Recommend import Recommend  
from dotenv import load_dotenv
import os

def load_recommendations_from_json(json_path):
    with open(json_path, "r", encoding="utf-8") as file:
        data = json.load(file)
        return data


def initRecommends():
    rec_data = load_recommendations_from_json("recommends.json")

    with Session() as session:
        for item in rec_data:
            name = item.get("name")
            desc = item.get("description")
            img_path = item.get("image")
            print(name)
            print(desc)
            print(img_path)

            existing_recommendation = session.query(Recommend).filter_by(name=name).first()

            if existing_recommendation:
                existing_recommendation.description = desc
                existing_recommendation.img_path = img_path
                print(f"Actualizado: {name}")
            else:
                new_recommendation = Recommend(name=name, description=desc, img_path=img_path)
                session.add(new_recommendation)
                print(f"Insertado: {name}")

        # Confirmar los cambios
        session.commit()


if __name__ == "__main__":
    load_dotenv()
    db = sa.create_engine(os.getenv('DB_URL'))
    Session = sessionmaker(bind=db)

    initRecommends()
