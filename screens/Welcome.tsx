import { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Pressable,
} from "react-native";

const Welcome = ({ navigation }) => {
  const [isSignInClicked, setIsSignInClicked] = useState(false);

  const handleCreateAccountPress = () => {
    navigation.replace("SignUp");
  };

  const handleSignInPressIn = () => {
    setIsSignInClicked(true);
    console.log("Sign In pressed");
  };

  const handleSignInPressOut = () => {
    setIsSignInClicked(false);
    navigation.replace("SignIn");
  };

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
            onPress={handleCreateAccountPress}
          >
            <Text style={styles.buttonText}>Create an Account</Text>
          </Pressable>
          <Pressable
            onPressIn={handleSignInPressIn}
            onPressOut={handleSignInPressOut}
          >
            <Text
              style={[
                styles.signInText,
                isSignInClicked && { color: "#245a51" },
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
