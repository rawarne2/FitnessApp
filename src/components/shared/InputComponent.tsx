import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Input, Item } from "native-base";
import PropTypes from "prop-types";
import { darkBlue } from "../../styles/colors";

export default function InputComponent(props: InputComponent.propTypes) {
  return (
    <View>
      <Item style={styles.item}>
      <Input
        style={styles.input}
        placeholder={props.name}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCapitalize={'none'}
        secureTextEntry={props.secureTextEntry}
      />
    </Item>
    <Text style={styles.error}>{props.errors}</Text>
    </View>

  );
}

InputComponent.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  errors: PropTypes.string,
  name: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: darkBlue,
    borderBottomWidth: 1,
    marginBottom: 8
  },
  item: {
    borderBottomWidth: 0
  },
  error: {
    color: 'red',
    paddingBottom: 12,
    marginLeft: 4,
  }
});
