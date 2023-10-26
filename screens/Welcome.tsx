import { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Pressable,
} from "react-native";

const Welcome = () => {
  const [isSignInCLicked, setIsSignInClicked] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/VacaWise.png")}
        style={styles.image}
      >
        <View style={styles.contentContainer}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#245a51" : "#367c72",
                borderRadius: 10,
              },
              styles.button,
            ]}
            onPress={() => console.log("Create an Account pressed")}
          >
            <Text style={styles.buttonText}>Create an Account</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => {
              setIsSignInClicked(pressed); // Set the state on press
              return {};
            }}
            onPress={() => console.log("Sign In pressed")}
          >
            <Text
              style={[
                styles.signInText,
                isSignInCLicked && { color: "#245a51" },
              ]}
            >
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 100,
  },
  button: {
    padding: 12,
    borderRadius: 14,
    // backgroundColor: "#367c72",
  },
  buttonText: {
    textAlign: "center",
    color: "#F4FBFA",
    fontSize: 14,
    width: 300, // Set the desired width for the button
  },
  signInText: {
    color: "#367c72", // Set the text color to #367c72
    fontSize: 14,
    marginTop: 10,
  },
});
