import re

"""
Class for utility functions
"""
class Utils():
    def __init__(self):
        pass

    @classmethod
    def email_validation(cls, email: str) -> bool:
        pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if re.match(pattern, email):
            return True
        return False
