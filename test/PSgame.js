let isSecondAttempt = false;

function startGame() {
    const userInput = document.getElementById('userInput').value;
    const message = document.getElementById('message');

    // 清空上次的提示信息
    message.innerText = '';

    if (!isSecondAttempt && /^\d{3}$/.test(userInput)) {
        // 第一次要求輸入3位數字作為密碼
        attemptCrack(userInput);
    } else if (isSecondAttempt && /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(userInput)) {
        // 第二次要求輸入至少6位，且包含數字及英文大小寫的密碼
        message.innerText = 'Congratulations! Your password is strong. Answer3 : A';
    } else {
        message.innerText = isSecondAttempt ? 'Please enter a password with at least 6 characters including numbers and letters.' : 'Please enter a 3-digit number.';
    }
}

function attemptCrack(userInput) {
    const startTime = Date.now();
    const userNumber = parseInt(userInput);
    let cracked = false;

    function tryCrack() {
        for (let i = 0; i < 1000; i++) {
            const randomNumber = generateRandomNumber(0, 999);
            if (userNumber === randomNumber) {
                const elapsedTime = Date.now() - startTime;
                const elapsedTimeInSeconds = elapsedTime / 1000;
                message.innerText = `Failed. It took ${elapsedTimeInSeconds.toFixed(5)} seconds to crack your password: ${userInput}. Please enter a password with at least 6 characters including numbers and letters.`;
                isSecondAttempt = true;
                cracked = true;
                return;
            }
        }
        if (!cracked) {
            requestAnimationFrame(tryCrack);
        }
    }

    tryCrack();
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
