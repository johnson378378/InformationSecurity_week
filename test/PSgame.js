document.getElementById('startButton').addEventListener('click', startCrack);

function startCrack() {
    const message = document.getElementById('message');
    message.innerText = ''; // 清空上次的提示信息

    const passwordInput = document.getElementById('passwordInput');
    const password = parseInt(passwordInput.value);
    const startTime = Date.now();
    const endTime = startTime + 5000; // 設定結束時間為5秒後

    if (passwordInput.checkValidity() && password >= 0 && password <= 999) {
        // 輸入的是3位數字密碼，開始破解
        const intervalId = setInterval(() => {
            const now = Date.now();
            if (now >= endTime) {
                clearInterval(intervalId); // 停止計時器
                message.innerText = '恭喜，你的密碼強度夠高！\n這是答案：Answer3 : A'; // 顯示正確答案
                passwordInput.value = ''; // 清空輸入框
                passwordInput.setAttribute('pattern', '.{6,}'); // 設置至少6位的密碼
                passwordInput.setAttribute('title', '請輸入至少6位以上的密碼'); // 提示信息
                passwordInput.focus(); // 聚焦輸入框
            } else {
                // 在5秒內嘗試猜測所有可能的3位數密碼
                const elapsedTime = now - startTime;
                const elapsedTimeInSeconds = elapsedTime / 1000;
                for (let i = 0; i < 1000; i++) {
                    if (i === password) {
                        clearInterval(intervalId); // 停止計時器
                        const crackTime = now - startTime; // 計算破解所花費的時間
                        message.innerText = `破解成功！\n花費時間：${(crackTime / 1000).toFixed(5)} 秒\n請輸入6位以上的密碼：`;
                        return;
                    }
                }
            }
        }, 10); // 每0.01秒進行一次猜測
    } else {
        message.innerText = '請輸入3位數字的密碼';
    }
}
