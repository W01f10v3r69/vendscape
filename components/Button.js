import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import colors from "../config/colors";

const { width, height } = Dimensions.get("window");
function Button({ name, color, background, onPress, icon }) {
  return (
    <View style={styles.container}>
      {background == undefined ? (
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.primarytransperant }]}
          delayPressIn={50}
          onPress={onPress}
        >
          <Text style={styles.text}> {name}</Text>
        </TouchableOpacity> 
      ) : (
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: background }]}
          delayPressIn={50}
          onPress={onPress}
        >
           {/* <Image style={styles.img1} source={icon} /> */}

          {color == undefined ? (
            <Text style={styles.text}>{name}</Text>
          ) : (
            <Text style={[styles.text, { color: color }]}>{name}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: (15 * width) / 100,
    justifyContent: "center",
    alignItems: "center",
  },

  btn: {
    width: "90%",
    height: " 80%",
    backgroundColor: colors.primarytransperant,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  text: {
    color: colors.white,
    fontWeight: "700",
  },
  location1: {
    marginRight: "2%",
  },
  img1: {
    width: (7 * width) / 100,
    height: (7 * width) / 100,
    marginRight: "2%",
  },
});

export default Button;
