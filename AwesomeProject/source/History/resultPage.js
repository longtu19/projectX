import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
  Image,
  Dimensions
} from "react-native";
import items from "./data.js";
import { Avatar, Button, Card } from "react-native-paper";

const { height, width } = Dimensions.get('window');

export default function ResultPage(image) {
  const [itemsSelected, setItemsSelected] = useState({});
  const handlePressSellers = (itemId) => {
    setItemsSelected((prevItems) => ({
      ...prevItems,
      [itemId]: !prevItems[itemId],
    }));
  };

  const renderItem = ({ item }) => (
    <View>
      <Card style={styles.item_card}>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <Button onPress={() => handlePressSellers(item.id)}>Sellers</Button>
        <Card.Actions>
          <Button onPress={() => handlePressSellers(item.id)}>Sellers</Button>
        </Card.Actions>
        <Card.Content>
          {itemsSelected[item.id] &&
            item.sellers.map((seller) => {
              return (
                <Text style={styles.sellers_list}>
                  {seller.name + " " + seller.price}
                </Text>
              );
            })}
        </Card.Content>
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <View style ={styles.camera}>
        <Image source={{uri: image.route.params.image}} style ={styles.camera}/>
      </View>
      <View style={{ height: height - width, top: 100 }}>
        <FlatList
          data={items}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    lineHeight: 40,
    fontWeight: "bold",
    letterSpacing: 0.2,
    color: "white",
    backgroundColor: "black",
    padding: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    fontSize: 50,
    lineHeight: 40,
    fontWeight: "bold",
    letterSpacing: 0.2,
    color: "black",
    position: "absolute",
    padding: 12,
    borderRadius: 20,
    overflow: "hidden",
    top: 100,
    right: 90,
    backgroundColor: "white",
  },
  item_card: {
    top: 20,
    width: 320,
    marginBottom: 30,
  },
  sellers_list: {
    marginBottom: 4,
    fontSize: 20,
    borderColor: "black",
  },
  camera: {
    flex: 1,
    height: width,
    width: width,
    padding: 10,
    zIndex: 0
  },
});
