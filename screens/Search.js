import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import IonIcons from "react-native-vector-icons/Ionicons";
import { BoltLightText, BoltSemiBoldText } from "../components/CustomText";
import DiscountList from "../components/Discount/DiscountList";
import RestaurantList from "../components/Restaurant/RestaurantList";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { popularFoods } from "../constants";
const { width, height } = Dimensions.get("window");
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";

export default function Search({ navigation }) {
  const [search, setSearch] = useState("");
  const [searchedFood, setSearchedFood] = useState([]);
  const [allFood, setAllFood] = useState([]);
  const [fcolor, setFcolor] = useState("black");
  const [vcolor, setVcolor] = useState("gray");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Food", value: "Food" },
    { label: "Drink", value: "Drink" },
    { label: "Snack", value: "Snack" },
    { label: "Grocery", value: "Grocery" },
  ]);

  useEffect(() => {
    getData();
  }, []);

  // on type it serches inside the array and get the vendor tat macthes
  const getVendors = (typed) => {
    setSearch(typed);
    var el = [];
    // compare all the items in the array with the text typed
    if (typed == "" || typed == " ") {
      el = ["78^%&^5&%89"];
      setSearchedFood(el);
    } else {
      // console.log(allFood);
      allFood.forEach((items) => {
        if (items.name.toLowerCase().includes(typed.toLowerCase())) {
          el.push(items);
        }

        setSearchedFood(el);
      });
    }
  };

  const changeColor = (a) => {
    if (a == 1) {
      setFcolor("black");
      setVcolor("gray");
      getFoods();
    } else {
      setFcolor("gray");
      setVcolor("black");
      getUser();
    }
  };

  const goToChecked = (items) => {
    if (fcolor == "black") {
      goToPage(items);
    } else {
      goToPage1(items);
    }
  };

  const goToPage1 = (items) => {
    navigation.navigate("Restaurant", {
      screen: "RestaurantPage2",
      params: {
        Banner_Image:items.Banner_Image,
        name:items.name,
        phone:items.phone,
        email:items.email,
        _id:items._id,
      },
    });
  };
  const goToPage = (items) => {
    navigation.navigate("Restaurant", {
      screen: "RestaurantPage",
      params: {
        banner: { uri: items.image },
        name: items.name,
        description: items.description,
        vegan: items.vegan,
        price: items.price,
        vendorsId: items.vendorsId,
      },
    });
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@login_key");
      const jsonvalue = JSON.parse(value);

      // console.log(jsonvalue);
      getFoods();
    } catch (e) {
      console.log(e);
    }
  };

  const getFoods = () => {
    const url = `https://floating-wildwood-95983.herokuapp.com/food/getAllFoods`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        if (value != null) {
          result.map((items) => {
            if (items.cartegory == value) {
              allFood.push(items);
            } else {
              setAllFood(result);
            }
          });
        } else {
          setAllFood(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    console.log("hssh");
    const url = `https://floating-wildwood-95983.herokuapp.com/user/getall`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        setAllFood(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView
      style={{
        ...tw`flex pt-2 h-full pb-40`,
        marginTop: Constants.statusBarHeight,
      }}
    >
      <StatusBar style="auto" />
      <View style={tw`flex flex-col mx-5 mt-5`}>
        <BoltSemiBoldText style={tw`text-2xl`}>Search</BoltSemiBoldText>

        <View style={tw`bg-gray-200 p-4 rounded-md flex flex-row mt-3`}>
          <Ionicons
            name="ios-search"
            size={18}
            color="black"
            style={tw`my-auto`}
          />
          <TextInput
            style={tw`ml-3`}
            placeholder="Restaurants and Cuisines"
            onChangeText={(e) => getVendors(e)}
            // onChangeText={(e) => setSearch(e)}
            value={search}
          />
        </View>
        <BoltSemiBoldText style={tw`text-sm`}>Search By:</BoltSemiBoldText>
        <View
          style={{
            width: "100%",
            height: (10 * width) / 100,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={[styles.selection, { backgroundColor: fcolor }]}
            onPress={() => changeColor(1)}
          >
            <BoltLightText style={styles.seleText}>Food Name</BoltLightText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selection, { backgroundColor: vcolor }]}
            onPress={() => changeColor(2)}
          >
            <BoltLightText style={styles.seleText}>Vendor Name</BoltLightText>
          </TouchableOpacity>
        </View>
        {fcolor == "black" ? (
          <>
            <Text style={styles.text}>Filter By Category</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                marginTop: "2%",
                marginBottom: "5%",
                borderColor: "transparent",
                backgroundColor: colors.lightGray,
                zIndex: 1000,
              }}
              zIndex={6000}
            />
          </>
        ) : (
          <View></View>
        )}
      </View>

      <View style={tw`mx-5 mt-8 pb-3`}>
        <BoltSemiBoldText style={tw`text-sm`}>Results:</BoltSemiBoldText>
      </View>

      <View style={tw`pb-20`}>
        {searchedFood.map((items) => {
          return items == "78^%&^5&%89" ? (
            <TouchableOpacity
              key={0}
              style={{ marginLeft: "5%" }}
              delayPressIn={150}
            >
              <BoltLightText style={tw`text-sm my-4 text-gray-700 mt-7`}>
                <Text>No Vendors Found</Text>
              </BoltLightText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={items.name}
              style={{ marginLeft: "5%" }}
              delayPressIn={50}
              onPress={() => goToChecked(items)}
            >
              <BoltLightText style={tw`text-sm my-4 text-gray-700 mt-7`}>
                {items.name}
              </BoltLightText>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  selection: {
    width: "30%",
    height: "100%",
    backgroundColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "5%",
  },
  seleText: {
    color: "white",
  },
  text: {
    // fontFamily: "Poppins_700Bold",
    marginBottom: (-1 * width) / 100,
    marginTop: "5%",
  },
});
