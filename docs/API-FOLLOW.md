# Follow API – Tài liệu Postman

**Base URL**: `http://localhost:3000`

---

## 1. Follow/Unfollow người dùng

- **Method**: POST
- **URL**: `http://localhost:3000/api/users/{userId}/follow`
- **Authorization**: Bắt buộc (cần đăng nhập)
- **Headers**:
  - `Content-Type: application/json`
- **Parameters**:
  - `userId` (path param): ID của người dùng cần follow/unfollow

**Lưu ý**:
- API này hoạt động như toggle: nếu chưa follow sẽ thực hiện follow, nếu đã follow sẽ thực hiện unfollow
- Không thể follow chính mình
- Cần đăng nhập để sử dụng

- **Response**:
  - 200 (follow thành công):

```json
{
  "following": true
}
```

  - 200 (unfollow thành công):

```json
{
  "following": false
}
```

  - 400 (follow chính mình):

```json
{
  "error": "Bạn không thể theo dõi chính mình"
}
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Chưa được xác thực"
}
```

  - 404 (người dùng không tồn tại):

```json
{
  "error": "Người dùng không tồn tại"
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

### Follow/Unfollow người dùng:

1. **Đăng nhập trước**:
   - Gọi API đăng nhập để lấy session
   - Session sẽ được tự động lưu trong cookie

2. **Follow/Unfollow**:
   - Method: POST
   - URL: `http://localhost:3000/api/users/{userId}/follow`
   - Thay `{userId}` bằng ID người dùng muốn follow
   - Headers: `Content-Type: application/json`

3. **Kiểm tra kết quả**:
   - Status 200 với `following: true`: Follow thành công
   - Status 200 với `following: false`: Unfollow thành công
   - Status khác: Xem error message để biết lỗi

4. **Test toggle behavior**:
   - Gọi API lần đầu → sẽ follow
   - Gọi API lần hai → sẽ unfollow
   - Gọi API lần ba → sẽ follow lại

---

## 3. Luồng test đầy đủ

1. Đăng nhập → Lấy session
2. Lấy danh sách gợi ý người dùng → Lấy `userId` để test
3. Gọi POST `/api/users/{userId}/follow` để follow
4. Gọi lại POST `/api/users/{userId}/follow` để unfollow
5. Kiểm tra trạng thái `following` trong response
