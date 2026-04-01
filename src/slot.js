import { items } from "./shop.js";

export const slot = [null, null, null];
export let index = [0, 0, 0] ;
export const currentSlotPointer = 0 ;
export const maxSlot = 3 ;

export function setSlotToLocalStorage(){
    for(let i= 0 ; i < slot.length ; i++){
        if(slot[i] == null) continue ;
        const data = slot[i];

        if(localStorage.getItem(data.name)){
            continue ;
        }
        localStorage.setItem(data.name , JSON.stringify({ x: data.x ,y: data.y , w: data.w , h: data.h}));
    }
}

export function getSloFromLocalStorageAtInitial(){
    for( let item in items){
        if(localStorage.getItem(item + "Slot")){
            const firstEmptySlot = index.indexOf(0);
            const data = JSON.parse(localStorage.getItem(item + "Slot"));
            console.log(data);
            slot[firstEmptySlot] = { name:item+"Slot", x:data.x ,y:data.y ,w:data.w ,h:data.h };
            index[firstEmptySlot] = 1 ;
        }
    }
}

export function addToSlot(item){
    const data = items[item] ;
    console.log(data , item );

    //check for it alredy in slots
    for( let i = 0 ; i < slot.length ; i++ ){
        if(slot[i]===null){ continue ;}
        const data = slot[i];

        if(data.name === item + "Slot") return ;
    }
    const firstEmptySlot = index.indexOf(0);
    if(firstEmptySlot === -1 ) return;
    console.log(firstEmptySlot);
    slot[firstEmptySlot] = { name: item + "Slot", x: data.sprite.x , y: data.sprite.y , w: data.sprite.w , h:data.sprite.h};
    index[firstEmptySlot] = 1 ;
    setSlotToLocalStorage();
}

export function removeFromSlot(slotIndex){
    if(localStorage.getItem(slot[slotIndex].name)){
        localStorage.removeItem(slot[slotIndex].name);
        slot[slotIndex] = null ;
        index[slotIndex] = 0 ;
    }
}