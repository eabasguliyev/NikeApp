import { StyleSheet, FlatList, Image, Pressable } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import products from "../data/products";

const ProductsScreen = ({ navigation }) => {
  // const navigation = useNavigation();

  const productPressHandler = (item) => {
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
