import React, { useState } from "react";
import {
  Text,
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";

const { width, height } = Dimensions.get("window");

function ConfirmLogout({ navigation, onPress }) {
  return (
    <View style={styles.bigger}>
      <View style={styles.big}>
        <Text style={{color:colors.white}}>Logout Now</Text>
        <TouchableOpacity
          style={{
            width: "80%",
            height: "50%",
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
          onPress={() => onPress()}
        >
          <Text style={{color:colors.white}}>LogOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  big: {
    width: "80%",
    height: "50%",
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    // postion: "absolute",
  },
  bigger: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"red",
    height: (50 * width) / 100,
    top:"10%"
  },
});
export default ConfirmLogout;
