import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type smallPostProps = {
  title: string;
  location: string;
  date: string;
  description: string;
  name?: string;
};

const SmallPost = ({
  title,
  location,
  date,
  description,
  name,
}: smallPostProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  function viewDetails() {
    setModalVisible(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={viewDetails}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontSize: 12, fontStyle: "italic" }}>{location}</Text>
          <Text style={{ fontSize: 12 }}>{date}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {name && (
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>Posted By</Text>
              <Text style={{ fontSize: 14 }}>{name}</Text>
            </View>
          )}
          <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Date</Text>
            <Text style={{ fontSize: 14, marginBottom: 10 }}>{date}</Text>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Location</Text>
            <Text style={{ fontSize: 14 }}>{location}</Text>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 5 }}>
              Description
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 10 }}>
              {description}
            </Text>
          </View>
        </SafeAreaView>
      </Modal>
    </>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
});
