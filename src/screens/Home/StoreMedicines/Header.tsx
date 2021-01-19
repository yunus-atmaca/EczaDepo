import React, { memo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLOR_PRIMARY_VARIANT } from '../../../utils/Color'

interface HeaderProps {
  title: string
  onBack: () => void
}

const { width, height } = Dimensions.get('window')

function header({ title, onBack }: HeaderProps) {

  return (
    <View style={{
      backgroundColor: COLOR_PRIMARY_VARIANT,
      width: width,
      height: 56,
      //alignItems: 'center',
      justifyContent: 'center',
      paddingStart: 40
    }}>
      <Text style={{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
      }}>
        {title}
      </Text>
      <TouchableOpacity style={{
        position: 'absolute',
        left: 0,
        top: 0,
      }} onPress={onBack}>
        <View style={{
          height: 56,
          width: 32,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Ionicons name={'chevron-back'} size={32} color={'white'} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default memo(header)