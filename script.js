document.addEventListener('DOMContentLoaded', (event) => {
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
            }
        });
    }

    function startTimer(hours, minutes, seconds) {
        // 現在の時間をゼロ埋めして表示
        document.getElementById('Timer2').innerHTML = 
            String(hours).padStart(2, '0') + ":" + 
            String(minutes).padStart(2, '0') + ":" + 
            String(seconds).padStart(2, '0');

        let totalSeconds = hours * 3600 + minutes * 60 + seconds;

        const timerInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                document.getElementById('Timer').innerHTML = "00:00:00";
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

    // 現在の日時を更新するためのインターバル
    setInterval(updateDateTime, 1000);

    // 初期設定の現在の日時表示
    updateDateTime();

    // ボタンのクリックイベントを設定
    document.getElementById('setTimerButton').addEventListener('click', setTimer);
});
