import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "native-base";
import { validateEmail } from '../../validation';
import { Auth } from "aws-amplify";
import { red, darkBlue } from '../../styles/colors';
import InputComponent from "../shared/InputComponent";


function ForgotPassword(props: any) {

  const [state, setState] = useState({
    email: '',
    resetSent: false,
    user: '',
    code: '',
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
        if(state.resetSent) {
          await Auth.forgotPasswordSubmit(state.email, state.code, state.password)
          props.onStateChange("signIn", state.user)
          setState({
            email: '',
            resetSent: false,
            user: '',
            code: '',
            password: '',
          })
        }
        const user = await Auth.forgotPassword(state.email)
        setState({...state, user: user})
        setState({...state, resetSent: true})
      } catch (error) {
        Alert.alert(error.message)
      }
    }
  }

  if(props.authState === 'forgotPassword') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Reset your password</Text>
        {state.resetSent ? (
          <View>
            <InputComponent
              value={state.code}
              onChangeText={text => setState({ ...state, code: text })}
              name={"Confirmation Code"}
            />
            <InputComponent
              value={state.password}
              onChangeText={text => setState({ ...state, password: text })}
              name={"Password"}
            />
          </View>
        ) : (
          <InputComponent
          value={state.email}
          onChangeText={text => setState({ ...state, email: text })}
          errors={errors.email}
          name={"Email"}
        />
        )}
        <Button
          block
          style={styles.button}
          onPress={() => onSubmit()}
          accessibilityLabel="Send"
        >
          <Text style={styles.buttonText}>{state.resetSent ? 'Submit' : 'Send?'}</Text>
        </Button>
        <View style={styles.links}>
          <Button
            transparent
            color="black"
            onPress={() => props.onStateChange("signIn", {})}
            accessibilityLabel="sign in"
          >
            <Text>Back to Sign In</Text>
          </Button>
        </View>
      </View>
    );
  } 
  else {  // prevents error
    return <></>
  }
}

export default ForgotPassword;

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