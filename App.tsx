import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator, ConfirmSignIn, ConfirmSignUp, ForgotPassword } from 'aws-amplify-react-native';
import SignUp from './src/components/Auth/SignUp';
import SignIn from './src/components/Auth/SignIn';
import Home from './src/components/Home';
Amplify.configure(awsExports)

// figure out password attempts exceeded
export default function App() {
  return (
    <View style={styles.container}>
      <Authenticator
        hideDefault={true}
        authState="signIn"
        onStateChange={authState => console.log('authState: ', authState,)}
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
