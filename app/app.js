let deferredPrompt;
const installBtn = document.getElementById('install-btn');
const iosInstruction = document.getElementById('ios-instruction');

// 1. 偵測作業系統
const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// 2. 攔截 Chrome/Edge 發出的 PWA 安裝提示
window.addEventListener('beforeinstallprompt', (e) => {
    // 阻止瀏覽器自動跳出預設的安裝橫幅
    e.preventDefault();
    // 將事件儲存起來，等按下按鈕時觸發
    deferredPrompt = e;
    // 顯示安裝按鈕
    installBtn.style.display = 'inline-block';
});

// 3. 按鈕點擊事件
installBtn.addEventListener('click', () => {
    if (isiOS) {
        // iOS 顯示手動加入教學
        iosInstruction.style.display = 'block';
    } else if (deferredPrompt) {
        // Android / 電腦版 Chrome 顯示安裝提示
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('使用者接受了安裝');
            }
            deferredPrompt = null;
        });
    } else {
        // 針對未跳出提示的瀏覽器（或已經安裝過）
        alert('請從瀏覽器選單中選擇「安裝應用程式」或「加入主畫面」。');
    }
});

