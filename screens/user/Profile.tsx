import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth, firestore } from "../../config/firebase";
import { Avatar } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import ClickableButton from "../../components/ClickableButton";
import { UserDataContext } from "../../store/UserDataContext";

const Profile = ({ navigation }: any) => {
  const { userDetails, setUserDetails }: any = useContext(UserDataContext);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Yes",
        onPress: async () => {
          await signOut(auth);
        },
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginRight: 10,
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar
          size={100}
          rounded
          title={userDetails.fullName
            .split(" ")
            .map((n: any) => n[0])
            .join("")}
          containerStyle={{ backgroundColor: "#245a51" }}
        />
        <Text style={{ marginTop: 25, fontWeight: "700", fontSize: 20 }}>
          {userDetails.fullName}
        </Text>
        <Text style={{ marginTop: 5, fontWeight: "500", fontSize: 16 }}>
          {userDetails.email}{" "}
        </Text>
      </View>
      <ScrollView
        style={styles.dataContainer}
        showsVerticalScrollIndicator={false}
      >
        <ClickableButton
          text="Edit Profile"
          imageName="person-circle-outline"
        />
        <ClickableButton
          text="My Posts"
          imageName="list-outline"
          func={() => {
            navigation.navigate("MyPosts");
          }}
        />
        {/* <ClickableButton text="Saved Posts" imageName="bookmark-outline" /> */}
        <ClickableButton text="Help" imageName="help-circle-outline" />
        <ClickableButton
          text="Invite a friend"
          imageName="person-add-outline"
        />
        {/* <ClickableButton text="Delete Account!?!" imageName="trash-outline" /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  dataContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 22,
  },
  clickableOption: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
});
