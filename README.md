# Circle - Ứng dụng Mạng xã hội

Circle là một ứng dụng mạng xã hội đầy đủ tính năng được xây dựng với Next.js 16, TypeScript và các công nghệ hiện đại khác. Ứng dụng cho phép người dùng tạo bài đăng, tương tác qua like/comment, theo dõi người dùng khác và nhận thông báo real-time.

## Công nghệ sử dụng

### Frontend
- **Next.js 16.2.4** - Framework React với App Router
- **React 19.2.4** - Thư viện UI
- **TypeScript 5** - Kiểm tra kiểu dữ liệu
- **Tailwind CSS 4** - Framework định kiểu
- **React Hook Form 7.75.0** + **Zod 4.4.2** - Xử lý và xác thực biểu mẫu
- **TanStack React Query 5.100.8** - Lấy dữ liệu và quản lý trạng thái
- **Lucide React 1.14.0** - Thư viện biểu tượng
- **date-fns 4.1.0** - Định dạng ngày tháng

### Backend & Database
- **NextAuth v5.0.0-beta.31** - Xác thực (Credentials Provider)
- **Prisma 5.22.0** - ORM
- **MongoDB** - Cơ sở dữ liệu (MongoDB Atlas)
- **bcryptjs 3.0.3** - Mã hóa mật khẩu

### Cloud Services
- **Cloudinary 2.10.0** - Tải lên và lưu trữ ảnh
- **Pusher 5.3.3** - Thông báo thời gian thực

### Development Tools
- **Biome 2.4.14** - Kiểm tra và định dạng mã
- **ESLint 9** - Chất lượng mã
- **Axios 1.15.2** - Client HTTP

## Cấu trúc dự án

```
social-app/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Routes xác thực
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (main)/                   # Routes chính của ứng dụng
│   │   ├── notifications/
│   │   ├── post/
│   │   ├── posts/
│   │   └── page.tsx
│   ├── api/                      # Routes API
│   │   ├── auth/
│   │   ├── comments/
│   │   ├── notifications/
│   │   ├── posts/
│   │   ├── upload/
│   │   └── users/
│   ├── lib/                      # Tiện ích phía server
│   │   ├── cloudinary.ts
│   │   └── prisma.ts
│   ├── auth.ts                   # Cấu hình NextAuth
│   ├── globals.css               # Kiểu toàn cục
│   ├── layout.tsx                # Layout gốc
│   └── middleware.ts             # Bảo vệ route
├── components/                   # Components React
│   ├── comment/
│   ├── post/
│   ├── profile/
│   ├── providers/
│   └── shared/
├── hooks/                        # Hooks React Query tùy chỉnh
├── lib/                          # Tiện ích phía client
│   ├── axios.ts
│   └── pusher.ts
├── prisma/                       # Schema cơ sở dữ liệu
│   └── schema.prisma
├── services/                     # Hàm dịch vụ API
├── types/                        # Giao diện TypeScript
└── public/                       # Tài sản tĩnh
```

## Schema Cơ sở dữ liệu

### Models
- **User**: Thông tin người dùng (id, name, username, email, password, image, bio)
- **Post**: Bài đăng (id, content, image, imagePublicId, authorId)
- **Like**: Lượt thích (postId, userId)
- **Comment**: Bình luận (id, content, postId, authorId)
- **Follow**: Quan hệ theo dõi (followerId, followingId)
- **Notification**: Thông báo (userId, type, message, postId, read)

### Relations
- User ↔ Posts (1:N)
- User ↔ Comments (1:N)
- User ↔ Likes (1:N)
- User ↔ Followers (N:M)
- User ↔ Following (N:M)
- Post ↔ Likes (1:N)
- Post ↔ Comments (1:N)

## Cài đặt và chạy

### Yêu cầu
- Node.js 18+
- Tài khoản MongoDB Atlas
- Tài khoản Cloudinary
- Tài khoản Pusher

### 1. Clone và cài đặt dependencies
```bash
git clone <repository-url>
cd social-app
npm install
```

### 2. Cấu hình biến môi trường
Tạo file `.env` với các biến sau:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname"

# NextAuth
AUTH_SECRET="random-secret-string"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Pusher
PUSHER_APP_ID="your-app-id"
PUSHER_SECRET="your-secret"
PUSHER_CLUSTER="your-cluster"
NEXT_PUBLIC_PUSHER_KEY="your-public-key"
NEXT_PUBLIC_PUSHER_CLUSTER="your-cluster"
```

### 3. Khởi tạo database
```bash
npx prisma generate
npx prisma db push  # For MongoDB
```

### 4. Chạy development server
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## Tính năng chính

### Xác thực
- Đăng ký tài khoản mới với xác thực
- Đăng nhập bằng email/password
- Quản lý phiên với JWT
- Middleware bảo vệ route

### Bài đăng
- Tạo bài đăng với text và/hoặc ảnh
- Tải ảnh lên Cloudinary
- Cuộn vô hạn cho feed
- Phân trang với cách tiếp cận con trỏ

### Tương tác
- Thích/bỏ thích bài đăng với cập nhật lạc quan
- Bình luận trên bài đăng
- Theo dõi/ngừng theo dõi người dùng
- Thông báo thời gian thực

### Hồ sơ người dùng
- Xem hồ sơ người dùng
- Hiển thị số liệu (bài đăng, người theo dõi, đang theo dõi)
- Gợi ý người dùng để theo dõi

### Tính năng thời gian thực
- Tích hợp Pusher cho thông báo thời gian thực
- Thông báo tức thì khi có thích/bình luận
- Cập nhật trực tiếp cho components UI

## Scripts

```bash
npm run dev          # Server phát triển
npm run build        # Build sản xuất
npm run start        # Server sản xuất
npm run lint         # ESLint
npm run check        # Kiểm tra & sửa Biome
npm run format       # Định dạng Biome
```

## API Endpoints

### Xác thực
- `POST /api/auth/signup` - Đăng ký
- `POST /api/auth/[...nextauth]` - Handler NextAuth

### Bài đăng
- `GET /api/posts/feed` - Lấy bài đăng feed
- `POST /api/posts` - Tạo bài đăng mới
- `GET /api/posts/[postId]` - Lấy chi tiết bài đăng
- `POST /api/posts/[postId]/like` - Thích/bỏ thích bài đăng
- `GET /api/posts/[postId]/comments` - Lấy bình luận

### Bình luận
- `POST /api/comments` - Tạo bình luận mới

### Người dùng
- `GET /api/users/[userId]` - Lấy thông tin người dùng
- `POST /api/users/[userId]/follow` - Theo dõi/ngừng theo dõi người dùng
- `GET /api/users/suggestions` - Lấy gợi ý theo dõi

### Tải lên
- `POST /api/upload` - Tải ảnh lên Cloudinary

### Thông báo
- `GET /api/notifications` - Lấy danh sách thông báo

## Triển khai

### Triển khai Vercel
1. Push mã lên GitHub
2. Import dự án vào Vercel
3. Cấu hình biến môi trường trên Vercel
4. Triển khai

### Biến môi trường cho sản xuất
Đảm bảo tất cả biến môi trường được cấu hình trên Vercel:
- `DATABASE_URL`
- `AUTH_SECRET`
- `CLOUDINARY_*`
- `PUSHER_*`
- `NEXT_PUBLIC_PUSHER_*`

## Ghi chú phát triển

### Kiểu mã
- Sử dụng Biome để kiểm tra và định dạng
- Chế độ nghiêm ngặt TypeScript
- Quy tắc ESLint cho Next.js

### Cơ sở dữ liệu
- MongoDB với Prisma ORM
- ObjectId cho khóa chính
- Xóa chuỗi cho quan hệ

### Hiệu suất
- React Query cho bộ đệm và cập nhật lạc quan
- Tối ưu hóa hình ảnh với Next.js Image
- Cuộn vô hạn để giảm tải ban đầu

### Bảo mật
- Mã hóa mật khẩu với bcryptjs
- Xác thực đầu vào với Zod
- Middleware bảo vệ route
- Biến môi trường cho dữ liệu nhạy cảm

## Kiểm tra tính năng

### Luồng xác thực
1. Kiểm tra đăng ký → tạo người dùng trong MongoDB
2. Kiểm tra đăng nhập → chuyển hướng về trang chủ
3. Kiểm tra truy cập route được bảo vệ → chuyển hướng về đăng nhập

### Luồng bài đăng
1. Kiểm tra tạo bài đăng text → xuất hiện trong feed
2. Kiểm tra tạo bài đăng với ảnh → tải lên Cloudinary
3. Kiểm tra cuộn vô hạn → tải thêm bài đăng
4. Kiểm tra thích/bình luận → cập nhật lạc quan

### Thông báo thời gian thực
1. Kiểm tra thích bài đăng từ người dùng khác → thông báo thời gian thực
2. Kiểm tra bình luận → thông báo tức thì
3. Kiểm tra huy hiệu thông báo → cập nhật trực tiếp

## Đóng góp

1. Fork repository
2. Tạo nhánh tính năng
3. Thực hiện thay đổi với kiểm tra thích hợp
4. Gửi pull request

## Giấy phép

Dự án này được cấp phép theo Giấy phép MIT.
