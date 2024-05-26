document.addEventListener('DOMContentLoaded', (event) => {
    let timerInterval;
    let totalSeconds;
    let isRunning = false;

    // toggleButton を初期状態で非表示にする
    document.getElementById('toggleButton').style.display = 'none';

    function setTimer() {
        Swal.fire({
            title: "タイマー設定",
            html: `
                <label>時間: <input id="settingHours" class="swal2-input" type="number"></label>
                <label>分: <input id="settingMinutes" class="swal2-input" type="number"></label>
                <label>秒: <input id="settingSeconds" class="swal2-input" type="number"></label>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const settingHours = parseInt(document.getElementById("settingHours").value) || 0;
                const settingMinutes = parseInt(document.getElementById("settingMinutes").value) || 0;
                const settingSeconds = parseInt(document.getElementById("settingSeconds").value) || 0;

                if (
                    settingHours < 0 || settingHours > 23 ||
                    settingMinutes < 0 || settingMinutes > 59 ||
                    settingSeconds < 0 || settingSeconds > 59
                ) {
                    Swal.fire({
                        icon: "error",
                        title: "エラー",
                        text: "時間がうまく設定できてないみたい.."
                    });
                    return false;
                }
                return { settingHours, settingMinutes, settingSeconds };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { settingHours, settingMinutes, settingSeconds } = result.value;
                startTimer(settingHours, settingMinutes, settingSeconds);
                // タイマーが設定されたので、toggleButton を表示
                document.getElementById('toggleButton').style.display = 'block';
            }
        });
    }

    function startTimer(hours, minutes, seconds) {
        totalSeconds = hours * 3600 + minutes * 60 + seconds;

        document.getElementById('Timer2').innerHTML = 
            String(hours).padStart(2, '0') + ":" + 
            String(minutes).padStart(2, '0') + ":" + 
            String(seconds).padStart(2, '0');

        document.getElementById('toggleButton').textContent = 'ストップ';
        document.getElementById('toggleButton').style.backgroundColor = 'red';
        isRunning = true;

        timerInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                document.getElementById('Timer').innerHTML = "00:00:00";
                document.getElementById('toggleButton').textContent = 'スタート';
                document.getElementById('toggleButton').style.backgroundColor = 'green';
                isRunning = false;
                Swal.fire({
                    title: "Good job!",
                    text: "タイマーが終わったよ！",
                    icon: "success"
                });
                return;
            }

            totalSeconds--;

            const remainingHours = Math.floor(totalSeconds / 3600);
            const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
            const remainingSeconds = totalSeconds % 60;

            document.getElementById('Timer').innerHTML = 
                String(remainingHours).padStart(2, '0') + ":" + 
                String(remainingMinutes).padStart(2, '0') + ":" + 
                String(remainingSeconds).padStart(2, '0');
        }, 1000);
    }

    function toggleTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            document.getElementById('toggleButton').textContent = 'スタート';
            document.getElementById('toggleButton').style.backgroundColor = 'green';
            isRunning = false;
        } else {
            resumeTimer();
        }
    }

    function resumeTimer() {
        document.getElementById('toggleButton').textContent = 'ストップ';
        document.getElementById('toggleButton').style.backgroundColor = 'red';
        isRunning = true;

        timerInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                document.getElementById('Timer').innerHTML = "00:00:00";
                document.getElementById('toggleButton').textContent = 'スタート';
                document.getElementById('toggleButton').style.backgroundColor = 'green';
                isRunning = false;
                Swal.fire({
                    title: "Good job!",
                    text: "タイマーが終わったよ！",
                    icon: "success"
                });
                return;
            }

            totalSeconds--;

            const remainingHours = Math.floor(totalSeconds / 3600);
            const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
            const remainingSeconds = totalSeconds % 60;

            document.getElementById('Timer').innerHTML = 
                String(remainingHours).padStart(2, '0') + ":" + 
                String(remainingMinutes).padStart(2, '0') + ":" + 
                String(remainingSeconds).padStart(2, '0');
        }, 1000);
    }

    function updateDateTime() {
        const now = new Date();
        const formattedDateTime = now.toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('currentDateTime').innerHTML = formattedDateTime;
    }

    setInterval(updateDateTime, 1000);

    updateDateTime();

    document.getElementById('setTimerButton').addEventListener('click', setTimer);
    document.getElementById('toggleButton').addEventListener('click', toggleTimer);
});
