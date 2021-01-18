import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { addProdToCart, deleteProdFromCart, updateProdFromCart } from '../../utils/redux/actions';
import { Color } from '../../utils/Color'

import MedicinesInCart from './MedicinesInCart'

const { width, height } = Dimensions.get('window')

class ShoppingCart extends React.Component<any, any> {

  medicines: any
  constructor(props) {
    super(props)

    this.medicines = this.props.medicines;
    //console.debug(this.medicines)
  }

  _orderSummary = () => {
    console.debug(this.props.medicines)
  }

  _update = () => {
    this.props.updateProdFromCart(this.props.medicines[0].medicineId, {
      piece: 123,
      store: 'Yunus',
      dose: '12312312312321'
    })
  }

  _onIncrease = (piece, medicine) => {

  }

  _onDecrease = (piece, medicine) => {

  }

  _onDelete = (medicine) => {

  }

  render() {
    //console.debug('Rerender = ShoppingCart: ', this.medicines)
    this.medicines = this.props.medicines;
    console.debug(this.medicines)
    return (
      <View style={{
        flex: 1,
        backgroundColor: Color.lightGray,
      }}>
        {
          this.medicines.length === 0 ?
            (
              <View style={{
                flex: 1,
                paddingBottom: 136,
                alignItems: 'center',
                paddingTop: 144
              }}>
                <Image source={require('../../../assets/img/empty_cart.png')}
                  style={{
                    width: 200,
                    height: 200,
                    resizeMode: 'contain'
                  }}
                />
                <Text style={{
                  color: 'black',
                  fontSize: 28,
                  marginTop: 24
                }}>
                  Sepetin şu an boş
                </Text>
              </View>
            )
            :
            (
              <View style={{
                flex: 1,
                paddingBottom: 136
              }}>
                <View style={{
                  height: 56,
                  width: width,
                  paddingHorizontal: 24,
                  justifyContent: 'center',
                }}>
                  <Text style={{
                    fontSize: 32,
                    color: 'black'
                  }}>
                    Sepetim
                  </Text>
                </View>
                <ScrollView
                  showsVerticalScrollIndicator={false}>
                  {
                    this.medicines.map((medicine, index) => {
                      return (
                        <MedicinesInCart
                          key={index + ' key'}
                          item={medicine}
                          onIncrease={this._onIncrease}
                          onDecrease={this._onDecrease}
                          onDelete={this._onDelete}
                        />
                      )
                    })
                  }
                </ScrollView>
                <TouchableOpacity style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 72,
                }} onPress={this._orderSummary}>
                  <View style={{
                    height: 64,
                    width: width,
                    backgroundColor: Color.colorPrimaryVariant,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: Color.gray,
                    flexDirection: 'row',
                    paddingHorizontal: 24
                  }}>
                    <View style={{

                    }}>
                      <Text style={{
                        color: 'white',
                        fontSize: 11,
                      }}>
                        ÖDENECEK TUTAR
                      </Text>
                      <Text style={{
                        color: 'white',
                        fontSize: 18,
                      }}>
                        {
                          parseFloat(this.medicines.map(medicine => medicine.cartItem.dose.labelPrice * medicine.cartItem.piece)
                            .reduce((a, b) => parseFloat(a) + parseFloat(b), 0))
                            .toFixed(2) + '  TL'
                        }
                      </Text>
                    </View>

                    <Text style={{
                      fontSize: 20,
                      color: 'white',
                    }}>
                      Şipariş Ver
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
        }
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    medicines: state.cart.medicines,
  }
}
const mapDispatchToProps = { addProdToCart, deleteProdFromCart, updateProdFromCart }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart)
