import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const Profile = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Text>Current User: {auth.currentUser?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
