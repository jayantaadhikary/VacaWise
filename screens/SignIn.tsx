import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const SignIn = () => {
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);
  const [createAccClicked, setCreateAccClicked] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation: any = useNavigation();

  function handleForgotPasswordPressIn() {
    setForgotPasswordClicked(true);
  }

  function handleForgotPasswordPressOut() {
    setForgotPasswordClicked(false);
    console.log("Forgot password pressed");
  }

  function handleCreateAccountPressIn() {
    setCreateAccClicked(true);
  }

  function handleCreateAccountPressOut() {
    setCreateAccClicked(false);
    navigation.replace("SignUp");
  }

  async function handleSignIn() {
    if (email === "" || password === "") {
      Alert.alert("Please fill out all fields");
    }
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log("Logged in as " + user.email);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.header}>Login</Text>
      <View style={{ marginBottom: 100 }}>
        <Image
          source={require("../assets/images/explore.png")}
          style={styles.image}
        />
        <View>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaaaaa"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaaaaa"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Pressable
            onPressIn={handleForgotPasswordPressIn}
            onPressOut={handleForgotPasswordPressOut}
          >
            <Text
              style={[
                styles.message,
                { fontStyle: "italic" },
                forgotPasswordClicked && { color: "#245a51" },
              ]}
            >
              Forgot password?
            </Text>
          </Pressable>
          <Pressable
            onPressIn={handleCreateAccountPressIn}
            onPressOut={handleCreateAccountPressOut}
          >
            <Text
              style={[styles.message, createAccClicked && { color: "#245a51" }]}
            >
              New User? Sign up here
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.loginButton,
            {
              backgroundColor: pressed ? "#1e9473" : "#245a51",
            },
          ]}
          onPress={handleSignIn}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,
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
  loginButton: {
    backgroundColor: "#245a51",
    borderRadius: 14,
    marginHorizontal: 5,
    height: 50,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#F4FBFA",
    fontSize: 16,
    fontWeight: "bold",
  },
});
