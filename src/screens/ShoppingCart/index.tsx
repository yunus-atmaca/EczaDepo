import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import ShoppingCart from './ShoppingCart'

const Stack = createStackNavigator();
function index() {

  return (
    <Stack.Navigator headerMode="none" initialRouteName="ShoppingCart">
      <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
    </Stack.Navigator>
  )
}

export default index;