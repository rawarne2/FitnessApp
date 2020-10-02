import React, { useState, useEffect } from "react";
import { View, Text, Button } from "native-base";
import { Auth } from "aws-amplify";
import InputComponent from "./shared/InputComponent";
import { StyleSheet, Picker } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import Slider from "@react-native-community/slider";
import { darkBlue, red } from "../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import User, { UserState } from "../redux/reducers/userReducer";
import { setCurrentUser } from "../redux/actions";

export default function CreateProfile(props: any) {
  // set up user then see if user has created profile

  const [awsUser, setAwsUser] = useState(null);

  useEffect(() => {
    Auth.currentUserInfo().then(user => {
      setAwsUser(user)
    })
  }, [])

  const { handleSubmit, control, errors } = useForm();

  let dispatch = useDispatch();
  let user = useSelector((user: UserState) => user)

  const onSubmit = (values: any) => {
    console.log(values);
    dispatch(setCurrentUser({
      firstName: values.firstName,
      lastName: values.lastName,
      height: values.height,
      sub: awsUser?.attributes?.sub,
      weight: values.weight,
      fitnessLevel: values.fitnessLevel
    }))
  }
  const numberToFeet = (input: number) => {
    const feet = Math.floor(input / 12);
    const inches = input % 12;
    return `${feet}' ${inches}"`;
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid keyboardShouldPersistTaps="always">
        <Text style={styles.header}>Create Profile</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }: any) => (
            <InputComponent
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              name={"First Name"}
              errors={errors.firstName && "First Name is required"}
            />
          )}
          name="firstName"
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }: any) => (
            <InputComponent
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              name={"Last Name"}
              errors={errors.lastName && "Last Name is required"}
            />
          )}
          name="lastName"
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }: any) => (
            <View>
              <Text>Weight: {value}{value >= 350 ? '+' : null} lbs</Text>
              <Slider
                style={styles.heightInput}
                minimumValue={75}
                maximumValue={350}
                minimumTrackTintColor={darkBlue}
                maximumTrackTintColor={red}
                value={value}
                onValueChange={value => onChange(value)}
                step={1}
              />
            </View>
          )}
          name="weight"
          rules={{ required: true }}
          defaultValue={150}
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }: any) => (
            <View>
              <Text>Height: {numberToFeet(value)}</Text>
              <Slider
                style={styles.heightInput}
                minimumValue={30}
                maximumValue={96}
                minimumTrackTintColor={darkBlue}
                maximumTrackTintColor={red}
                value={value}
                onValueChange={value => onChange(value)}
                step={1}
              />
            </View>
          )}
          name="height"
          rules={{ required: true }}
          defaultValue={66}
        />
                <Controller
          control={control}
          render={({ onChange, onBlur, value }: any) => (
            <View>
              <Text>Current Fitness level: {value}</Text>
              <Slider
                style={styles.heightInput}
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor={darkBlue}
                maximumTrackTintColor={red}
                value={value}
                onValueChange={value => onChange(value)}
                step={1}
              />
            </View>
          )}
          name="fitnessLevel"
          rules={{ required: true }}
          defaultValue={0}
        />
        <Button onPress={handleSubmit(onSubmit)}>
          <Text>Submit</Text>
        </Button>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: "80%",
    marginVertical: 40,
  },
  heightContainer: {
    display: "flex",
    flexDirection: "row",
    width: 240,
    justifyContent: "space-between"
  },
  heightInput: {
    height: 40, 
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 40
  }
});

// first name, last name, weight, height, fitness level (1-5)
// fitness level is used to set defaults for that user for difficulty of exercises since every exercise is rated 1-5 for difficulty
