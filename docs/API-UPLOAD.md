# Upload API – Tài liệu Postman

**Base URL**: `http://localhost:3000`  
**Prefix**: `/api/upload`

---

## 1. Tải ảnh lên Cloudinary

- **Method**: POST
- **URL**: `http://localhost:3000/api/upload`
- **Authorization**: Bắt buộc (cần đăng nhập)
- **Headers**:
  - `Content-Type: multipart/form-data`
- **Body** (form-data):
  - Key: `file`
  - Type: File
  - Value: Chọn file ảnh từ máy tính

**Lưu ý**: 
- Chỉ chấp nhận file ảnh (image/*)
- Kích thước file tối đa: 5MB
- File sẽ được tải lên Cloudinary folder "circle-posts"

- **Response**:
  - 200 (thành công):

```json
{
  "publicId": "circle-posts/abc123def456",
  "url": "https://res.cloudinary.com/image/upload/v1234567890/circle-posts/abc123def456.jpg"
}
```

  - 400 (không có file):

```json
{
  "error": "Cần có file"
}
```

  - 400 (không phải file ảnh):

```json
{
  "error": "Chỉ cho phép file ảnh"
}
```

  - 400 (file quá lớn):

```json
{
  "error": "File quá lớn (tối đa 5MB)"
}
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Không được phép"
}
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Tải lên thất bại"
}
```

---

## 2. Cách test trong Postman

1. **Đăng nhập trước**: 
   - Gọi API đăng nhập để lấy session
   - Session sẽ được tự động lưu trong cookie

2. **Tải ảnh lên**:
   - Sử dụng method POST
   - Trong Body, chọn form-data
   - Thêm key là "file", type là File
   - Chọn file ảnh từ máy tính
   - Gửi request

3. **Kiểm tra kết quả**:
   - Status 200: Tải thành công, nhận được URL và publicId
   - Status khác: Xem error message để biết lỗi

4. **Test các trường hợp lỗi**:
   - Không chọn file: Status 400
   - Chọn file không phải ảnh: Status 400
   - Chọn file > 5MB: Status 400
   - Chưa đăng nhập: Status 401

---

## 3. Ví dụ sử dụng URL trả về

URL nhận được từ API có thể được sử dụng để:
- Tạo bài viết có ảnh (trong API posts)
- Cập nhật avatar user
- Lưu trữ và hiển thị ảnh trong ứng dụng

**Ví dụ khi tạo bài viết có ảnh**:
```json
{
  "content": "Bài viết của tôi với ảnh",
  "image": "https://res.cloudinary.com/image/upload/v1234567890/circle-posts/abc123def456.jpg"
}
```
