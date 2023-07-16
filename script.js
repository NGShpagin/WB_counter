const primeCost = document.querySelector('#prime-cost')
const finalPriceEl = document.querySelector('#sold');
const dimsFormEl = document.querySelector('.dims');
const sizeEl = document.querySelector('.dims__size');
const btnEl = document.querySelector('.button');
const categoriesEl = document.querySelector('.categories');
const categoryEl = categoriesEl.querySelector('#category');
const chargeEl = categoriesEl.querySelector('.charge');
const lastMileEl = document.querySelector('.last-mile-final');
const IEEl = document.querySelector('.IE-final');
const acquiringEl = document.querySelector('.acquiring-final');
const errorTxtEl = document.querySelector('.error-text');
const incomeFinalEl = document.querySelector('.income-final');
const minPrice = document.querySelector('.min-cost')
const minAvailablePrice = document.querySelector('.min-available-cost')
const necessaryEls = document.querySelectorAll('.necessary');
const percentSold = document.querySelector('.income-final-sold');
const percentBuy = document.querySelector('.income-final-buy');

necessaryEls.forEach((el) => {
    el.querySelector('h3').innerHTML += '<span style="color: red"> *</span>';
})


const sizeFunc = function () {
    const height = dimsFormEl.querySelector('#height');
    const width = dimsFormEl.querySelector('#width');
    const length = dimsFormEl.querySelector('#length');
    return String(height.value * width.value * length.value);
}

btnEl.addEventListener('click', (e) => {
    let flag = false;
    necessaryEls.forEach((element) => {
        console.log(element)
        if (element.querySelector('input') && element.querySelector('input').value === '') {
            element.querySelector('input').classList.add('error');
            flag = true;
        } else if (element.querySelector('select') &&
            element.querySelector('select').value === '') {
            element.querySelector('select').classList.add('error');
            console.log(element.querySelector('select').value)
            flag = true;
        } else {
            if (element.querySelector('input') &&
                element.querySelector('input').classList.contains('error')) {
                element.querySelector('input').classList.remove('error');
                element.querySelector('input').style.border = '1px solid black';
            } else if (element.querySelector('select') &&
                element.querySelector('select').classList.contains('error')) {
                element.querySelector('select').classList.remove('error');
                element.querySelector('select').style.border = '1px solid black';
            }
        }
    })
    if (flag) {
        errorTxtEl.textContent = 'Не все обязательные поля заполнены'
        const errorEl = document.querySelectorAll('.error');
        errorEl.forEach((item) => {
            item.style.border = '1px solid red'
            console.log(item)
        })
        e.preventDefault();
    } else {
        errorTxtEl.textContent = '';

        const ieNum = (Number(finalPriceEl.value) * 0.06).toFixed(2);

        const acquiringNum = (Number(finalPriceEl.value) * 0.015).toFixed(2);

        const finalIncomeNum = Number(finalPriceEl.value) - Number(ieNum)
            - Number(acquiringNum) - Number(lastMileEl.textContent) - Number(primeCost.value);

        const minPriceNum = Number(primeCost.value) + Number(ieNum)
            + Number(acquiringNum) + Number(lastMileEl.textContent) + (Number(primeCost.value) * 0.1);

        const minAvailablePriceNum = Number(primeCost.value) + Number(ieNum)
            + Number(acquiringNum) + Number(lastMileEl.textContent)

        incomeFinalEl.textContent = finalIncomeNum.toFixed(2) + ' руб';
        percentSold.textContent = (Number(finalIncomeNum) / Number(finalPriceEl.value) * 100).toFixed(1) + ' %';
        percentBuy.textContent = (Number(finalIncomeNum) / Number(primeCost.value) * 100).toFixed(1) + ' %';

        minPrice.textContent = String(minPriceNum) + ` (Маржа: ${(Number(primeCost.value) * 0.1)} руб)`

        minAvailablePrice.textContent = String(minAvailablePriceNum)
    }

    sizeEl.textContent = `Общий объем: ${sizeFunc()}`;

})

categoryEl.addEventListener('input', (e) => {
    if (categoryEl.value === 'toys') chargeEl.textContent = '10%'
    else if (categoryEl.value === 'clothes') chargeEl.textContent = '5%'
})

finalPriceEl.addEventListener('input', () => {
    if (finalPriceEl.value === '') lastMileEl.textContent = '';
    else if (Number(finalPriceEl.value) * 0.055 >= 20) {
        lastMileEl.textContent = (Number(finalPriceEl.value) * 0.055).toFixed(2);
    } else lastMileEl.textContent = '20';

    IEEl.textContent = (Number(finalPriceEl.value) * 0.06).toFixed(2) + ' руб';

    acquiringEl.textContent = (Number(finalPriceEl.value) * 0.015).toFixed(2) + ' руб';
})

