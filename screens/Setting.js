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
import SubmitButton2 from "../components/SubmitButton2";
import colors from "../config/colors";
import ImageInput from "../components/ImageInput";
import FormLabel from "../components/FormLabel";
import FormContainer from "../components/FormContainer";
import AppFormField from "../components/AppFormField";
import AppActivityIndicator from "../components/AppActivityIndicator";
import CustomAlert from "../components/CustomAlert";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoginScreen from "./LoginComp";
import Profile from "./Profile";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().required().label("Phone"),
});

function Setting({ navigation, onPress, register, registerResponse }) {
  const [submitting, setSubmitting] = useState(false);
  const [showText, setShowText] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [onLogin, setOnLogin] = useState(0);
  const [navigate, setNavigate] = useState(0);
  const [image, setImage] = useState("");

  const [name, setName] = useState("...");
  const [phone, setPhone] = useState("...");
  const [email, setEmail] = useState("...");
  const [id, setId] = useState("");

  const [alerttext, setalerttext] = useState("");
  const [stats, setstats] = useState("");
  // const { storedCredentials, setStoredCredentials } =
  //   useContext(credentialsContext);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@login_key");
      const jsonvalue = JSON.parse(value);

      console.log(jsonvalue);
      setId(jsonvalue.id)
      fecth(jsonvalue.email);
    } catch (e) {
      console.log(e);
    }
  };


  const fecth = (credentials) => {
    const url = `https://floating-wildwood-95983.herokuapp.com/user/getdata/${credentials}`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;

        setName(result[0].name);
        setEmail(result[0].email);
        setPhone(result[0].phone);

        // console.log("else: "+message,status);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    getData();

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



  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@login_key", value);
    } catch (e) {
      // saving error
    }
  };

  const updateImage = () => {
    let formdata = new FormData();
    formdata.append("blogImage", image);
    const url = `https://floating-wildwood-95983.herokuapp.com/user/updateImage/${id}`
    axios
      .post(url, formdata,{
        hedaers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      } )
      .then((response) => {
        const result = response.data;

        if (result.email == undefined) {
          // console.log("if: " + message, status);
          setalerttext("Failed To Save");
          setstats("bad");
          fadeIn();
          setTimeout(() => {
            fadeOut();
          }, 3000);
          setSubmitting(false);
        } else {
          setalerttext("Image Updated Successfully");
          setstats("");
          fadeIn();
          setTimeout(() => {
            fadeOut();
          }, 3000);
          getData();
        }
      })
      .catch((error) => {
        console.log("catch:" + error);
      });
  };

  const update = () => {
    const url = `https://floating-wildwood-95983.herokuapp.com/updateprofile/editprofile/${id}`
    axios
      .post(url, { name, email, phone })
      .then((response) => {
        const result = response.data;

        if (result.email == undefined) {
          // console.log("if: " + message, status);
          setalerttext("Failed To Save");
          setstats("bad");
          fadeIn();
          setTimeout(() => {
            fadeOut();
          }, 3000);
          setSubmitting(false);
        } else {
          
          setalerttext("Saved Successfully");
          setstats("");
          fadeIn();
          setTimeout(() => {
            fadeOut();
          }, 3000);
          updateImage()
          getData();
          // checklogin()
        }
      })
      .catch((error) => {
        console.log("catch:" + error);
      });
  };
  const sendImage = (id, credentials) => {
    setImage(credentials);
     
  };
  {
    return (
      navigate == 0 ?

        <View style={styles.container}>
          <View style={styles.formContainer}>
            <TouchableOpacity onPress={() => setNavigate(1)}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                color={colors.primary}
                size={60 * 0.5}
              ></MaterialCommunityIcons>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Settings</Text>
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
              initialValues={{ name: name, email: email, phone: phone }}
              onSubmit={(values) => {
                setSubmitting(true);
                signup(values);
                // console.log(values);
              }}
            >
              <FormLabel>Full Name:</FormLabel>
              <AppFormField
                // onChangeText={(text) => setFname(text)}
                autoCapitalize="none"
                autoCorrect={false}
                icon="account-circle"
                placeholder="Firstname Lastname"
                name="Name"
                textContentType="name"
                value={name}
                onChangeText={(text) => setName(text)}

              />

              <FormLabel>Email:</FormLabel>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                placeholder="youremail@gmail.com"
                name="Email"
                textContentType="emailAddress"
                // keyboardType="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              <FormLabel>Phone:</FormLabel>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="phone"
                placeholder="000000000"
                // textContentType="text"
                name="Phone"
                // secureTextEntry={true}
                keyboardType="numeric"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
              <ImageInput
                sendImage={(id, credentails) => sendImage(id, credentails)}
              />
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={{ color: "red" }} type={messageType}>
                  {message}
                </Text>
              </View>

              {submitting ? (
                <SubmitButton2
                  title={<AppActivityIndicator size="small" color={colors.white} />}
                />
              ) : (
                <>
                  <SubmitButton2 title="Save" onPress={() => update()} />
                </>
              )}
            </FormContainer>
          </View>

        </View> :
        <Profile />
    )
  }
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
    fontWeight: "700"
  },
});

export default Setting;
