import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,

} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PRIMARY_COLOR } from '../../../utils/Color'

interface medicineImgProps {
  onBack: () => void
  onLike: () => void,
  like: boolean
}

function medicineImg({ onBack, onLike, like }: medicineImgProps) {

  return (
    <View style={{
      width: '100%',
      height: 320,
      marginTop: 36,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Image source={require('../../../../assets/img/medicine.png')}
        style={{
          width: '100%',
          height: 256,
        }}
      />
      <TouchableOpacity onPress={onBack}
        style={{
          position: 'absolute',
          left: 0,
          top: -18,
          width: 36,
          height: 36,
        }}>
        <Ionicons name={'chevron-back'} size={32} color={'black'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onLike}
        style={{
          position: 'absolute',
          right: 8,
          top: -18,
          width: 36,
          height: 36,
        }}>
        {
          like ?
            (
              <Ionicons name={'heart'} size={32} color={PRIMARY_COLOR} />
            )
            :
            (
              <Ionicons name={'heart-outline'} size={32} color={'black'} />
            )
        }
      </TouchableOpacity>
    </View>
  )
}

export default React.memo(medicineImg)