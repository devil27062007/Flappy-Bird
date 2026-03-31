if(!localStorage.getItem("currency")){
    localStorage.setItem("currency" , 0 );
}

export function addCurrency(score){
    let currency = parseInt(localStorage.getItem("currency"));
    currency += score * 3 ;
    localStorage.setItem("currency",currency);
};

export function getCurrency(){
    const currency = localStorage.getItem("currency");
    return currency ? parseInt(currency) : 0 ;
}

export function deductCurrency(price){
    let currency = parseInt(localStorage.getItem("currency"));
    currency -= price ;
    localStorage.setItem("currency" , currency );
}