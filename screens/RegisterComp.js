import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Keyboard,
  TouchableOpacity,
  Animated,
} from "react-native";
// import RadioForm from "react-native-simple-radio-button";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { credentialsContext } from "../components/CredentialsContext";
import SubmitButton from "../components/SubmitButton";
import colors from "../config/colors";
import TextLink from "../components/TextLink";
import AppSeparator from "../components/AppSeparator";
import FormLabel from "../components/FormLabel";
import FormContainer from "../components/FormContainer";
import AppFormField from "../components/AppFormField";
import AppActivityIndicator from "../components/AppActivityIndicator";
import CustomAlert from "../components/CustomAlert";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoginScreen from "./LoginComp";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function RegisterScreen({ navigation, onPress, register, registerResponse }) {
  const [submitting, setSubmitting] = useState(false);
  const [showText, setShowText] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [onLogin, setOnLogin] = useState(0);

  const [alerttext, setalerttext] = useState("");
  const [stats, setstats] = useState("");
  // const { storedCredentials, setStoredCredentials } =
  //   useContext(credentialsContext);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  }, []);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true, // Add This line
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true, // Add This line
    }).start();
  };

  const _keyboardDidShow = () => setShowText(false);
  const _keyboardDidHide = () => setShowText(true);

  //const for radio button label texts
  const account_type = [
    { label: "Tourist", value: 0 },
    { label: "Tour Guide", value: 1 },
  ];

          register();
 

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@login_key", value);
    } catch (e) {
      // saving error
    }
  };

  const signup = (credentials) => {
    let email = credentials.email
    let name = credentials.name
    let photoUrl = "https://picsum.photos/200/300";
    const url = "https://floating-wildwood-95983.herokuapp.com/user/signup";
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== "SUCCESS") {
          console.log("if: " + message, status);
          setalerttext(message);
          setstats("bad");
          fadeIn();
          setTimeout(() => {
            fadeOut();
          }, 3000);
          setSubmitting(false);
        } else {
          // console.log(...data[0);
          console.log(data);
          setalerttext(message);
          setstats("");
          fadeIn();
          setTimeout(() => {
            fadeOut();
          }, 3000);
          setSubmitting(false);
          // storeData(JSON.stringify({ email, name, photoUrl }));
          storeData(JSON.stringify({ email, name, photoUrl,id:data._id }));
          register();
          // checklogin()
        }
      })
      .catch((error) => {
        console.log("catch:" + error);
      });
  };

  
  return onLogin==0 ? 
  (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity onPress={() => setOnLogin(1)}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            color={colors.primary}
            size={60 * 0.5}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Register</Text>
        <Animated.View
          style={{
            opacity: fadeAnim,
            width: "100%",
          }}
        >
          <CustomAlert text={alerttext} status={stats} />
        </Animated.View>
        <FormContainer
          validationSchema={validationSchema}
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(values) => {
            setSubmitting(true);
            signup(values);
          }}
        >
          <FormLabel>Your Full Name:</FormLabel>
          <AppFormField
            // onChangeText={(text) => setFname(text)}
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            placeholder="Full Name"
            name="name"
            textContentType="name"
          />

          <FormLabel>Your Email:</FormLabel>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            placeholder="Email"
            name="email"
            textContentType="emailAddress"
            //  onChangeText={(text) => setEmail(text)}
          />

          <FormLabel>Password:</FormLabel>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="Password"
            textContentType="password"
            name="password"
            secureTextEntry={true}
            //  onChangeText={(text) => setPassword(text)}
          />

          <FormLabel>Confirm Password:</FormLabel>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="Confirm Password"
            textContentType="password"
            name="confirmPassword"
            secureTextEntry={true}
          />

          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={{ color: "red" }} type={messageType}>
              {message}
            </Text>
          </View>

          {submitting ? (
            <SubmitButton
              title={<AppActivityIndicator size="small" color={colors.white} />}
            />
          ) : (
            <>
            <SubmitButton title="Register" />
            </>
          )}
        </FormContainer>
      </View>
      {showText && (
        <View style={styles.bottomView}>
          <AppSeparator />
          <Text style={styles.bottomText}>
            Already have an account?{" "}
            <TextLink
              title="Login"
              onPress={() => setOnLogin(1)}
              style={styles.textLink}
            />
          </Text>
        </View>
      )}
    </View>
  ):
  <LoginScreen/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
    backgroundColor: colors.dark,
  },

  formContainer: {
    flex: 1,
    width: "90%",
    paddingTop: "12%",
  },

  pageTitle: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 4,
    paddingBottom: 15,
    textAlign: "center",
  },

  bottomView: {
    width: "100%",
    position: "absolute",
    bottom: 11,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: colors.midGray,
  },

  bottomText: {
    color: colors.mediumGray,
  },

  textLink: {
    color: colors.primary,
    fontWeight:"700"
  },
});

export default RegisterScreen;
