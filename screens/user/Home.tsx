import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
