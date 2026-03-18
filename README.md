# 🛡️ Web Restriction Bypass — Chrome Console Script

Script JavaScript chạy trực tiếp trên **Chrome DevTools Console**, giúp vô hiệu hóa các hạn chế phổ biến của trang web:

- ✅ Tắt phát hiện rời tab (visibilitychange, blur, focus)
- ✅ Cho phép chuột phải (context menu)
- ✅ Cho phép copy / paste / bôi đen văn bản

---

## 📋 Yêu cầu

| Yêu cầu | Chi tiết |
|---|---|
| Trình duyệt | Google Chrome (hoặc Edge, Brave — nhân Chromium) |
| Quyền hạn | Không cần cài đặt, không cần extension |
| Phiên bản | Chrome 90+ |

---

## 🚀 Hướng dẫn sử dụng

### Bước 1 — Mở trang web cần bypass

Điều hướng đến trang web mà bạn muốn gỡ bỏ hạn chế.

### Bước 2 — Mở Chrome DevTools

Có 3 cách:

```
Phím tắt:   F12
            hoặc Ctrl + Shift + I  (Windows/Linux)
            hoặc Cmd  + Option + I (macOS)
```

Hoặc click chuột phải vào trang → chọn **Inspect**.

### Bước 3 — Chuyển sang tab Console

Trong cửa sổ DevTools, click vào tab **Console** (thường ở hàng trên cùng).

> ⚠️ Nếu thấy cảnh báo *"Don't paste code..."* — đây là bảo vệ của Chrome. Gõ `allow pasting` rồi nhấn Enter, sau đó dán script như bình thường.

### Bước 4 — Dán và chạy script

Sao chép toàn bộ nội dung file [`bypass.js`](./bypass.js) rồi dán vào Console, nhấn **Enter**.

Nếu thành công, Console sẽ hiển thị:

```
✅ Đã kích hoạt thành công!
```

---

## 📁 Cấu trúc project

```
web-bypass/
├── README.md       ← Tài liệu này
└── bypass.js       ← Script chính
```

---

## 📄 Nội dung script (`bypass.js`)

```javascript
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
```

---

## ⚙️ Cơ chế hoạt động

### 1. Tắt phát hiện rời tab

Nhiều trang web (bài thi online, video...) dùng sự kiện `visibilitychange` và `blur` để phát hiện khi bạn chuyển tab. Script dùng `stopImmediatePropagation()` ở capture phase để chặn các handler này trước khi chúng chạy, đồng thời ghi đè các property `document.hidden` và `document.visibilityState` để trang luôn "thấy" bạn đang ở lại.

### 2. Cho phép chuột phải

Một số trang dùng `oncontextmenu = false` hoặc `addEventListener('contextmenu', ...)` để chặn menu chuột phải. Script xóa `document.oncontextmenu` và chặn các event handler đó.

### 3. Cho phép copy / paste

Script chặn các handler đã disable sự kiện `copy`, `cut`, `paste` và `selectstart`, đồng thời chèn CSS `user-select: text !important` để bỏ khóa bôi đen văn bản.

---

## ⚠️ Lưu ý quan trọng

> **Script chỉ hoạt động trong phiên hiện tại.** Khi tải lại trang (`F5` hoặc `Ctrl+R`), tất cả thay đổi sẽ mất. Bạn cần chạy lại script.

> **Script không can thiệp vào server.** Các hạn chế được xử lý phía server (ví dụ: server tự kiểm tra) sẽ không bị ảnh hưởng.

> **Sử dụng có trách nhiệm.** Chỉ dùng trên các trang bạn có quyền truy cập hợp lệ. Không dùng để gian lận thi cử hoặc vi phạm điều khoản dịch vụ.

---

## 🐛 Xử lý sự cố

| Vấn đề | Giải pháp |
|---|---|
| Console báo lỗi cú pháp | Đảm bảo sao chép **toàn bộ** script, không thiếu dòng nào |
| Trang vẫn phát hiện rời tab | Trang có thể dùng WebSocket hoặc kiểm tra phía server — script không xử lý được |
| Không bôi đen được | Trang dùng canvas/iframe — script không thể can thiệp vào iframe khác domain |
| Chrome cảnh báo "Don't paste" | Gõ `allow pasting` vào console trước, rồi dán script |

---

## 📜 License

MIT License — Tự do sử dụng, chỉnh sửa và chia sẻ.
