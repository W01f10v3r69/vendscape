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
import TextLink from "../components/TextLink";
import AppSeparator from "../components/AppSeparator";
import FormLabel from "../components/FormLabel";
import FormContainer from "../components/FormContainer";
import AppFormField from "../components/AppFormField";
import AppActivityIndicator from "../components/AppActivityIndicator";
import CustomAlert from "../components/CustomAlert";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "./Profile";

const validationSchema = Yup.object().shape({
  num: Yup.string().required().label("num"),
  date: Yup.string().required().label("date"),
  cvv: Yup.string().required().min(3).max(3).label("cvv"),
});

function Payment({ navigation, onPress, register, registerResponse }) {
  const [submitting, setSubmitting] = useState(false);
  const [showText, setShowText] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [onLogin, setOnLogin] = useState(0);
  const [navigate, setNavigate] = useState(0);

    const [card_num, setCard_num] = useState("...");
  const [card_date, setCard_date] = useState("...");
  const [card_cvv, setCard_cvv] = useState("...");
  const [id, setId] = useState("");


  const [alerttext, setalerttext] = useState("");
  const [stats, setstats] = useState("");
  // const { storedCredentials, setStoredCredentials } =
  //   useContext(credentialsContext);

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
    const url = `https://glacial-harbor-84164.herokuapp.com/user/getdata/${credentials}`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;

        setCard_num(result[0].card_num);
        setCard_date(result[0].card_date);
        setCard_cvv(result[0].card_cvv);
        
        // console.log("else: "+message,status);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@login_key", value);
    } catch (e) {
      // saving error
    }
  };

 const update = () => {
   console.log(id);
    const url = `https://glacial-harbor-84164.herokuapp.com/updateprofile/payment/${id}`
    axios
      .post(url, {card_num,card_date,card_cvv})
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
          // console.log(...data[0]);
          // console.log("else: " + message, status);
          setalerttext("Saved Successfully");
          setstats("");
          fadeIn();
          setTimeout(() => {
            fadeOut();
          }, 3000);
          // setSubmitting(false);
          getData();
          // checklogin()
        }
      })
      .catch((error) => {
        console.log("catch:" + error);
      });
  };

  const cardNumberSpacing = (text) => {
    if (text.length >19  ) {
      setCard_num(card_num)
    }
    else if(text.length <1){
      setCard_num(text)
    }
    else {
      let joy = text.replace(/\s/g,'').match(/.{1,4}/g);
      let excessjoy = joy.join(' ')
      console.log(excessjoy);
      setCard_num(excessjoy)
    }
  }

  // for cvv
  const cardCvvSpacing = (text) => {
    if (text.length >3  ) {
      setCard_cvv(card_cvv)
    }
    else {
      setCard_cvv(text)
    }
  }


  const cardDateSpacing = (text) => {
    if (text.length >5  ) {
      setCard_date(card_date)
    }
    else if(text.length <1){
      setCard_date(text)
    }
    else {
      let joy = text.replace(/\//g,'').match(/.{1,2}/g);
      let excessjoy = joy.join('/')
      console.log(excessjoy);
      setCard_date(excessjoy)
    }
  }

  { 
    return(
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
        <Text style={styles.pageTitle}>Payment</Text>
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
          initialValues={{ num: card_num, date: card_date, cvv: card_cvv}}
          onSubmit={(values) => {
            setSubmitting(true);
            signup(values);
          }}
        >
          <FormLabel>Card Number:</FormLabel>
          <AppFormField
            onChangeText={(text) => cardNumberSpacing(text)}
            autoCapitalize="none"
            autoCorrect={false}
            icon="card-bulleted"
            placeholder="0000 0000 0000 0000"
            name="num"
            textContentType="name"
                keyboardType="numeric"
                value={card_num}

          />

          <FormLabel>Date:</FormLabel>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="card-bulleted"
            placeholder="00/00"
            name="date"
            keyboardType="numeric"
                onChangeText={(text) => cardDateSpacing(text)}
                value={card_date}
          />

          <FormLabel>CVV:</FormLabel>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="card-bulleted"
            placeholder="000"
            textContentType="password"
            name="cvv"
            keyboardType="numeric"
                onChangeText={(text) => cardCvvSpacing(text)}
                value={card_cvv}
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
             <SubmitButton2 title="Save" onPress={()=>update()} />
            </>
          )}
        </FormContainer>
      </View>
     
    </View>:
    <Profile/>
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
    fontWeight:"700"
  },
});

export default Payment;
