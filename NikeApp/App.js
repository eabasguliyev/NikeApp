import { StatusBar } from "expo-status-bar";
import Navigation from "./src/Navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar style="auto" />
    </Provider>
  );
}
