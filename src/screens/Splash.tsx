import React, { useEffect } from 'react'
import {
  Dimensions,
  Image,
  Text,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import { Color } from '../utils/Color'
const { width, height } = Dimensions.get('window')

function Splash({ navigation }) {

  useEffect(() => {
    setTimeout(_navigateHome, 1500)
  });

  const _navigateHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Main', params: { medicines: [] } }
        ],
      })
    );
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'white',
      paddingVertical: 56,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -56
      }}>
        <Text style={{
          fontSize: 64,
          color: Color.primaryColor,
          fontWeight: 'bold'
        }}>
          Ecza
        </Text>
        <Text style={{
          fontSize: 32,
          color: Color.colorPrimaryVariant,
        }}>
          Depo
        </Text>
      </View>
      <Image source={require('../../assets/img/splash.png')}
        style={{
          width: width,
          resizeMode: 'contain',
          height: width,
        }}
      />
    </SafeAreaView>
  )
}

export default React.memo(Splash)
