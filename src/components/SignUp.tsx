import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Button, Input, Item } from "native-base";
import PropTypes from 'prop-types';


function SignUp(props: any) {

  const [state, setState] = useState({
    email: '',
    password: '',
  })

  if(props.authState === 'signUp') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Item underline style={styles.item}>
          <Input
            style={styles.input}
            placeholder="Email"
            value={state.email}
            onChangeText={text => setState({ ...state, email: text })}
          />
        </Item>
        <Item underline style={styles.item}>
          <Input
            style={styles.input}
            placeholder="Password"
            value={state.password}
            onChangeText={text => setState({ ...state, password: text })}
          />
        </Item>
        <Button
          block
          style={styles.button}
          onPress={() => console.log('Submit button pressed')}
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
  }, 
  button: {
    backgroundColor: 'lightseagreen', 
    height: 40,
    margin: 16,
  },
  buttonText: {
    textTransform: 'uppercase',
  }, 
  input: {
    height: 40,
    borderColor: 'blue', 
    borderBottomWidth: 1,
    marginBottom: 20,
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
    width: '75%'
  }
})