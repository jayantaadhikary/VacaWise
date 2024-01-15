import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { UserDataContext } from "../store/UserDataContext";
import { firestore, storage } from "../config/firebase";
import {
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getDownloadURL, ref } from "firebase/storage";

const SmallPost = ({ post }: any) => {
  const { userDetails }: any = useContext(UserDataContext);

  const { title, location, date: postDate, description, name, imageUrl } = post;

  const date = postDate.toDate().toDateString();
  const [imageUri, setImageUri] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageRef = ref(storage, imageUrl);
        const uri = await getDownloadURL(imageRef);
        setImageUri(uri);
      } catch (err) {
        console.log(err);
      }
    };
    loadImage();
  }, [imageUrl]);

  const [modalVisible, setModalVisible] = useState(false);

  async function deletePost() {
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        where("title", "==", title),
        where("user", "==", userDetails.email)
      );
      const querySnapshot = await getDocs(postQuery);

      if (querySnapshot.docs.length > 0) {
        const postDoc = querySnapshot.docs[0];
        // Delete the post from the Firestore collection
        await deleteDoc(doc(firestore, "posts", postDoc.id));
        // Close the modal after deletion
        setModalVisible(false);
      } else {
        console.error("Post not found");
        // Handle the error, e.g., show an alert
        Alert.alert("Error", "Could not find the post to delete.");
      }
    } catch (err) {
      console.log(err);
    }
  }

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

          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
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
          {/* Only show the delete button if the user is the owner of the post */}
          {name == userDetails.fullName && (
            <View>
              <TouchableOpacity
                style={{
                  // backgroundColor: "red",
                  margin: 10,
                  // padding: 10,
                  // borderRadius: 10,
                  alignItems: "center",
                }}
                onPress={deletePost}
              >
                <Text style={{ color: "black", fontSize: 16 }}>
                  <Ionicons name="trash-outline" size={30} color="red" />{" "}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </>
  );
};

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

export default SmallPost;
