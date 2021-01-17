import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { Store, Dose } from '../../../utils/Stores'

interface PriceProps {
  doseIndex: number,
  store: Store,
  onPieceSelected: (piece: number) => void,
}


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function price({ doseIndex, store, onPieceSelected }: PriceProps) {

  const dosePrice = store.medicines[0].doses[doseIndex].labelPrice;
  const [piece, setPiece] = useState(1)
  const [price, setPrice] = useState(store.medicines[0].doses[doseIndex].labelPrice)

  useEffect(() => {
    //console.debug('useEffect')
    setPrice(store.medicines[0].doses[doseIndex].labelPrice)
    setPiece(1)
    onPieceSelected(1)
  }, [store.medicines[0].doses[doseIndex].labelPrice, store]);

  //console.debug('RENDER-PRICE: ', piece + ' | ' + price)
  //console.debug('RENDER-PRICE: ', medicine.labelPrice)

  return (
    <View style={{
      paddingHorizontal: 18,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <View>
        <Text style={{
          fontSize: 18
        }}>
          {parseFloat(price.toString()).toFixed(2) + '   TL'}
        </Text>
      </View>
      <View style={{
        flexDirection: 'row'
      }}>
        <TouchableOpacity onPress={() => {
          let tempPiece = piece === 1 ? 1 : (piece - 1)
          setPiece(tempPiece)
          setPrice((tempPiece * parseFloat(dosePrice.toString())).toFixed(2))
          onPieceSelected(tempPiece)
        }}>
          <View style={{
            height: 32,
            width: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 8,
            borderColor: '#bfbfbf'
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
          setPrice((tempPiece * parseFloat(dosePrice.toString())).toFixed(2))
          onPieceSelected(tempPiece)
        }}>
          <View style={{
            height: 32,
            width: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 8,
            borderColor: '#bfbfbf'
          }}>
            <MaterialCommunityIcons name={'plus'} color={'black'} size={18} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default price