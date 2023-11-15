import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState, useContext } from "react";

import Welcome from "./screens/Welcome";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/user/Home";
import Profile from "./screens/user/Profile";
import Blog from "./screens/user/Blog";
import MyPosts from "./screens/user/sub-screens/MyPosts";

import { auth, firestore } from "./config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import UserDataProvider, { UserDataContext } from "./store/UserDataContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { userDetails, setUserDetails }: any = useContext(UserDataContext);

  useEffect(() => {
    // fetch user details
    const user = auth.currentUser;

    if (user) {
      const email = user.email;

      const db = collection(firestore, "users");

      const q = query(db, where("email", "==", email));

      const querySnapshot = getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data() as any);
        });
      });
    }
  }, []);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-compass" : "ios-compass-outline"}
              color="#367c72"
              size={25}
            />
          ),
          title: "",
        }}
      />
      <Tab.Screen
        name="Blog"
        component={Blog}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-book" : "ios-book-outline"}
              color="#367c72"
              size={25}
            />
          ),
          title: "",
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-person" : "ios-person-outline"}
              color="#367c72"
              size={25}
            />
          ),
          title: "",
        }}
      />
    </Tab.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyPosts"
        component={MyPosts}
        options={{ headerTitle: "My Posts" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setUser(user as any);
      } else {
        setUser(null);
      }
      setIsLoading(false); // Set loading state to false once authentication state is resolved
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <UserDataProvider>
      <NavigationContainer>
        {user != null ? <AuthenticatedStack /> : <AuthStack />}
      </NavigationContainer>
    </UserDataProvider>
  );
}
