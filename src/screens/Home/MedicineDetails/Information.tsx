import React from 'react'
import {
  View,
  Text
} from 'react-native'

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
        Açıklama
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
          Şirket Adı:
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
          İlaç Tipi:
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
          ATC:
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
          Etkin Madde:
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

