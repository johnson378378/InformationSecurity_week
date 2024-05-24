let isSecondAttempt = false;
let crackedNumber;

function startGame() {
    const userInput = document.getElementById('userInput').value;
    const message = document.getElementById('message');

    // Clear previous message
    message.innerText = '';

    if (!isSecondAttempt && /^\d{3}$/.test(userInput)) {
        // First attempt: 3-digit password
        crackedNumber = generateRandomNumber(000, 999);
        attemptCrack(crackedNumber, userInput);
    } else if (isSecondAttempt && /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(userInput)) {
        // Second attempt: 6-digit password
        message.innerText = 'Congratulations! Your password is strong. Here is the answer: Answer3 : A';
    } else {
        message.innerText = isSecondAttempt ? 'Please enter a password with at least 6 characters, including numbers and letters' : 'Please enter a 3-digit number';
    }
}

function attemptCrack(target, userInput) {
    const startTime = Date.now();
    const timeout = 5000;

    const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const elapsedTimeInSeconds = elapsedTime / 1000;

        if (parseInt(userInput) === target) {
            clearInterval(intervalId);
            message.innerText = `Failed! Your password (${userInput}) was cracked in ${elapsedTimeInSeconds.toFixed(5)} seconds. Please enter a password with at least 6 characters, including numbers and letters.`;
            isSecondAttempt = true;
        } else if (elapsedTime >= timeout) {
            clearInterval(intervalId);
            message.innerText = 'Congratulations! Your password is strong. Here is the answer: Answer3 : A';
        }
    }, 10);
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
