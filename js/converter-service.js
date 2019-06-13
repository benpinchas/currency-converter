const API_KEY = 'e5740a24-d7ce-4f33-bb00-68062b78a25b';

let gCurrencies;

function getCurrencies() {
    const CURRENCIES_API = 'https://api.currconv.com/api/v7/currencies?apiKey=e5740a24-d7ce-4f33-bb00-68062b78a25b'

    if (gCurrencies) return Promise.resolve(gCurrencies);
    return fetch(CURRENCIES_API)
        .then((res => {
            return res.json()
                .then((resJson => {
                    gCurrencies = resJson.results
                    return gCurrencies
                }))
        }))
}

//TODO: make with template string
function getRate(strCode1, strCode2) {
    let query = strCode1 + '_' + strCode2
    let rateApi = `https://api.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${API_KEY}`
    
    return fetch(rateApi)
        .then(res => {
            return res.json()
                .then(resJson => {
                    return resJson[query]
                })
        })
}


function convert(amount, strCode1, strCode2) {
    return getRate(strCode1, strCode2)
        .then(rate => {
            return amount * rate
        })
}


function getCurrencySymbol(strCode1) {
    return getCurrencies()
        .then(currencies => {
            return currencies[strCode1].currencySymbol
        })
}

