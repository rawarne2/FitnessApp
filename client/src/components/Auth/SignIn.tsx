import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "native-base";
import { validateEmail } from '../../validation';
import { Auth } from "aws-amplify";
import { red, darkBlue } from '../../styles/colors';
import InputComponent from "../shared/InputComponent";


function SignIn(props: any) {

  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
  })

  async function onSubmit() {
    const emailError = validateEmail(state.email)
    if(emailError) {
      setErrors({email: emailError})
    } else {
      try {
        const user = await Auth.signIn({
          username: state.email,
          password: state.password
        })
      } catch (error) {
        Alert.alert(error.message)
      }
    }
  }

  if(props.authState === 'signIn') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <InputComponent
          value={state.email}
          onChangeText={text => setState({ ...state, email: text })} 
          errors={errors.email}
          name={'Email'}
        />
        <InputComponent
          value={state.password}
          onChangeText={text => setState({ ...state, password: text })} 
          name={'Password'}
          secureTextEntry={true}
        />
        <Button
          block
          style={styles.button}
          onPress={() => onSubmit()}
          accessibilityLabel="submit"
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Button>
        <View style={styles.links}>
          <Button
              transparent
              color="black"
              onPress={() => props.onStateChange("signUp", {})}
              accessibilityLabel="back to confirm code"
            >
              <Text>Sign Up</Text>
            </Button>
            <Button
              transparent
              color="black"
              onPress={() => props.onStateChange("forgotPassword", {})}
              accessibilityLabel="back to confirm code"
            >
              <Text>Forgot Password</Text>
            </Button>
        </View>
      </View>
    );
  } 
  else {  // prevents error
    return <></>
  }
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    padding: 48,
  }, 
  button: {
    backgroundColor: red, 
    height: 40,
    marginVertical: 16,
  },
  buttonText: {
    textTransform: 'uppercase',
  }, 
  input: {
    height: 40,
    borderColor: darkBlue, 
    borderBottomWidth: 1,
    marginBottom: 8,
  }, 
  links: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
  },
  title: {
    textAlign: 'center', 
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    paddingBottom: 40,
  },
  item: {
    borderBottomWidth: 0,
  },
  error: {
    color: 'red',
    paddingBottom: 12,
    marginLeft: 4,
  }
})