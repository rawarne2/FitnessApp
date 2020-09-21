import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "native-base";
import { validateEmail } from '../../validation';
import { Auth } from "aws-amplify";
import { red, darkBlue } from '../../styles/colors';
import InputComponent from "../shared/InputComponent";


function ConfirmSignUp(props: any) {

  const [state, setState] = useState({
    email: '',
    code: '',
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
        const user = await Auth.confirmSignUp(state.email, state.code)
        props.onStateChange("signedIn", user)
      } catch (error) {
        Alert.alert(error.message)
      }
    }
  }

  if(props.authState === 'confirmSignUp') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Code</Text>
        <InputComponent
          value={state.email}
          onChangeText={text => setState({ ...state, email: text })} 
          errors={errors.email}
          name={'Email'}
        />
        <InputComponent
          value={state.code}
          onChangeText={text => setState({ ...state, code: text })} 
          name={'Code'}
        />
        <Button
          block
          style={styles.button}
          onPress={() => onSubmit()}
          accessibilityLabel="confirm"
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </Button>
        <View style={styles.links}>
          <Button
              transparent
              color="black"
              onPress={() => props.onStateChange("signUp", {})}
              accessibilityLabel="sign up"
            >
              <Text>Sign Up</Text>
            </Button>
            <Button
              transparent
              color="black"
              onPress={() => props.onStateChange("signIn", {})}
              accessibilityLabel="back to confirm code"
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

export default ConfirmSignUp;

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