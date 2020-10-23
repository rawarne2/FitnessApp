# Fitness App

This project will be a fitness app for users to create or get recommended workouts based on a library of instructional exercise videos. 

## Tech Stack

- Authentication/Authorization: 
  - aws cognito
- Database
  - postgres
- Front End
  - React Native
    - Typescript
    - GraphQL
    - Redux
  - Expo
- Back End
  - Graphene
  - SQLAlchemy
  - Flask


## Current progress
  - sign up, email verification, sign in working
  - basic redux store setup
  - basic Create Profile page
  - user can be created and searched for through graphql query

## Up Next
  - create user from front end
  - create models and schema for exercise library
  - create ui layout for exercise library


## How to run

- To start the front end in expo, run 'expo start'
- To run the react dev tools, in another terminal, run 'react-devtools'. In a browser, go to http://localhost:19001/debugger-ui/ and make sure that the sure that the dropdown in the top left corner of the Chrome console says debuggerWorker.js
- run app/app.py to start the backend 