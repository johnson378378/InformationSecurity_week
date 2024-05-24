let isSecondAttempt = false;
let crackedNumber;

function startGame() {
    const userInput = document.getElementById('userInput').value;
    const message = document.getElementById('message');

    // 清空上次的提示信息
    message.innerText = '';

    if (!isSecondAttempt && /^\d{3}$/.test(userInput)) {
        // 第一次要求輸入3位數字作為密碼
        crackedNumber = generateRandomNumber(100, 999); // 隨機生成一個3位數字作為破解目標
        attemptCrack(crackedNumber, userInput);
    } else if (isSecondAttempt && /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(userInput)) {
        // 第二次要求輸入至少6位，且包含數字及英文大小寫的密碼
        message.innerText = '恭喜，你的密碼強度夠高！這是答案：Answer3 : A';
    } else {
        message.innerText = isSecondAttempt ? '請輸入至少6位，且包含數字及英文大小寫的密碼' : '請輸入3位數字';
    }
}

function attemptCrack(target, userInput) {
    const startTime = Date.now();
    const timeout = 5000; // 5秒時間限制

    // 在5秒內嘗試破解密碼
    const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const elapsedTimeInSeconds = elapsedTime / 1000;

        if (parseInt(userInput) === target) {
            // 如果用戶在5秒內破解成功，顯示失敗信息並要求重新輸入
            clearInterval(intervalId);
            message.innerText = `失敗了，僅需 ${elapsedTimeInSeconds.toFixed(2)} 秒就算出你的密碼是：${userInput}。請輸入6位以上包含數字及英文大小寫的密碼。`;
            isSecondAttempt = true;
        } else if (elapsedTime >= timeout) {
            // 如果5秒內未能破解成功，顯示成功信息
            clearInterval(intervalId);
            message.innerText = '恭喜，你的密碼強度夠高！這是答案：Answer3 : A';
        }
    }, 10);
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
