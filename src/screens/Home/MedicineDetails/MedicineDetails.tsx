import React from 'react'
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { ScrollView, } from 'react-native-gesture-handler'

import MedicineImg from './MedicineImg'
import DosesAndStores from './DosesAndStores'
import Information from './Information'
import Price from './Price'

import { connect } from 'react-redux';
import { addProdToCart, deleteProdFromCart, updateProdFromCart } from '../../../utils/redux/actions';
import Alert from '../../../utils/Alert'
import { Store, Dose } from '../../../utils/Stores'
import { Color } from '../../../utils/Color'
import i18n from '../../../utils/i18n'

const { width, height } = Dimensions.get('window')

class MedicineDetails extends React.Component<any, any> {

  stores: Store[]

  selectedPiece: number
  selectedStore: Store
  selectedDoseIndex: number

  constructor(props) {
    super(props)

    this.stores = this.props.route.params.stores

    this.selectedPiece = 1;
    this.selectedStore = this.stores[0]
    this.selectedDoseIndex = 0

    this.state = {
      like: false,
      selectedDoseIndex: this.selectedDoseIndex,
      selectedStore: this.selectedStore,
      alert: null,
    }

    //console.debug(this.medicine)
  }

  _onSelectedDose = (storeIndex, doseIndex) => {
    //console.debug('SELECTED_DOSE: ', dose)
    this.selectedDoseIndex = doseIndex
    this.selectedStore = this.stores[storeIndex]
    this.setState({
      selectedDoseIndex: this.selectedDoseIndex,
      selectedStore: this.selectedStore,
    })
  }

  _onPieceSelected = (piece) => {
    this.selectedPiece = piece;
  }

  _addToCart = () => {
    //console.debug('PIECE: ', this.piece)
    //console.debug('STORE: ', this.store)
    //console.debug('DOSE: ', this.dose)

    if (!this.selectedStore.medicines[0].doses[this.selectedDoseIndex].isInStock) {
      this.setState(Alert({
        title: i18n.get().warning,
        message: i18n.get().prod_out_of_stock,
        onClose: () => { this.setState({ alert: null }) },
      }))

      return
    }

    let medicines = this.props.medicines
    let isAlreadyInCart = false
    let medicineIndex = -1;

    //console.debug(medicines)

    //console.debug(medicines[0].cartItem)
    //console.debug(medicines[0].cartItem.dose)
    medicines.forEach((medicine, index) => {
      if ((medicine.cartItem.dose.fullName === this.selectedStore.medicines[0].doses[this.selectedDoseIndex].fullName) &&
        (medicine.cartItem.storeName === this.selectedStore.storeName)) {
        isAlreadyInCart = true
        medicineIndex = index
      }
    });

    //console.debug('isAlreadyInCart: ', isAlreadyInCart)
    //console.debug('index: ', medicineIndex)
    //console.debug(this.props.medicines[medicineIndex].id)

    if (isAlreadyInCart) {
      this.props.updateProdFromCart(this.props.medicines[medicineIndex].id, {
        storeName: this.props.medicines[medicineIndex].cartItem.storeName,
        dose: this.props.medicines[medicineIndex].cartItem.dose,
        piece: this.props.medicines[medicineIndex].cartItem.piece + this.selectedPiece
      })
    } else {
      this.props.addProdToCart({
        storeName: this.selectedStore.storeName,
        dose: this.selectedStore.medicines[0].doses[this.selectedDoseIndex],
        piece: this.selectedPiece,
      })
    }

    this.selectedPiece = 1;
    this.selectedStore = this.stores[0]
    this.selectedDoseIndex = 0

    this.setState(Alert({
      title: i18n.get().info,
      message: i18n.get().prod_added_to_cart,
      onClose: () => { this.setState({ alert: null }) },
      ok: () => {
        this.setState({
          selectedDoseIndex: 0,
          selectedStore: this.stores[0],
        })
      }
    }))
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 64,
      }}>
        <ScrollView>
          <MedicineImg
            onBack={() => { this.props.navigation.goBack() }}
            onLike={() => { this.setState({ like: !this.state.like }) }}
            like={this.state.like}
          />
          <DosesAndStores
            stores={this.stores}
            onSelectedDose={this._onSelectedDose}
          />

          <Price
            doseIndex={this.state.selectedDoseIndex}
            store={this.state.selectedStore}
            onPieceSelected={this._onPieceSelected}
          />
          <View style={{
            backgroundColor: Color.colorOnPrimary,
            height: 1,
            marginHorizontal: 18,
            width: width - 36,
            marginTop: 12
          }} />
          <Information medicine={this.state.selectedStore.medicines[0].doses[this.state.selectedDoseIndex]} />
        </ScrollView>
        <TouchableOpacity style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }} onPress={this._addToCart}>
          <View style={{
            height: 56,
            width: width - 48,
            backgroundColor: Color.colorPrimaryVariant,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 24,
            borderRadius: 8
          }}>
            <Text style={{
              fontSize: 20,
              color: 'white',

            }}>
              {i18n.get().add_to_cart}
            </Text>
          </View>
        </TouchableOpacity>
        {
          this.state.alert && this.state.alert
        }
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    medicines: state.cart.medicines,
  }
}
const mapDispatchToProps = { addProdToCart, deleteProdFromCart, updateProdFromCart }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicineDetails)
