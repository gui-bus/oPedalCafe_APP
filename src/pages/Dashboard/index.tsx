import React, { useContext, useState } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  async function openOrder() {
    if (number === "" || name === "") {
      alert("Favor preencher todos os campos!");
    }

    navigation.navigate("Order", {
      number: number,
      name: name,
      order_id: "338de4f2-bf41-4252-ad95-7e01bbed3177",
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      <Text style={styles.title}>Novo pedido</Text>
      <Text style={styles.subtitle1}>
        Bem-vindo ao sistema de pedidos do Pedal Café.
      </Text>
      <Text style={styles.subtitle2}>
        Preencha os campos abaixo para começar a criação de um novo pedido.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o número da mesa..."
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Insira o nome do cliente..."
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  logo: {
    width: 300,
    height: 150,
    objectFit: "contain",
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
  subtitle1: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "700",
  },
  subtitle2: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
    paddingHorizontal: 45,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    textAlign: "center",
  },
  button: {
    width: "90%",
    height: 60,
    backgroundColor: "#F76707",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
