import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
// import RadioForm from "react-native-simple-radio-button";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { credentialsContext } from "../components/CredentialsContext";
import SubmitButton2 from "../components/SubmitButton2";
import colors from "../config/colors";
import { BoltLightText, BoltSemiBoldText } from "../components/CustomText";
import AppSeparator from "../components/AppSeparator";
import FormLabel from "../components/FormLabel";
import FormContainer from "../components/FormContainer";
import tw from "tailwind-react-native-classnames";

import AppActivityIndicator from "../components/AppActivityIndicator";
import CustomAlert from "../components/CustomAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "./Profile";
import Category from "./Category";
import styles from "../config/styles";
import Upload from "./Upload";

const { width, height } = Dimensions.get("window");

function Catalog() {
  const [navigate, setNavigate] = useState(0);
  const [cat, setCat] = useState("");

  useEffect(() => {
    const backAction = () => {
      setNavigate(1);
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  {
    return navigate == 0 ? (
      <ScrollView style={sty.container}>
        <TouchableOpacity
          onPress={() => setNavigate(1)}
          style={{ marginLeft: "5%" }}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            color={colors.primary}
            size={60 * 0.5}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
        <View style={sty.head}>
          <BoltSemiBoldText style={sty.headText}>My Catalog</BoltSemiBoldText>
        </View>
        <View style={sty.subCon}>
          <TouchableOpacity style={sty.biggrid} onPress={() => (setNavigate(3),setCat("Food"))}>
            <ImageBackground
              source={require("../assets/images/category/food.jpg")}
              resizeMode="cover"
              style={sty.grid}
              imageStyle={{ width: "100%", borderRadius: 10 }}
            ></ImageBackground>
            <BoltSemiBoldText style={sty.catText}>Foods</BoltSemiBoldText>
          </TouchableOpacity>

          <TouchableOpacity style={sty.biggrid} onPress={() => (setNavigate(3),setCat("Drink"))}>
            <ImageBackground
              source={require("../assets/images/category/drinks.jpg")}
              resizeMode="cover"
              style={sty.grid}
              imageStyle={{ width: "100%", borderRadius: 10 }}
            ></ImageBackground>
            <BoltSemiBoldText style={sty.catText}>Drinks</BoltSemiBoldText>
          </TouchableOpacity>

          <TouchableOpacity style={sty.biggrid} onPress={() => (setNavigate(3),setCat("Snack"))}>
            <ImageBackground
              source={require("../assets/images/category/snacks.jpg")}
              resizeMode="cover"
              style={sty.grid}
              imageStyle={{ width: "100%", borderRadius: 10 }}
            ></ImageBackground>
            <BoltSemiBoldText style={sty.catText}>
              Snacks/Pastries
            </BoltSemiBoldText>
          </TouchableOpacity>

          <TouchableOpacity style={sty.biggrid} onPress={() => (setNavigate(3),setCat("Grocery"))}>
            <ImageBackground
              source={require("../assets/images/category/grocery.jpg")}
              resizeMode="cover"
              style={sty.grid}
              imageStyle={{ width: "100%", borderRadius: 10 }}
            ></ImageBackground>
            <BoltSemiBoldText style={sty.catText}>Groceries</BoltSemiBoldText>
          </TouchableOpacity>

          <TouchableOpacity style={sty.biggrid} onPress={() => setNavigate(2)}>
            <ImageBackground
              source={require("../assets/images/category/add.jpg")}
              resizeMode="cover"
              style={sty.grid}
              imageStyle={{ width: "100%", borderRadius: 10 }}
            ></ImageBackground>

            <BoltSemiBoldText style={{ textAlign: "center" }}>
              Upload An Item
            </BoltSemiBoldText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    ) : navigate == 1 ? (
      <Profile />
    ) : navigate == 2 ? (
      <Upload />
    ) : (
      <Category cat={cat}  />
    );
  }
}

const sty = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.dark,
  },
  subCon: {
    width: "100%",
    minHeight: (100 * width) / 100,
    // backgroundColor: "red",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  biggrid: {
    width: "40%",
    height: (40 * width) / 100,
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "5%",
    marginBottom: "5%",
    borderRadius: 10,
  },
  grid: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    // backgroundColor: "blue",
  },
  head: {
    width: "100%",
    height: (15 * width) / 100,
    justifyContent: "center",
    paddingLeft: "5%",
  },
  headText: {
    fontSize: (7 * width) / 100,
  },
  catText: {
    fontSize: (5 * width) / 100,
    // fontWeight: "700",
    // fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default Catalog;
