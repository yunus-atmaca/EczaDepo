const fs = require("fs");

const bek = require('../src/utils/bek.json')
const storesPath = 'public/' + '../stores'

function createStore(storeName, isPrizeString) {
  if (fs.existsSync(storesPath)) {
    console.debug('File is already exist!')
  } else {
    console.debug('File is not exist. Creating file...')
    fs.mkdirSync(storesPath);
  }

  const medicines = bek.medicines
  let newMedicines = []
  let doses = []
  medicines.forEach(medicine => {
    medicine.doses.forEach(dose => {
      doses.push({
        fullName: dose.fullName,
        medicineType: dose.medicineType,
        companyName: dose.companyName,
        atc: dose.atc,
        activeIngredient: dose.activeIngredient,
        labelPrice: getPrize(dose.labelPrice, isPrizeString),
        warehousePrice: getPrize(dose.warehousePrice, isPrizeString),
        discount: dose.discount,
        pharmacistProfitRate: dose.pharmacistProfitRate,
        isInStock: Math.random() < 0.5
      })
    })

    newMedicines.push({
      name: medicine.name,
      doses: doses
    })
    doses = []
  });

  const store = {
    storeName: storeName,
    medicines: newMedicines
  }

  var jsonObj = JSON.stringify(store);
  fs.writeFile(storesPath + '/' + getFileName(storeName) + '.json', jsonObj, 'utf8', () => {
    console.debug(storeName + '.json file was created')
  });
}

function getFileName(storeName) {
  switch (storeName) {
    case 'Depo 1':
      return 'Store_1';
    case 'Depo 2':
      return 'Store_2';
    case 'Depo 3':
      return 'Store_3';
    case 'Depo 4':
      return 'Store_4';
    case 'Depo 5':
      return 'Store_5';

    default:
      return 'Store_1';
  }
}

function getPrize(prize, isPrizeString) {
  if (isPrizeString) {
    let prize = (parseFloat(prize) + (Math.random() * (1.00 - 3.00) + 0.0200).toFixed(2)).toString()
  } else {

  }

  return isPrizeString ?
    (parseFloat(prize) + Math.random() * (1.00 - 3.00)).toString()
    :
    parseFloat(prize) + Math.random() * (1.00 - 3.00)
}

createStore('Depo 1', false);
createStore('Depo 2', false);
createStore('Depo 3', false);
createStore('Depo 4', false);
createStore('Depo 5', false);
