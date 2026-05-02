# Users Suggestions API – Tài liệu Postman

**Base URL**: `http://localhost:3000`

---

## 1. Lấy danh sách gợi ý người dùng

- **Method**: GET
- **URL**: `http://localhost:3000/api/users/suggestions`
- **Authorization**: Bắt buộc (cần đăng nhập)
- **Headers**:
  - `Content-Type: application/json`

**Lưu ý**:
- Trả về 5 người dùng ngẫu nhiên (không bao gồm người dùng hiện tại)
- Mỗi người dùng có trường `isFollowing` để biết đã follow chưa
- Cần đăng nhập để sử dụng

- **Response**:
  - 200 (thành công):

```json
[
  {
    "id": "user_id_here",
    "image": "https://example.com/avatar.jpg",
    "name": "Nguyen Van A",
    "username": "user123",
    "isFollowing": false
  },
  {
    "id": "user_id_here_2",
    "image": "https://example.com/avatar2.jpg",
    "name": "Tran Thi B",
    "username": "user456",
    "isFollowing": true
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

### Lấy danh sách gợi ý:

1. **Đăng nhập trước**:
   - Gọi API đăng nhập để lấy session
   - Session sẽ được tự động lưu trong cookie

2. **Lấy gợi ý**:
   - Method: GET
   - URL: `http://localhost:3000/api/users/suggestions`
   - Headers: `Content-Type: application/json`

3. **Kiểm tra kết quả**:
   - Status 200: Trả về mảng người dùng gợi ý
   - Mỗi user có `isFollowing`: true/false
   - Tối đa 5 người dùng

4. **Sử dụng userId**:
   - Lấy `id` từ response để test API follow
   - Ví dụ: dùng `id` của user đầu tiên để gọi POST `/api/users/{id}/follow`

---

## 3. Luồng test đầy đủ

1. Đăng nhập → Lấy session
2. Gọi GET `/api/users/suggestions` → Lấy danh sách gợi ý
3. Chọn một user từ danh sách → Lấy `userId`
4. Gọi POST `/api/users/{userId}/follow` để follow
5. Gọi lại GET `/api/users/suggestions` → Kiểm tra `isFollowing` đã thay đổi
6. Gọi lại POST `/api/users/{userId}/follow` để unfollow
7. Kiểm tra lại `isFollowing` trong response

---

## 4. Chi tiết response

**Các trường trong response**:
- `id`: ID duy nhất của người dùng
- `image`: URL ảnh đại diện (có thể null)
- `name`: Tên đầy đủ của người dùng
- `username`: Tên đăng nhập (unique)
- `isFollowing`: Trạng thái follow (true = đã follow, false = chưa follow)
