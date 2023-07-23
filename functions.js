import * as params from './script.js'
import {chargeEl, itemCategories} from "./script.js";

export function setNecessaryElements() {
    const necessaryEls = document.querySelectorAll('.necessary');
    necessaryEls.forEach((el) => {
        if (!el.innerHTML.includes('*')) el.querySelector('h3').innerHTML += '<span style="color: red"> *</span>';
    })
}

export function necessaryFillDefineFunc() {
    let flag = false;
    const necessaryEls = document.querySelectorAll('.necessary');
    necessaryEls.forEach((element) => {
        if (element.querySelector('input') && (element.querySelector('input').value === ''
            || element.querySelector('input').value.includes('-'))) {
            element.querySelector('input').classList.add('error');
            flag = true;
        } else if (element.querySelector('select') &&
            element.querySelector('select').value === '') {
            element.querySelector('select').classList.add('error');
            flag = true;
        } else if (!(element.querySelector('input') &&
            element.querySelector('input').classList.contains('error'))) {
            if (element.querySelector('select') &&
                element.querySelector('select').classList.contains('error')) {
                element.querySelector('select').classList.remove('error');
                element.querySelector('select').style.border = '1px solid black';
            }
        } else {
            element.querySelector('input').classList.remove('error');
            element.querySelector('input').style.border = '1px solid black';
        }
    })
    return flag;
}

export function valueWeightFunc() {
    const sizeValue = (Number(params.height.value) * Number(params.width.value) * Number(length.value) * 0.001) / 5;
    return (sizeValue > params.weight.value) ? sizeValue : Number(params.weight.value);
}

export function valueFunc() {
    return Number(params.height.value) * Number(params.width.value) * Number(params.length.value) * 0.001;
}

export function valueChargeFunc() {
    let sizePercent = 0;
    const value = valueFunc();
    if (value <= 0.2) sizePercent = 40;
    else if (value <= 0.3) sizePercent = 41;
    else if (value <= 0.4) sizePercent = 42;
    else if (value <= 0.5) sizePercent = 43;
    else if (value <= 0.6) sizePercent = 44;
    else if (value <= 0.7) sizePercent = 45;
    else if (value <= 0.8) sizePercent = 46;
    else if (value <= 0.9) sizePercent = 47;
    else if (value <= 1) sizePercent = 49;
    else if (value <= 1.9) sizePercent = 51;
    else if (value <= 2.9) sizePercent = 55;
    else if (value <= 4.9) sizePercent = 57;
    else if (value <= 5.9) sizePercent = 61;
    else if (value <= 6.9) sizePercent = 63;
    else if (value <= 7.9) sizePercent = 65;
    else if (value <= 8.4) sizePercent = 67;
    else if (value <= 8.9) sizePercent = 69;
    else if (value <= 9.4) sizePercent = 70;
    else if (value <= 9.9) sizePercent = 71;
    else if (value <= 14.9) sizePercent = 79;
    else if (value <= 19.9) sizePercent = 100;
    else if (value <= 24.9) sizePercent = 120;
    else if (value <= 29.9) sizePercent = 135;
    else if (value <= 34.9) sizePercent = 160;
    else if (value <= 39.9) sizePercent = 185;
    else if (value <= 44.9) sizePercent = 210;
    else if (value <= 49.9) sizePercent = 225;
    else if (value <= 54.9) sizePercent = 265;
    else if (value <= 59.9) sizePercent = 290;
    else if (value <= 64.9) sizePercent = 315;
    else if (value <= 69.9) sizePercent = 350;
    else if (value <= 74.9) sizePercent = 370;
    else if (value <= 99.9) sizePercent = 400;
    else if (value <= 124.9) sizePercent = 525;
    else sizePercent = 700;

    return sizePercent;
}

export function categoryPercentChargeFunc() {
    let percent;
    params.itemCategories.forEach(({categoryName, items}) => {
        items.forEach(({itemName, price}) => {
            if (document.querySelector('.categories__select').value === itemName) percent = price;
        })
    })
    return percent;
}

export function categoryValueChargeFunc(finalPrice) {
    return finalPrice * (categoryPercentChargeFunc() / 100);
}

export function lastMileFunc(finalPrice) {
    if (finalPrice === '') return 0;
    else if ((finalPrice * params.lastMilePercent) > 20) {
        return Number(params.finalPriceEl.value) * params.lastMilePercent;
    } else return 20;
}

export function ieFunc(finalPrice) {
    return finalPrice * params.iePercent;
}

export function acquiringFunc(finalPrice) {
    return finalPrice * params.acquiringPercent;
}

export function minAvailablePriceFunc() {
    let minAvailablePrice;
    if (params.fulfillmentCheckEl.checked) {
        minAvailablePrice = (Number(params.primeCost.value) + valueChargeFunc() + additionalChargesFunc()) /
            (1 - params.lastMilePercent - params.iePercent - params.acquiringPercent - (categoryPercentChargeFunc() / 100));
        if ((minAvailablePrice * 0.055) > 20) {
            return minAvailablePrice;
        } else {
            return (Number(params.primeCost.value) + 20 + valueChargeFunc() + additionalChargesFunc()) /
                (1 - params.lastMilePercent - params.iePercent - params.acquiringPercent - (categoryPercentChargeFunc() / 100));
        }
    } else {
        minAvailablePrice = (Number(params.primeCost.value) + valueChargeFunc()) /
            (1 - params.lastMilePercent - params.iePercent - params.acquiringPercent - (categoryPercentChargeFunc() / 100));
        if ((minAvailablePrice * 0.055) > 20) {
            return minAvailablePrice;
        } else {
            return (Number(params.primeCost.value) + 20 + valueChargeFunc()) /
                (1 - params.lastMilePercent - params.iePercent - params.acquiringPercent - (categoryPercentChargeFunc() / 100));
        }
    }
}

export function minRecommendPriceFunc() {
    let minRecommendPrice;
    if (params.fulfillmentCheckEl.checked) {
        minRecommendPrice = (Number(params.primeCost.value) + valueChargeFunc() + additionalChargesFunc()) /
            (0.9 - params.lastMilePercent - params.iePercent - params.acquiringPercent - (categoryPercentChargeFunc() / 100));
    } else {
        minRecommendPrice = (Number(params.primeCost.value) + valueChargeFunc()) /
            (0.9 - params.lastMilePercent - params.iePercent - params.acquiringPercent - (categoryPercentChargeFunc() / 100));
    }
    if (params.fulfillmentCheckEl.checked) {
        if ((minRecommendPrice * 0.055) > 20) {
            return minRecommendPrice;
        } else {
            return (20 + Number(params.primeCost.value) + valueChargeFunc() + additionalChargesFunc()) /
                (0.9 - params.iePercent - params.acquiringPercent - (categoryPercentChargeFunc() / 100));
        }
    } else {
        if ((minRecommendPrice * 0.055) > 20) {
            return minRecommendPrice;
        } else {
            return (Number(params.primeCost.value) + 20 + valueChargeFunc()) /
                (0.9 - params.iePercent - params.acquiringPercent - (categoryPercentChargeFunc() / 100));
        }
    }
}

export function incomeFunc(finalPrice) {
    return finalPrice - Number(params.primeCost.value) - chargesValueFunc(finalPrice)
}

export function chargesValueFunc(finalPrice) {
    if (params.fulfillmentCheckEl.checked) {
        return acquiringFunc(finalPrice) + ieFunc(finalPrice) + lastMileFunc(finalPrice)
            + categoryValueChargeFunc(finalPrice) + valueChargeFunc() + additionalChargesFunc()
    } else {
        return acquiringFunc(finalPrice) + ieFunc(finalPrice) + lastMileFunc(finalPrice)
            + categoryValueChargeFunc(finalPrice) + valueChargeFunc()
    }
}

export function clearIconsIdentifyFunc(element) {
    const clearIcon = element.parentElement.querySelector('.clear-icon');
    (element.value === '') ? clearIcon.style.visibility = 'hidden' : clearIcon.style.visibility = 'visible';
}

export function additionalChargesFunc() {
    const packageChargeEl = params.addChargesEl.querySelector('#package');
    const shipmentChargeEl = params.addChargesEl.querySelector('#shipment');
    const defectChargeEl = params.addChargesEl.querySelector('#defect');
    const additionEl = params.addChargesEl.querySelector('#additional');

    return Number(shipmentChargeEl.value) + Number(defectChargeEl.value)
        + Number(packageChargeEl.value) + Number(additionEl.value)
}

export function getCategoriesJSON() {
    params.itemCategories.forEach(({categoryName, items}) => {
        const category = document.createElement('optgroup');
        category.setAttribute('label', categoryName);
        params.categories.appendChild(category);
        items.forEach(({itemName, price}) => {
            const item = document.createElement('option')
            item.textContent = itemName;
            category.appendChild(item)
        })
    })
}