import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CartItem } from '../../utils/CartItem'
import { Color } from '../../utils/Color'
import i18n from '../../utils/i18n'

interface MedicinesInCartProps {
  item: any
  onIncrease: (piece, medicine) => void
  onDecrease: (piece, medicine) => void
  onDelete: (piece) => void
}

const { width, height } = Dimensions.get('window')

function medicinesInCart({ item, onIncrease, onDecrease, onDelete }: MedicinesInCartProps) {
  let cartItem: CartItem = item.cartItem
  let dose = cartItem.dose
  let dosePrice = dose.labelPrice
  const [price, setPrice] = useState((parseFloat(dose.labelPrice.toString()) * cartItem.piece).toFixed(2))
  const [piece, setPiece] = useState(cartItem.piece)

  //console.debug(cartItem)
  //console.debug(dose)
  //console.debug(dosePrice)

  useEffect(() => {
    //console.debug('useEffect')
    cartItem = item.cartItem;
    dose = cartItem.dose
    dosePrice = dose.labelPrice
    setPrice((parseFloat(dose.labelPrice.toString()) * cartItem.piece).toFixed(2))
    setPiece(cartItem.piece)
  }, [item]);

  return (
    <View style={{
      height: 144,
      width: width - 36,
      marginHorizontal: 18,
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: 18,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      marginVertical: 6,
      elevation: 5,
    }}>
      <View style={{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Image source={require('../../../assets/img/pills.png')}
          style={{
            height: 90,
            width: (width - 36) / 7 * 2
          }}
        />
      </View>
      <View style={{
        flex: 5,
        padding: 8
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 5,
          }}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{
                fontSize: 18,
                color: 'black',
              }}>
              {dose.fullName}
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 16,
                color: Color.gray,
              }}>
                {i18n.get().seller}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={{
                  marginStart: 8,
                  fontSize: 16,
                  color: Color.gray,
                }}>
                {cartItem.storeName}
              </Text>
            </View>
          </View>
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <TouchableOpacity onPress={() => {

            }}>
              <View style={{
                height: 32,
                width: 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <MaterialCommunityIcons name={'trash-can-outline'} color={'black'} size={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 32
        }}>
          <View>
            <Text style={{
              fontSize: 18
            }}>
              {parseFloat(price).toFixed(2) + '   TL'}
            </Text>
          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <TouchableOpacity onPress={() => {
              let tempPiece = piece === 1 ? 1 : (piece - 1)
              setPiece(tempPiece)
              //console.debug(parseFloat(item.dose.labelPrice))
              setPrice((tempPiece * parseFloat(dose.labelPrice.toString())).toFixed(2))
            }}>
              <View style={{
                height: 32,
                width: 32,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: Color.primaryColor
              }}>
                <MaterialCommunityIcons name={'minus'} color={'black'} size={18} />
              </View>
            </TouchableOpacity>
            <View style={{
              width: 48,
              justifyContent: 'center',
              alignItems: 'center',
              height: 32
            }}>
              <Text style={{
                fontSize: 16,
              }}>
                {piece}
              </Text>
            </View>
            <TouchableOpacity onPress={() => {
              let tempPiece = piece + 1
              setPiece(tempPiece)
              //console.debug(parseFloat(item.dose.labelPrice))
              setPrice((tempPiece * parseFloat(dose.labelPrice.toString())).toFixed(2))
            }}>
              <View style={{
                height: 32,
                width: 32,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: Color.primaryColor
              }}>
                <MaterialCommunityIcons name={'plus'} color={'black'} size={18} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View >
  )
}

export default React.memo(medicinesInCart)