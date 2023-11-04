import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, firestore } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    // fetch user details
    const user = auth.currentUser;

    if (user) {
      const email = user.email;

      const db = collection(firestore, "users");

      const q = query(db, where("email", "==", email));

      const querySnapshot = getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      });
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Text>Current User: {userDetails.fullName}</Text>
      <Text>Email: {userDetails.email}</Text>
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
