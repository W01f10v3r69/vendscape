import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";

import Button from "../components/Button";

import LoginComp from "./LoginComp";
import RegisterComp from "./RegisterComp";
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
// import { NavigationContainer } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
function LoginScreen({ navigation,onPress,alertmeGood,alertmeBad,register,registerResponse }) {
  
  const [welcomeSection, setWelcomeSection] = useState(0);


  return (
    <View style={styles.container}>
      {welcomeSection == 0 ? (
        <View style={styles.formContainer}>
          <View style={styles.upperhand}>
            <TouchableOpacity style={styles.nextButton}>
              <Text style={{ color: colors.primary }}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setWelcomeSection(1)}
            >
              <Text style={{ color: colors.primary }}>Next</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                style={styles.location1}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
          <Image style={styles.img1} source={require("../assets/l1.png")} />

          <Text style={styles.heading1}>Welcome To The World Of Crypto Mining</Text>
          <Text style={styles.under}>
          Earn BTC, ETH, NFT's & Meta Coins In One Safe and simple app
          </Text>
          {/* <View style={styles.lowerhand}>
            <View
              style={[styles.circle, { backgroundColor: colors.lightGray }]}
            ></View>
            <View style={styles.circle}></View>
            <View style={styles.circle}></View>
          </View> */}
        </View>
      ) : //   second place
      welcomeSection == 1 ? (
        <View style={styles.formContainer}>
          <View style={styles.upperhand}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setWelcomeSection(0)}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={20}
                style={styles.location1}
                color={colors.primary}
              />
              <Text style={{ color: colors.primary }}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setWelcomeSection(2)}
            >
              <Text style={{ color: colors.primary }}>Next</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                style={styles.location1}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
          <Image style={styles.img1} source={require("../assets/l2.png")} />

          <Text style={styles.heading1}>Invest Quickly And Easily</Text>
          <Text style={styles.under}>
          Save & invest in digital assets and withdraw at any time. Get started with as little as $100
          </Text>
          {/* <View style={styles.lowerhand}>
            <View style={styles.circle}></View>
            <View
              style={[styles.circle, { backgroundColor: colors.lightGray }]}
            ></View>
            <View style={styles.circle}></View>
          </View> */}
        </View>
      ) : welcomeSection == 2 ? (
        //   third place
        <View style={styles.formContainer}>
          <View style={styles.upperhand}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setWelcomeSection(1)}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={20}
                style={styles.location1}
                color={colors.primary}
              />
              <Text style={{ color: colors.primary }}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton}>
              <Text style={{ color: colors.primary }}></Text>
            </TouchableOpacity>
          </View>
          <Image style={styles.img} source={require("../assets/l4.png")} />

          <Text style={styles.heading}>Take & Spend Your Digital Asset Everywhere</Text>
          <Text style={styles.under}>
          Access all your crypto anywhere and anytime - In one mobile app
          </Text>
          <Text style={styles.error}>{alertmeBad}</Text>
          <Text style={styles.success}>{alertmeGood}</Text>
          <Button
            name="Login"
            background="#222"
            color={colors.primary}
            onPress={() =>setWelcomeSection(3)}
          />
          <Button
            name="Register"
            background="#fff"
            color={colors.primary}
            onPress={() => setWelcomeSection(4)}
          />
{/*        
          <View style={styles.lowerhand}>
            <View style={styles.circle}></View>
            <View style={styles.circle}></View>
            <View
              style={[styles.circle, { backgroundColor: colors.lightGray }]}
            ></View>
          </View> */}
        </View>
      ):welcomeSection == 3 ? (
        <LoginComp onPress={()=>setWelcomeSection(2)} login={(objectCrendentials)=>register(objectCrendentials)}  />
        
      ): (
        <RegisterComp onPress={()=>setWelcomeSection(2)} register={(objectCrendentials)=>register(objectCrendentials)} registerResponse={registerResponse} />
      )
    
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
    alignItems: "center",
    backgroundColor: colors.dark,
  },

  formContainer: {
    flex: 1,
    width: "90%",
    paddingTop: "25%",
    // backgroundColor:"red",
    alignItems: "center",
    // justifyContent:"center"
  },

  img: {
    width: (110 * width) / 100,
    height: (90 * width) / 100,
    // marginTop: "15%",
  },
  img1: {
    width: (90 * width) / 100,
    height: (90 * width) / 100,
    marginTop: "15%",
  },
  heading1: {
    fontSize: (8 * width) / 100,
    fontWeight: "700",
    color: colors.white,
    textAlign: "center",
    marginTop: "10%",
  },
  heading: {
    fontSize: (8 * width) / 100,
    fontWeight: "700",
    color: colors.white,
    textAlign: "center",
  },
  under: {
    fontSize: (4 * width) / 100,
    color: colors.white,
    textAlign: "center",
    marginBottom: "10%",
  },
  upperhand: {
    width: "100%",
    // height: (10 * width) / 100,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lowerhand: {
    width: "100%",
    height: (10 * width) / 100,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  nextButton: {
    flexDirection: "row",
  },
  circle: {
    width: (3 * width) / 100,
    height: (3 * width) / 100,
    backgroundColor: colors.midGray,
    borderRadius: 500,
    marginLeft: "5%",
  },
  error:{
    color:"red",
    textAlign:"center",
    fontWeight:"700",
    fontSize:(5 * width) / 100
  },
  success:{
    color:"green",
    textAlign:"center",
    fontWeight:"700",
    fontSize:(5 * width) / 100
  }
});

export default LoginScreen;
