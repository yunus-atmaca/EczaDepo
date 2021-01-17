import React from 'react'
import { View, Text } from 'react-native'

class Profile extends React.Component {

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 36,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{
          color: 'black',
          fontSize: 36,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          Eczacı Meyrem ATMACA
        </Text>
      </View>
    )
  }
}

export default Profile