import React from 'react'
import {
  View,
  Text,
  Dimensions,
  Image
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')

interface ProductsProps {
  header: string
  products: any[]
}

interface ProductProps {

}

class Products extends React.Component<ProductsProps, any> {

  allProd: any
  constructor(props) {
    super(props)

    this.allProd = []

    this.props.products.forEach((product) => {
      product.doses.forEach(dose => {
        this.allProd.push(dose)
      })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.products !== nextProps.products
  }

  _renderProduct = ({ item }) => {
    //console.debug(item)
    return (
      <View style={{
        height: '100%',
        width: 144,
        borderRadius: 4,
        backgroundColor: 'white',
        marginHorizontal: 4,
        paddingVertical: 4
      }}>
        <Image source={require('../../assets/img/medicine.png')}
          style={{
            width: 128,
            height: '75%',
            borderRadius: 4,
            alignSelf: 'center'
          }}
        />
        <View style={{
          paddingHorizontal: 8,
          flexDirection: 'column'
        }}>
          <Text ellipsizeMode={'tail'} numberOfLines={1}
            style={{
              color: 'black',
              fontSize: 12,

            }}>
            {item.fullName}
          </Text>
          <Text ellipsizeMode={'tail'} numberOfLines={1}
            style={{
              color: 'black',
              fontSize: 10,
            }}>
            {item.labelPrice}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{
        marginVertical: 24,
        width: width,
        height: 240,
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
          data={this.allProd}
          renderItem={this._renderProduct}
          keyExtractor={(item, index) => "item " + index}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }
}



function product({ }: ProductProps) {

  return (
    <View>

    </View>
  )
}

export default Products