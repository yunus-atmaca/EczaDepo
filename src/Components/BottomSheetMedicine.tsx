import React from 'react'
import {
  Dimensions, View
} from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'

import { PRIMARY_COLOR, LIGHT_GRAY, GRAY } from '../utils/Color'
import { Medicine } from '../utils/Stores'

const { width, height } = Dimensions.get('window')

interface BottomSheetMedicineProps {
  onClose: () => void
  medicine: Medicine
  storeName: string
}

class BottomSheetMedicine extends React.Component<BottomSheetMedicineProps, any> {

  ref: any
  constructor(props) {
    super(props)

    console.debug(this.props.medicine)
  }

  componentDidMount() {
    this.ref.snapTo(1)
  }


  _renderContent = () => {
    return (
      <View style={{
        height: (height / 3),
        width: width,
        backgroundColor: LIGHT_GRAY,
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,
      }}>
        <View style={{
          width: width,
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderBottomColor: GRAY
        }}>
          <View style={{
            height: 3,
            width: 72,
            backgroundColor: PRIMARY_COLOR,
            borderRadius: 2,
          }} />

        </View>
      </View>
    )
  }

  render() {
    return (
      <BottomSheet
        ref={(ref) => {
          this.ref = ref;
        }}
        snapPoints={[0, height / 3, 0]}
        renderContent={this._renderContent}

        onCloseEnd={this.props.onClose}
      />
    )
  }
}

export default BottomSheetMedicine