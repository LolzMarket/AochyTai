// AochyTai 公式サイト

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

// 合言葉ゲーム
const codeForm = document.getElementById('codeForm');
const codeInput = document.getElementById('codeInput');
const codeResult = document.getElementById('codeResult');
const SECRET_WORD = 'bypass';
const SECRET_URL = 'https://discord.gg/t4JszfVnrn';
let wrongCount = 0;

if (codeForm) {
  codeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = codeInput.value.trim().toLowerCase();

    if (value === SECRET_WORD) {
      codeResult.textContent = '正解…連れて行かれます。';
      setTimeout(() => { window.location.href = SECRET_URL; }, 500);
      return;
    }

    wrongCount++;
    if (wrongCount >= 3) {
      codeResult.textContent = '違うみたい。ヒント: 「by」から始まるよ';
    } else {
      codeResult.textContent = '違うみたい…';
    }
    codeInput.value = '';
    codeInput.focus();
  });
}
