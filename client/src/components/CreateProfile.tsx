import React, { useState } from "react";
import { View, Text, Button } from "native-base";
import { Auth } from "aws-amplify";
import InputComponent from "./shared/InputComponent";
import { StyleSheet, Picker } from "react-native";

export default function CreateProfile(props: any) {
  // set up user then see if user has created profile
  console.log({ Auth });

  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    weight: "",
    height: ""
  });
  const [selectedHeight, setSelectedHeight] = useState({ feet: 5, inches: 0 });

  const handleInput = (input: any) => {
    console.log({ input });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Profile</Text>
      <InputComponent
        value={""}
        onChangeText={text => handleInput(text)}
        name={"First Name"}
        key={"firstName"}
      />
      <InputComponent
        value={""}
        onChangeText={text => handleInput(text)}
        name={"Last Name"}
        key={"lastName"}
      />
      <InputComponent
        value={""}
        onChangeText={text => handleInput(text)}
        name={"Weight (lbs)"}
        key={"weight"}
      />
      <Text style={{paddingBottom: 20}}>Height</Text>
      <View style={styles.heightContainer}>
        <View>
          <Text style={{ textAlign: "center" }}>Feet</Text>
          <Picker
            selectedValue={selectedHeight.feet}
            style={{ width: 120, height: 140 }}
            key={"heightFeet"}
            itemStyle={{ height: 120 }}
            onValueChange={itemValue =>
              setSelectedHeight({ ...selectedHeight, feet: itemValue })
            }
          >
            {[3, 4, 5, 6, 7].map(i => (
              <Picker.Item label={i.toString()} value={i} />
            ))}
          </Picker>
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>Inches</Text>
          <Picker
            selectedValue={selectedHeight.inches}
            style={{ width: 120, height: 140 }}
            key={"heightInches"}
            itemStyle={{ height: 120 }}
            onValueChange={itemValue =>
              setSelectedHeight({ ...selectedHeight, inches: itemValue })
            }
          >
            {[...Array(12).keys()].map(i => (
              <Picker.Item label={i.toString()} value={i} />
            ))}
          </Picker>
        </View>
      </View>
      <Button>
        <Text>Submit</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: 240,
  },
  heightContainer: {
    display: "flex",
    flexDirection: "row",
    width: 240,
    justifyContent: "space-between"
  },
  heightInput: {
    width: "45%"
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 40
  }
});
