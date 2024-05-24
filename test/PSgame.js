function startGame() {
    const userInput = document.getElementById('userInput').value;
    const message = document.getElementById('message');

    if (userInput.length !== 3 || !/^\d{3}$/.test(userInput)) {
        message.innerText = '請輸入3位數字';
        return;
    }

    let found = false;
    const startTime = Date.now();
    const timeout = 5000; // 5秒時間限制

    function attemptCrack() {
        let attempts = 0;
        const maxAttempts = 10000; // 設置一個合理的最大嘗試次數
        while (!found && (Date.now() - startTime < timeout) && attempts < maxAttempts) {
            const randomStr = generateRandomString(3, '0123456789');
            if (randomStr === userInput) {
                found = true;
                const elapsedTime = (Date.now() - startTime) / 1000;
                message.innerText = `失敗了，僅需 ${elapsedTime.toFixed(2)} 秒就算出你的密碼是: ${userInput}。請輸入4位以上包含數字及英文大小寫的密碼。`;
                return;
            }
            attempts++;
        }

        if (!found) {
            message.innerText = '恭喜，你的密碼強度夠高！這是答案Answer3 : A';
        }
    }

    setTimeout(attemptCrack, 0); // 在下一個事件循環中開始嘗試破解
}

function generateRandomString(length, characters) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
