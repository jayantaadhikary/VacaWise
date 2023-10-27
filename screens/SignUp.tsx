import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const SignUp = () => {
  const [createAccClicked, setCreateAccClicked] = useState(false);

  const navigation: any = useNavigation();

  function handleCreateAccountPressIn() {
    setCreateAccClicked(true);
  }

  function handleCreateAccountPressOut() {
    setCreateAccClicked(false);
    navigation.replace("SignIn");
  }

  function handleSignUp() {
    console.log("Sign Up pressed");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <View style={{ marginBottom: 100 }}>
        <Image
          source={require("../assets/images/searching.png")}
          style={styles.image}
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaaaaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaaaaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaaaaa"
            secureTextEntry={true}
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Pressable
            onPressIn={handleCreateAccountPressIn}
            onPressOut={handleCreateAccountPressOut}
          >
            <Text
              style={[styles.message, createAccClicked && { color: "#245a51" }]}
            >
              Already have an account? Login here
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.signupButton,
            {
              backgroundColor: pressed ? "#1e9473" : "#245a51",
            },
          ]}
          onPress={handleSignUp}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 280,
    height: 180,
    marginBottom: 50,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 75,
    fontStyle: "italic",
    color: "#245a51",
    marginTop: 75,
  },
  input: {
    backgroundColor: "#ffffff",
    height: 50,
    width: 300,
    margin: 5,
    padding: 8,
    color: "#245a51",
    borderRadius: 14,
    fontSize: 16,
    fontWeight: "400",
  },
  message: {
    fontSize: 12,
    fontWeight: "400",
    color: "#367c72",
    textAlign: "center",
    marginBottom: 5,
  },
  signupButton: {
    backgroundColor: "#245a51",
    borderRadius: 14,
    marginHorizontal: 5,
    height: 50,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  signupButtonText: {
    color: "#F4FBFA",
    fontSize: 16,
    fontWeight: "bold",
  },
});
