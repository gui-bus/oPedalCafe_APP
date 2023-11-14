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
}

export function ListItem({ data }: ItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        {data.amount} - {data.name}
      </Text>
      <FontAwesome name="trash" size={28} color="#333333" style={{width: "10%"}}/>
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
