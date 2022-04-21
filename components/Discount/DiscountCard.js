import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import IonIcons from "react-native-vector-icons/Ionicons";
import { BoltLightText, BoltSemiBoldText } from "../CustomText";

export default function DiscountCard({ data, navigation }) {
	const { name, Banner_Image, phone, email, _id } = data;

	return (
    <View style={tw`flex`}>
      <View style={tw`flex-col mr-4 justify-between`}>
        <View style={tw`flex-row items-center mt-5 h-32 w-64 relative`}>
          <TouchableOpacity
            style={tw`w-full h-full`}
            onPress={() =>
              navigation.navigate("Restaurant", {
                screen: "RestaurantPage2",
                params: {
                  Banner_Image,
                  name,
                  phone,
                  email,
                  _id,
                },
              })
            }
          >
            <Image
              source={{ uri: Banner_Image }}
              style={tw`w-full h-full rounded-lg`}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-col justify-between mt-1.5`}>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`flex-col justify-between`}>
              <View style={tw`flex-row`}>
                <BoltSemiBoldText style={tw`text-lg`}>
                  {name.length > 25 ? name.substring(0, 25 - 3) + "..." : name}
                </BoltSemiBoldText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
