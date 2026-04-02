import { height, scale, width } from "./character.js";
import { flappyBirdSpriteSheet } from "./main.js";
import { getCurrency, deductCurrency } from "./wallet.js";

const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext('2d');

export const boughtItems = {};

export let isShowShopPage = false;
let scrollOffset = 0;
const itemHeight = 30;
const shopContentHeight = 98 - 25;

const buyButtonLoc = {}

const currencySprite = {
    '0': { x: 287, y: 74, w: 6, h: 7 },
    '1': { x: 291, y: 162, w: 3, h: 7 },
    '2': { x: 204, y: 245, w: 6, h: 7 },
    '3': { x: 212, y: 245, w: 6, h: 7 },
    '4': { x: 220, y: 245, w: 6, h: 7 },
    '5': { x: 228, y: 245, w: 6, h: 7 },
    '6': { x: 284, y: 197, w: 6, h: 7 },
    '7': { x: 292, y: 197, w: 6, h: 7 },
    '8': { x: 284, y: 213, w: 6, h: 7 },
    '9': { x: 292, y: 213, w: 6, h: 7 },
}

export const items = {
    Gravity: {
        sprite: { x: 382, y: 102, w: 22, h: 22 },
        title: "Low Gravity",
        price: 10,
        descp: "Make the Bird go Up and Down Slow"
    },
    Invinsible: {
        sprite: { x: 408, y: 102, w: 22, h: 22 },
        title: "Invincible",
        price: 10,
        descp: "Make you invinsible for 5s (point 5x)",
    },
    Shield: {
        sprite: { x: 433, y: 102, w: 22, h: 22 },
        title: "Shield",
        price: 10,
        descp: "You can take one hit and still alive",
    },
    Rocket: {
        sprite: { x: 408, y: 144, w: 22, h: 22 },
        title: "Tnterceptor",
        price: 20,
        descp: "Destroy all incoming Rocket"
    },
    Invisibility: {
        sprite: { x: 434, y: 128, w: 22, h: 22 },
        title: "Invisibility",
        price: 10,
        descp: "Makes you Invisible for 5s"
    },
}

export function storeBoughtItemsInLocalStorage() {
    for (let item in boughtItems) {
        const quantity = boughtItems[item];
        localStorage.setItem(item, quantity);
    }
};

export function setBoughtItemsFromLocalToCode() {
    for (let item in items) {
        if (localStorage.getItem(item)) {
            boughtItems[item] = parseInt(localStorage.getItem(item));
        }
    }
}

export function deductBoughtItems(item) {
    if (boughtItems[item] - 1 >= 0) {
        boughtItems[item]--;
        storeBoughtItemsInLocalStorage();
        return true;
    }
    return false;
}

export function creditBoughtItems(item) {
    boughtItems[item]++;
    storeBoughtItemsInLocalStorage();
}

export function drawShowButton() {
    ctx.drawImage(
        flappyBirdSpriteSheet,
        247, 118, 40, 14,
        (width / scale / 2) - 19, 170, 40, 14
    );
}

export function isClickOnShopButton(mouseX, mouseY) {
    return (
        mouseX >= (width / scale / 2) - 19 &&
        mouseX <= (width / scale / 2) - 19 + 40 &&
        mouseY >= 170 &&
        mouseY <= 170 + 14
    );
}

export function toggleShowPageVisibility() {
    isShowShopPage = !isShowShopPage;
}

export function showShopPage() {
    if (isShowShopPage) {
        drawShopPage();
    }
}

export function drawPriceFont(text, x, y, scale = 0.7) {

    let currentX = x;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (currencySprite[char]) {
            const sprite = currencySprite[char];
            const scaledW = sprite.w * scale;
            const sccaledH = sprite.h * scale;

            ctx.drawImage(
                flappyBirdSpriteSheet,
                sprite.x, sprite.y, sprite.w, sprite.h,
                currentX, y, scaledW, sccaledH
            );

            currentX += scaledW + (1 * scale);
        }
    }

    return currentX;

};

function getWrappedLines(text, maxWidth) {

    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function getDynamicTotalContentHeight() {
    let totalH = 0;
    const baseHeight = 30;
    const lineHeight = 6;

    ctx.font = "5px 'Pixelify Sans'";

    for (let key in items) {
        const text = items[key].descp;

        const lines = getWrappedLines();

        const extraHeight = Math.max(0, (lines.length - 1) * lineHeight);

        totalH += baseHeight + extraHeight;
    }
    return totalH;
}

export function drawShopPage() {

    const shopX = (width / scale / 2) - (113 / 2);
    const shopY = (height / scale / 2) - (98 / 2);


    ctx.drawImage(
        flappyBirdSpriteSheet,
        328, 171, 113, 98,
        shopX, shopY, 113, 98
    );

    ctx.drawImage(
        flappyBirdSpriteSheet,
        391, 133, 12, 13,
        shopX + 113 - 12, shopY, 12, 13
    );

    drawCurrency();

    ctx.save();
    ctx.beginPath();
    ctx.rect(shopX + 2, shopY + 20, 113 - 4, shopContentHeight);

    ctx.clip();

    let currentY = shopY + 25 + scrollOffset;
    const baseHeight = 30;
    const lineHeight = 6;


    for (let powerUpName in items) {

        const powerUp = items[powerUpName];

        ctx.font = "5px 'Pixelify Sans'";

        const lines = getWrappedLines(powerUp.descp, 70);

        const extraHeight = Math.max(0, (lines.length - 1) * lineHeight);


        ctx.drawImage(
            flappyBirdSpriteSheet,
            powerUp.sprite.x, powerUp.sprite.y, powerUp.sprite.w, powerUp.sprite.h,
            shopX + 5, currentY + 4, 18, 18
        );

        //quantity
        ctx.drawImage(
            flappyBirdSpriteSheet,
            474, 141, 5, 6,
            shopX + 6, currentY + 5.5 + 18, 3, 4
        );

        //quantity
        if (boughtItems[powerUpName]) {
            drawPriceFont(boughtItems[powerUpName].toString(), shopX + 10 + 18, 0.6);
        } else {
            drawPriceFont("0", shopX + 10, currentY + 5.2 + 18, 0.6);
        }

        ctx.imageSmoothingEnabled = false;

        ctx.font = " 8px 'Pixelify Sans'";
        ctx.fillStyle = 'black';
        ctx.fillText(powerUpName, shopX + 30, currentY + 5);

        ctx.font = "5px 'Pixelify Sans'";
        ctx.fillStyle = 'grey';

        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], shopX + 30, currentY + 12 + (i * lineHeight));
        }

        const buttonY = currentY + 17 + extraHeight;

        const rightXForCoin = drawPriceFont(powerUp.price.toString(), shopX + 30, buttonY);

        //coin
        ctx.drawImage(
            flappyBirdSpriteSheet,
            242, 229, 22, 22,
            rightXForCoin + 1, buttonY - 1.5, 8, 8
        );

        //buy button
        ctx.drawImage(
            flappyBirdSpriteSheet,
            345, 133, 40, 14,
            shopX + 113 - 40 * 0.6 - 7, buttonY - 2, 40 * 0.6, 14 * 0.6
        );

        buyButtonLoc[powerUpName] = { x: shopX + 113 - 40 * 0.6 - 7, y: buttonY - 2, w: 40 * 0.6, h: 14 * 0.6 };

        currentY += (baseHeight + extraHeight);
    }
    ctx.restore();
}

export function isClickOnShopCloseButton(mouseX, mouseY) {
    return (
        mouseX >= (width / scale / 2) + (113 / 2) - 12 &&
        mouseX <= (width / scale / 2) + (113 / 2) &&
        mouseY >= (height / scale / 2) - (98 / 2) &&
        mouseY <= (height / scale / 2) - (98 / 2) + 13
    )
}

export function drawCurrency() {

    const currentBalance = getCurrency().toString();

    let totalWidth = 0;

    for (let i = 0; i < currentBalance.length; i++) {
        totalWidth += currencySprite[currentBalance[i]].w + 1;
    }
    totalWidth -= 1;

    const coinWidth = 10;
    const gap = 2;
    totalWidth = totalWidth + coinWidth + gap;

    let startX = (width / scale / 2) - totalWidth / 2;
    let currentX = startX;

    for (let i = 0; i < currentBalance.length; i++) {
        const currentNum = currencySprite[currentBalance[i]];

        ctx.drawImage(
            flappyBirdSpriteSheet,
            currentNum.x, currentNum.y, currentNum.w, currentNum.h,
            currentX, (height / scale / 2) - (98 / 2) + 6.5, currentNum.w, currentNum.h
        );

        currentX += currentNum.w + 1;
    }


    ctx.drawImage(
        flappyBirdSpriteSheet,
        242, 229, 22, 22,
        currentX + gap - 1, (height / scale / 2) - (98 / 2) + 5, 10, 10
    );

};

export function isClickOnBuyButton(mouseX, mouseY) {

    const shopX = (width / scale / 2) - (113 / 2);
    const shopY = (height / scale / 2) - (98 / 2);

    const clipLeft = shopX + 2;
    const clipRight = shopX + 2 + (113 - 4);

    const clipTop = shopY + 20;
    const clipBottom = shopY + 20 + shopContentHeight;

    if (mouseX < clipLeft || mouseX > clipRight || mouseY < clipTop || mouseY > clipBottom) {
        return false;
    }

    for (let buyButton in buyButtonLoc) {
        const button = buyButtonLoc[buyButton];

        const check = (
            mouseX >= button.x &&
            mouseX <= button.x + button.w &&
            mouseY >= button.y &&
            mouseY <= button.y + button.h
        )
        if (check) {
            if (boughtItems[buyButton]) {
                const canDeduct = deductCurrency(items[buyButton].price);
                if (canDeduct) {
                    creditBoughtItems(buyButton);
                }
            } else {
                const canDeduct = deductCurrency(items[buyButton].price);
                if (canDeduct) {
                    boughtItems[buyButton] = 1;

                    storeBoughtItemsInLocalStorage();
                }
            }
            console.log(boughtItems);
            return true;
        }
    }
    return true;
}

canvas.addEventListener("wheel", (e) => {
    if (!isShowShopPage) return;

    e.preventDefault();

    const scrollSpeed = 5;

    if (e.deltaY > 0) {
        scrollOffset -= scrollSpeed;
    } else {
        scrollOffset += scrollSpeed;
    }

    if (scrollOffset > 0) scrollOffset = 0;

    const totalContentHeight = getDynamicTotalContentHeight();

    const maxScroll = -(totalContentHeight - shopContentHeight);

    if (scrollOffset < maxScroll) scrollOffset = maxScroll;
}, { passive: false });
