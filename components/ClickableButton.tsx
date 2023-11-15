import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type ClickableButtonProps = {
  text?: string;
  func?: () => void;
  imageName?: any;
};

const ClickableButton = ({ text, func, imageName }: ClickableButtonProps) => {
  return (
    <View>
      <TouchableOpacity onPress={func}>
        <View style={styles.clickableOption}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name={imageName}
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text style={{ fontSize: 16, fontWeight: "500" }}>{text}</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color="black"
              style={{ marginLeft: "auto" }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ClickableButton;

const styles = StyleSheet.create({
  clickableOption: {
    // backgroundColor: "white",
    padding: 18,
    // borderRadius: 12,
    // marginBottom: 10,
    // marginTop: 6,
  },
});
