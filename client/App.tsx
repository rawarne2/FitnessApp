import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from 'aws-amplify-react-native';
import SignUp from './src/components/auth/SignUp';
import SignIn from './src/components/auth/SignIn';
import Home from './src/components/Home';
import ConfirmSignUp from './src/components/auth/ConfirmSignUp';
import ForgotPassword from './src/components/auth/ForgotPassword';
import ConfirmSignIn from './src/components/auth/ConfirmSignIn';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Root } from "native-base";

const client = new ApolloClient({
  uri: 'http://127.0.0.1:5000/graphql',  // change to allow productions uri and get from env
  cache: new InMemoryCache()
});

Amplify.configure(awsExports)

// figure out password attempts exceeded
export default function App() {
  return (
    <Root>
      <ApolloProvider client={client}>
        <Provider store={store}>
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
        </Provider>
      </ApolloProvider>
    </Root>
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
