let isSecondAttempt = false;

function startGame() {
    const userInput = document.getElementById('userInput').value;
    const message = document.getElementById('message');

    // 清空上次的提示信息
    message.innerText = '';

    if (!isSecondAttempt && /^\d{4}$/.test(userInput)) {
        // 第一次要求輸入4位數字作為密碼
        attemptCrack(userInput);
    } else if (isSecondAttempt && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(userInput)) {
        // 第二次要求輸入至少8位，且包含數字及英文大小寫的密碼
        message.innerText = 'Congratulations! Your password is strong. Answer3 : A';
    } else {
        message.innerText = isSecondAttempt ? 'Please enter a password with at least 8 characters, including numbers, lowercase and uppercase letters.' : 'Please enter a 4-digit number.';
    }
}

function attemptCrack(userInput) {
    const startTime = Date.now();
    const userNumber = parseInt(userInput);
    let cracked = false;

    function tryCrack() {
        for (let i = 0; i < 10000; i++) { // 0000 - 9999
            const randomNumber = generateRandomNumber(0, 9999);
            if (userNumber === randomNumber) {
                const elapsedTime = Date.now() - startTime;
                const elapsedTimeInSeconds = elapsedTime / 1000;
                message.innerText = `Failed. It took ${elapsedTimeInSeconds.toFixed(5)} seconds to crack your password: ${userInput}. Please enter a password with at least 8 characters, including numbers, lowercase and uppercase letters.`;
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
