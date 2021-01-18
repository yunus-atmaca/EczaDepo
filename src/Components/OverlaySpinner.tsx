import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { Color } from '../utils/Color'

interface SpinnerProps {
  spinner: boolean,
  text?: string
}

function spinner({ spinner, text }: SpinnerProps) {

  if (!spinner) {
    return null
  }

  return (
    <View style={[StyleSheet.absoluteFill, {
      backgroundColor: 'rgba(20,20,20, .25)',
      alignItems: 'center',
      justifyContent: 'center'
    }]}>
      <ActivityIndicator
        size="large"
        color={Color.primaryColor}
      />
      {
        text && (
          <Text style={{
            marginTop: 12,
            color: 'white',
            fontSize: 16,
          }}>
            {text}
          </Text>
        )
      }
    </View>
  )
}

export default React.memo(spinner)