(function() {
  // 1. Tắt phát hiện rời tab (visibilitychange, blur, focus)
  const blockEvents = ['visibilitychange', 'blur', 'focus', 'pagehide'];
  blockEvents.forEach(evt => {
    document.addEventListener(evt, e => e.stopImmediatePropagation(), true);
    window.addEventListener(evt, e => e.stopImmediatePropagation(), true);
  });
  Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
  Object.defineProperty(document, 'visibilityState', { get: () => 'visible', configurable: true });
  Object.defineProperty(document, 'hasFocus', { value: () => true, configurable: true });

  // 2. Cho phép chuột phải (contextmenu)
  document.addEventListener('contextmenu', e => e.stopImmediatePropagation(), true);
  document.oncontextmenu = null;

  // 3. Cho phép copy, paste, select, cut
  ['copy', 'cut', 'paste', 'selectstart', 'keydown'].forEach(evt => {
    document.addEventListener(evt, e => e.stopImmediatePropagation(), true);
  });

  // 4. Xóa CSS user-select bị khóa
  const style = document.createElement('style');
  style.textContent = '* { user-select: text !important; -webkit-user-select: text !important; }';
  document.head.appendChild(style);

  console.log('%c Đã kích hoạt thành công!', 'color: #1D9E75; font-weight: bold');
})();
