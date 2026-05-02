# Feed API – Tài liệu Postman

**Base URL**: `http://localhost:3000`  
**Prefix**: `/api/posts/feed`

---

## 1. Lấy danh sách bài viết (Feed)

- **Method**: GET
- **URL**: `http://localhost:3000/api/posts/feed`
- **Authorization**: Bắt buộc (cần đăng nhập)
- **Query Parameters** (tùy chọn):
  - `cursor`: ID của bài viết cuối cùng để phân trang
  - `limit`: Số lượng bài viết mỗi lần lấy (mặc định: 10)

### Ví dụ URL:
```
http://localhost:3000/api/posts/feed
http://localhost:3000/api/posts/feed?limit=5
http://localhost:3000/api/posts/feed?cursor=abc123&limit=10
```

**Response**:
  - 200 (thành công):

```json
{
  "nextCursor": "post_id_next",
  "posts": [
    {
      "id": "post_id_here",
      "content": "Nội dung bài viết...",
      "image": "https://example.com/image.jpg",
      "authorId": "user_id_here",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "_count": {
        "comments": 5,
        "likes": 10
      },
      "author": {
        "id": "user_id_here",
        "image": "https://example.com/avatar.jpg",
        "name": "Nguyen Van A",
        "username": "user123"
      },
      "comments": [],
      "likes": []
    }
  ]
}
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Chưa xác thực"
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

2. **Lấy feed**:
   - Sử dụng method GET
   - Có thể thêm query parameters `cursor` và `limit`
   - Gửi request

3. **Phân trang (Pagination)**:
   - Lần đầu: Gọi API không có cursor
   - Lần sau: Dùng giá trị `nextCursor` từ response để làm cursor mới
   - Nếu `nextCursor` là `null`: Đã hết bài viết

4. **Kiểm tra kết quả**:
   - Status 200: Lấy feed thành công
   - `posts`: Mảng các bài viết
   - `nextCursor`: ID cho lần fetch tiếp theo

