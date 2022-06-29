import React, { useState, useRef, useEffect } from "react";
import { View, FlatList } from "react-native";
import tw from "tailwind-react-native-classnames";
import IonIcons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BoltSemiBoldText } from "../CustomText";
import DiscountCard from "./DiscountCard";
import { discounts } from "../../constants";

export default function DiscountList({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    const url = `https://floating-wildwood-95983.herokuapp.com/user/getall/`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        setData(result);
        //    console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={tw`flex mt-4`}>
      <View style={tw`flex flex-row items-center justify-between mx-5`}>
        <BoltSemiBoldText style={tw`text-xl`}>
          🎁 Check Out Our Vendors
        </BoltSemiBoldText>
      </View>

      <FlatList
        style={tw`ml-5`}
        horizontal
        data={data}
        renderItem={({ item }) => (
          <DiscountCard data={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
