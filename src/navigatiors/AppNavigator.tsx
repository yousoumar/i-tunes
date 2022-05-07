import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { navigatorTheme } from "../config/navigatorTheme";
import MusicsListScreen from "../features/music/MusicsListScreen";
import SearchScreen from "../features/music/SearchScreen";

const Tab = createBottomTabNavigator();

const AppNavigator: FC = () => {
  return (
    <NavigationContainer theme={navigatorTheme}>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Tab.Screen
          component={MusicsListScreen}
          name="Musics"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? "headset" : "headset-outline"} color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          component={SearchScreen}
          name="Search"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? "search" : "search-outline"} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
