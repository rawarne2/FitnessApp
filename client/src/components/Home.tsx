import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { Auth } from 'aws-amplify';
import CreateProfile from './CreateProfile';
import { useDispatch, useSelector } from "react-redux";
import { gql, useLazyQuery } from '@apollo/client';
import { setCurrentUser } from '../redux/actions';
import { RootState } from '../redux/reducers/index';

const USER_QUERY = gql`
  query user($sub: String!){
  user(sub: $sub) {
    sub
    emailAddress
    firstName
    lastName
    lastLogin
    height
    weight
  }
}
`

const Home = (props: any) => {
  console.log({props, Auth})

  let dispatch = useDispatch();
  let userState = useSelector((state: RootState) => state.user)
  const [userQuery, { loading, data }] = useLazyQuery(USER_QUERY)
  
  useEffect(() => {
    Auth.currentUserInfo().then(user => {
      userQuery({variables: {sub: user?.attributes?.sub,}})
    }).catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    if(data) {
      dispatch(setCurrentUser({
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      height: data.user.height,
      weight: data.user.weight,
      sub: data.user.sub,
    }))
    }
  }, [data])
  console.log({ loading, data, userState })

  // userQuery({variables: {sub: sub}})
  // AsyncStorage.getAllKeys().then(keys => console.log(keys))
  // TODO: if user has sub (a value I need to create) in AsyncStorage or Auth.currentUserInfo,
  //  then they go to the app. Otherwise they need to create a profile. When submitting
  // at createProfile, add this value to AsyncStorage. This will allow users
  // to not need to sign in with email, but if they delete the app, they will
  // not be able to access their data

  if(props.authState === 'signedIn') {
    return (userState.sub && userState.firstName) ? (  // ensures user created a profile
        <Text>Hello World</Text>
      ) : (
        <View>
          {/* <Button onPress={() => Auth.signOut()}>
            <Text>Sign Out</Text>
          </Button> */}
          <CreateProfile userState={userState} />
        </View>
    )}
  return <></>
};

export default Home;