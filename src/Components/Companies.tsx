import React from 'react'
import {
  View,
  Text,
  Dimensions,
  Image
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Color } from '../utils/Color'

const { width, height } = Dimensions.get('window')

interface CompaniesProps {
  header: string
  stores: string[]
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

  _renderCompany = ({ item }) => {
    //console.debug(item)
    return (
      <View style={{
        height: 72,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginHorizontal: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Color.primaryColor
      }}>
        <Text style={{
          color: 'black',
          fontSize: 20,
          fontWeight: 'bold'
        }}>
          {item}
        </Text>
      </View>
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