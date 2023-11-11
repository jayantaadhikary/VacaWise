import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "react-native-modal-datetime-picker";

const Blog = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (selectedDate: any) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  function createAPost() {
    setModalVisible(true);
  }

  function submitPost() {}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stories</Text>
        <TouchableOpacity onPress={createAPost}>
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Create a Post</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText={(val) => setTitle(val)}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Description"
              onChangeText={(val) => setDescription(val)}
            />

            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Location"
              onChangeText={(val) => setLocation(val)}
            />

            {/* <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Date"
              onChangeText={(val) => setDate(val)}
            /> */}
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.input}>{date.toDateString()}</Text>
            </TouchableOpacity>

            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
              display="inline"
            />

            <Text style={styles.label}>Image</Text>
            <TextInput
              style={styles.input}
              placeholder="Image"
              onChangeText={(val: any) => setImage(val)}
            />

            <Button title="Submit" onPress={submitPost} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default Blog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 8,
    marginRight: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 15,
    borderRadius: 6,
    margin: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
