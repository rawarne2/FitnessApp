from flask import Flask
from flask_graphql import GraphQLView

from schema import schema
from database import db_session, recreate_database

app = Flask(__name__)
app.debug = True

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True # for having the GraphiQL interface
    )
)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    # recreate_database()
    app.run(host="192.168.1.142", port="5000")
