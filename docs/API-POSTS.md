# Posts API – Tài liệu Postman

**Base URL**: `http://localhost:3000`  
**Prefix**: `/api/posts`

---

## 1. Tạo bài viết mới

- **Method**: POST
- **URL**: `http://localhost:3000/api/posts`
- **Authorization**: Bắt buộc (cần đăng nhập)
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "content": "Nội dung bài viết của tôi...",
  "image": "https://example.com/image.jpg"
}
```

**Lưu ý**: 
- `content`: Bắt buộc, không được để trống
- `image`: Tùy chọn, có thể bỏ qua

- **Response**:
  - 201 (thành công):

```json
{
  "id": "post_id_here",
  "content": "Nội dung bài viết của tôi...",
  "image": "https://example.com/image.jpg",
  "authorId": "user_id_here",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "_count": {
    "comments": 0,
    "likes": 0
  },
  "author": {
    "id": "user_id_here",
    "image": "https://example.com/avatar.jpg",
    "name": "Nguyen Van A",
    "username": "user123"
  }
}
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Không được phép"
}
```

  - 400 (thiếu nội dung):

```json
{
  "error": "Nội dung là bắt buộc"
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

1. **Đăng nhập trước**: 
   - Gọi API đăng nhập để lấy session
   - Session sẽ được tự động lưu trong cookie

2. **Tạo bài viết**:
   - Sử dụng method POST
   - Điền nội dung vào body
   - Gửi request

3. **Kiểm tra kết quả**:
   - Status 201: Tạo thành công
   - Status khác: Xem error message để biết lỗi
