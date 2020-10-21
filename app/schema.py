from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import graphene
from graphene import Schema, String, List, Field, ID, DateTime, ObjectType
# from graphql.type.definition import GraphQLResolveInfo
from tornado.escape import to_unicode
from datetime import datetime
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import User as UserModel


class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay.Node, )


class UserType(ObjectType):
    email_address = String(required=True)
    last_login = DateTime()
    id = ID()


class Query(ObjectType):
    node = relay.Node.Field()

    all_users = SQLAlchemyConnectionField(User.connection)

    user = Field(User, email_address=String(required=True))

    @staticmethod
    def resolve_user(self, info, email_address):
        query = User.get_query(info)

        return query.filter(UserModel.email_address == email_address).first()


class CreateUser(graphene.Mutation):
    class Arguments:
        email_address = graphene.String()
        # last_login = graphene.DateTime()
        # id = graphene.ID()

    user = Field(lambda: UserType)

    @staticmethod
    def mutate(self, info, email_address):
        # if info.context.get('is_admin'):
        #     email_address = email_address.upper()
        # user = UserType(email_address=email_address, last_login=datetime.now())
        # return CreateUser(user=user)
        return CreateUser(user=UserModel.create(self, email_address=email_address))


class Mutation(ObjectType):
    create_user = CreateUser.Field()


schema = Schema(query=Query, mutation=Mutation)
# schema.execute(context_value={'session': db_session})  # may not be necessary https://docs.graphene-python.org/projects/sqlalchemy/en/latest/tips/
# result = schema.execute(
#     '''
#     {
#         users {
#             edges {
#                 node {
#                     id
#                     emailAddress
#                     lastLogin
#                 }
#             }
#         }
#     }
#     '''
#     # variable_values={'name': 'Rashaun'}
# )

# result = schema.execute(
#     '''
#     mutation createUser($emailAddress: String) {
#         createUser(emailAddress: $emailAddress){
#             user {
#                 emailAddress
#             }
#         }
#     }
#     ''',
#     variable_values={'emailAddress': 'email5@gmail.com'},
#     # context={'is_admin': True}
# )
# if result.errors:
#     print(result.errors)
# else:
#     items = dict(result.data.items())
#     print(json.dumps(items, indent=4))


