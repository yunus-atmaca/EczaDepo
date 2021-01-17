import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native'

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

interface SearchBoxProps {
  medicines: []
  onMedicineClick: (medicine: string) => void
}


function searchBox({ medicines, onMedicineClick }: SearchBoxProps) {

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        onMedicineClick(item)
      }}>
        <View style={{
          width: '100%',
          height: 36,
          margin: 8,
          paddingHorizontal: 12,
        }}>
          <Text numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{
              color: 'black',
              fontSize: 20,
            }}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[StyleSheet.absoluteFill, {
      marginHorizontal: 12,
      marginTop: 84,
      borderRadius: 8,
      backgroundColor: 'white',
      height: medicines.length * 52,
      maxHeight: 256,
      width: Dimensions.get('window').width - 24
    }]}>
      <FlatList
        data={medicines}
        renderItem={_renderItem}
        keyExtractor={(item, index) => "item " + index}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default React.memo(searchBox)
