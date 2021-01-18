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
import i18n from '../../utils/i18n'
import Alert from '../../utils/Alert'

import MedicinesInCart from './MedicinesInCart'

const { width, height } = Dimensions.get('window')

class ShoppingCart extends React.Component<any, any> {

  medicines: any
  constructor(props) {
    super(props)

    this.medicines = this.props.medicines;
    //console.debug(this.medicines)
    this.state = {
      alert: null
    }
  }

  _orderSummary = () => {
    console.debug(this.props.medicines)
  }

  _updateMedicine = (item, piece) => {
    this.props.updateProdFromCart(item.id, {
      piece: piece,
      store: item.cartItem.storeName,
      dose: item.cartItem.dose
    })
  }

  _onIncrease = (piece, item) => {
    this._updateMedicine(item, piece)
  }

  _onDecrease = (piece, item) => {
    /*if (piece === 1) {
      this._onDelete(item)
      return
    }*/

    this._updateMedicine(item, piece)
  }

  _onDelete = (item) => {
    //console.debug(item)
    this.setState(Alert({
      title: i18n.get().warning,
      message: i18n.get().you_are_about_to_delete_item,
      onClose: () => { this.setState({ alert: null }) },
      ok: () => {
        this.props.deleteProdFromCart(item.id)
      },
      okText: i18n.get().delete,
      cancel: () => { /* Ignore */ }
    }))
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
                  {i18n.get().empty_cart}
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
                    {i18n.get().cart}
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
                        {i18n.get().amount_to_be_paid}
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
                      {i18n.get().order}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
        }
        {
          this.state.alert && this.state.alert
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
