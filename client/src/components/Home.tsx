import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'native-base';
import { Auth } from 'aws-amplify';
import CreateProfile from './CreateProfile';

const Home = (props: any) => {
  console.log({props, Auth})
  // if !createdProfile ? create profile : go to main screen
  if(props.authState === 'signedIn') return (
    <View>
      {/* <Button onPress={() => Auth.signOut()}>
        <Text>Sign Out</Text>
      </Button> */}
      <CreateProfile />
    </View>
  )
  return <></>
};

export default Home;