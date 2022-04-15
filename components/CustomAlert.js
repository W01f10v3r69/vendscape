import React from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  TextInput,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
import colors from "../config/colors";
function CustomAlert({ status, text }) {
  return status !== "bad" ? (
    <View style={styles.alertbig}>
      <View style={styles.alert}>
        <Text style={styles.alerttext}>{text}</Text>
      </View>
    </View>
  ) : (
    <View style={styles.alertbig}>
      <View style={styles.alertbad}>
        <Text style={styles.alerttext}>{text}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  alertbig: {
    width: "100%",
    height: (20 * width) / 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: (-20 * width) / 100,
    elevation: 90,
  },
  alert: {
    width: "80%",
    backgroundColor: "green",
    height: (20 * width) / 100,
    borderRadius: (5 * width) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  alertbad: {
    width: "80%",
    backgroundColor: "red",
    height: (20 * width) / 100,
    borderRadius: (10 * width) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  alerttext: {
    color: colors.white,
    fontSize: (5 * width) / 100,
    fontWeight: "700",
    textAlign:"center",
    width:"95%",
  },
});
export default CustomAlert;
