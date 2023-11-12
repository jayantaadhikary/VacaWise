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
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useContext } from "react";
import { UserDataContext } from "../../store/UserDataContext";
import { firestore } from "../../config/firebase";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import SmallPost from "../../components/SmallPost";

const Blog = () => {
  const { userDetails }: any = useContext(UserDataContext);

  const [posts, setPosts] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    // console.log(userDetails);

    const fetchPosts = async () => {
      try {
        const postsQuery = query(collection(firestore, "posts"));
        const querySnapshot = await getDocs(postsQuery);

        const allPosts: any = [];

        querySnapshot.forEach((doc) => {
          allPosts.push(doc.data());
        });
        setPosts(allPosts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [posts]);

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

  function clickPostIcon() {
    setModalVisible(true);
  }

  async function submitPost() {
    const post = {
      user: userDetails.email,
      name: userDetails.fullName,
      title,
      description,
      location,
      date,
    };

    try {
      const postsCollection = collection(firestore, "posts");
      await addDoc(postsCollection, post);
      console.log("Post added successfully" + post);
    } catch (err) {
      console.log(err);
    }

    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stories</Text>
        <TouchableOpacity onPress={clickPostIcon}>
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        {posts.map((post: any) => (
          <SmallPost
            key={`${post.title}-${post.date
              .toDate()
              .toLocaleDateString("en-US")}`}
            title={post.title}
            location={post.location}
            date={post.date.toDate().toLocaleDateString("en-US")}
          />
        ))}
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
              style={[styles.input, { minHeight: 100 }]}
              placeholder="Description"
              onChangeText={(val) => setDescription(val)}
              multiline={true}
            />

            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Location"
              onChangeText={(val) => setLocation(val)}
            />
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
              editable={false}
              style={styles.input}
              placeholder="Feature not added yet!"
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
