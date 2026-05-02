# User Profile API – Tài liệu Postman

**Base URL**: `http://localhost:3000`

---

## 1. Lấy thông tin người dùng theo ID

- **Method**: GET
- **URL**: `http://localhost:3000/api/users/{userId}`
- **Authorization**: Không bắt buộc (nhưng có session để kiểm tra follow)
- **Headers**:
  - `Content-Type: application/json`

**Lưu ý**:
- `{userId}` là ID của người dùng cần lấy thông tin
- Nếu có session, API sẽ kiểm tra xem người dùng hiện tại đã follow user này chưa
- Trả về thông tin profile và số lượng followers, following, posts

- **Response**:
  - 200 (thành công):

```json
{
  "id": "user_id_here",
  "image": "https://example.com/avatar.jpg",
  "name": "Nguyen Van A",
  "username": "user123",
  "bio": "Software Developer",
  "email": "user@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "_count": {
    "followers": 150,
    "following": 75,
    "posts": 25
  },
  "isFollowing": false
}
```

  - 400 (thiếu userId):

```json
{
  "error": "ID người dùng là bắt buộc"
}
```

  - 404 (không tìm thấy user):

```json
{
  "error": "Không tìm thấy người dùng"
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

### Lấy thông tin user:

1. **Không cần đăng nhập**:
   - Method: GET
   - URL: `http://localhost:3000/api/users/{userId}`
   - Headers: `Content-Type: application/json`

2. **Có đăng nhập (để kiểm tra follow)**:
   - Đăng nhập trước để lấy session
   - Session sẽ được tự động lưu trong cookie
   - Method: GET
   - URL: `http://localhost:3000/api/users/{userId}`
   - Headers: `Content-Type: application/json`

3. **Kiểm tra kết quả**:
   - Status 200: Trả về thông tin đầy đủ của user
   - `isFollowing`: true nếu đã follow, false nếu chưa
   - `_count`: số lượng followers, following, posts

4. **Sử dụng userId**:
   - Lấy `id` từ response để test API khác
   - Ví dụ: dùng `id` để gọi GET `/api/posts/user/{id}`

---

## 3. Luồng test đầy đủ

1. Lấy danh sách user suggestions → Chọn một user
2. Gọi GET `/api/users/{userId}` → Lấy thông tin profile
3. Kiểm tra `isFollowing` trong response
4. (Nếu đã đăng nhập) Gọi POST `/api/users/{userId}/follow` → Follow user
5. Gọi lại GET `/api/users/{userId}` → Kiểm tra `isFollowing` đã thay đổi
6. Gọi GET `/api/posts/user/{userId}` → Lấy bài viết của user

---

## 4. Chi tiết response

**Các trường trong response**:
- `id`: ID duy nhất của người dùng
- `image`: URL ảnh đại diện (có thể null)
- `name`: Tên đầy đủ của người dùng
- `username`: Tên đăng nhập (unique)
- `bio`: Tiểu sử (có thể null)
- `email`: Email của người dùng
- `createdAt`: Ngày tạo tài khoản
- `updatedAt`: Ngày cập nhật cuối cùng
- `_count.followers`: Số người đang follow user
- `_count.following`: Số người user đang follow
- `_count.posts`: Số bài viết của user
- `isFollowing`: Trạng thái follow (true = đã follow, false = chưa follow)
