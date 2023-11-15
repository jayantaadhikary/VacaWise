import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { UserDataContext } from "../../../store/UserDataContext";
import { firestore } from "../../../config/firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import SmallPost from "../../../components/SmallPost";

const MyPosts = () => {
  const { userDetails }: any = useContext(UserDataContext);
  const [myPosts, setMyPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = () => {
    setRefreshing(true);
    getMyPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {myPosts.length === 0 && (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}>No posts yet</Text>
          </View>
        )}
        <View>
          {myPosts.map((post: any) => (
            <SmallPost
              key={`${post.title}-${post.date
                .toDate()
                .toLocaleDateString("en-US")}`}
              post={post}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
