# Like API – Tài liệu Postman

**Base URL**: `http://localhost:3000`

---

## 1. Thích / Bỏ thích bài viết

- **Method**: POST
- **URL**: `http://localhost:3000/api/posts/{postId}/like`
- **Authorization**: Bắt buộc (cần đăng nhập)
- **Path Parameters**:
  - `postId`: ID của bài viết cần thích/bỏ thích

### Ví dụ URL:
```
http://localhost:3000/api/posts/abc123/like
```

**Response**:
  - 200 (thành công - Thích):

```json
{
  "liked": true,
  "postAuthorId": "user_id_author"
}
```

  - 200 (thành công - Bỏ thích):

```json
{
  "liked": false,
  "postAuthorId": "user_id_author"
}
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Chưa xác thực"
}
```

  - 404 (không tìm thấy bài viết):

```json
{
  "error": "Không tìm thấy bài đăng"
}
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi máy chủ"
}
```

---

## 2. Cách test trong Postman

1. **Đăng nhập trước**:
   - Gọi API đăng nhập để lấy session
   - Session sẽ được tự động lưu trong cookie

2. **Thích bài viết**:
   - Sử dụng method POST
   - Thay `{postId}` bằng ID bài viết thực tế
   - Gửi request

3. **Bỏ thích bài viết**:
   - Gọi lại cùng API với cùng `postId`
   - Nếu đã thích trước đó, API sẽ tự động bỏ thích

4. **Kiểm tra kết quả**:
   - Status 200: Thao tác thành công
   - `liked: true`: Đã thích bài viết
   - `liked: false`: Đã bỏ thích bài viết
   - `postAuthorId`: ID của tác giả bài viết

---

## 3. Luồng hoạt động

```
Người dùng gọi API → Kiểm tra đăng nhập → Kiểm tra bài viết tồn tại
                                    ↓
                           Kiểm tra đã thích?
                                    ↓
                    Có → Xóa like (Unlike) → Trả về liked: false
                    Không → Tạo like (Like) → Trả về liked: true
```

