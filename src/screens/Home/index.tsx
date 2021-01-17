import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import Home from './Home'
import MedicineDetails from './MedicineDetails'

const Stack = createStackNavigator();
function index({ navigation, route }) {

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MedicineDetails') {
      navigation.setOptions({ tabBarVisible: false })
    } else {
      navigation.setOptions({ tabBarVisible: true })
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
    </Stack.Navigator>
  )
}

export default index;
