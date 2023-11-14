import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Order() {
  return (
    <View style={style.container}>
      <Text style={style.title}>Tela Order</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 12,
    borderBottomWidth: 1,
    paddingBottom: 10,
    width: "70%",
    textAlign: "center",
  },
});
