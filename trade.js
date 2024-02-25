// 交易模式
// 0: 以市價方式進行買賣，沒有停止機制，若需要停止請重整網頁
const tradeType = 0;

// 交易停止規則
// 0：無限制
// 1：設定一個 USDC 的閥值，若餘額低於該閥值則停止
// 2：以交易次數進行控制
const tradeVolume = 0;

// 設定 USDC 剩餘某數量後停止
const stopUsdc = 10;

// 設定停止的交易次數
const stopTradeAmout = 100;


// 以下程式碼請勿修改
let timer;
let counter = 1;
// 自動交易
const tradeMarket = async () => {
    // 修改掛單類型
    await changeOrderType()
    
    // 確認交易量是否達標
    const isLastest = await checkVolume();


    // 點擊 MAX
    document.getElementsByClassName('_bg-901062054')[3].click();
    await new Promise(resolve => setTimeout(resolve, 100));

    // 買入 SOL
    document.getElementsByClassName('bg-greenPrimaryButtonBackground')[0].click()
    await new Promise(resolve => setTimeout(resolve, 750)); 

    
    if (isLastest) {
        await stopTrade();
        return;
    }

    // 切換至 Sell
    document.getElementsByClassName('border-b-baseBorderMed')[0].click()
    await new Promise(resolve => setTimeout(resolve, 100)); 
    // 點擊 MAX
    document.getElementsByClassName('_bg-901062054')[3].click();
    await new Promise(resolve => setTimeout(resolve, 100)); 
    // 賣出 SOL
    document.getElementsByClassName('bg-redPrimaryButtonBackground')[0].click()
    await new Promise(resolve => setTimeout(resolve, 750)); 
    // 切換至 Buy
    document.getElementsByClassName('border-b-baseBorderMed')[0].click()
    counter++;
}

const stopTrade = () => {
    console.log('交易停止');
    clearInterval(timer);
}

// 改變掛單類型
const changeOrderType = async () => {
    if (tradeType == 0) {
        // 市價
        document.getElementsByClassName("flex flex-col cursor-pointer justify-center px-3 py-2")[9].click()
    } else {
        // 限價
        document.getElementsByClassName("flex flex-col cursor-pointer justify-center px-3 py-2")[8].click()
    }
    await new Promise(resolve => setTimeout(resolve, 500)); 
}

// 確認交易次數是否達標
const checkVolume = async () => {
    const isLastest = false;
    const balanceArray = document.getElementsByClassName('_ls-167744059')[5].textContent.split(' ');
    const balance = balanceArray[0];

    if (tradeVolume === 1 && parseFloat(balance) < stopUsdc) {
        console.log(`餘額已低於${stopUsdc} usdc，已停止`)
        isLastest = true;
    } else if (tradeVolume === 2 && counter >= stopTradeAmout) {
        console.log(`交易次數已達到${stopTradeAmout}次，已停止`)
        isLastest = true;
    }

    return isLastest;
}

// 3s 循环一次，想停止，刷新页面即可
if (tradeType === 1) {
    timer = setInterval(tradeLimit, 5000);
} else {
    timer = setInterval(tradeMarket, 5000);
}