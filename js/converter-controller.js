
function onInit() {
    let prmCurrencies = getCurrencies()
    prmCurrencies.then((currencies) => {
        renderCurrencies(currencies)
        onConvert()
    })
}


function onConvert() {
    document.querySelector('body').classList.add('pending')
    let elRes = document.querySelector('.res-container');
    elRes.innerHTML = '<img src="media/loaders/rings.svg" alt="">'

    let amount = document.querySelector('input.amount').value
    let curr1 = document.querySelector('input.curr1').value
    let curr2 = document.querySelector('input.curr2').value
    
    let prmConvertedAmount = convert(amount, curr1, curr2)
        prmConvertedAmount.then(convertedAmount => {
            let prmCurrencySymbol = getCurrencySymbol(curr2)
            prmCurrencySymbol.then((currencySymbol) => {
                renderResult(convertedAmount, currencySymbol)
            })  
        })
}

function renderResult(convertedAmount, currencySymbol = '') {
    document.querySelector('body').classList.remove('pending')
    let elRes = document.querySelector('.res-container');

    let formattedAmount = parseFloat(Math.round(convertedAmount * 100) / 100).toFixed(2);

    elRes.innerHTML = `${formattedAmount} ${currencySymbol}`;
}


function onSwapCurrencies() {
    let input1 = document.querySelector('input.curr1')
    let input2 = document.querySelector('input.curr2')
    let curr1 = document.querySelector('input.curr1').value
    let curr2 = document.querySelector('input.curr2').value

    input1.value = curr2;
    input2.value = curr1;

    onConvert()

    //curr1 = [curr1, curr1=curr2][0]
    // [curr1, curr2] = [curr2, curr1];
}




function renderCurrencies(currencies) {
    let strHTMLs = [];
    for (let key in currencies) {
        let {id, currencyName, currencySymbol} = currencies[key];
        strHTMLs.push(`<option value="${id}">${currencyName}</option>`)
    }
    
    document.querySelector('#curr1').innerHTML = strHTMLs.join('')
    document.querySelector('#curr2').innerHTML = strHTMLs.join('')
}


function onKeyDown(ev) {
    if (event.keyCode === 13) {
        onConvert()
    }
}

