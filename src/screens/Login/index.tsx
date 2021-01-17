import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './Login'
import Profile from './Profile'

const Stack = createStackNavigator();

const LOADING = 'Yükleniyor...';
const ERROR = 'Bir hata oluştu. Tekrardan denemek için tıklayın!'

function index() {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState(LOADING)

  useEffect(() => {
    //_getLoginStatus()
  });

  const _getLoginStatus = async () => {
    try {
      const login = await AsyncStorage.getItem('login')
      if (login !== null) {
        setLoading(false)
        setLogin(true)
        setLoadingText(LOADING);
      } else {
        setLoading(false)
        setLogin(false)
        setLoadingText(LOADING);
      }
    } catch (e) {
      setLoading(false)
      setLogin(false)
      setLoadingText(ERROR)
    }
  }

  const _storeLoginStatus = async (status: string) => {
    try {
      await AsyncStorage.setItem('login', status)
    } catch (e) { }
  }

  const _onLogin = async () => {
    console.debug('ON_LOGIN')
    await _storeLoginStatus('true')

    setLoading(false)
    setLogin(true)
    setLoadingText(LOADING)
  }

  /*if (loading) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
        <Text style={{
          color: 'black',
          fontSize: 18,
          fontWeight: 'bold'
        }}>
          {setLoadingText}
        </Text>
      </View>
    )
  }*/

  /*if (loadingText === ERROR) {
    return (
      <TouchableOpacity onPress={() => {
        _getLoginStatus();
      }}>
        <View style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
          <Text style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            {setLoadingText}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }*/

  return (
    <Stack.Navigator headerMode="none" initialRouteName="Login">
      {
        login ?
          (
            <>
              <Stack.Screen name="Profile" component={Profile} />
            </>
          )
          :
          (
            <>
              <Stack.Screen initialParams={{ onLogin: _onLogin }} name="Login" component={Login} />
            </>
          )
      }
    </Stack.Navigator>
  )
}

export default index;