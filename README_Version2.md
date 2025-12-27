```markdown
# AnimeStream - Phase A (Infra + Backend Core)

هذا المستودع يحتوي على المرحلة A: بنية أساسية لتطبيق مشاهدة الأنمي:
- docker-compose لتشغيل: mongo, redis, minio, backend, ffmpeg-worker, nginx
- Backend: Express + Mongoose + JWT auth + routes (auth, episodes, upload, servers)
- Queue: Bull (Redis) لطابور ترميز الفيديو
- FFmpeg worker: يستمع للمهام ويشغّل سكربت FFmpeg لإنشاء HLS variants
- MinIO: لتخزين الميديا (S3-compatible)
- Nginx: لخدمة ملفات media (HLS) محلياً

تشغيل محلي (موجه للاختبار):
1. تأكد من تثبيت Docker و Docker Compose.
2. من جذر المشروع:
   docker-compose up --build
3. افتح:
   - API: http://localhost:3000
   - Nginx (خدمة media): http://localhost:8080
   - MinIO Console: http://localhost:9000  (user/minioadmin)

ملاحظات مهمة:
- هذا التكوين مخصّص للتطوير والاختبار فقط. لإنتاج، استخدم S3 حقيقية، SSL، CDN، وDRM إن لزم.
- بعد رفع فيديو عبر /api/upload سيُدفع إلى صف الـ transcode. عامل ffmpeg-worker سينفّذ التحويل، يرفع النتائج إلى MinIO، ويحدّث وثيقة الحلقة في Mongo مع روابط السيرفر.
- عدّل backend/.env حسب حاجتك.

ماذا بعد:
- المرحلة التالية (B) سأضيف لوحة إدارة، تحسينات الأمان، ومثال Flutter متكامل. أخبرني إن أردت أن أكمل الآن.
```