import Constants from "expo-constants";
import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Modal,
  StatusBar,
  Animated,
  Dimensions,
  TouchableOpacity,
  Clipboard,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import colors from "../config/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "./Profile";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";

import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import ImageInput from "../components/ImageInput";
import CustomAlert from "../components/CustomAlert";

import Catalog from "./Catalog";
const { width, height } = Dimensions.get("window");

function Upload({ navigation, route }) {
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [des, setDes] = useState("");
  const [image, setImage] = useState("");
    const [submitting, setSubmitting] = useState(false);

  // const [pic, setPic] = useState("../assets/profile.jpg");
  const [navigate, setNavigate] = useState(0);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(null);
  const [veganValue, setVeganValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Food", value: "Food" },
    { label: "Drink", value: "Drink" },
    { label: "Snack", value: "Snack" },
    { label: "Grocery", value: "Grocery" },
  ]);

  const [vegan, setVegan] = useState([
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ]);

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
    getData();
  }, []);

  const onChange = (event, selectedDate) => {
    const curentDate = selectedDate || date;
    setShow(false);
    setDte(curentDate);
    setdate(curentDate.toDateString());
    console.log(curentDate.toDateString());
  };
  const showDatePicker = () => {
    setShow(true);
    console.log(show);
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@login_key");
      const jsonvalue = JSON.parse(value);

      console.log(jsonvalue);
      setId(jsonvalue.id);
    } catch (e) {
      console.log(e);
    }
  };

  const uploadProduct = () => {
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("blogImage", image);
    formdata.append("description", des);
    formdata.append("vendorsId", id);
    formdata.append("cartegory", value);
    formdata.append("vegan", veganValue);
    // console.log(formdata);

    const url = `https://floating-wildwood-95983.herokuapp.com/food/postFood/`;
    axios
      .post(url, formdata, {
        hedaers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;
        console.log(data);
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
          setalerttext(message);
          setstats("");
          fadeIn();
          setTimeout(() => {
            fadeOut();
          }, 3000);
          setSubmitting(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendImage = (id, credentials) => {
    setImage(credentials);
  };

  {
    return navigate == 0 ? (
      <>
        <ScrollView style={styles.container}>
          <TouchableOpacity
            onPress={() => setNavigate(1)}
            style={{ marginTop: "12%" }}
          >
            <MaterialCommunityIcons
              name="keyboard-backspace"
              color={colors.primary}
              size={60 * 0.5}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Upload Products</Text>
          <Text style={styles.text}>Name Of Item</Text>
          <AppTextInput
            placeholder="Name Of Item"
            onChangeText={(text) => setName(text)}
          />
          <Animated.View
            style={{
              opacity: fadeAnim,
              width: "100%",
            }}
          >
            <CustomAlert text={alerttext} status={stats} />
          </Animated.View>
          <Text style={styles.text}>Price</Text>
          <AppTextInput
            placeholder="Price"
            keyboardType="numeric"
            onChangeText={(text) => setPrice(text)}
          />
          <Text style={styles.text}>Upload Picture</Text>
          <ImageInput
            sendImage={(id, credentails) => sendImage(id, credentails)}
          />
          <Text style={styles.text}>Description</Text>
          <AppTextInput
            multiline={true}
            numberOfLines={10}
            placeholder="Description"
            onChangeText={(text) => setDes(text)}
          />
          <Text style={styles.text}>Choose Category</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              marginTop: "5%",
              marginBottom: "5%",
              borderColor: "transparent",
              backgroundColor: colors.lightGray,
              zIndex: 1000,
            }}
            zIndex={6000}
          />
          <Text style={styles.text}>Is This Vegan?</Text>
          <DropDownPicker
            open={open1}
            value={veganValue}
            items={vegan}
            setOpen={setOpen1}
            setValue={setVeganValue}
            setItems={setVegan}
            style={{
              marginTop: "5%",
              marginBottom: "5%",
              borderColor: "transparent",
              backgroundColor: colors.lightGray,
            }}
          />
          {/* 
        <Text style={styles.text}>Date Of Completion</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dte}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <TouchableOpacity onPress={() => showDatePicker()}>
          <AppTextInput
            // placeholder="Date Of Completion"
            value={date}
            editable={false}
            isDate={true}
            // showDatePicker={showDatePicker}
            onChangeText={(text) => setdate(text)}
            placeholder="12/2021"
          />
        </TouchableOpacity> */}
          <AppButton title="SUBMIT" onPress={() => uploadProduct()} />
        </ScrollView>
      </>
    ) : (
      <Catalog />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: "5%",
    paddingRight: "5%",
    height: height,
    width: "100%",
    backgroundColor: colors.white,
  },
  text: {
    // fontFamily: "Poppins_700Bold",
    marginBottom: (-1 * width) / 100,
  },
  textcontainer: {
    height: (25 * width) / 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    // fontFamily: "Poppins_700Bold",
    fontSize: (7 * width) / 100,
    color: colors.primary,
  },
  pageTitle: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 4,
    paddingBottom: 15,
    textAlign: "center",
  },
});

export default Upload;
