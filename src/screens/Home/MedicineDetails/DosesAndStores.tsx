import React from 'react'
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import { Transition, Transitioning } from 'react-native-reanimated';
import { Store, Medicine, Dose } from '../../../utils/Stores'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Color } from '../../../utils/Color'

interface DosesAndStoresProps {
  stores: Store[]
  onSelectedDose: (storeIndex: number, doseIndex: number) => void
}

class DosesAndStores extends React.Component<DosesAndStoresProps, any> {

  ref: any
  constructor(props) {
    super(props)

    this.state = {
      currentSection: '',
      selectedStoreIndex: 0,
      selectedDoseIndex: 0,
      selectedDoses: this._getDoesByStoreIndex(0)
    }

    //console.debug(this.props.stores)
  }

  _getDoesByStoreIndex = (index): Dose[] => {
    return this.props.stores[index].medicines[0].doses
  }

  render() {
    return (
      <Transitioning.View
        style={{
          paddingHorizontal: 18,
          paddingVertical: 12,
          justifyContent: 'center'
        }}
        ref={(ref) => this.ref = ref}
        transition={transition}>
        <TouchableOpacity
          key={'stores'}
          onPress={() => {
            this.ref.animateNextTransition();
            this.setState({ currentSection: this.state.currentSection === 'stores' ? '' : 'stores' })
          }}
          style={{
            flexGrow: 1,
          }}
          activeOpacity={0.9}>
          <View style={{
            flexGrow: 1,
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{
                  fontSize: 14,
                  color: Color.colorOnPrimary,
                }}>Satıcı</Text>
                <Text style={{
                  fontSize: 16,
                  marginStart: 8,
                  textTransform: 'uppercase',
                }}>{this.props.stores[this.state.selectedStoreIndex].storeName}</Text>
              </View>
              <MaterialIcons name={'keyboard-arrow-down'} color='black' size={28} />
            </View>
            <View style={{
              backgroundColor: Color.colorOnPrimary,
              height: 1,
              width: '100%',
              marginTop: 4
            }} />
            {
              this.state.currentSection === 'stores' && (
                <View style={{ marginTop: 16, }}>
                  {
                    this.props.stores.map((store, index) => (
                      <TouchableOpacity
                        key={'key ' + index}
                        onPress={() => {
                          this.setState({
                            selectedStoreIndex: index,
                            selectedDoseIndex: 0,
                            selectedDoses: this._getDoesByStoreIndex(index),
                            currentSection: this.state.currentSection === 'stores' ? '' : 'stores'
                          })
                          this.ref.animateNextTransition();
                          this.props.onSelectedDose(index, 0)
                        }}>
                        <Text numberOfLines={1}
                          ellipsizeMode={'tail'}
                          style={{
                            fontSize: 18,
                            color: 'black',
                            lineHeight: 28,
                          }}>
                          {store.storeName}
                        </Text>
                      </TouchableOpacity>
                    ))
                  }
                </View>
              )
            }
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          key={'doses'}
          onPress={() => {
            this.ref.animateNextTransition();
            this.setState({
              currentSection: this.state.currentSection === 'doses' ? '' : 'doses'
            })
          }}
          style={{
            flexGrow: 1,
            marginTop: 16
          }}
          activeOpacity={0.9}>
          <View style={{
            flexGrow: 1,
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{
                fontSize: 18,
                textTransform: 'uppercase',
                backgroundColor: 'white',
                color: this.state.selectedDoses[this.state.selectedDoseIndex].isInStock ? 'black' : Color.error
              }}>{this.state.selectedDoses[this.state.selectedDoseIndex].fullName}</Text>
              <MaterialIcons name={'keyboard-arrow-down'} color='black' size={28} />
            </View>
            <View style={{
              backgroundColor: Color.colorOnPrimary,
              height: 1,
              width: '100%',
              marginTop: 4
            }} />
            {
              this.state.currentSection === 'doses' && (
                <View style={{ marginTop: 16, }}>
                  {
                    this.state.selectedDoses.map((dose, index) => (
                      <TouchableOpacity
                        key={'key ' + index}
                        onPress={() => {
                          this.setState({
                            selectedDoseIndex: index,
                            currentSection: this.state.currentSection === 'doses' ? '' : 'doses'
                          })
                          this.ref.animateNextTransition();
                          this.props.onSelectedDose(this.state.selectedStoreIndex, index);
                        }}>
                        <View style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}>
                          <Text numberOfLines={1}
                            ellipsizeMode={'tail'}
                            style={{
                              fontSize: 18,
                              color: dose.isInStock ? 'black' : Color.error,
                              lineHeight: 28,
                            }}>
                            {dose.fullName}
                          </Text>
                          {
                            !dose.isInStock && (
                              <Text numberOfLines={1}
                                ellipsizeMode={'tail'}
                                style={{
                                  fontSize: 11,
                                  color: Color.error,
                                  lineHeight: 28,
                                }}>
                                Stokta yok
                              </Text>
                            )
                          }
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </View>
              )
            }
          </View>
        </TouchableOpacity>
      </Transitioning.View >
    )
  }
}

const transition = (
  <Transition.Together>
    <Transition.In type='fade' durationMs={200} />
    <Transition.Change />
    <Transition.Out type='fade' durationMs={200} />
  </Transition.Together>
);

export default DosesAndStores