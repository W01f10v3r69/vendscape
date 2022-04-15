import React from "react";
import { useFormikContext } from "formik";
import { View,Dimensions } from "react-native";
import AppButton from "./AppButton";

function SubmitButton2({ title,onPress }) {
    const { width, height } = Dimensions.get("window");
  // function SubmitButton({title,onPress}) {
  const { handleSubmit } = useFormikContext();
  return (
    // <AppButton title={title} />
    <View style={{ width: (90 * width) / 100, }}>
      <AppButton title={title} onPress={onPress} />
    </View>
  );
}

export default SubmitButton2;
