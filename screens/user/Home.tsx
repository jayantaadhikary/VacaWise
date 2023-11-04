import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import Card from "../../components/Card";
import { ExploreData as data } from "../../data/data";
import SmallCard from "../../components/SmallCard";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Explore</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            {data.map((item) => {
              return (
                <Card
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                />
              );
            })}
          </View>
        </ScrollView>
        <View>
          <Text style={[styles.title, { fontSize: 20 }]}>
            Popular Destinations
          </Text>
          <ScrollView>
            {data.map((item) => {
              return (
                <SmallCard key={item.id} name={item.name} image={item.image} />
              );
            })}
            {/* <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SmallCard name={item.name} image={item.image} />
              )}
            /> */}
          </ScrollView>
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
    marginTop: 10,
    marginLeft: 8,
  },
  cardsContainer: {
    // flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
});
