import React, { useRef, useEffect, useState } from 'react'
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { TextInput } from 'react-native-gesture-handler'
import { STORE_MEDICINE, HOME } from '../utils/Pages'
import i18n from '../utils/i18n'
import { PRIMARY_COLOR } from '../utils/Color'
import SearchBox from './SearchBox'


interface SearchBarProps {
  navigatedFrom: string
  store?: string,
  onMedicineClick?: (medicine: string) => void
  medicines: string[],
  onSearchResult?: (res) => void,
  onCancel?: () => void
}

function searchBox({
  navigatedFrom,
  store,
  onMedicineClick,
  medicines,
  onSearchResult,
  onCancel
}: SearchBarProps) {
  const ref: any = useRef();

  let isSearching: boolean = false
  const [searchedMedicines, setSearchedMedicines] = useState<string[]>([])

  const _onChangeText = (text) => {
    //console.debug(text)

    if (text.length < 2) {
      if (searchedMedicines.length > 0 && navigatedFrom !== STORE_MEDICINE) {
        setSearchedMedicines([])
      }

      if (navigatedFrom === STORE_MEDICINE) {
        onCancel && onCancel()
      }

      return;
    }

    if (isSearching)
      return
    isSearching = true;

    let res: any = []
    //console.debug(this.medicineNames)
    for (let i = 0; i < medicines.length; ++i) {
      if (medicines[i].match(text)) {
        res.push(medicines[i])
      }
    }

    //console.debug(this.medicineNames.find(a => a.includes(text)))
    //console.debug(res)

    if (navigatedFrom !== STORE_MEDICINE) {
      setSearchedMedicines(res)
    } else {
      onSearchResult && onSearchResult(res)
    }

    isSearching = false
  }

  const _onClose = () => {
    ref.current.clear()
    Keyboard.dismiss()
    
    if (searchedMedicines.length > 0 && navigatedFrom !== STORE_MEDICINE) {
      setSearchedMedicines([])
    }

    if (navigatedFrom === STORE_MEDICINE) {
      onCancel && onCancel()
    }
  }

  //console.debug('RENDER: ', searchedMedicines)
  return (
    <View>
      <View style={{
        width: Dimensions.get('window').width - 24,
        height: 56,
        marginTop: navigatedFrom === HOME ? 24 : 12,
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 12,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        backgroundColor: 'white'
      }}>
        <View style={{
          height: 56,
          width: '15%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Ionicons name={'search'} size={32} color={PRIMARY_COLOR} />
        </View>
        <TextInput
          ref={ref}
          placeholder={navigatedFrom === STORE_MEDICINE ?
            ('`' + store + '`' + '      ' + i18n.get().search_in)
            :
            (i18n.get().search_medicine)
          }
          style={{
            paddingVertical: 0,
            width: '70%',
            height: 56,
            color: 'black'
          }}
          onChangeText={(text) => { _onChangeText(text) }}
        />
        <TouchableOpacity
          style={{
            height: 56,
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={_onClose}>
          <Ionicons name={'close'} size={32} color={'black'} />
        </TouchableOpacity>
      </View>
      {
        navigatedFrom !== STORE_MEDICINE && searchedMedicines.length > 0 && (
          <SearchBox
            onMedicineClick={(medicine) => {
              ref.current.clear()
              Keyboard.dismiss()

              if (searchedMedicines.length > 0 && navigatedFrom !== STORE_MEDICINE) {
                setSearchedMedicines([])
              }

              onMedicineClick && onMedicineClick(medicine);
            }}
            medicines={searchedMedicines} />
        )
      }
    </View>
  )
}

export default React.memo(searchBox)