from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base, db_session


class User(Base):
    __tablename__ = 'users'
    name = 'User'
    sub = Column(String, primary_key=True)
    email_address = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    last_login = Column(DateTime, default=datetime.now())
    height = Column(Integer)
    weight = Column(Integer)

    def create(self, email_address: String, first_name: String, last_name: String, sub: String, height: Integer,
               weight: Integer):
        new_user = User(email_address=email_address, first_name=first_name, last_name=last_name, sub=sub, height=height,
                        weight=weight,
                        last_login=datetime.now())
        db_session.add(new_user)
        db_session.commit()
        db_session.close()
