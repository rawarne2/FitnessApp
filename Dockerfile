# FROM python:3.7-alpine AS api
# WORKDIR /code
# RUN pip install tornado
# RUN pip install graphene_sqlalchemy
# RUN pip install graphene
# RUN pip install sqlalchemy
# RUN pip install PyJWT

# COPY . .
# CMD [ "python", "./app/app.py" ]
# EXPOSE 8080

FROM node
EXPOSE 9000
# WORKDIR /work/app/client

USER node