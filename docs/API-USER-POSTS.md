# User Posts API – Tài liệu Postman

**Base URL**: `http://localhost:3000`

---

## 1. Lấy danh sách bài viết của người dùng

- **Method**: GET
- **URL**: `http://localhost:3000/api/posts/user/{userId}`
- **Authorization**: Không bắt buộc
- **Headers**:
  - `Content-Type: application/json`

**Lưu ý**:
- `{userId}` là ID của người dùng cần lấy bài viết
- Trả về danh sách bài viết của user theo thứ tự mới nhất
- Mỗi bài viết có thông tin tác giả và số lượng likes, comments

- **Response**:
  - 200 (thành công):

```json
[
  {
    "id": "post_id_here",
    "content": "Nội dung bài viết...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "authorId": "user_id_here",
    "image": "https://example.com/post-image.jpg",
    "_count": {
      "comments": 5,
      "likes": 20
    },
    "author": {
      "id": "user_id_here",
      "image": "https://example.com/avatar.jpg",
      "name": "Nguyen Van A",
      "username": "user123"
    }
  },
  {
    "id": "post_id_here_2",
    "content": "Bài viết thứ hai...",
    "createdAt": "2024-01-02T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z",
    "authorId": "user_id_here",
    "image": null,
    "_count": {
      "comments": 3,
      "likes": 15
    },
    "author": {
      "id": "user_id_here",
      "image": "https://example.com/avatar.jpg",
      "name": "Nguyen Van A",
      "username": "user123"
    }
  }
]
```

  - 400 (thiếu userId):

```json
{
  "error": "ID người dùng là bắt buộc"
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

### Lấy bài viết của user:

1. **Không cần đăng nhập**:
   - Method: GET
   - URL: `http://localhost:3000/api/posts/user/{userId}`
   - Headers: `Content-Type: application/json`

2. **Kiểm tra kết quả**:
   - Status 200: Trả về mảng bài viết của user
   - Bài viết được sắp xếp theo createdAt giảm dần (mới nhất trước)
   - Mỗi bài viết có thông tin tác giả và số lượng interactions

3. **Sử dụng postId**:
   - Lấy `id` từ response để test API chi tiết bài viết
   - Ví dụ: dùng `id` để gọi GET `/api/posts/{postId}`

---

## 3. Luồng test đầy đủ

1. Gọi GET `/api/users/{userId}` → Lấy thông tin user
2. Gọi GET `/api/posts/user/{userId}` → Lấy danh sách bài viết
3. Chọn một bài viết → Lấy `postId`
4. Gọi GET `/api/posts/{postId}` → Lấy chi tiết bài viết với comments
5. (Nếu đã đăng nhập) Gọi POST `/api/posts/{postId}/like` → Like bài viết
6. Gọi POST `/api/posts/{postId}/comments` → Bình luận bài viết

---

## 4. Chi tiết response

**Các trường trong response**:
- `id`: ID duy nhất của bài viết
- `content`: Nội dung bài viết
- `createdAt`: Ngày tạo bài viết
- `updatedAt`: Ngày cập nhật bài viết
- `authorId`: ID của tác giả
- `image`: URL hình ảnh bài viết (có thể null)
- `_count.comments`: Số lượng bình luận
- `_count.likes`: Số lượng lượt thích
- `author.id`: ID tác giả
- `author.image`: URL ảnh đại diện tác giả
- `author.name`: Tên đầy đủ tác giả
- `author.username`: Tên đăng nhập tác giả

---

## 5. Test Cases

### Test Case 1: User có bài viết
- **Request**: GET `/api/posts/user/{userId}` (userId có bài viết)
- **Expected**: Status 200, mảng bài viết không rỗng

### Test Case 2: User không có bài viết
- **Request**: GET `/api/posts/user/{userId}` (userId không có bài viết)
- **Expected**: Status 200, mảng rỗng `[]`

### Test Case 3: UserId không tồn tại
- **Request**: GET `/api/posts/user/invalid_id`
- **Expected**: Status 200, mảng rỗng `[]` (không có lỗi)

### Test Case 4: Thiếu userId
- **Request**: GET `/api/posts/user/`
- **Expected**: Status 400, error message
