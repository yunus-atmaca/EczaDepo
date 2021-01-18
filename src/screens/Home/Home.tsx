import React from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import SearchBox from '../../Components/SearchBox'
import Products from '../../Components/Products'
import Companies from '../../Components/Companies'
import Advertisements from '../../Components/Advertisements'
import OverlaySpinner from '../../Components/OverlaySpinner'

import { stores, Store, Medicine, Dose } from '../../utils/Stores'
import { Color } from '../../utils/Color'

const { width, height } = Dimensions.get('window')

const favorites = require('../../utils/favorites.json')
import i18n from '../../utils/i18n'

class Home extends React.Component<any, any> {

  textInputRef: any

  storeNames: string[]
  medicineNames: string[]

  isSearching: boolean
  constructor(props) {
    super(props)
    this.isSearching = false;

    this.storeNames = []
    stores.forEach(store => {
      this.storeNames.push(store.storeName)
    })

    this.medicineNames = []
    stores.forEach(store => {
      store.medicines.forEach(medicine => {
        if (!this.medicineNames.includes(medicine.name))
          this.medicineNames.push(medicine.name)
      })
    })

    this.state = {
      searchedMedicines: [],
      spinner: false
    }

    //console.debug(this.storeNames)
    //console.debug(this.medicineNames)
  }

  _onChangeText = (text) => {
    //console.debug(text).

    if (text.length < 2) {
      if (this.state.searchedMedicines) {
        this.setState({ searchedMedicines: false })
      }
      return;
    }

    if (this.isSearching)
      return

    this.isSearching = true;

    let res: any = []
    for (let i = 0; i < this.medicineNames.length; ++i) {
      if (this.medicineNames[i].match(text)) {
        res.push(this.medicineNames[i])
      }
    }

    //console.debug(res)

    this.setState({ searchedMedicines: res })

    this.isSearching = false;
  }

  _onMedicineClick = (medicine: string) => {
    this.setState({ spinner: true })

    let availableStores = this._getAvailableStores(medicine);

    if (this.state.searchedMedicines) {
      this.setState({ searchedMedicines: false })
    }
    Keyboard.dismiss()
    this.textInputRef.clear()

    this.props.navigation.navigate('MedicineDetails', {
      stores: availableStores,
    })

    this.setState({ spinner: false })
  }

  _getAvailableStores = (selectedMedicine: string) => {
    let availableStores: Store[] = []

    stores.forEach(store => {
      let index = store.medicines.findIndex((medicine: any) => medicine.name === selectedMedicine)
      //console.debug(store.storeName + ' | ' + index)
      if (index !== -1) {
        availableStores.push({
          storeName: store.storeName,
          medicines: [store.medicines[index]]
        })
      }
    })

    return availableStores;
  }

  _onStoreClicked = (storeName) => {
    let selectedStore: Store | null = null;

    stores.forEach(store => {
      if (store.storeName === storeName) {
        selectedStore = store
      }
    })

    if (selectedStore) {
      this.props.navigation.navigate('StoreMedicines', {
        store: selectedStore,
      })
    } else {
      //There is no store named <storeName>
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
        <Image source={require('../../../assets/img/home.jpg')}
          style={{
            width: width,
            height: height,
            resizeMode: 'cover'
          }}
        />
        <View style={[StyleSheet.absoluteFill, {
          opacity: 0.8,
          backgroundColor: 'white'
        }]} />

        <View style={[StyleSheet.absoluteFill, {
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 48,
        }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={this.state.searchedMedicines.length > 0 ? false : true}>
            <View style={{
              backgroundColor: 'white',
              height: 56,
              width: width - 24,
              marginHorizontal: 12,
              marginTop: 24,
              borderRadius: 12,
              borderColor: Color.primaryColor,
              borderWidth: 1,
              flexDirection: 'row'
            }}>
              <View style={{
                height: '100%',
                width: '15%',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Ionicons name={'search'} size={32} color={Color.primaryColor} />
              </View>
              <TextInput
                ref={(ref) => { this.textInputRef = ref }}
                style={{
                  height: '100%',
                  width: '70%',
                  paddingHorizontal: 0,
                  fontSize: 18,
                  color: 'black'
                }}
                placeholder={i18n.get().search_medicine}
                onChangeText={this._onChangeText}
              />
              <TouchableOpacity
                style={{
                  height: '100%',
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {
                  Keyboard.dismiss()
                  this.textInputRef.clear()
                  if (this.state.searchedMedicines) {
                    this.setState({ searchedMedicines: false })
                  }
                }}>
                <Ionicons name={'close'} size={32} color={'black'} />
              </TouchableOpacity>
            </View>

            <Advertisements />
            <Companies
              header={i18n.get().companies}
              stores={this.storeNames}
              onStoreClicked={this._onStoreClicked}
            />
            <Products header={i18n.get().youLiked} products={favorites} />

          </ScrollView>
          {
            this.state.searchedMedicines.length > 0 && (
              <SearchBox onMedicineClick={this._onMedicineClick}
                medicines={this.state.searchedMedicines} />
            )
          }
        </View>
        <OverlaySpinner spinner={this.state.spinner} />
      </View>
    )
  }
}

export default Home