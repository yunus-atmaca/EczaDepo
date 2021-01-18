import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Color } from '../utils/Color'

export default function Tabbar({ state, descriptors, navigation, badge }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  //console.debug('TABBAR: ', badge)
  return (
    <View style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 12,
      flexDirection: 'row',
      width: Dimensions.get('window').width - 48,
      backgroundColor: Color.primaryColor,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 24,
      borderRadius: 10
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const getIcon = () => {
          if (label === 'Home') {
            return (
              <View>
                <Ionicons name={'home'}
                  size={isFocused ? 28 : 24}
                  color={isFocused ? 'white' : Color.colorOnPrimary} />
              </View>
            )
          } else if (label === 'ShoppingCart') {
            return (
              <View>
                <View style={{
                  height: 68,
                  width: 68,
                  backgroundColor: Color.primaryColor,
                  borderWidth: 1,
                  borderColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 36
                }}>
                  <MaterialIcons name={'shopping-cart'}
                    size={isFocused ? 28 : 24}
                    color={isFocused ? 'white' : Color.colorOnPrimary} />
                  {
                    badge > 0 && (
                      <View style={{
                        position: 'absolute',
                        right: 12,
                        top: 12,
                        height: 14,
                        width: 14,
                        borderRadius: 7,
                        backgroundColor: isFocused ? 'white' : Color.colorOnPrimary,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        {
                          badge > 9 ?
                            (
                              <Text style={{ color: Color.primaryColor, fontSize: 11 }}>9+</Text>
                            )
                            :
                            (
                              <Text style={{ color: Color.primaryColor, fontSize: 11 }}>{badge}</Text>
                            )
                        }
                      </View>
                    )
                  }
                </View>
              </View>
            )
          } else if (label === 'Login') {
            return (
              <View>
                <MaterialCommunityIcons
                  name={'login'}
                  size={isFocused ? 28 : 24}
                  color={isFocused ? 'white' : Color.colorOnPrimary} />
              </View>
            )
          }
        }
        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            activeOpacity={0.8}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center' }}>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {getIcon()}
            </View>
          </TouchableOpacity>
        );
      })}
    </View >
  );
}