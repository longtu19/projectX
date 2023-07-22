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
} from "react-native";
import items from "./data.js";
import { Avatar, Button, Card } from "react-native-paper";

export default function ResultPage() {

  const [itemsSelected, setItemsSelected] = useState({})

  const handlePressSellers = (itemId) => {

    setItemsSelected(prevItems => ({
      ...prevItems,
      [itemId]: !prevItems[itemId]
    }))
    
  };


  const renderItem = ({ item }) => (
    <View>
      <Card style={styles.item_card}>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button onPress={() => handlePressSellers(item.id)}>
            Sellers
          </Button>
        </Card.Actions>
        <Card.Content>

         {itemsSelected[item.id] && item.sellers.map(seller => {

          
          return (
           
            <Text style = {styles.sellers_list}>{seller.name + " " +  seller.price}</Text>
          
            
          )
         })}
        </Card.Content>
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <View style={{ height: 660, top: 100 }}>
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
    position: "fixed",
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
    borderColor: "black"

  }
});
