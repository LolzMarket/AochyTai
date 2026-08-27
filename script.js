// AochyTai 公式サイト

// ローディング画面(2.5秒表示してからフェードアウト)
document.body.classList.add('is-loading');
const loader = document.getElementById('loader');
if (loader) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('is-hidden');
      document.body.classList.remove('is-loading');
    }, 2500);
  });
} else {
  document.body.classList.remove('is-loading');
}

// 一番下までスクロールしたら隠しメッセージをフェードイン
const secret = document.getElementById('secret');
if (secret) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        secret.classList.add('is-visible');
      }
    });
  }, { threshold: 0.2 });
  observer.observe(secret);
}

// 合言葉ゲーム(5秒滞在で解放)
const codeForm = document.getElementById('codeForm');
const codeInput = document.getElementById('codeInput');
const codeResult = document.getElementById('codeResult');
const codeboxWrapper = document.getElementById('codeboxWrapper');
const lockIcon = document.getElementById('lockIcon');
const lockText = document.getElementById('lockText');
const SECRET_WORD = 'bypass';
const SECRET_URL = 'https://discord.gg/t4JszfVnrn';

let isUnlocked = false;
let unlockTimer = null;

if (secret && codeboxWrapper) {
  const gateObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (isUnlocked) return;

      if (entry.isIntersecting) {
        unlockTimer = setTimeout(() => {
          isUnlocked = true;
          codeboxWrapper.classList.add('is-revealing');

          setTimeout(() => {
            codeboxWrapper.classList.add('is-unlocking');
            if (lockText) lockText.textContent = '解放されました';
          }, 400);

          setTimeout(() => {
            lockIcon.textContent = '🔓';
          }, 850);

          setTimeout(() => {
            codeboxWrapper.classList.add('is-unlocked');
            codeInput.disabled = false;
            const btn = codeForm.querySelector('button');
            if (btn) btn.disabled = false;
          }, 1400);
        }, 5000);
      } else {
        clearTimeout(unlockTimer);
      }
    });
  }, { threshold: 0.6 });
  gateObserver.observe(secret);
}

if (codeForm) {
  codeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isUnlocked) return;

    const value = codeInput.value.trim().toLowerCase();

    if (value === SECRET_WORD) {
      codeResult.textContent = '正解…連れて行かれます。';
      setTimeout(() => { window.location.href = SECRET_URL; }, 500);
      return;
    }

    codeResult.textContent = '違うみたい…';
    codeInput.value = '';
    codeInput.focus();
  });
}
