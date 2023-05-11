import {
  Image,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Text,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../store/slices/cartSlice";

const ProductDetailsScreen = () => {
  const { width } = useWindowDimensions();

  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct);

  const addToCartHandler = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
  };

  return (
    <View>
      {/* Image Carousel */}
      <ScrollView>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: width,
                aspectRatio: 1,
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        {/* Title */}
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>{product.name}</Text>

          {/* Price */}
          <Text style={styles.price}>${product.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Add to cart button */}
      <Pressable onPress={addToCartHandler} style={styles.cartButton}>
        <Ionicons
          name="cart"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.cartButtonText}>Add to cart</Text>
      </Pressable>

      {/* Navigation icon */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
  cartButton: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    justifyContent: "center",
    flexDirection: "row",
  },
  cartButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
