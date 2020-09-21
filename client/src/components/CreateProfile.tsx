import React from 'react';
import { View, Text, Button } from 'native-base';
import { Auth } from 'aws-amplify';
import InputComponent from './shared/InputComponent';
import { StyleSheet } from 'react-native';

export default function CreateProfile(props: any) {
  // set up user then see if user has created profile
  console.log({Auth})

  const handleInput = (input: any) => {
    console.log({input})
  }
  return (
    <View style={styles.container}>
      <Text>Create Profile</Text>
      <InputComponent 
        value={''}
        onChangeText={(text) => handleInput(text)}
        name={'First Name'}
      />
      <InputComponent 
        value={''}
        onChangeText={(text) => handleInput(text)}
        name={'Last Name'}
      />
      <InputComponent 
        value={''}
        onChangeText={(text) => handleInput(text)}
        name={'Weight (lbs)'}
      />
      <Text>Height</Text>
      <View style={styles.heightContainer}>
        <InputComponent 
          value={''}
          onChangeText={(text) => handleInput(text)}
          name={'Feet'}
          style={styles.heightInput}
        />
        <InputComponent 
          value={''}
          onChangeText={(text) => handleInput(text)}
          name={'Inches'}
          style={styles.heightInput}
        />
      </View>
      <Button>
        <Text>What's a pushup?</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 240,
  },
  heightContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 240,
    justifyContent: 'space-between'
  },
  heightInput: {
    width: '45%', 
  }
})