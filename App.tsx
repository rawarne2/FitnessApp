import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { Authenticator, SignIn, ConfirmSignIn, ConfirmSignUp, ForgotPassword } from 'aws-amplify-react-native';
import SignUp from './src/components/SignUp';

Amplify.configure(config)

function Home (props:any) {
  if(props.authState === 'signedIn') return <Text>Home</Text>
  else return <></>
}

export default function App() {
  return (
    <View style={styles.container}>
      <Authenticator
        hideDefault={true}
        authState="signIn"
        onStateChange={authState => console.log('authState: ', authState)}
        usernameAttributes="email">
        <Home />
        <SignUp />
        <SignIn />
        <ConfirmSignUp />
        <ConfirmSignIn />
        <ForgotPassword />
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
