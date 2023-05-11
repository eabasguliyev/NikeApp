import { StyleSheet, FlatList, Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/slices/productsSlice";
// import { useNavigation } from "@react-navigation/native";

const ProductsScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  const productPressHandler = (item) => {
    // update selected product
    dispatch(productsSlice.actions.setSelectedProduct(item.id));

    navigation.navigate("Product Details");
  };

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          onPress={productPressHandler.bind(null, item)}
          style={styles.itemContainer}
        >
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  image: { width: "100%", aspectRatio: 1 / 1 },
});

export default ProductsScreen;
