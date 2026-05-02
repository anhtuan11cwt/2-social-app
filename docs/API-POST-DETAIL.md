# Post Detail API - Tài liệu Postman

**Base URL**: `http://localhost:3000`  
**Endpoint**: `/api/posts/[postId]`

---

## 1. Lấy chi tiết bài viết

- **Method**: GET
- **URL**: `http://localhost:3000/api/posts/{postId}`
- **Authorization**: Bắt buộc, cần đăng nhập bằng session cookie của NextAuth
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `postId`: ID của bài viết cần lấy thông tin

**Lưu ý theo code hiện tại**:

- Route đang dùng Next.js dynamic segment `app/api/posts/[postId]/route.ts`.
- `postId` chưa được validate định dạng ObjectId. Nếu ID sai định dạng và Prisma throw error, API có thể trả `500`.
- Nếu thiếu segment `postId`, request thường không match route này; `400` chỉ xảy ra nếu handler nhận được `postId` rỗng.
- Response `200` có thêm `isLiked`, được tính theo user đang đăng nhập.
- Code hiện tại dùng `author: true` và `comments.author: true`, nên Prisma trả toàn bộ scalar fields của user. Điều này có thể bao gồm `email`, `password`, `bio`, `createdAt`, `updatedAt`. Nên sửa code sang `select` trước khi public API.

---

## 2. Response

### 200 - Thành công

```json
{
  "id": "post_id_here",
  "content": "Nội dung bài viết...",
  "image": "https://example.com/image.jpg",
  "imagePublicId": "cloudinary_public_id",
  "authorId": "user_id_here",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "isLiked": true,
  "_count": {
    "comments": 5,
    "likes": 10
  },
  "author": {
    "id": "user_id_here",
    "name": "Nguyễn Văn A",
    "username": "user123",
    "email": "a@example.com",
    "password": "hashed_password",
    "image": "https://example.com/avatar.jpg",
    "bio": "Tiểu sử người dùng",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "comments": [
    {
      "id": "comment_id_here",
      "content": "Nội dung bình luận...",
      "authorId": "user_id_here",
      "postId": "post_id_here",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "author": {
        "id": "user_id_here",
        "name": "Nguyễn Văn B",
        "username": "user456",
        "email": "b@example.com",
        "password": "hashed_password",
        "image": "https://example.com/avatar.jpg",
        "bio": null,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "likes": [
    {
      "id": "like_id_here",
      "userId": "user_id_here",
      "postId": "post_id_here",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 401 - Chưa đăng nhập

```json
{
  "error": "Chưa đăng nhập"
}
```

### 400 - Thiếu postId

```json
{
  "error": "ID bài viết là bắt buộc"
}
```

### 404 - Không tìm thấy bài viết

```json
{
  "error": "Không tìm thấy bài viết"
}
```

### 500 - Lỗi máy chủ

```json
{
  "error": "Lỗi máy chủ nội bộ"
}
```

---

## 3. Cách test trong Postman

1. Đăng nhập trước:
   - Gọi API đăng nhập để lấy session.
   - Session sẽ được lưu trong cookie.

2. Lấy chi tiết bài viết:
   - Method: `GET`
   - URL: `http://localhost:3000/api/posts/{postId}`
   - Thay `{postId}` bằng ID bài viết thực tế.
   - Gửi kèm session cookie.

3. Kiểm tra kết quả:
   - `200`: Lấy thành công, trả về thông tin chi tiết bài viết.
   - `401`: Chưa đăng nhập hoặc session không hợp lệ.
   - `400`: Handler nhận `postId` rỗng.
   - `404`: Không tìm thấy bài viết.
   - `500`: Lỗi máy chủ, bao gồm trường hợp Prisma throw error.

4. Dữ liệu trả về bao gồm:
   - Thông tin cơ bản của bài viết.
   - `isLiked` của user đang đăng nhập.
   - Thông tin tác giả.
   - Số lượng bình luận và likes trong `_count`.
   - Danh sách bình luận, sắp xếp theo `createdAt` giảm dần.
   - Danh sách likes.

---

## 4. Ví dụ Postman Collection

```json
{
  "info": {
    "name": "Social App API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Post Detail",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/posts/{{postId}}",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "posts", "{{postId}}"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "postId",
      "value": "your_post_id_here"
    }
  ]
}
```
