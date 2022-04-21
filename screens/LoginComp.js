import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  Animated
} from "react-native";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import RadioForm from "react-native-simple-radio-button";
import * as Linking from 'expo-linking';
// import { credentialsContext } from "../components/CredentialsContext";
import colors from "../config/colors";
import TextLink from "../components/TextLink";
import AppSeparator from "../components/AppSeparator";
import FormLabel from "../components/FormLabel";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import FormContainer from "../components/FormContainer";
import AppActivityIndicator from "../components/AppActivityIndicator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomAlert from "../components/CustomAlert";
import RegisterScreen from "./RegisterComp";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function LoginScreen({ navigation,onPress,login,register,registerResponse }) {
  const [submitting, setSubmitting] = useState(false);
  const [showText, setShowText] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [onLogin, setOnLogin] = useState(0);
  

  

  const [alerttext, setalerttext] = useState("");
  const [stats, setstats] = useState("");
  // const { storedCredentials, setStoredCredentials } =
  //    useContext(credentialsContext);

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

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  }, []);

  const _keyboardDidShow = () => setShowText(false);
  const _keyboardDidHide = () => setShowText(true);

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };


  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@login_key", value);
    } catch (e) {
      // saving error
    }
  };

  const signin = (credentials) => {
    console.log(credentials);
    const url = "https://floating-wildwood-95983.herokuapp.com/user/signin/";
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
          let name = data[0].name;
          let email = data[0].email;
          let photoUrl = "https://picsum.photos/200/300"
          // console.log(...data[0]);
          console.log(data[0]._id);
          setalerttext(message);
          setstats("");
          fadeIn();
          setTimeout(() => {
            fadeOut();
          }, 3000);
          setSubmitting(false);
          storeData(JSON.stringify({ email, name, photoUrl,id:data[0]._id }));
          login()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return onLogin==0 ? 
  (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        
        <Text style={styles.pageTitle}>Login</Text>
        <Animated.View
          style={{
            opacity: fadeAnim,
            width: "100%",
          }}
        >
          <CustomAlert text={alerttext} status={stats} />
        </Animated.View>
        <FormContainer
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            setSubmitting(true);
            signin(values)
          }}
          validationSchema={validationSchema}
        >
          <FormLabel>Your Email: </FormLabel>

          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            placeholder="Email"
            name="email"
            textContentType="emailAddress"
          />

          <FormLabel>Password: </FormLabel>

          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="Password"
            textContentType="password"
            name="password"
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
            <SubmitButton title="Login"/>
          )}
        </FormContainer>
      </View>
      {showText && (
        <View style={styles.bottomView}>
          <AppSeparator />
          <Text style={styles.bottomText}>
            Don't have an account yet?{" "}
            <TextLink
              title="Register"
              onPress={() => setOnLogin(1)}
              style={styles.textLink}
            />
          </Text>
          {/* <AppSeparator /> */}
          
        </View>
      )}
    </View>
  ):
  <RegisterScreen register = {register} registerResponse={registerResponse}/>
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
    paddingTop: "15%",
  },

  pageTitle: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 2,
    paddingBottom: 10,
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

export default LoginScreen;
