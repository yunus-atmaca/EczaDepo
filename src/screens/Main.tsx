import React from 'react'
import { YellowBox } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

YellowBox.ignoreWarnings([
  'YellowBox has been replaced with LogBox. Please call LogBox.ignoreLogs() instead.'
]);

const Tab = createBottomTabNavigator();

import Tabbar from '../Components/Tabbar'

import Home from './Home'
import ShoppingCart from './ShoppingCart'
import Login from './Login'

import { connect } from 'react-redux';

class Main extends React.Component<any, any> {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
      }}>
        <Tab.Navigator tabBar={props => <Tabbar {...props} badge={this.props.medicines.length} />}>
          <Tab.Screen name="Home" component={Home} initialParams={{ medicines: this.props.route.params.medicines }} />
          <Tab.Screen name="ShoppingCart" component={ShoppingCart} />
          <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    medicines: state.cart.medicines,
  }
}

export default connect(
  mapStateToProps,
)(Main)
