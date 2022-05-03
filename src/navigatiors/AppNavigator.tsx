import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { navigatorTheme } from "../config/navigatorTheme";
import MusicsScreen from "../features/music/MusicsScreen";
import PlayerScrren from "../features/player/PlayerScrren";
import SearchScreen from "../features/search/SearchScreen";

const Tab = createBottomTabNavigator();

const AppNavigator: FC = () => {
  return (
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
  );
};

export default AppNavigator;
