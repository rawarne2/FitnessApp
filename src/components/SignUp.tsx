import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, Alert } from "react-native";
import { Button, Input, Item } from "native-base";
import PropTypes from 'prop-types';
import { validateEmail, validatePassword } from '../validation';
import { Auth } from "aws-amplify";


function SignUp(props: any) {

  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  async function onSubmit() {
    const emailError = validateEmail(state.email)
    const passwordError = validatePassword(state.password)
    if(emailError || passwordError) {
      setErrors({email: emailError, password: passwordError})
    } else {
      try {
        const user = await Auth.signUp({
          username: state.email,
          password: state.password
        })
        console.log(user)
      } catch (error) {
        Alert.alert(error.message)
      }
    }
  }

  if(props.authState === 'signUp') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Item underline style={styles.item}>
          <Input
            style={styles.input}
            placeholder="Email"
            value={state.email}
            onChangeText={text => setState({ ...state, email: text.toLowerCase() })}
          />
        </Item>
        <Text style={styles.error}>{errors.email}</Text>
        <Item underline style={styles.item}>
          <Input
            style={styles.input}
            placeholder="Password"
            value={state.password}
            onChangeText={text => setState({ ...state, password: text })}
          />
        </Item>
        <Text style={styles.error}>{errors.password}</Text>
        <Button
          block
          style={styles.button}
          onPress={() => onSubmit()}
          accessibilityLabel="back to signIn"
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Button>
        <View style={styles.links}>
          <Button
            transparent
            onPress={() => props.onStateChange("signIn", {})}
            accessibilityLabel="back to signIn"
          >
            <Text>back to Sign In</Text>
          </Button>
          <Button
            transparent
            color="black"
            onPress={() => props.onStateChange("confirmSignUp", {})}
            accessibilityLabel="back to confirm code"
          >
            <Text>confirm a code</Text>
          </Button>
        </View>
      </View>
    );
  } 
  else {  // prevents error
    return <></>
  }

}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    padding: 48,
  }, 
  button: {
    backgroundColor: 'lightseagreen', 
    height: 40,
    marginVertical: 16,
  },
  buttonText: {
    textTransform: 'uppercase',
  }, 
  input: {
    height: 40,
    borderColor: 'blue', 
    borderBottomWidth: 1,
    marginBottom: 8,
  }, 
  links: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center', 
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
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