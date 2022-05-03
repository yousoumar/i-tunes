import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { navigatorTheme } from "./src/config/navigatorTheme";
import MusicsScreen from "./src/features/music/MusicsScreen";
import PlayerScrren from "./src/features/player/PlayerScrren";
import SearchScreen from "./src/features/search/SearchScreen";
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={navigatorTheme}>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            component={MusicsScreen}
            name="Musics"
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "headset" : "headset-outline"}
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            component={PlayerScrren}
            name="Player"
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "play-circle" : "play-circle-outline"}
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            component={SearchScreen}
            name="Search"
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "search" : "search-outline"}
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
