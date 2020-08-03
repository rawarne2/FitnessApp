import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'native-base';
import { Auth } from 'aws-amplify';

const Home = (props: any) => {
  console.log({props, Auth})
  if(props.authState === 'signedIn') return (
    <View>
      <Text>Home</Text>
      <Button onPress={() => Auth.signOut()}>
        <Text>Sign Out</Text>
      </Button>
    </View>
  )
  return <></>
};

export default Home;