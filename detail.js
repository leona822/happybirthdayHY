/* =========================================================
   detail.js — 상세 페이지 이미지 업로드 공통 스크립트
   각 detail-N.html에서 COURSE_ID 변수를 먼저 선언하고 이 파일을 로드
   ========================================================= */

(function () {
  const placeholder = document.getElementById('detail-image-placeholder');
  const displayImg   = document.getElementById('detail-display-img');
  const fileInput    = document.getElementById('image-file-input');
  const uploadHint   = document.getElementById('upload-hint');

  if (!placeholder || !displayImg || !fileInput) return;

  const storageKey = 'course_img_' + COURSE_ID;

  /* ── 저장된 이미지 불러오기 ── */
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    displayImg.src = saved;
    displayImg.style.display = 'block';
    if (uploadHint) uploadHint.style.opacity = '0';
  }

  /* ── 클릭 시 파일 선택창 열기 ── */
  placeholder.addEventListener('click', function () {
    fileInput.click();
  });

  /* ── 파일 선택 후 처리 ── */
  fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      const dataUrl = evt.target.result;

      /* 화면에 표시 */
      displayImg.src = dataUrl;
      displayImg.style.display = 'block';

      /* 힌트 숨기기 */
      if (uploadHint) uploadHint.style.opacity = '0';

      /* localStorage에 저장 */
      try {
        localStorage.setItem(storageKey, dataUrl);
      } catch (err) {
        /* 용량 초과 시 저장 생략 (이미지는 표시됨) */
        console.warn('localStorage 저장 실패:', err);
      }
    };
    reader.readAsDataURL(file);

    /* 같은 파일 재선택 가능하도록 초기화 */
    fileInput.value = '';
  });

  /* ── hover 시 힌트 표시 ── */
  placeholder.addEventListener('mouseenter', function () {
    if (uploadHint) uploadHint.style.opacity = '1';
  });
  placeholder.addEventListener('mouseleave', function () {
    /* 사진이 이미 업로드된 경우 힌트 계속 숨김 */
    if (displayImg.src && displayImg.style.display !== 'none') {
      if (uploadHint) uploadHint.style.opacity = '0';
    }
  });
})();

/* =========================================================
   텍스트 인라인 편집
   ========================================================= */
(function () {
  const prefix = 'course_text_' + COURSE_ID + '_';

  /* 편집 대상 요소 목록 (selector, storageKey suffix) */
  const targets = [
    { el: document.querySelector('.detail-title'),       key: 'title' },
    { el: document.querySelector('.detail-description'), key: 'desc'  },
  ];

  /* 메타 텍스트 항목들 동적 추가 */
  document.querySelectorAll('.meta-text').forEach(function (el, i) {
    targets.push({ el: el, key: 'meta' + i });
  });

  targets.forEach(function (item) {
    if (!item.el) return;
    const key = prefix + item.key;

    /* 저장된 텍스트 불러오기 */
    const saved = localStorage.getItem(key);
    if (saved !== null) item.el.textContent = saved;

    /* contenteditable 활성화 */
    item.el.setAttribute('contenteditable', 'true');
    item.el.setAttribute('spellcheck', 'false');

    /* 편집 완료 시 저장 */
    item.el.addEventListener('blur', function () {
      localStorage.setItem(key, item.el.textContent);
    });

    /* Enter 키로 포커스 해제 (타이틀 등 한 줄 필드) */
    item.el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        item.el.blur();
      }
    });
  });

  /* 편집 힌트 표시 */
  function addHint(box, text) {
    if (!box) return;
    var hint = document.createElement('span');
    hint.className = 'editable-hint';
    hint.textContent = text;
    box.appendChild(hint);
  }
  addHint(document.querySelector('.detail-description-box'), '✏️ 탭해서 편집');
  addHint(document.querySelector('.detail-info-box'), '✏️ 탭해서 편집');
})();
