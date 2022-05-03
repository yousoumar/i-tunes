import { Provider } from "react-redux";
import { store } from "./src/app/store";
import AppNavigator from "./src/navigatiors/AppNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
