# Notifications API – Tài liệu Postman

**Base URL**: `http://localhost:3000`

---

## 1. Lấy danh sách thông báo

- **Method**: GET
- **URL**: `http://localhost:3000/api/notifications`
- **Authorization**: Bắt buộc (cần đăng nhập)
- **Headers**:
  - `Content-Type: application/json`

- **Response**:
  - 200 (thành công):

```json
[
  {
    "id": "notification_id_here",
    "message": "Có người đã thích bài đăng của bạn",
    "postId": "post_id_here",
    "type": "LIKE",
    "userId": "user_id_here",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "image": "https://example.com/avatar.jpg",
      "name": "Nguyen Van A",
      "username": "user123"
    }
  },
  {
    "id": "notification_id_here",
    "message": "Có người đã bình luận về bài đăng của bạn",
    "postId": "post_id_here",
    "type": "COMMENT",
    "userId": "user_id_here",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "image": "https://example.com/avatar.jpg",
      "name": "Nguyen Van B",
      "username": "user456"
    }
  }
]
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Chưa được xác thực"
}
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi máy chủ nội bộ"
}
```

---

## 2. Cách test trong Postman

### Lấy danh sách thông báo:

1. **Đăng nhập trước**:
   - Gọi API đăng nhập để lấy session
   - Session sẽ được tự động lưu trong cookie

2. **Lấy thông báo**:
   - Method: GET
   - URL: `http://localhost:3000/api/notifications`
   - Headers: `Content-Type: application/json`

3. **Kiểm tra kết quả**:
   - Status 200: Lấy thành công danh sách thông báo
   - Thông báo được sắp xếp theo thời gian tạo (mới nhất lên đầu)
   - Mỗi thông báo có thông tin user đã trigger action

---

## 3. Loại thông báo

API hỗ trợ các loại thông báo sau:

- **LIKE**: Khi ai đó thích bài đăng của bạn
- **COMMENT**: Khi ai đó bình luận về bài đăng của bạn
- **FOLLOW**: Khi ai đó theo dõi bạn (nếu có)

---

## 4. Luồng hoạt động

```
Người dùng gọi API → Kiểm tra đăng nhập → Lấy danh sách thông báo của user
                                    ↓
                           Sắp xếp theo createdAt (desc)
                                    ↓
                           Trả về mảng thông báo với user info
```

---

## 5. Luồng test đầy đủ

1. Đăng nhập → Lấy session
2. Tạo bài viết → Lấy `postId`
3. Dùng tài khoản khác thích/bình luận bài viết → Tự động tạo thông báo
4. Gọi GET `/api/notifications` để xem danh sách thông báo

---

## 6. Đánh dấu tất cả thông báo là đã đọc

- **Method**: PUT
- **URL**: `http://localhost:3000/api/notifications`
- **Authorization**: Bắt buộc (cần đăng nhập)
- **Headers**:
  - `Content-Type: application/json`

- **Response**:
  - 200 (thành công):

```json
{
  "success": true
}
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Chưa được xác thực"
}
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi máy chủ nội bộ"
}
```

---

## 7. Cách test PUT endpoint trong Postman

### Đánh dấu tất cả thông báo là đã đọc:

1. **Đăng nhập trước**:
   - Gọi API đăng nhập để lấy session
   - Session sẽ được tự động lưu trong cookie

2. **Đánh dấu đã đọc**:
   - Method: PUT
   - URL: `http://localhost:3000/api/notifications`
   - Headers: `Content-Type: application/json`

3. **Kiểm tra kết quả**:
   - Status 200: Đánh dấu thành công tất cả thông báo chưa đọc
   - Sau khi gọi API này, gọi lại GET `/api/notifications` để kiểm tra
   - Tất cả thông báo sẽ có `read: true`

---

## 8. Lưu ý quan trọng

- Chỉ lấy được thông báo của user đang đăng nhập
- Thông báo được tạo tự động khi có các action liên quan (like, comment, follow)
- Real-time notifications được gửi qua Pusher channel `notifications-{userId}`
- Mỗi thông báo chứa thông tin cơ bản về user đã trigger action
- PUT endpoint sẽ đánh dấu TẤT CẢ thông báo chưa đọc của user thành đã đọc
- Endpoint này thường được gọi khi user truy cập trang notifications để xóa badge trên navbar
