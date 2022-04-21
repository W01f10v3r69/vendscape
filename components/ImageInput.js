import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Text
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const { width, height } = Dimensions.get("window");

import colors from "../config/colors";

function ImageInput({ sendImage }) {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);
  const [idenfize, setIdentifize] = useState("../assets/profile.jpg");
  const [iden, setId] = useState("");
  //   useEffect(() => {
  //     requestPermission();
  //   }, []);

  const requestPermission = async () => {
    const { granted } =
      await DocumentPicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library");
  };

  const handlePress = () => {
    if (!image) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "No" },
        { text: "Yes", onPress: () => setImage(null) },
      ]);
  };

  const selectImage = async () => {
    try {
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      // let result = await DocumentPicker.getDocumentAsync({});
      // console.log(result);
      // setType(result.mimeType);
      // if (result.mimeType.includes("image") == false) {
      //   setImage(result.name);
      // } else {
      //   setImage(result.uri);
      // }

      if (!cancelled) {
        //change image extention to the right one depending on the uri
        let end;
        if (uri.includes("jpeg")) {
          end = "jpeg";
        } else if (uri.includes("jpg")) {
          end = "jpg";
        } else if (uri.includes("png")) {
          end = "png";
        } else {
          end = "jpeg";
        }
        // console.log(uri);
        setImage(uri);
        setType("image");

        // store the iage as a form data
       

        // call the function to send the image to the databse
        // console.log(uri);
        // console.log(iden);
        sendImage(iden, {
          uri: uri,
          name: `image.${end}`,
          type: `image/${end}`,
        });

        const binary = uri.replace(/^data:image\/(png|jpg);base64,/, "");
        putImage(binary);
      }
    } catch (error) {
      console.log("there was an error loading image", image, error);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@tourImage", JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };
  const putImage = (binary) => {
    storeData(binary);
    // putImage(theImage);
  };

  const fecth = (credentials) => {
    const url = `https://floating-wildwood-95983.herokuapp.com/user/getdata/${credentials}`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        // console.log(response);
        setId(result[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //calling the check login function
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@login_key");
      const jsonvalue = JSON.parse(value);

      fecth(jsonvalue.email);
    } catch (e) { 
      console.log(e);
    }
  };
  getData();
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {image == null ? (
          <MaterialCommunityIcons
            name="file-upload"
            size={40}
            color={colors.mediumGray}
          />
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
// type.includes("image") == false ? (
//           <Text style={{fontFamily:"Poppins_600SemiBold_Italic"}}>{image}</Text>
//         ) :
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: (25 * width) / 100,
    width: "100%",
    overflow: "hidden",
    marginBottom: "5%",
    marginTop: "5%",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageInput;
