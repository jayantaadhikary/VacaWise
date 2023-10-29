import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

type smallCardProps = {
  name: string;
  image: string;
};

const SmallCard = ({ name, image }: smallCardProps) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{name}</Text>
    </TouchableOpacity>
  );
};

export default SmallCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 8,
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 16,
  },
});
