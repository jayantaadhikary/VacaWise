import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Card from "../../components/Card";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Explore</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            <Card />
            <Card />
            <Card />
          </View>
        </ScrollView>
        <View>
          <Text>Destinations by Season</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    // color: "#245a51",
    marginTop: 20,
    marginLeft: 8,
  },
  cardsContainer: {
    // flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
});
