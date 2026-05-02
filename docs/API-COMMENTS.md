# Comments API – Tài liệu Postman

**Base URL**: `http://localhost:3000`

---

## 1. Tạo comment mới

- **Method**: POST
- **URL**: `http://localhost:3000/api/comments`
- **Authorization**: Bắt buộc (cần đăng nhập)
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "content": "Nội dung bình luận...",
  "postId": "post_id_here"
}
```

**Lưu ý**:
- `content`: Bắt buộc, không được để trống
- `postId`: Bắt buộc, ID của bài viết cần bình luận

- **Response**:
  - 201 (thành công):

```json
{
  "comment": {
    "id": "comment_id_here",
    "content": "Nội dung bình luận...",
    "postId": "post_id_here",
    "authorId": "user_id_here",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "author": {
      "id": "user_id_here",
      "email": "user@example.com",
      "name": "Nguyen Van A",
      "username": "user123",
      "image": "https://example.com/avatar.jpg",
      "bio": "Tiểu sử người dùng"
    }
  },
  "postAuthorId": "author_of_post_id",
  "success": true
}
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Chưa xác thực"
}
```

  - 400 (thiếu nội dung):

```json
{
  "error": "Nội dung là bắt buộc"
}
```

  - 400 (thiếu postId):

```json
{
  "error": "PostId là bắt buộc"
}
```

  - 404 (không tìm thấy bài đăng):

```json
{
  "error": "Không tìm thấy bài đăng"
}
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi máy chủ nội bộ"
}
```

---

## 2. Lấy danh sách comments của một bài viết

- **Method**: GET
- **URL**: `http://localhost:3000/api/posts/{postId}/comments`
- **Authorization**: Không bắt buộc
- **Parameters**:
  - `postId` (path param): ID của bài viết

- **Response**:
  - 200 (thành công):

```json
[
  {
    "id": "comment_id_here",
    "content": "Nội dung bình luận...",
    "postId": "post_id_here",
    "authorId": "user_id_here",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "author": {
      "id": "user_id_here",
      "email": "user@example.com",
      "name": "Nguyen Van A",
      "username": "user123",
      "image": "https://example.com/avatar.jpg",
      "bio": "Tiểu sử người dùng"
    }
  }
]
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi máy chủ nội bộ"
}
```

---

## 3. Cách test trong Postman

### Tạo comment mới:

1. **Đăng nhập trước**:
   - Gọi API đăng nhập để lấy session
   - Session sẽ được tự động lưu trong cookie

2. **Tạo comment**:
   - Method: POST
   - URL: `http://localhost:3000/api/comments`
   - Headers: `Content-Type: application/json`
   - Body: raw JSON với `content` và `postId`

3. **Kiểm tra kết quả**:
   - Status 201: Tạo thành công
   - Status khác: Xem error message để biết lỗi

### Lấy danh sách comments:

1. **Gửi request**:
   - Method: GET
   - URL: `http://localhost:3000/api/posts/{postId}/comments`
   - Thay `{postId}` bằng ID bài viết thực tế

2. **Kiểm tra kết quả**:
   - Status 200: Trả về mảng comments
   - Comments được sắp xếp theo thời gian tạo (mới nhất lên đầu)

---

## 4. Luồng test đầy đủ

1. Đăng nhập → Lấy session
2. Tạo bài viết → Lấy `postId`
3. Tạo comment với `postId` vừa lấy được
4. Gọi GET `/api/posts/{postId}/comments` để xem danh sách comments
