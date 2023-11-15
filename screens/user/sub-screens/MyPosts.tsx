import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useEffect, useState, useContext } from "react";
import { UserDataContext } from "../../../store/UserDataContext";
import { firestore } from "../../../config/firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import SmallPost from "../../../components/SmallPost";

const MyPosts = () => {
  const { userDetails }: any = useContext(UserDataContext);
  const [myPosts, setMyPosts] = useState([]);

  async function getMyPosts() {
    try {
      const userPostsQuery = query(
        collection(firestore, "posts"),
        where("user", "==", userDetails.email)
      );
      const querySnapshot = await getDocs(userPostsQuery);
      const userPosts: any = [];

      querySnapshot.forEach((doc) => {
        userPosts.push(doc.data());
      });
      //   console.log(userPosts);
      setMyPosts(userPosts);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {myPosts.map((post: any) => (
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
    </View>
  );
};

export default MyPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
