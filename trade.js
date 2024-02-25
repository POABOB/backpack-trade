// 交易模式
// 0: 以市價方式進行買賣，沒有停止機制，若需要停止請重整網頁
// 1：以限價方式進行買賣，並且每次買賣限制10U
const tradeType = 1;

// 交易停止規則
// 0：無限制
// 1：設定一個 USDC 的閥值，若餘額低於該閥值則停止
// 2：以交易次數進行控制
const tradeVolume = 2;

// 設定 USDC 剩餘某數量後停止
const stopUsdc = 0;

// 設定停止的交易次數
const stopTradeAmout = 100;

// 每次買賣 10U
const limitOrderAmout = 10;


// 以下程式碼請勿修改
let timer;
let counter = 1;
// 自動交易
const trade = async () => {
    let amountInput = document.getElementsByClassName("h-12 rounded-lg border-2 border-solid border-baseBorderLight bg-[var(--background)] pr-12 text-right text-2xl leading-9 text-[$text] placeholder-[var(--text2)] ring-0 transition focus:border-accentBlue focus:ring-0");
    
    if (amountInput.length == 2) {
        // 當前是使用限價，改回市價
        document.getElementsByClassName("flex flex-col cursor-pointer justify-center px-3 py-2")[9].click()
        await new Promise(resolve => setTimeout(resolve, 500)); 
    }
    
    let isLastest = false;
    if (tradeType === 1) {
        const balanceArray = document.getElementsByClassName('_ls-167744059')[5].textContent.split(' ');
        const balance = balanceArray[0];
        if (parseFloat(balance) < stopUsdc) {
            console.log(`餘額已低於${stopUsdc} usdc，已停止`)
            isLastest = true;
        }
    } else if (tradeType === 2) {
        if (counter === stopTradeAmout) {
            console.log(`交易次數已達到${stopTradeAmout}次，已停止`)
            isLastest = true;
        }
    } else if (tradeType === 3) {

    }


    // 點擊 MAX
    document.getElementsByClassName('_bg-901062054')[3].click();
    await new Promise(resolve => setTimeout(resolve, 100));

    if (tradeType === 3) {
        if (amountInput[1].value > 10) {
            amountInput[1].defaultValue = 10;
            amountInput[1].value = 10;
            doEvent(amountInput[1], "input");
        }
    }



    document.getElementsByClassName('bg-greenPrimaryButtonBackground')[0].click()
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    if (isLastest) {
        stopTrade();
    }

    document.getElementsByClassName('border-b-baseBorderMed')[0].click()
    await new Promise(resolve => setTimeout(resolve, 100)); 
    document.getElementsByClassName('_bg-901062054')[3].click();
    await new Promise(resolve => setTimeout(resolve, 100)); 
    document.getElementsByClassName('bg-redPrimaryButtonBackground')[0].click()
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    document.getElementsByClassName('border-b-baseBorderMed')[0].click()
    counter++;
}

const stopTrade = () => {
    console.log('交易停止');
    clearInterval(timer);
}

const doEvent = (obj, event) => {
    var event = new Event( event, {target: obj, bubbles: true} );
    return obj ? obj.dispatchEvent(event) : false;
}

// 3s 循环一次，想停止，刷新页面即可
timer = setInterval(trade, 5000)