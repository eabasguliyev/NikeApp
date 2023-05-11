import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import CartListItem from "../components/CartListItem";
import { useSelector } from "react-redux";
import {
  selectDeliveryPrice,
  selectNumberOfItems,
  selectSubtotal,
  selectTotal,
} from "../store/slices/cartSlice";
import { useEffect } from "react";

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{subtotal} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{deliveryFee} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total} US$</Text>
      </View>
    </View>
  );
};

const ShoppingCartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const numberOfItems = useSelector(selectNumberOfItems);

  const checkoutHandler = () => {};

  useEffect(() => {
    if (numberOfItems === 0) navigation.navigate("Products");
  }, [numberOfItems]);

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={() => <ShoppingCartTotals />}
      />
      <Pressable onPress={checkoutHandler} style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderTopColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },
  checkoutButton: {
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
  checkoutButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ShoppingCartScreen;
