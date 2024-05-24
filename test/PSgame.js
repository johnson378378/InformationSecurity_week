let isFirstAttempt = true;

function startGame() {
    const userInput = document.getElementById('userInput').value;
    const message = document.getElementById('message');
    const prompt = document.getElementById('prompt');

    // 清空上次的提示信息
    message.innerText = '';

    if (isFirstAttempt && !/^\d{4}$/.test(userInput)) {
        message.innerText = '請輸入4位數字';
        return;
    } else if (!isFirstAttempt && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(userInput)) {
        message.innerText = '請輸入至少6位數，且包含數字及英文大小寫的密碼';
        return;
    }

    let found = false;
    const startTime = Date.now();
    const timeout = 5000; // 5秒時間限制
    const maxAttempts = 1000000; // 設置一個合理的最大嘗試次數

    function attemptCrack() {
        let attempts = 0;
        while (!found && (Date.now() - startTime < timeout) && attempts < maxAttempts) {
            const randomStr = generateRandomString(userInput.length, isFirstAttempt ? '0123456789' : '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            if (randomStr === userInput) {
                found = true;
                const elapsedTime = (Date.now() - startTime) / 1000;
                if (isFirstAttempt) {
                    message.innerText = `失敗了，僅需 ${elapsedTime.toFixed(2)} 秒就算出你的密碼是: ${userInput}。請輸入6位以上包含數字及英文大小寫的密碼。`;
                    prompt.innerText = '請輸入6位以上包含數字及英文大小寫的密碼:';
                    document.getElementById('userInput').value = '';
                    document.getElementById('userInput').setAttribute('maxlength', '20');
                    isFirstAttempt = false;
                } else {
                    message.innerText = `失敗了，僅需 ${elapsedTime.toFixed(2)} 秒就算出你的密碼是: ${userInput}`;
                }
                return;
            }
            attempts++;
        }

        if (!found) {
            setTimeout(() => {
                message.innerText = isFirstAttempt ? '恭喜，你的密碼強度夠高！這是答案Answer3 : A' : '恭喜，你的密碼強度夠高！';
            }, timeout - (Date.now() - startTime));
        }
    }

    attemptCrack();
}

function generateRandomString(length, characters) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
