# Auth API – Tài liệu Postman

**Base URL**: `http://localhost:3000`  
**Prefix**: `/api/auth`

---

## 1. Đăng ký tài khoản

- **Method**: POST
- **URL**: `http://localhost:3000/api/auth/signup`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "name": "Nguyen Van A",
  "email": "user@example.com",
  "username": "user123",
  "password": "123456"
}
```

- **Response**:
  - 201 (thành công):

```json
{
  "success": true
}
```

  - 400 (thiếu trường):

```json
{
  "error": "Thiếu các trường bắt buộc"
}
```

  - 409 (email đã tồn tại):

```json
{
  "error": "Email đã tồn tại"
}
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi máy chủ nội bộ"
}
```