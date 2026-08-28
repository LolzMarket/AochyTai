// AochyTai 公式サイト

// ローディング画面(2.5秒表示してからフェードアウト、0%→100%表示)
document.body.classList.add('is-loading');
const loader = document.getElementById('loader');
const loaderPercent = document.getElementById('loaderPercent');
const loaderRing = document.getElementById('loaderRingProgress');
const RING_CIRCUMFERENCE = 289;
const LOAD_DURATION = 2500;

if (loader) {
  const startTime = performance.now();
  function tickPercent(now) {
    const elapsed = now - startTime;
    const pct = Math.min(100, Math.round((elapsed / LOAD_DURATION) * 100));
    if (loaderPercent) loaderPercent.textContent = pct + '%';
    if (loaderRing) {
      loaderRing.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - pct / 100);
    }
    if (elapsed < LOAD_DURATION) {
      requestAnimationFrame(tickPercent);
    }
  }
  requestAnimationFrame(tickPercent);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('is-hidden');
      document.body.classList.remove('is-loading');
    }, LOAD_DURATION);
  });
} else {
  document.body.classList.remove('is-loading');
}

// スクロールでふわっと現れる演出(カテゴリ・同盟鯖などの行を少しずつずらして表示)
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  let catIndex = 0;
  let allianceIndex = 0;
  revealEls.forEach((el) => {
    if (el.classList.contains('cat-item')) {
      el.style.transitionDelay = (catIndex * 90) + 'ms';
      catIndex++;
    } else if (el.classList.contains('alliance-item')) {
      el.style.transitionDelay = (allianceIndex * 90) + 'ms';
      allianceIndex++;
    }
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => revealObserver.observe(el));
}

// 一番下の隠し機能:5秒経つまで完全に見えないようにし、経過後に解放演出
const secret = document.getElementById('secret');
const codeForm = document.getElementById('codeForm');
const codeInput = document.getElementById('codeInput');
const codeResult = document.getElementById('codeResult');
const codeboxWrapper = document.getElementById('codeboxWrapper');
const lockIcon = document.getElementById('lockIcon');
const lockText = document.getElementById('lockText');
const SECRET_WORD = 'bypass';
const SECRET_URL = 'https://discord.gg/t4JszfVnrn';

let isUnlocked = false;
let revealTimer = null;

function revealSecret() {
  if (isUnlocked) return;
  isUnlocked = true;

  secret.classList.add('is-visible');
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
}

if (secret && codeboxWrapper) {
  const gateObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (isUnlocked) return;

      if (entry.isIntersecting) {
        if (!revealTimer) {
          revealTimer = setTimeout(revealSecret, 5000);
        }
      } else {
        clearTimeout(revealTimer);
        revealTimer = null;
      }
    });
  }, { threshold: 0.1 });
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
