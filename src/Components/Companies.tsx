import React from 'react'
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native'
import { FlatList, } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width, height } = Dimensions.get('window')

interface CompaniesProps {
  header: string
  stores: string[],
  onStoreClicked: (store) => void
}

interface CompanyProps {

}

class Companies extends React.Component<CompaniesProps, any> {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.stores !== nextProps.stores
  }

  _getColor = (index: number) => {
    switch (index) {
      case 0:
        return 'rgb(255, 150, 10)'
      case 1:
        return 'rgb(9, 171, 29)'
      case 2:
        return 'rgb(80, 155, 246)'
      case 3:
        return 'rgb(255, 233, 0)'
      case 4:
        return 'rgb(40, 211, 255)'
    }
  }

  _renderCompany = ({ item, index }) => {
    //console.debug(item)
    return (
      <TouchableOpacity onPress={() => {
        this.props.onStoreClicked(item)
      }}>
        <View style={{
          height: 72,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: this._getColor(index),
          marginHorizontal: 8,
          borderRadius: 8,
        }}>
          <MaterialCommunityIcons name={'store'} size={32} color={'white'} />
          <Text style={{
            color: 'black',
            fontSize: 16,
          }}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{
        marginTop: 24,
        width: width,
        height: 120,
        padding: 4,
      }}>
        <View style={{
          height: 36,
          width: width,
          paddingHorizontal: 12
        }}>
          <Text style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            {this.props.header}
          </Text>
        </View>
        <FlatList
          data={this.props.stores}
          renderItem={this._renderCompany}
          keyExtractor={(item, index) => "item " + index}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }
}



function company({ }: CompanyProps) {

  return (
    <View>

    </View>
  )
}

export default Companies