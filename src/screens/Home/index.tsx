import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import Home from './Home'
import MedicineDetails from './MedicineDetails'
import StoreMedicines from './StoreMedicines'

const Stack = createStackNavigator();
function index({ navigation, route }) {

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    //console.debug(routeName)
    if (routeName === 'Home' || routeName === undefined) {
      navigation.setOptions({ tabBarVisible: true })
    } else {
      navigation.setOptions({ tabBarVisible: false })
    }
  });

  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen
        initialParams={{ medicines: route.params.medicines }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="MedicineDetails"
        component={MedicineDetails}
      />
      <Stack.Screen
        name="StoreMedicines"
        component={StoreMedicines}
      />
    </Stack.Navigator>
  )
}

export default index;
