# Smart Home Price (GitHub Pages Version)

เวอร์ชันนี้ถูกแปลงเป็น **Static Web (HTML / CSS / JavaScript ล้วน)** และจัดวาง `index.html` กับ `result.html` ไว้ที่หน้าสุด (Root Folder) เพื่อให้อัปโหลดขึ้น **GitHub Pages** และเปิดใช้งานได้ทันทีโดยไม่ต้องรัน Python Server

## โครงสร้างไฟล์
- `index.html` — หน้าหลักสำหรับเลือกกลุ่มลูกค้าและกรอกข้อมูลบ้าน 12 ช่อง
- `result.html` — หน้าแสดงผลการประเมินราคาจากโมเดล Machine Learning (JavaScript) พร้อมแกลเลอรีภาพบ้าน 12 ภาพตามกลุ่มที่เลือก
- `.nojekyll` — ไฟล์แจ้งให้ GitHub Pages โหลดโฟลเดอร์ `static/fonts/` และ `static/` ทั้งหมดโดยไม่ถูกบล็อก
- `static/css/style.css` — สไตล์ชีตฟอนต์ K2D โทนสีฟ้า-เหลือง
- `static/js/data.js` — ข้อมูลกลุ่มลูกค้า ย่านที่ตั้ง รูปภาพ และค่าสัมประสิทธิ์โมเดล ML จาก Ames, Iowa dataset
- `static/js/app.js` — ระบบคำนวณราคาบ้าน สลับภาษา TH/EN และจัดการหน้าเว็บ
- `static/fonts/` — ฟอนต์ K2D ครบชุด
- `static/images/` — ภาพสำรอง SVG
