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
        const user = await Auth.forgotPassword(state.email)
        await props.onStateChange("confirmSignUp", user)
      } catch (error) {
        Alert.alert(error.message)
      }
    }
  }

  if(props.authState === 'forgotPassword') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Reset your password</Text>
        <InputComponent
          value={state.email}
          onChangeText={text => setState({ ...state, email: text })} 
          errors={errors.email}
          name={'Email'}
        />
        <Button
          block
          style={styles.button}
          onPress={() => onSubmit()}
          accessibilityLabel="Send"
        >
          <Text style={styles.buttonText}>Send</Text>
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