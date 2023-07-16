const primeCost = document.querySelector('#prime-cost')
const finalPriceEl = document.querySelector('#sold');
const dimsFormEl = document.querySelector('.form__dims');
const sizeEl = dimsFormEl.querySelector('.size');
const btnEl = document.querySelector('.button');
const categoriesEl = document.querySelector('.form__categories');
const categoryEl = categoriesEl.querySelector('#category');
const chargeEl = categoriesEl.querySelector('.charge');
const lastMileEl = document.querySelector('.last-mile-final');
const IEEl = document.querySelector('.IE-final');
const acquiringEl = document.querySelector('.acquiring-final');
const inputEls = document.querySelectorAll('input');
const errorTxtEl = document.querySelector('.error-text');
const incomeFinalEl = document.querySelector('.income-final');
const minPrice = document.querySelector('.min-cost')
const minAvailablePrice = document.querySelector('.min-available-cost')

console.log(btnEl)

const sizeFunc = function () {
    const height = dimsFormEl.querySelector('#height');
    const width = dimsFormEl.querySelector('#width');
    const length = dimsFormEl.querySelector('#length');
    return String(height.value * width.value * length.value);
}

btnEl.addEventListener('click', (e) => {
    let flag = false;
    inputEls.forEach((element) => {
        if (element.value === '') {
            element.classList.add('error')
            flag = true;
            console.log(`${element.value} - ${flag}`)
        } else {
            if (element.classList.contains('error')) {
                element.classList.remove('error')
                element.style.border = '1px solid black'
            }
        }
    })
    if (flag) {
        errorTxtEl.textContent = 'Не все обязательные поля заполнены'
        const errorEl = document.querySelectorAll('.error');
        errorEl.forEach((item) => {
            item.style.border = '1px solid red'
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


        incomeFinalEl.textContent = String(finalIncomeNum) + ' руб'
            + ` ( ${(Number(finalIncomeNum) / Number(primeCost.value) * 100).toFixed(1)} % )`;

        minPrice.textContent = String(minPriceNum) + ' руб' + ` (Маржа: ${(Number(primeCost.value) * 0.1)} руб)`

        minAvailablePrice.textContent = String(minAvailablePriceNum) + ' руб'
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

    acquiringEl.textContent = (Number(finalPriceEl.value) * 0.015).toFixed(2)  + ' руб';
})

