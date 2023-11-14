import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Feather, FontAwesome } from "@expo/vector-icons";

interface ItemProps {
  data: {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
    banner: string;
  };
  deleteItem: (item_id: string) => void;
}

export function ListItem({ data, deleteItem }: ItemProps) {
  function handleDeleteItem() {
    deleteItem(data.id);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        {data.amount} - {data.name}
      </Text>

      <TouchableOpacity style={{ width: "10%" }} onPress={handleDeleteItem}>
        <FontAwesome name="trash" size={28} color="#333333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  item: {
    width: "90%",
  },
});
