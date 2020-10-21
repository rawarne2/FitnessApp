from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base, db_session

class User(Base):
    __tablename__ = 'users'
    name = 'User'
    id = Column(Integer, primary_key=True)
    email_address = Column(String)
    last_login = Column(DateTime, default=datetime.now())

    def create(self, email_address: String):
        new_user = User(email_address=email_address, last_login=datetime.now())
        db_session.add(new_user)
        db_session.commit()
        db_session.close()
