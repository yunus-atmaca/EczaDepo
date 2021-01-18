import React from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import { Color } from '../utils/Color';

interface AlertViewProps {
  title: string,
  message: string,
  onClose: () => void,
  ok?: () => void,
  okText?: string,
  cancel?: () => void,
  cancelText?: string,
}

interface AlertViewState {
  isVisible: boolean
}

class AlertView extends React.Component<AlertViewProps, AlertViewState> {

  constructor(props) {
    super(props)

    this.state = {
      isVisible: true
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isVisible !== nextState.isVisible
  }

  render() {
    const {
      title,
      message,
      onClose,
      ok = null,
      okText = null,
      cancel = null,
      cancelText = null,
    } = this.props

    return (
      <View>
        <Modal
          isVisible={this.state.isVisible}
          onModalHide={() => {
            this.props.onClose()
          }}>
          <View style={{
            width: Dimensions.get('window').width - 32,
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 18
          }}>
            <View style={{
              margin: 18,
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
                fontFamily: 'SFProText-Medium',
                textAlign: 'center'
              }}>
                {title}
              </Text>

              <Text style={{
                marginTop: 12,
                fontSize: 16,
                color: 'black',
                fontFamily: 'SFProText-Medium',
                textAlign: 'center'
              }}>
                {message}
              </Text>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 24,
                marginBottom: 0
              }}>
                {
                  cancel && (
                    <TouchableOpacity onPress={() => {
                      cancel && cancel()
                      this.setState({ isVisible: false })
                    }}>
                      <View style={{
                        height: 44,
                        width: 128,
                        backgroundColor: Color.primaryColor,
                        borderRadius: 22,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginEnd: 6,
                        marginStart: 6
                      }}>
                        <Text style={{
                          fontSize: 16,
                          color: 'white',
                          fontFamily: 'SFProText-Medium',
                          textAlign: 'center'
                        }}>
                          {cancelText || 'CANCEL'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
                <TouchableOpacity onPress={() => {
                  ok && ok()
                  this.setState({ isVisible: false })
                }}>
                  <View style={{
                    height: 44,
                    width: 128,
                    backgroundColor: Color.colorPrimaryVariant,
                    borderRadius: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginEnd: 6,
                    marginStart: 6
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: 'white',
                      fontFamily: 'SFProText-Medium',
                      textAlign: 'center'
                    }}>
                      {okText || 'OK'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export default AlertView