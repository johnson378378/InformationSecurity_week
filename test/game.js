function startGame() {
    const userInput = document.getElementById('userInput').value;
    const message = document.getElementById('message');

    if (userInput.length !== 4 || !/^\d{4}$/.test(userInput)) {
        message.innerText = '請輸入4位數字';
        return;
    }

    let found = false;
    const startTime = Date.now();

    function attemptCrack() {
        const randomStr = generateRandomString(4, '0123456789');
        if (randomStr === userInput) {
            found = true;
            const elapsedTime = (Date.now() - startTime) / 1000;
            message.innerText = `失敗了，僅需 ${elapsedTime.toFixed(2)} 秒就算出你的密碼是: ${userInput}。請輸入6位以上包含數字及英文大小寫的密碼。`;
        } else if (Date.now() - startTime >= 5000) {
            message.innerText = '恭喜，你的密碼強度夠高！這是答案Answer3 : A';
        } else {
            requestAnimationFrame(attemptCrack);
        }
    }

    requestAnimationFrame(attemptCrack);
}

function generateRandomString(length, characters) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
