import React from 'react'
import {
  View,
  Text
} from 'react-native'

import i18n from '../../../utils/i18n'

interface InformationProps {
  medicine: any
}

function information({ medicine }: InformationProps) {

  return (
    <View style={{
      paddingHorizontal: 18,
      marginTop: 8,
      justifyContent: 'center'
    }}>
      <Text style={{
        fontSize: 18,
        color: 'black',
        marginBottom: 12
      }}>
        {i18n.get().information}
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Text style={{
          color: 'black',
          fontSize: 13,
          fontWeight: "700",
        }}>
          {i18n.get().company_name + ':'}
        </Text>
        <Text style={{
          color: 'black',
          fontSize: 11,
          marginStart: 8,
        }}>
          {medicine.companyName}
        </Text>
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
      }}>
        <Text style={{
          color: 'black',
          fontSize: 13,
          fontWeight: "700",
        }}>
          {i18n.get().type_of_medicine + ':'}
        </Text>
        <Text style={{
          color: 'black',
          fontSize: 11,
          marginStart: 8,
        }}>
          {medicine.medicineType}
        </Text>
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
      }}>
        <Text style={{
          color: 'black',
          fontSize: 13,
          fontWeight: "700",
        }}>
          {i18n.get().atc + ':'}
        </Text>
        <Text style={{
          color: 'black',
          fontSize: 11,
          marginStart: 8,
        }}>
          {medicine.atc}
        </Text>
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
      }}>
        <Text style={{
          color: 'black',
          fontSize: 13,
          fontWeight: "700",
        }}>
          {i18n.get().active_ingredient + ':'}
        </Text>
        <Text style={{
          color: 'black',
          fontSize: 11,
          marginStart: 8,
        }}>
          {medicine.activeIngredient}
        </Text>
      </View>
    </View>
  )
}

export default React.memo(information)

