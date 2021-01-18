import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { Color } from '../../../utils/Color'
import { Store } from '../../../utils/Stores'

import Header from './Header'

class StoreMedicines extends React.Component<any, any> {

  store: Store
  constructor(props) {
    super(props)

    this.store = this.props.route.params.store

    //console.debug(this.store)
  }

  _getImg = () => {
    let random = Math.floor(Math.random() * 3 + 1)

    if (random == 1) {
      return require('../../../../assets/img/p1.png')
    } else if (random == 2) {
      return require('../../../../assets/img/p2.png')
    } else if (random == 3) {
      return require('../../../../assets/img/p3.png')
    }
  }

  _renderMedicines = ({ item }) => {
    //console.debug(item)
    if (item.empty === true) {
      return <View style={{
        alignItems: 'center',
        flex: 1,
        width: '50%',
        height: 220,
        margin: 8,
        padding: 12,
      }} />;
    }
    return (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '50%',
        margin: 8,
        height: 220,
        backgroundColor: 'white',
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 12,
        padding: 12,
      }}>
        <TouchableOpacity activeOpacity={0.7}
          onPress={() => {

          }}>
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View style={{
              flex: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image source={this._getImg()} />
            </View>
            <View style={{
              flex: 1,
              paddingHorizontal: 6,
            }}>
              <Text numberOfLines={1}
                ellipsizeMode={'tail'}
                style={{
                  color: 'black',
                  fontSize: 18,
                }}>
                {item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}>
          <MaterialIcons name={'add-shopping-cart'} size={24} color={'black'} />
        </View>
      </View>
    )
  }

  _formatData = (data) => {
    if (!data)
      return []

    const numberOfFullRows = Math.floor(data.length / 2);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * 2);
    while (numberOfElementsLastRow !== 2 && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  };

  _onEndReached = () => {

  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: Color.lightGray
      }}>
        <Header title={this.store.storeName} onBack={() => this.props.navigation.goBack()} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this._formatData(this.store.medicines)}
          renderItem={this._renderMedicines}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.5}
        />
      </View>
    )
  }
}

export default StoreMedicines 