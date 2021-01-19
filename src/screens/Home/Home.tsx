import React from 'react'
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  Keyboard,
} from 'react-native'

import Products from '../../Components/Products'
import Companies from '../../Components/Companies'
import Advertisements from '../../Components/Advertisements'
import OverlaySpinner from '../../Components/OverlaySpinner'
import SearchBar from '../../Components/SearchBar'

import { stores, Store } from '../../utils/Stores'

const { width, height } = Dimensions.get('window')

const favorites = require('../../utils/favorites.json')
import i18n from '../../utils/i18n'

class Home extends React.Component<any, any> {
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
        if (!this.medicineNames.includes(medicine.name) && medicine.name !== undefined)
          this.medicineNames.push(medicine.name)
      })
    })

    this.state = {
      spinner: false
    }

    //console.debug(this.storeNames)
    //console.debug(this.medicineNames)
  }



  _onMedicineClick = (medicine: string) => {
    this.setState({ spinner: true })

    let availableStores = this._getAvailableStores(medicine);

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
          <SearchBar
            navigatedFrom={'Home'}
            onMedicineClick={this._onMedicineClick}
            medicines={this.medicineNames}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}>
            <Advertisements />
            <Companies
              header={i18n.get().companies}
              stores={this.storeNames}
              onStoreClicked={this._onStoreClicked}
            />
            <Products header={i18n.get().youLiked} products={favorites} />
          </ScrollView>
        </View>
        <OverlaySpinner spinner={this.state.spinner} />
      </View>
    )
  }
}

export default Home