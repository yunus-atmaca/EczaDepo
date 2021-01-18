import React from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TextInput
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Color } from '../../utils/Color'
import i18n from '../../utils/i18n'

const { width, height } = Dimensions.get('window')

class Login extends React.Component<any, any> {

  constructor(props) {
    super(props)

  }

  _onLogin = () => {
    this.props.route.params.onLogin();
  }

  render() {
    return (
      <View style={{
        flex: 1,
      }}>
        <Image source={require('../../../assets/img/login.png')}
          style={{
            width: width,
            height: height,
            resizeMode: 'cover'
          }}
        />
        <View style={[StyleSheet.absoluteFill, {
          backgroundColor: 'white',
          opacity: 0.8,
          alignItems: 'center',
          justifyContent: 'center'
        }]} />
        <View style={[StyleSheet.absoluteFill, {
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center'
        }]}>
          <Text style={{
            fontSize: 42,
            color: Color.primaryColor,
            fontWeight: 'bold'
          }}>
            Ecza Depo
          </Text>
          <View style={{
            height: 56,
            width: width - 72,
            marginHorizontal: 36,
            borderWidth: 1,
            borderColor: Color.primaryColor,
            borderRadius: 8,
            marginTop: 56
          }}>
            <TextInput
              placeholder={i18n.get().username}
              style={{
                height: '100%',
                width: '100%',
                paddingVertical: 0,
                fontSize: 18,
                color: 'black'
              }}
            />
          </View>

          <View style={{
            height: 56,
            width: width - 72,
            marginHorizontal: 36,
            borderWidth: 1,
            marginTop: 18,
            borderColor: Color.primaryColor,
            borderRadius: 8,
          }}>
            <TextInput
              placeholder={i18n.get().password}
              style={{
                height: '100%',
                width: '100%',
                paddingVertical: 0,
                fontSize: 18,
                color: 'black'
              }}
            />
          </View>
          <TouchableOpacity onPress={this._onLogin}>
            <View style={{
              marginTop: 36,
              height: 48,
              width: 144,
              backgroundColor: Color.colorPrimaryVariant,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
            }}>
              <Text style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold'
              }}>
                {i18n.get().login}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Login