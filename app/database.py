from sqlalchemy.orm import (scoped_session, sessionmaker, relationship,
                            backref)
import psycopg2

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine


engine = # TODO: add environment variables
# Scheme: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"  get from env
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
# We will need this for querying
Base.query = db_session.query_property()

Session = sessionmaker(bind=engine)

def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

