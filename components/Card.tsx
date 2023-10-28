import { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

const Card = () => {
  const [readMeClicked, setReadMeClicked] = useState(false);

  function handleReadPressIn() {
    setReadMeClicked(true);
  }

  function handleReadPressOut() {
    setReadMeClicked(false);
  }

  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImage}
        source={{ uri: "https://picsum.photos/200/300" }}
      />
      <Text style={styles.cardTitle}>Card Title</Text>
      <Text style={styles.cardDescription}>
        Description about the card is written here...
      </Text>
      <Pressable
        onPressIn={handleReadPressIn}
        onPressOut={handleReadPressOut}
        style={{ flexDirection: "row", justifyContent: "flex-end" }}
      >
        <Text style={[styles.readMore, readMeClicked && { color: "#1e9473" }]}>
          Read More →
        </Text>
      </Pressable>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 8,
    marginRight: 2,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 12,
    // padding: 10,
    width: 250,
    height: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    // borderRadius: 10,
  },
  cardTitle: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  cardDescription: {
    margin: 5,
  },
  readMore: {
    fontSize: 12,
    margin: 5,
    color: "#245a51",
  },
});
