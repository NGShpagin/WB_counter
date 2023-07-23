import * as functions from './functions.js';
import {data} from "./dataItems.js";

export const productNameEl = document.querySelector('#name');
export const primeCost = document.querySelector('#prime-cost');
export const finalPriceEl = document.querySelector('#sold');
export const dimsFormEl = document.querySelector('.dims');
export const dimsItems = dimsFormEl.querySelectorAll('.dims__item');
export const height = dimsFormEl.querySelector('#height');
export const width = dimsFormEl.querySelector('#width');
export const length = dimsFormEl.querySelector('#length');
export const weight = dimsFormEl.querySelector('#weight');
export const valueWeightEl = dimsFormEl.querySelector('.value-weight');
export const sizeEl = dimsFormEl.querySelector('.size-value');
export const dimsChargeEl = document.querySelectorAll('.dims__charge');
export const countButtonEl = document.querySelector('.buttons__count');
export const clearButtonEl = document.querySelector('.buttons__clear');
export const categoriesEl = document.querySelector('.categories');
export const categoryEl = categoriesEl.querySelector('#category');
export const chargeEl = categoriesEl.querySelector('.category-charge');
export const brakesEl = categoriesEl.querySelector('b');
export const chargeRub = document.querySelectorAll('.chargeRub');
export const lastMileEl = document.querySelector('.last-mile-final');
export const IEEl = document.querySelector('.IE-final');
export const acquiringEl = document.querySelector('.acquiring-final');
export const errorTxtEl = document.querySelector('.error-text');
export const incomeFinalEl = document.querySelector('.income-final');
export const minPrice = document.querySelector('.min-cost');
export const minIncome = document.querySelector('.min-income');
export const minAvailablePrice = document.querySelector('.min-available-cost');
export const percentSold = document.querySelector('.income-final-sold');
export const percentBuy = document.querySelector('.income-final-buy');
export const percentMinBuy = document.querySelector('.min-final-buy');
export const saveButtonEl = document.querySelector('.button-save');
export const helpIcons = document.querySelectorAll('.help-icon');
export const chargesValue = document.querySelector('.final-cost__charges-value')
export const navButtonEl = document.querySelectorAll('.nav-button');
export const itemBtnEl = document.querySelector('.item-btn');
export const shipmentBtnEl = document.querySelector('.consignment-btn');
export let necessaryEls = document.querySelectorAll('.necessary');
export const inputCrossEls = document.querySelectorAll('.cross')
export const addChargesEl = document.querySelector('.fulfillment')
export const addChargeFinalEl = document.querySelector('.addCharges')
export const fulfillmentCheckEl = document.querySelector('#fulfillment-checked')
export const categories = document.querySelector('.categories__select');
export const clearIcons = document.querySelectorAll('.clear-icon');
export const lastMilePercent = 0.055;
export const iePercent = 0.06;
export const acquiringPercent = 0.015;

export const itemCategories = JSON.parse(data);

functions.getCategoriesJSON()
functions.setNecessaryElements();

addChargeFinalEl.textContent = functions.additionalChargesFunc().toFixed(2) + ' руб'
addChargesEl.querySelectorAll('.cross').forEach((element) => {
    element.setAttribute('disabled', '');
})

errorTxtEl.addEventListener('click', () => {
    errorTxtEl.style.visibility = 'hidden';
})

dimsItems.forEach((el) => {
    el.addEventListener('input', () => {
        valueWeightEl.textContent = functions.valueWeightFunc().toFixed(2) + ' кг';
        sizeEl.textContent = functions.valueFunc().toFixed(2) + ' л';

        dimsChargeEl.forEach((element) => {
            element.textContent = functions.valueChargeFunc(functions.valueFunc()).toFixed(2) + ' руб';
        })
    })
})

countButtonEl.addEventListener('click', async (e) => {
    if (functions.necessaryFillDefineFunc()) {

        errorTxtEl.textContent = 'Не заполнены обязательные поля или некорректный формат'
        const errorEl = document.querySelectorAll('.error');
        errorEl.forEach((item) => {
            item.style.border = '1px solid red'
        })
        errorTxtEl.style.visibility = 'visible'
        setTimeout(() => {
            errorTxtEl.style.visibility = 'hidden';
        }, 5000)
        e.preventDefault();
    } else {
        errorTxtEl.textContent = '';
        errorTxtEl.style.visibility = 'hidden'

        const finalIncomeNum = functions.incomeFunc(Number(finalPriceEl.value));
        const minPriceNum = functions.minRecommendPriceFunc();
        const minAvailablePriceNum = functions.minAvailablePriceFunc();

        if (finalIncomeNum > 0) incomeFinalEl.style.color = 'forestgreen'
        else if (finalIncomeNum < 0) incomeFinalEl.style.color = 'darkred'
        else incomeFinalEl.style.color = 'black'

        for (const element of chargeRub) {
            element.textContent = `${(await functions.categoryValueChargeFunc(Number(finalPriceEl.value))).toFixed(2)} руб`;
        }
        brakesEl.style.visibility = 'visible';

        incomeFinalEl.textContent = finalIncomeNum.toFixed(2) + ' руб';
        percentSold.textContent = (finalIncomeNum / Number(finalPriceEl.value) * 100).toFixed(1) + ' %';
        percentBuy.textContent = (finalIncomeNum / Number(primeCost.value) * 100).toFixed(1) + ' %';

        addChargeFinalEl.textContent = functions.additionalChargesFunc().toFixed(2) + ' руб'

        minPrice.textContent = minPriceNum.toFixed(2) + ' руб';
        minIncome.textContent = functions.incomeFunc(minPriceNum).toFixed(2) + ' руб';
        percentMinBuy.textContent = (functions.incomeFunc(minPriceNum) / Number(primeCost.value) * 100).toFixed(1) + ' %';

        minAvailablePrice.textContent = minAvailablePriceNum.toFixed(2) + ' руб';

        chargesValue.textContent = (await functions.chargesValueFunc(Number(finalPriceEl.value))).toFixed(2) + ' руб';
        chargesValue.style.color = 'darkred';
    }
})

clearButtonEl.addEventListener('click', () => {
    valueWeightEl.textContent = '';
    sizeEl.textContent = '';
    incomeFinalEl.textContent = '';
    percentSold.textContent = '';
    percentBuy.textContent = '';
    minPrice.textContent = '';
    minIncome.textContent = '';
    percentMinBuy.textContent = '';
    minAvailablePrice.textContent = '';
    lastMileEl.textContent = '';
    IEEl.textContent = ''
    acquiringEl.textContent = '';
    chargeEl.textContent = '';
    brakesEl.style.visibility = 'hidden';
    errorTxtEl.textContent = '';
    errorTxtEl.style.visibility = 'hidden'
    chargesValue.textContent = '';
    dimsChargeEl.forEach((element) => {
        element.textContent = '';
    })
    chargeRub.forEach((element) => {
        element.textContent = '';
    })
    inputCrossEls.forEach((element) => {
        element.parentElement.querySelector('.clear-icon').style.visibility = 'hidden';
    })
    addChargesEl.querySelectorAll('.cross').forEach((element) => {
        element.setAttribute('disabled', '');
        element.parentElement.querySelector('.clear-icon').style.visibility = 'hidden';
        addChargeFinalEl.parentElement.style.visibility = 'hidden';
    })
    necessaryEls.forEach((element) => {
        if (element.querySelector('input') &&
            element.querySelector('input').classList.contains('error')) {
            element.querySelector('input').classList.remove('error');
            element.querySelector('input').style.border = '1px solid black';
        } else if (element.querySelector('select') &&
            element.querySelector('select').classList.contains('error')) {
            element.querySelector('select').classList.remove('error');
            element.querySelector('select').style.border = '1px solid black';
        }
    })
})

saveButtonEl.addEventListener('click', () => {

    const product = {
        'name': productNameEl.value,
        'primeCost': primeCost.value,
        'finalCost': finalPriceEl.value,
        'height': height.value,
        'width': width.value,
        'length': length.value,
        'weight': weight.value,
        'category': categoryEl.value
    }

    // let jsonProduct = JSON.stringify(product);
    // console.log(jsonProduct);

    if (productNameEl.value !== '' && incomeFinalEl.value !== '') {
        alert(`Товар "${productNameEl.value}" сохранен`);
    } else alert(`Ошибка при сохранении. Поля не заполнены.`);

    // alert(`Находится в разработке`)
})

finalPriceEl.addEventListener('input', () => {
    lastMileEl.textContent = functions.lastMileFunc(Number(finalPriceEl.value)).toFixed(2) + ' руб';
    IEEl.textContent = functions.ieFunc(Number(finalPriceEl.value)).toFixed(2) + ' руб';
    acquiringEl.textContent = functions.acquiringFunc(Number(finalPriceEl.value)).toFixed(2) + ' руб';
})

categories.addEventListener('input',  (element) => {
    chargeEl.textContent = functions.categoryPercentChargeFunc(element.currentTarget.value) + ' %'
})

helpIcons.forEach((element) => {
    const parentEl = element.parentElement.parentElement;
    const tooltip = parentEl.querySelector('.reference');
    parentEl.style.position = 'relative'
    element.parentElement.style.display = 'flex'
    element.parentElement.style.gap = '7px'
    element.addEventListener('mouseover', () => {
        tooltip.style.visibility = 'visible';
    })

    element.addEventListener('mouseleave', () => {
        tooltip.style.visibility = 'hidden'
    })
})

navButtonEl.forEach((element) => {
    element.addEventListener('click', () => {
        navButtonEl.forEach((btn) => {
            if (btn.classList.contains('nav-button__activated')) {
                btn.classList.remove('nav-button__activated');
                btn.removeAttribute('disabled');
            }
        })
        element.classList.add('nav-button__activated');
        element.setAttribute('disabled', '');
    })
})

itemBtnEl.addEventListener('click', () => {
    functions.setNecessaryElements();
})

shipmentBtnEl.addEventListener('click', () => {
    functions.setNecessaryElements();
})

inputCrossEls.forEach((element) => {
    functions.clearIconsIdentifyFunc(element);
    element.addEventListener('input', () => {
        functions.clearIconsIdentifyFunc(element);
    })
})

clearIcons.forEach((element) => {
    element.addEventListener('click', () => {
        element.parentElement.querySelector('input').value = '';
        element.style.visibility = 'hidden';

        if (element.parentElement.parentElement.classList.contains('fulfillment__item')) {
            addChargeFinalEl.textContent = functions.additionalChargesFunc().toFixed(2) + ' руб'
        }
    })
})

addChargesEl.querySelectorAll('.cross').forEach((element) => {
    element.addEventListener('input', () => {
        addChargeFinalEl.textContent = functions.additionalChargesFunc().toFixed(2) + ' руб'
    })
})

fulfillmentCheckEl.addEventListener('change', () => {
    addChargesEl.querySelectorAll('.cross').forEach((element) => {
        if (fulfillmentCheckEl.checked) {
            element.removeAttribute('disabled')
            if (element.value !== '') element.parentElement.querySelector('.clear-icon').style.visibility = 'visible'
            addChargeFinalEl.parentElement.style.visibility = 'visible';
        } else {
            element.setAttribute('disabled', '');
            element.parentElement.querySelector('.clear-icon').style.visibility = 'hidden';
            addChargeFinalEl.parentElement.style.visibility = 'hidden';
        }
    })
    chargesValue.textContent = '';
    incomeFinalEl.textContent = '';
    minPrice.textContent = '';
    minAvailablePrice.textContent = '';
})

addChargesEl.querySelectorAll('.clear-icon').forEach((element) => {
    element.style.visibility = 'hidden'
})