import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { PlayerSelect } from '../pages/PlayerSelect';
import { MyPlayers } from '../pages/MyPlayers';

import colors from '../styles/colors';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: 5,
          height: 70
        },
      }}>
        <AppTab.Screen
          name="New Player"
          component={PlayerSelect}
          options={{
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons
                name="add-circle-outline"
                size={size}
                color={color}
              />
            ))
          }}
        />

        <AppTab.Screen
          name="Meus Players"
          component={MyPlayers}
          options={{
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons
                name="format-list-bulleted"
                size={size}
                color={color}
              />
            ))
          }}
        />
    </AppTab.Navigator>
  )
}

export default AuthRoutes;