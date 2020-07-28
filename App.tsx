import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { Authenticator } from 'aws-amplify-react-native';

Amplify.configure(config)

function Home (props:any) {
  if(props.authState === 'signedIn') return <Text>Home</Text>
  else return <Text>Please Login</Text>
}

export default function App() {
  return (
    <View style={styles.container}>
      <Authenticator usernameAttributes="email">
        <Home />
      </Authenticator>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
