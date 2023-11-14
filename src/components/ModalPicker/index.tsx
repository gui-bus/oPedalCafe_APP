import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { CategoryProps } from "../../pages/Order";

import { Feather, FontAwesome } from "@expo/vector-icons";

interface ModalPickerProps {
  options: CategoryProps[];
  handleCloseModal: () => void;
  selectedItem: (item: any) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default function ModalPicker({
  handleCloseModal,
  options,
  selectedItem,
}: ModalPickerProps) {
  function onPressItem(item: CategoryProps) {
    // console.log(item);
    selectedItem(item);
    handleCloseModal();
  }

  const option = options.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.option}
      onPress={() => onPressItem(item)}
    >
      <Text style={styles.item}>{item?.name}</Text>
    </TouchableOpacity>
  ));

  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.div}>
            <Text style={styles.title}>Selecione a categoria </Text>
            <Feather name="check-circle" size={28} />
          </View>
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: WIDTH - 20,
    height: HEIGHT / 1.5,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    padding: 20,
  },
  option: {
    width: "100%",
    height: 60,
    backgroundColor: "#333333",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    textAlign: "center",
  },
  item: { fontSize: 15, fontWeight: "bold", color: "#fff" },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  div: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 20,
  },
});
