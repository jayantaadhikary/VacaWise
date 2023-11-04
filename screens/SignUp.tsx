import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../config/firebase";

import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const SignUp = () => {
  const [createAccClicked, setCreateAccClicked] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const navigation: any = useNavigation();

  // Create refs for input fields
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  function handleCreateAccountPressIn() {
    setCreateAccClicked(true);
  }

  function handleCreateAccountPressOut() {
    setCreateAccClicked(false);
    navigation.replace("SignIn");
  }

  async function handleSignUp() {
    if (email === "" || password === "" || fullName === "") {
      Alert.alert("Please fill out all fields");
    } else if (password.length < 8) {
      Alert.alert("Password must be at least 8 characters");
    } else if (!email.includes("@")) {
      Alert.alert("Please enter a valid email");
    } else {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;

        // Add user to Firestore
        const db = getFirestore();
        const userCollection = collection(firestore, "users");
        await addDoc(userCollection, {
          email: email,
          fullName: fullName,
        });

        console.log("Registered as " + user.email);
      } catch (err) {
        console.log(err);
      }

      setEmail("");
      setPassword("");
      setFullName("");
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.header}>Sign Up</Text>
      <View style={{ marginBottom: 100 }}>
        <Image
          source={require("../assets/images/searching.png")}
          style={styles.image}
        />
        <View>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            placeholder="Full Name"
            placeholderTextColor="#aaaaaa"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              emailInputRef.current?.focus(); // Focus on the "Email" input
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#aaaaaa"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              passwordInputRef.current?.focus(); // Focus on the "Password" input
            }}
            ref={emailInputRef}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#aaaaaa"
            secureTextEntry={true}
            ref={passwordInputRef}
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
    </KeyboardAvoidingView>
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
