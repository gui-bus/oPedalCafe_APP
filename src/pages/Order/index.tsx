import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { Feather, FontAwesome } from "@expo/vector-icons";

import { api } from "../../services/api";
import ModalPicker from "../../components/ModalPicker";

type RouteDetailParams = {
  Order: {
    number: string | number;
    name: string;
    order_id: string;
  };
};

export type CategoryProps = {
  id: string;
  name: string;
};

export type ProductProps = {
  id: string;
  name: string;
  banner: string;
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<
    CategoryProps | undefined
  >();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSeleted, setProductSeleted] = useState<
    ProductProps | undefined
  >();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [amount, setAmount] = useState("");

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get("/category");

      setCategory(response.data);
      setCategorySelected(response.data[0]);
    }

    loadInfo();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/category/product", {
        params: {
          category_id: categorySelected?.id,
        },
      });

      setProducts(response.data);
      setProductSeleted(response.data[0]);
    }

    loadProducts();
  }, [categorySelected]);

  async function handleCloseOrder() {
    try {
      await api.delete("/order", {
        params: {
          order_id: route.params?.order_id,
        },
      });

      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }
  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  function handleChangeProduct(item: ProductProps) {
    setProductSeleted(item);
  }

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity
          style={[style.button, { marginBottom: 15 }]}
          onPress={handleCloseOrder}
        >
          <Text style={style.buttonText}>Cancelar Pedido</Text>
          <FontAwesome name="trash" size={28} color="#FFF" />
        </TouchableOpacity>

        <Text numberOfLines={1} style={style.subtitle2}>
          Mesa - <Text style={style.title}>{route.params.number}</Text>
        </Text>
        <Text numberOfLines={1} style={style.subtitle2}>
          Cliente - <Text style={style.title}>{route.params.name}</Text>
        </Text>
      </View>

      {category.length !== 0 && (
        <TouchableOpacity
          style={style.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={style.inputText}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity
          style={style.input}
          onPress={() => setModalProductVisible(true)}
        >
          <Text style={style.inputText}>{productSeleted?.name}</Text>
        </TouchableOpacity>
      )}

      <View style={style.qtdContainer}>
        <TextInput
          style={[
            style.input,
            { width: "60%", textAlign: "center", height: 60 },
          ]}
          placeholder="Insira a quantidade..."
          keyboardType="numeric"
          autoComplete="off"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity style={[style.buttonAdd, { width: "35%" }]}>
          <Feather name="plus-circle" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={style.actions}>
        <TouchableOpacity style={style.button}>
          <Text style={style.buttonText}>Finalizar Pedido</Text>
          <Feather name="check-circle" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="slide"
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="slide"
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "5%",
    paddingEnd: "4%",
    paddingStart: "4%",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "column",
    marginBottom: 12,
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  subtitle1: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "700",
  },
  subtitle2: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: "center",
    paddingHorizontal: 45,
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    textAlign: "center",
    justifyContent: "center",
  },
  qtdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  qtdText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#F76707",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 15,
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonAdd: {
    width: "20%",
    height: 60,
    backgroundColor: "#F76707",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  inputText: {
    textAlign: "center",
  },
});
