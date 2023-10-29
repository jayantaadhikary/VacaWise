import { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

type cardProps = {
  name: string;
  description: string;
  image: string;
};

const Card = ({ name, image, description }: cardProps) => {
  const [readMeClicked, setReadMeClicked] = useState(false);

  const words: any = description.split(" ");
  const first15Words = words.slice(0, 11);
  const newDescription = first15Words.join(" ");

  function handleReadPressIn() {
    setReadMeClicked(true);
  }

  function handleReadPressOut() {
    setReadMeClicked(false);
  }

  return (
    <View style={styles.cardContainer}>
      <Image style={styles.cardImage} source={{ uri: image }} />
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardDescription}>{newDescription}...</Text>
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
