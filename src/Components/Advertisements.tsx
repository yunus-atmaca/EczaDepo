import React from 'react'
import {
  View,
  Text,
  Dimensions
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';

interface AdvertisementsProps {

}

const { width, height } = Dimensions.get('window')
const arr = [
  'Reklam 1'
  ,
  'Reklam 2'
  ,
  'Reklam 3'
  ,
  'Reklam 4'
  ,
  'Reklam 5'
]

class Advertisements extends React.Component<AdvertisementsProps, any> {

  _renderAdvertisement = ({ item }) => {
    return (
      <View style={{
        width: width,
        height: 256,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 48
      }}>
        <View style={{
          width: width - 48,
          height: 200,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 24,

        }}>
          <Text style={{
            color: 'black',
            fontSize: 36,
            fontWeight: 'bold'
          }}>
            {item}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{
        width: width,
        height: 256,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <FlatList
          data={arr}
          renderItem={this._renderAdvertisement}
          getItemLayout={(data, index) => (
            { length: width, offset: width * index, index }
          )}
          snapToInterval={width}
          keyExtractor={(item, index) => "item " + index}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }
}

export default Advertisements;