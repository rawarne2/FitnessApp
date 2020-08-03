import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "native-base";
import { Auth } from "aws-amplify";
import { red, darkBlue } from '../../styles/colors';
import InputComponent from "../shared/InputComponent";


function ConfirmSignIn(props: any) {

  const [state, setState] = useState({
    code: '',
  })

  async function onSubmit() {
    try {
      const user = await Auth.confirmSignIn(props.username, state.code)
      await console.log('user >>>>>>>>', user)
      await props.onStateChange("confirmSignUp", user)
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  if(props.authState === 'confirmSignIn') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Reset your password</Text>
        <InputComponent
          value={state.code}
          onChangeText={text => setState({ ...state, code: text })}
          name={'Code'}
        />
        <Button
          block
          style={styles.button}
          onPress={() => onSubmit()}
          accessibilityLabel="Confirm"
        >
          <Text style={styles.buttonText}>Confirm</Text>
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

export default ConfirmSignIn;

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