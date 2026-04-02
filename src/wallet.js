if (!localStorage.getItem("currency")) {
    localStorage.setItem("currency", 0);
}

function getValidCurrencyValue() {
    const rawCurrency = parseInt(localStorage.getItem("currency"));
    if (!Number.isFinite(rawCurrency) || rawCurrency < 0) {
        localStorage.setItem("currency", 0);
        return 0;
    }
    return rawCurrency;
}

export function addCurrency(score) {
    let currency = getValidCurrencyValue();
    currency += score * 3;
    localStorage.setItem("currency", currency);
};

export function getCurrency() {
    return getValidCurrencyValue();
}

export function deductCurrency(price) {
    let currency = getValidCurrencyValue();
    if (currency - price >= 0) {
        currency -= price;
        localStorage.setItem("currency", currency);
        return true;
    }
    return false;
}