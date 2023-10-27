import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const Home = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>Current User: {auth.currentUser?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
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
