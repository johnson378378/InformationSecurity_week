let isSecondAttempt = false;

function startGame() {
    const userInput = document.getElementById('userInput').value;
    const message = document.getElementById('message');

    // 清空上次的提示信息
    message.innerText = '';

    if (!isSecondAttempt && /^\d{7}$/.test(userInput)) {
        // 第一次要求輸入恰好7位純數字
        attemptCrack(userInput, 7);
    } else if (isSecondAttempt && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{10,}$/.test(userInput)) {
        // 第二次要求輸入至少10位，且包含數字、英文大小寫及特殊符號的密碼
        message.innerText = 'Congratulations! Your password is strong. Answer3 : A';
    } else {
        message.innerText = isSecondAttempt ? 'Please enter a password with at least 10 characters, including numbers, lowercase and uppercase letters, and special characters.' : 'Please enter a password with exactly 7 digits.';
    }
}

function attemptCrack(userInput, length) {
    const startTime = Date.now();
    const userHash = hashPassword(userInput);
    let cracked = false;

    function tryCrack() {
        const charset = '0123456789';
        const maxAttempts = Math.pow(charset.length, length);
        for (let i = 0; i < maxAttempts; i++) {
            const randomPassword = generateRandomPassword(length, charset);
            const randomHash = hashPassword(randomPassword);
            if (userHash === randomHash) {
                const elapsedTime = Date.now() - startTime;
                const elapsedTimeInSeconds = elapsedTime / 1000;
                message.innerText = `Failed. It took ${elapsedTimeInSeconds.toFixed(5)} seconds to crack your password: ${userInput}. Please enter a password with at least 10 characters, including numbers, lowercase and uppercase letters, and special characters.`;
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

function generateRandomPassword(length, charset) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
}

function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}