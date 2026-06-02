export interface Template {
  id: string;
  title: string;
  category: 'Portfolio' | 'SaaS' | 'E-Commerce' | 'Blog' | 'Dashboard' | 'Special';
  tags: string[];
  description: string;
  demoUrl: string;
  imageUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
}

export const CURATED_TEMPLATES: Template[] = [
  {
    id: 'x-template-002',
    title: 'x-template-002: Minimal Portfolio',
    category: 'Portfolio',
    tags: ['Personal', 'Resume', 'Clean', 'Minimalist'],
    description: 'พอร์ตโฟลิโอสไตล์มินิมอล เน้นความเรียบง่าย นำเสนอผลงานและทักษะของคุณอย่างเป็นมืออาชีพ',
    demoUrl: 'https://ex2-axon.github.io/x-template-002/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-002/main/.github/screenshots/latest.png',
    difficulty: 'Beginner',
    techStack: ['HTML', 'Tailwind CSS', 'AlpineJS']
  },
  {
    id: 'x-template-003',
    title: 'x-template-003: SaaS Product Page',
    category: 'SaaS',
    tags: ['SaaS', 'Marketing', 'Landing Page', 'Pricing'],
    description: 'แลนดิงเพจสำหรับซอฟต์แวร์หรือบริการ SaaS โดดเด่นด้วยโทนสีเทคและการจัดวางส่วนฟีเจอร์อย่างลงตัว',
    demoUrl: 'https://ex2-axon.github.io/x-template-003/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-003/main/.github/screenshots/latest.png',
    difficulty: 'Beginner',
    techStack: ['HTML', 'Tailwind CSS']
  },
  {
    id: 'x-template-020',
    title: 'x-template-020: Grid Storefront',
    category: 'E-Commerce',
    tags: ['E-Commerce', 'Shop', 'Product Grid', 'Cart'],
    description: 'หน้าร้านค้าออนไลน์แสดงรายการสินค้าในรูปแบบ Grid คลีนตา มีปุ่มหยิบใส่ตะกร้าและตัวกรองสินค้าอย่างดี',
    demoUrl: 'https://ex2-axon.github.io/x-template-020/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-020/main/.github/screenshots/latest.png',
    difficulty: 'Intermediate',
    techStack: ['HTML', 'Tailwind CSS', 'JavaScript']
  },
  {
    id: 'x-template-021',
    title: 'x-template-021: Single Product Detail',
    category: 'E-Commerce',
    tags: ['Store', 'Product Detail', 'Buy Flow', 'Gallery'],
    description: 'หน้าแสดงรายละเอียดสินค้าแบบเจาะลึก พร้อมแกลเลอรีรูปภาพสินค้า แผงเลือกขนาด/สี และระบบรีวิว',
    demoUrl: 'https://ex2-axon.github.io/x-template-021/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-021/main/.github/screenshots/latest.png',
    difficulty: 'Intermediate',
    techStack: ['HTML', 'Tailwind CSS']
  },
  {
    id: 'x-template-022',
    title: 'x-template-022: Dynamic SaaS Portal',
    category: 'SaaS',
    tags: ['SaaS', 'Analytics', 'Conversion', 'Feature Grid'],
    description: 'แลนดิงเพจส่งเสริมการขายผลิตภัณฑ์เทคโนโลยี แสดงตารางราคาจำลองและวิดเจ็ตสถิติเพื่อความน่าเชื่อถือ',
    demoUrl: 'https://ex2-axon.github.io/x-template-022/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-022/main/.github/screenshots/latest.png',
    difficulty: 'Intermediate',
    techStack: ['HTML', 'Tailwind CSS', 'Framer-like CSS']
  },
  {
    id: 'x-template-023',
    title: 'x-template-023: Creative Agency Portfolio',
    category: 'Portfolio',
    tags: ['Agency', 'Creative', 'Bold Typography', 'Services'],
    description: 'เทมเพลตสำหรับบริษัทครีเอทีฟและเอเจนซี่ ดีไซน์ด้วยตัวอักษรขนาดใหญ่ ทรงพลัง และส่วนแสดงผลงานแบบโมเดิร์น',
    demoUrl: 'https://ex2-axon.github.io/x-template-023/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-023/main/.github/screenshots/latest.png',
    difficulty: 'Intermediate',
    techStack: ['HTML', 'Tailwind CSS']
  },
  {
    id: 'x-template-024',
    title: 'x-template-024: Mobile App Landing',
    category: 'SaaS',
    tags: ['App Promo', 'Mobile', 'iOS', 'Android'],
    description: 'หน้าเว็บโปรโมตแอปพลิเคชันมือถือ ประกอบด้วยปุ่มดาวน์โหลด สไลเดอร์จำลองฟังก์ชัน และรีวิวจากผู้ใช้',
    demoUrl: 'https://ex2-axon.github.io/x-template-024/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-024/main/.github/screenshots/latest.png',
    difficulty: 'Beginner',
    techStack: ['HTML', 'Tailwind CSS']
  },
  {
    id: 'x-template-025',
    title: 'x-template-025: Tech Resume & Skills',
    category: 'Portfolio',
    tags: ['Developer', 'Interactive CV', 'Timeline', 'Contact'],
    description: 'ประวัติส่วนตัวสำหรับนักพัฒนาสายเทค มีแถบแสดงระดับทักษะ ไทม์ไลน์ประสบการณ์ทำงาน และฟอร์มติดต่อกลับ',
    demoUrl: 'https://ex2-axon.github.io/x-template-025/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-025/main/.github/screenshots/latest.png',
    difficulty: 'Intermediate',
    techStack: ['HTML', 'Tailwind CSS', 'Interactive JS']
  },
  {
    id: 'x-template-026',
    title: 'x-template-026: Editorial Blog',
    category: 'Blog',
    tags: ['Blog', 'Magazine', 'Minimalist Reader', 'Articles'],
    description: 'เทมเพลตบล็อกสายเขียนสไตล์คลีนตา สบายสำหรับการอ่านคอนเทนต์ขนาดยาว พร้อมเลย์เอาต์การนำเสนอที่สวยงาม',
    demoUrl: 'https://ex2-axon.github.io/x-template-026/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-026/main/.github/screenshots/latest.png',
    difficulty: 'Beginner',
    techStack: ['HTML', 'Tailwind CSS']
  },
  {
    id: 'x-template-027',
    title: 'x-template-027: Multi-column Blog',
    category: 'Blog',
    tags: ['News', 'Grid Layout', 'Newsletter', 'Categories'],
    description: 'หน้าแรกของเว็บไซต์ข่าวหรือบทความแบบหลายคอลัมน์ มีระบบกรองหัวข้อบทความและส่วนสมัครสมาชิกจดหมายข่าว',
    demoUrl: 'https://ex2-axon.github.io/x-template-027/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-027/main/.github/screenshots/latest.png',
    difficulty: 'Intermediate',
    techStack: ['HTML', 'Tailwind CSS', 'JS Search']
  },
  {
    id: 'x-template-028',
    title: 'x-template-028: Dark Creative Portfolio',
    category: 'Portfolio',
    tags: ['Dark Theme', 'Designer', 'Photography', 'Art'],
    description: 'พอร์ตโฟลิโอโทนมืดลึกลับ เหมาะสำหรับดีไซเนอร์และช่างภาพที่ต้องการเน้นรูปภาพผลงานให้โดดเด่นท่ามกลางความมืด',
    demoUrl: 'https://ex2-axon.github.io/x-template-028/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-028/main/.github/screenshots/latest.png',
    difficulty: 'Intermediate',
    techStack: ['HTML', 'Tailwind CSS']
  },
  {
    id: 'x-template-030',
    title: 'x-template-030: Creative Magazine Homepage',
    category: 'Blog',
    tags: ['Magazine', 'Bold', 'Rich Grid', 'Trending Section'],
    description: 'หน้าแรกนิตยสารออนไลน์สุดล้ำ แบ่งหมวดหมู่บทความย่อยด้วยดีไซน์ตารางสลับขนาด (Complex Grid Layout)',
    demoUrl: 'https://ex2-axon.github.io/x-template-030/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-030/main/.github/screenshots/latest.png',
    difficulty: 'Intermediate',
    techStack: ['HTML', 'Tailwind CSS']
  },
  {
    id: 'x-template-031',
    title: 'x-template-031: Modern CRM Dashboard',
    category: 'Dashboard',
    tags: ['Admin', 'SaaS Panel', 'Charts', 'Data Visualization'],
    description: 'แผงควบคุมหลังบ้านระบบ CRM ดีไซน์โมเดิร์น แถบเมนูด้านซ้ายและกราฟวงกลมจำลองยอดขายและการเติบโต',
    demoUrl: 'https://ex2-axon.github.io/x-template-031/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-031/main/.github/screenshots/latest.png',
    difficulty: 'Advanced',
    techStack: ['HTML', 'Tailwind CSS', 'ChartJS Mockup']
  },
  {
    id: 'x-template-032',
    title: 'x-template-032: Ultimate E-Commerce Hub',
    category: 'E-Commerce',
    tags: ['Store', 'E-Commerce', 'Checkout', 'Filter Panel'],
    description: 'แพลตฟอร์มช้อปปิ้งสมบูรณ์แบบ มีระบบแยกหมวดหมู่สินค้าอย่างละเอียด แถบจัดการราคาสินค้า และหน้าจ่ายเงินสำเร็จรูป',
    demoUrl: 'https://ex2-axon.github.io/x-template-032/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-032/main/.github/screenshots/latest.png',
    difficulty: 'Advanced',
    techStack: ['HTML', 'Tailwind CSS', 'Vanilla JS']
  },
  {
    id: 'x-template-033',
    title: 'x-template-033: Kanban Project Board',
    category: 'Dashboard',
    tags: ['Kanban', 'Management', 'Tasks', 'Board View'],
    description: 'วิดเจ็ตหรือหน้าจัดการงานแบบ Kanban Card สามารถดูสถานะ To-Do, In-Progress และ Done ได้อย่างรวดเร็ว',
    demoUrl: 'https://ex2-axon.github.io/x-template-033/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-033/main/.github/screenshots/latest.png',
    difficulty: 'Advanced',
    techStack: ['HTML', 'Tailwind CSS', 'Interactive Cards']
  },
  {
    id: 'x-template-034',
    title: 'x-template-034: Advanced Analytics Portal',
    category: 'Dashboard',
    tags: ['Charts', 'Analytics', 'System Logs', 'Database UI'],
    description: 'แดชบอร์ดจำลองค่าเซิร์ฟเวอร์และการวิเคราะห์ข้อมูลทราฟฟิกเว็บแบบลงลึก รายงานปริมาณการใช้งานในรูปแบบเรียลไทม์',
    demoUrl: 'https://ex2-axon.github.io/x-template-034/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-034/main/.github/screenshots/latest.png',
    difficulty: 'Advanced',
    techStack: ['HTML', 'Tailwind CSS', 'Advanced Mockups']
  },
  {
    id: 'x-template-035',
    title: 'x-template-035: User Profile Settings Hub',
    category: 'Dashboard',
    tags: ['Profile', 'Settings', 'Account Management', 'Security'],
    description: 'แผงหน้าจัดการโปรไฟล์และความปลอดภัยของผู้ใช้งาน แบ่งกลุ่มย่อยอย่างเป็นระบบ เช่น ข้อมูลส่วนตัว รหัสผ่าน และการแจ้งเตือน',
    demoUrl: 'https://ex2-axon.github.io/x-template-035/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-035/main/.github/screenshots/latest.png',
    difficulty: 'Intermediate',
    techStack: ['HTML', 'Tailwind CSS']
  },
  {
    id: 'x-template-special-001',
    title: 'x-template-special-001: Cyberpunk Landing',
    category: 'Special',
    tags: ['Cyberpunk', 'Glassmorphic', 'Neon Glowing', 'Next-Gen'],
    description: 'หน้าเว็บโปรโมตสุดล้ำลึกที่มาพร้อมกลิ่นอายไซเบอร์พังก์ การจัดแต่งขอบแบบเรืองแสงสว่างและฟิลเตอร์กระจกฝ้า',
    demoUrl: 'https://ex2-axon.github.io/x-template-special-001/',
    imageUrl: 'https://raw.githubusercontent.com/Ex2-Axon/x-template-special-001/main/.github/screenshots/latest.png',
    difficulty: 'Advanced',
    techStack: ['HTML', 'Tailwind CSS', 'Special FX']
  }
];
