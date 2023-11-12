import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

type smallPostProps = {
  title: string;
  location: string;
  date: string;
};

const SmallPost = ({ title, location, date }: smallPostProps) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ fontSize: 12, fontStyle: "italic" }}>{location}</Text>
        <Text style={{ fontSize: 12 }}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SmallPost;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    height: 50,
    alignItems: "center",
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});
