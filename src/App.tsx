import React, { useState, useEffect } from 'react';

// === interfaces ===
interface Template {
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

// === mock database from gallery.html with enriched metadata ===
const TEMPLATES_DATA: Template[] = [
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<'gallery' | 'detail' | 'assistant' | 'about'>('gallery');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templates, setTemplates] = useState<Template[]>(TEMPLATES_DATA);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  
  // Search, Filters & Sorting state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'id' | 'title' | 'difficulty'>('id');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Detail Simulator settings
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Sync state with URL hash (Simple Router)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'gallery') {
        setCurrentPage('gallery');
      } else if (hash === 'assistant') {
        setCurrentPage('assistant');
      } else if (hash === 'about') {
        setCurrentPage('about');
      } else if (hash.startsWith('template/')) {
        const id = hash.split('/')[1];
        const found = templates.find(t => t.id === id);
        if (found) {
          setSelectedTemplate(found);
          setCurrentPage('detail');
        } else {
          setCurrentPage('gallery');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [templates]);

  // Fetch real-time templates from GitHub
  useEffect(() => {
    const fetchGitHubTemplates = async () => {
      setIsLoadingTemplates(true);
      try {
        const response = await fetch('https://api.github.com/orgs/Ex2-Axon/repos?per_page=100&sort=pushed');
        if (!response.ok) throw new Error('Failed to fetch repos');
        
        const repos = await response.json();
        const githubTemplates: Template[] = repos
          .filter((repo: any) => repo.name.startsWith('x-template-'))
          .map((repo: any) => {
            // Check if we have curated data for this repo
            const curated = TEMPLATES_DATA.find(t => t.id === repo.name);
            
            if (curated) {
              return {
                ...curated,
                // Update with live info from GitHub if needed
                imageUrl: `https://raw.githubusercontent.com/Ex2-Axon/${repo.name}/main/.github/screenshots/latest.png`,
                demoUrl: `https://ex2-axon.github.io/${repo.name}/`
              };
            }

            // Default metadata for new/unknown repos
            return {
              id: repo.name,
              title: repo.name.replace(/-/g, ' ').toUpperCase(),
              category: (repo.topics?.includes('ecommerce') ? 'E-Commerce' : 
                         repo.topics?.includes('saas') ? 'SaaS' : 
                         repo.topics?.includes('dashboard') ? 'Dashboard' : 
                         repo.topics?.includes('portfolio') ? 'Portfolio' : 'Special') as any,
              tags: repo.topics || ['Automated'],
              description: repo.description || 'เทมเพลตใหม่จากระบบ Axon Engine ที่ตรวจพบโดยอัตโนมัติ',
              demoUrl: `https://ex2-axon.github.io/${repo.name}/`,
              imageUrl: `https://raw.githubusercontent.com/Ex2-Axon/${repo.name}/main/.github/screenshots/latest.png`,
              difficulty: (repo.topics?.includes('advanced') ? 'Advanced' : 
                           repo.topics?.includes('intermediate') ? 'Intermediate' : 'Beginner') as any,
              techStack: repo.topics?.filter((t: string) => ['react', 'tailwind', 'typescript', 'vite'].includes(t)) || ['HTML', 'Tailwind CSS']
            };
          });

        // Merge curated data that might not be in the current GitHub fetch (e.g. archived or private)
        const finalTemplates = [...githubTemplates];
        TEMPLATES_DATA.forEach(curated => {
          if (!finalTemplates.find(t => t.id === curated.id)) {
            finalTemplates.push(curated);
          }
        });

        setTemplates(finalTemplates);
      } catch (err) {
        console.error('Error fetching templates:', err);
        showToast('ไม่สามารถดึงข้อมูลเทมเพลตล่าสุดจาก GitHub ได้ ใช้ข้อมูลสำรองแทน');
      } finally {
        setIsLoadingTemplates(false);
      }
    };

    fetchGitHubTemplates();
  }, []);

  // Update hash when page changes
  useEffect(() => {
    if (currentPage === 'detail' && selectedTemplate) {
      window.location.hash = `template/${selectedTemplate.id}`;
    } else {
      window.location.hash = currentPage;
    }
  }, [currentPage, selectedTemplate]);

  // Reset iframe state when template changes
   useEffect(() => {
     setIframeLoaded(false);
     setIframeError(false);
   }, [selectedTemplate]);

   // Gemini AI Assistant State
   const [assistantPrompt, setAssistantPrompt] = useState('');
   const [isGenerating, setIsGenerating] = useState(false);
   const [aiSuggestions, setAiSuggestions] = useState<{
     recommendedId: string;
     reason: string;
     advice: string;
     customCode: string;
   } | null>(null);

   // Custom Toast notification
   const [toast, setToast] = useState<string | null>(null);

   // Fetch local favorites on init
  useEffect(() => {
    const saved = localStorage.getItem('axon_fav_templates');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
      showToast('เอาออกจากรายการโปรดแล้ว 💔');
    } else {
      updated = [...favorites, id];
      showToast('เพิ่มเข้าในรายการโปรดแล้ว! ❤️');
    }
    setFavorites(updated);
    localStorage.setItem('axon_fav_templates', JSON.stringify(updated));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast('คัดลอกคำสั่งเรียบร้อยแล้ว! 📋');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // Filter & Sort templates
  const filteredTemplates = templates.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchCat = activeCategory === 'All' ? true : t.category === activeCategory;
    const matchDiff = activeDifficulty === 'All' ? true : t.difficulty === activeDifficulty;
    
    return matchSearch && matchCat && matchDiff;
  }).sort((a, b) => {
    if (sortOrder === 'title') return a.title.localeCompare(b.title);
    if (sortOrder === 'difficulty') {
      const diffMap = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    }
    return a.id.localeCompare(b.id);
  });

  // Call Gemini API to analyze requirements & suggest template
  const handleAskAI = async () => {
    if (!assistantPrompt.trim()) return;
    setIsGenerating(true);
    setAiSuggestions(null);

    const apiKey = ""; // Canvas runtime environment automatically replaces empty string with key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const systemPrompt = `You are the Axon Template Architect, an AI assistant who guides users to choose the best HTML/Tailwind templates from Ex2-Axon library and helps write styled custom tailwind components. 
Here is our templates database:
${JSON.stringify(templates.map(t => ({ id: t.id, title: t.title, category: t.category, description: t.description, tags: t.tags })))}

When a user describes their website need in Thai, you must do two things:
1. Identify the single best template ID that fits their request from our template list, explain exactly why it fits in sweet Thai language.
2. Draft a complete, highly-responsive, fully styled inline-Tailwind hero section (raw HTML using beautiful modern Tailwind classes) in the customCode field. Use rich SVG icons, gorgeous gradients, realistic text content, and sleek typography.

Return your response strictly in JSON format matching this schema:
{
  "recommendedId": "the recommended template id, e.g. x-template-020",
  "reason": "Detailed explanation in Thai about why this template matches.",
  "advice": "Tips in Thai on how they can customize or build on top of this template.",
  "customCode": "HTML tailwind template snippet for a hero component matching their request."
}`;

    const retryCall = async (retriesLeft = 5, delay = 1000): Promise<any> => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `ฉันต้องการทำเว็บไซต์แนวนี้: ${assistantPrompt}` }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  recommendedId: { type: "STRING" },
                  reason: { type: "STRING" },
                  advice: { type: "STRING" },
                  customCode: { type: "STRING" }
                },
                required: ["recommendedId", "reason", "advice", "customCode"]
              }
            }
          })
        });

        if (!response.ok) throw new Error(`HTTP status: ${response.status}`);
        const result = await response.json();
        return result;
      } catch (err) {
        if (retriesLeft > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return retryCall(retriesLeft - 1, delay * 2);
        }
        throw err;
      }
    };

    try {
      const result = await retryCall();
      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const parsed = JSON.parse(rawText);
        setAiSuggestions(parsed);
      } else {
        throw new Error("No candidates received");
      }
    } catch (err) {
      console.error(err);
      showToast("พบข้อผิดพลาดในการเชื่อมต่อกับ AI กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestTemplateClick = (id: string) => {
    const found = templates.find(t => t.id === id);
    if (found) {
      setSelectedTemplate(found);
      setCurrentPage('detail');
      setIframeLoaded(false);
      setIframeError(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* --- Top Navigation Header --- */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('gallery')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
              AX
            </div>
            <div>
              <span className="font-extrabold text-xl bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Axon Space
              </span>
              <span className="text-[10px] block text-slate-500 font-semibold tracking-wider uppercase -mt-1">X-Template Portal</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-1">
            <button 
              onClick={() => setCurrentPage('gallery')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === 'gallery' ? 'bg-slate-800/90 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              คลังเทมเพลต (Gallery)
            </button>
            <button 
              onClick={() => setCurrentPage('assistant')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${currentPage === 'assistant' ? 'bg-slate-800/90 text-purple-400 border-b-2 border-purple-400' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <svg className="w-4 h-4 text-purple-400 animate-pulse animate-duration-1000" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
              AI Architect
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === 'about' ? 'bg-slate-800/90 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              เกี่ยวกับเรา
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <a 
              href="https://github.com/Ex2-Axon" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-white transition"
              title="GitHub Organization"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.48 static 0-.236-.009-.866-.014-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            
            {/* Mobile Nav Button */}
            <div className="md:hidden flex space-x-1">
              <button 
                onClick={() => setCurrentPage('assistant')} 
                className={`p-2 rounded-lg ${currentPage === 'assistant' ? 'text-purple-400 bg-slate-900' : 'text-slate-400'}`}
                title="AI Generator"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
              <button 
                onClick={() => setCurrentPage('gallery')} 
                className={`p-2 rounded-lg ${currentPage === 'gallery' ? 'text-cyan-400 bg-slate-900' : 'text-slate-400'}`}
                title="Home"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <main className="flex-1">
        {currentPage === 'gallery' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Hero / Header Section */}
            <div className="text-center md:text-left mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/60 inline-block mb-3">
                  Axon x-template Engine 2026
                </span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
                  Axon Template Space
                </h1>
                <p className="text-slate-400 text-base md:text-lg max-w-2xl">
                  ระบบคลังเทมเพลตที่ได้รับการสแกนและอัปเดตอัตโนมัติจากโปรเจกต์กลุ่มนักพัฒนา <span className="text-slate-200 font-semibold">Ex2-Axon</span> เพื่อความรวดเร็วในการขึ้นโครงสร้างเว็บของทุกคน
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-center">
                  <span className="text-2xl font-bold text-white block">{TEMPLATES_DATA.length}</span>
                  <span className="text-xs text-slate-500">เทมเพลตทั้งหมด</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-center">
                  <span className="text-2xl font-bold text-red-400 block">{favorites.length}</span>
                  <span className="text-xs text-slate-500">บันทึกชื่นชอบ</span>
                </div>
                <button 
                  onClick={() => setCurrentPage('assistant')}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  ให้ AI แนะนำเทมเพลต
                </button>
              </div>
            </div>

            {/* Filters, Categories & Search Panel */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 md:p-6 mb-8 gap-4 flex flex-col">
              
              {/* Search Bar & Grid View Toggle */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                    type="text" 
                    placeholder="ค้นหาตามคำค้น ชื่อ แท็ก หรือฟังก์ชัน..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                    >
                      ล้าง
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                  {/* Sort order selector */}
                  <select 
                    className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                  >
                    <option value="id">เรียงตาม: ID</option>
                    <option value="title">เรียงตาม: ชื่อเทมเพลต</option>
                    <option value="difficulty">เรียงตาม: ความยาก</option>
                  </select>

                  {/* Difficulty selector */}
                  <select 
                    className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500"
                    value={activeDifficulty}
                    onChange={(e) => setActiveDifficulty(e.target.value)}
                  >
                    <option value="All">ระดับความยาก: ทั้งหมด</option>
                    <option value="Beginner">Beginner (โครงสร้างง่ายๆ)</option>
                    <option value="Intermediate">Intermediate (ซับซ้อนขึ้น)</option>
                    <option value="Advanced">Advanced (ฟังก์ชันเต็มรูปแบบ)</option>
                  </select>

                  {/* View switcher */}
                  <div className="bg-slate-950 border border-slate-800 p-1 rounded-xl flex">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                      title="Grid view"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                      title="List view"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 items-center border-t border-slate-800/80 pt-4">
                <span className="text-xs font-semibold text-slate-500 mr-2">หมวดหมู่:</span>
                {['All', 'SaaS', 'E-Commerce', 'Portfolio', 'Dashboard', 'Blog', 'Special'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeCategory === cat ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm' : 'bg-slate-950/40 hover:bg-slate-900 border border-transparent text-slate-400 hover:text-slate-200'}`}
                  >
                    {cat === 'All' ? 'ทั้งหมด' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Template Gallery Listing */}
            {isLoadingTemplates ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-400 animate-pulse">กำลังดึงข้อมูลเทมเพลตล่าสุดจาก Axon Engine...</p>
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl bg-slate-900/10">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">ไม่พบเทมเพลตตามข้อมูลค้นหาของคุณ</h3>
                <p className="text-slate-400 max-w-sm mx-auto text-sm">
                  ลองล้างข้อความ หรือปรับเปลี่ยนตัวกรองหมวดหมู่ใหม่อีกครั้ง
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveDifficulty('All'); }}
                  className="mt-4 px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs hover:bg-slate-700 transition"
                >
                  คืนค่าตัวกรองทั้งหมด
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              
              /* --- GRID VIEW --- */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => {
                  const isFav = favorites.includes(template.id);
                  return (
                    <article 
                      key={template.id} 
                      className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/5 flex flex-col"
                    >
                      {/* Favorite Badge Toggle */}
                      <button 
                        onClick={(e) => toggleFavorite(template.id, e)}
                        className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-xl bg-slate-950/80 hover:bg-slate-950 backdrop-blur-sm border border-slate-800 flex items-center justify-center text-slate-400 hover:text-red-400 transition"
                      >
                        <svg className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>

                      {/* Cover Image with fallbacks */}
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer" onClick={() => { setSelectedTemplate(template); setCurrentPage('detail'); }}>
                        <img 
                          src={template.imageUrl} 
                          alt={template.title} 
                          loading="lazy"
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop';
                          }}
                        />
                        
                        {/* Tags overlay */}
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 max-w-[90%]">
                          <span className="text-[10px] uppercase font-extrabold tracking-wider bg-slate-950/80 backdrop-blur-sm text-cyan-400 px-2 py-0.5 rounded border border-slate-700">
                            {template.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <h3 
                            className="text-lg font-bold text-white group-hover:text-cyan-400 transition cursor-pointer"
                            onClick={() => { setSelectedTemplate(template); setCurrentPage('detail'); }}
                          >
                            {template.id}
                          </h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            template.difficulty === 'Beginner' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                            template.difficulty === 'Intermediate' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                            'bg-red-950 text-red-400 border border-red-800'
                          }`}>
                            {template.difficulty}
                          </span>
                        </div>

                        <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                          {template.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-5">
                          {template.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[11px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded-md">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                          <button 
                            onClick={() => { setSelectedTemplate(template); setCurrentPage('detail'); }}
                            className="flex-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                          >
                            รายละเอียด & พรีวิว
                          </button>
                          <a 
                            href={template.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-xl text-xs transition flex items-center justify-center"
                            title="เปิดพรีวิวแบบเต็มจอ"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              
              /* --- LIST VIEW --- */
              <div className="space-y-4">
                {filteredTemplates.map((template) => {
                  const isFav = favorites.includes(template.id);
                  return (
                    <article 
                      key={template.id} 
                      className="group bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition p-4 flex flex-col md:flex-row gap-5 items-center"
                    >
                      <div className="relative w-full md:w-48 aspect-video md:aspect-[4/3] shrink-0 bg-slate-950 rounded-lg overflow-hidden cursor-pointer" onClick={() => { setSelectedTemplate(template); setCurrentPage('detail'); }}>
                        <img 
                          src={template.imageUrl} 
                          alt={template.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
                          }}
                        />
                      </div>

                      <div className="flex-1 w-full flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/60">
                              {template.category}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              template.difficulty === 'Beginner' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                              template.difficulty === 'Intermediate' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                              'bg-red-950 text-red-400 border border-red-800'
                            }`}>
                              {template.difficulty}
                            </span>
                          </div>
                          
                          <h3 
                            className="text-lg font-bold text-white group-hover:text-cyan-400 transition cursor-pointer"
                            onClick={() => { setSelectedTemplate(template); setCurrentPage('detail'); }}
                          >
                            {template.id}
                          </h3>
                          <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                            {template.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center justify-between border-t border-slate-800 pt-3 mt-2">
                          <div className="flex gap-1.5">
                            {template.techStack.map(stack => (
                              <span key={stack} className="text-xs text-slate-400 bg-slate-950 border border-slate-800 px-2 py-1 rounded">
                                {stack}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-2 w-full md:w-auto">
                            <button 
                              onClick={() => toggleFavorite(template.id)}
                              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-red-400 transition"
                            >
                              <svg className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => { setSelectedTemplate(template); setCurrentPage('detail'); }}
                              className="bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold px-4 py-2 rounded-xl text-xs transition"
                            >
                              พรีวิวอย่างละเอียด
                            </button>
                            <a 
                              href={template.demoUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1"
                            >
                              ดูสด
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <footer className="mt-20 border-t border-slate-800 pt-8 pb-12 text-center space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-slate-500 text-xs">
                <p>© 2026 Axon Space • Ex2-Axon Group. All templates licensed under MIT License.</p>
                <span className="hidden md:inline text-slate-700">|</span>
                <a 
                  href="https://microtronic-thailand.github.io/privacy-policy/?lang=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
              <p className="text-slate-600 text-[10px] uppercase tracking-widest">
                Automated scan & update system for modern web development
              </p>
            </footer>
          </div>
        )}

        {/* --- DETAIL & PREVIEW SIMULATOR PAGE --- */}
        {currentPage === 'detail' && selectedTemplate && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Back to Gallery */}
            <div className="mb-6 flex items-center justify-between">
              <button 
                onClick={() => setCurrentPage('gallery')}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-2 text-sm font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                กลับไปหน้าคลังเทมเพลต
              </button>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => toggleFavorite(selectedTemplate.id)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-red-400 transition text-sm flex items-center gap-1.5"
                >
                  <svg className={`w-4 h-4 ${favorites.includes(selectedTemplate.id) ? 'fill-red-500 text-red-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {favorites.includes(selectedTemplate.id) ? 'รายการโปรดแล้ว' : 'เพิ่มในรายการโปรด'}
                </button>
                <a 
                  href={selectedTemplate.demoUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition text-sm flex items-center gap-1.5"
                >
                  <span>เปิดเต็มหน้าต่าง</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Grid Layout: Left Simulator, Right Info Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Interactive Screen Device Simulator */}
              <div className="lg:col-span-8 flex flex-col space-y-4">
                
                {/* Simulator controls */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-xs text-slate-500 ml-2 font-mono">{selectedTemplate.id} Simulator</span>
                  </div>

                  {/* Device selectors */}
                  <div className="bg-slate-950 border border-slate-800 p-1 rounded-xl flex">
                    <button 
                      onClick={() => setDeviceMode('desktop')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${deviceMode === 'desktop' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Desktop
                    </button>
                    <button 
                      onClick={() => setDeviceMode('tablet')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${deviceMode === 'tablet' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Tablet
                    </button>
                    <button 
                      onClick={() => setDeviceMode('mobile')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${deviceMode === 'mobile' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Mobile
                    </button>
                  </div>
                </div>

                {/* Simulated Screen Wrapper */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex items-center justify-center min-h-[500px] relative overflow-hidden transition-all duration-300">
                  
                  {/* Viewport resizing container */}
                  <div 
                    className="transition-all duration-300 relative border-8 border-slate-950 rounded-2xl bg-slate-950 shadow-2xl h-[560px]"
                    style={{
                      width: deviceMode === 'desktop' ? '100%' : deviceMode === 'tablet' ? '600px' : '360px',
                    }}
                  >
                    {/* Simulator Top Notch / Speaker mockup on mobile */}
                    {deviceMode === 'mobile' && (
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-10 flex items-center justify-center">
                        <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
                      </div>
                    )}

                    {/* Loading Indicator */}
                    {!iframeLoaded && !iframeError && (
                      <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-slate-400 z-10 p-4">
                        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-sm font-medium">กำลังโหลด Iframe Live Preview จาก GitHub Pages...</p>
                        <p className="text-xs text-slate-500 mt-1">หากไม่โหลดเนื่องจากความปลอดภัย สามารถสลับใช้ Screenshot Preview</p>
                        <button 
                          onClick={() => setIframeError(true)}
                          className="mt-4 px-3 py-1.5 bg-slate-800 text-xs rounded-lg hover:bg-slate-700 text-slate-300"
                        >
                          สลับดูภาพ Screenshot นิ่ง
                        </button>
                      </div>
                    )}

                    {/* Iframe for Live Interactive View */}
                    {!iframeError ? (
                      <iframe 
                        src={selectedTemplate.demoUrl} 
                        title={`Live Preview of ${selectedTemplate.id}`}
                        className="w-full h-full border-none rounded-lg bg-slate-900"
                        onLoad={() => setIframeLoaded(true)}
                        onError={() => setIframeError(true)}
                      />
                    ) : (
                      /* Screenshot Fallback inside Frame */
                      <div className="relative w-full h-full overflow-y-auto bg-slate-900">
                        <img 
                          src={selectedTemplate.imageUrl} 
                          alt="Full Static Screenshot" 
                          className="w-full h-auto object-cover"
                        />
                        <div className="sticky bottom-0 bg-slate-950/90 backdrop-blur-md p-4 text-center border-t border-slate-800 text-xs">
                          <p className="text-slate-300 mb-2">แสดงแบบรูปภาพ Screenshot นิ่งเพื่อลดภาระการโหลด</p>
                          <button 
                            onClick={() => { setIframeError(false); setIframeLoaded(false); }}
                            className="px-3 py-1 bg-cyan-900/40 text-cyan-400 border border-cyan-800 rounded hover:bg-cyan-950"
                          >
                            ลองโหลด Live Iframe อีกครั้ง
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Template Info & Dev Setup Guide */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Card Info Box */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/60">
                      {selectedTemplate.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      ยาก: <strong className="text-slate-300">{selectedTemplate.difficulty}</strong>
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3">
                    {selectedTemplate.id}
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {selectedTemplate.description}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 block mb-1.5">เทคโนโลยีที่ใช้งาน (Stack)</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTemplate.techStack.map(tech => (
                          <span key={tech} className="text-xs bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-400 block mb-1.5">แท็กที่เกี่ยวข้อง</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedTemplate.tags.map(tag => (
                          <span key={tag} className="text-xs text-slate-500 hover:text-slate-300">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Developer Command Block */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    วิธีดึงเทมเพลตนี้ไปใช้พัฒนาต่อ
                  </h3>
                  
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    คุณสามารถดึงโฟลเดอร์โครงการเฉพาะจาก Repo มาพัฒนาต่อได้ทันทีโดยใช้คำสั่ง <code className="text-slate-300">npx degit</code> ในคอมพิวเตอร์ของคุณ
                  </p>

                  <div className="space-y-3">
                    {/* Copy degit */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">คัดลอกผ่าน DEGIT</span>
                      <div className="flex items-center bg-slate-950 rounded-lg p-2.5 border border-slate-800">
                        <code className="text-xs font-mono text-cyan-400 select-all overflow-x-auto truncate mr-2 flex-1">
                          npx degit Ex2-Axon/{selectedTemplate.id} my-new-project
                        </code>
                        <button 
                          onClick={() => copyToClipboard(`npx degit Ex2-Axon/${selectedTemplate.id} my-new-project`)}
                          className="text-slate-400 hover:text-white transition shrink-0 p-1 bg-slate-900 hover:bg-slate-850 rounded"
                          title="Copy"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Copy git clone */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">คัดลอกด้วย Git Clone</span>
                      <div className="flex items-center bg-slate-950 rounded-lg p-2.5 border border-slate-800">
                        <code className="text-xs font-mono text-cyan-400 select-all overflow-x-auto truncate mr-2 flex-1">
                          git clone https://github.com/Ex2-Axon/{selectedTemplate.id}.git
                        </code>
                        <button 
                          onClick={() => copyToClipboard(`git clone https://github.com/Ex2-Axon/${selectedTemplate.id}.git`)}
                          className="text-slate-400 hover:text-white transition shrink-0 p-1 bg-slate-900 hover:bg-slate-850 rounded"
                          title="Copy"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* --- AI ASSISTANT & CODE ARCHITECT PAGE --- */}
        {currentPage === 'assistant' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Header section */}
            <div className="mb-8 border-b border-slate-800 pb-6 text-center md:text-left">
              <span className="text-xs font-semibold tracking-wider uppercase text-purple-400 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/60 inline-block mb-3">
                Powered by Gemini 2.5 Flash
              </span>
              <h1 className="text-3xl font-black text-white mb-2">
                AI Template Space & Hero Architect
              </h1>
              <p className="text-slate-400 text-sm md:text-base max-w-2xl">
                บอกเล่าความต้องการในการสร้างเว็บของคุณ เช่น "ร้านกาแฟมินิมอล", "Landing page บริการไอที" AI จะวิเคราะห์คลังเทมเพลต Ex2-Axon และสร้างดีไซน์ Hero Section ด้วย Tailwind CSS ให้พรีวิวทันที!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Side: Ask AI Form */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-1.5">
                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                    ป้อนไอเดียเว็บที่คุณต้องการสร้าง
                  </h3>

                  <div className="space-y-4">
                    <textarea 
                      rows={4}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all resize-none"
                      placeholder="เช่น: ต้องการทำหน้าเว็บ Landing page สำหรับบริษัทบริการติดตั้งแผงโซลาร์เซลล์ เน้นความน่าเชื่อถือ มีโทนสีเขียวและเหลือง สไตล์โมเดิร์น..."
                      value={assistantPrompt}
                      onChange={(e) => setAssistantPrompt(e.target.value)}
                    />

                    {/* Pre-set Bubbles */}
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block mb-2">ไอเดียแนะนำด่วน:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          'พอร์ตโฟลิโอสมัครงานสายโปรแกรมเมอร์โทนสีเข้ม',
                          'เว็บขายของแฟชั่นมินิมอล มีหมวดหมู่สินค้า',
                          'แลนดิงเพจส่งเสริมแอปพลิเคชันมือถือทางการเงิน',
                          'บล็อกบทความเทคโนโลยีสุดคลีน'
                        ].map((idea) => (
                          <button
                            key={idea}
                            onClick={() => setAssistantPrompt(idea)}
                            className="text-[11px] text-slate-400 bg-slate-950 border border-slate-800 hover:border-purple-500 hover:text-white px-2.5 py-1.5 rounded-lg text-left transition"
                          >
                            {idea}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleAskAI}
                      disabled={isGenerating || !assistantPrompt.trim()}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition duration-150 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>สถาปนิก AI กำลังประมวลผลโค้ด...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span>วิเคราะห์ & แนะนำเทมเพลต</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: AI analysis Output & Code preview */}
              <div className="lg:col-span-8 space-y-6">
                
                {!aiSuggestions && !isGenerating && (
                  <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center bg-slate-900/10">
                    <div className="w-16 h-16 bg-slate-950/80 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800 text-purple-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">ยินดีต้อนรับสู่ AI Template Space</h3>
                    <p className="text-slate-400 max-w-sm mx-auto text-sm">
                      เริ่มพิมพ์ข้อความบอกเล่าลักษณะหน้าเว็บที่ชอบในฟอร์มด้านซ้าย จากนั้นกดปุ่มประมวลผลเพื่อเริ่มการวิเคราะห์อัจฉริยะได้เลยครับ
                    </p>
                  </div>
                )}

                {isGenerating && (
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-purple-950 flex items-center justify-center animate-bounce">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Gemini กำลังอ่านรายละเอียดไอเดียของคุณ...</h4>
                        <p className="text-xs text-slate-400">ทำการสแกนหาเทมเพลตที่ตรงที่สุด และวาดเลย์เอาต์เฉพาะบุคคล</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-800 rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-slate-800 rounded animate-pulse w-1/2"></div>
                      <div className="h-4 bg-slate-800 rounded animate-pulse w-5/6"></div>
                    </div>
                  </div>
                )}

                {aiSuggestions && (
                  <div className="space-y-6 animate-fadeIn duration-500">
                    
                    {/* Recommendation Card */}
                    <div className="bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-800/40 rounded-2xl p-6 shadow-xl shadow-purple-500/5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded border border-purple-800">
                          AI แนะนำอย่างเป็นทางการ
                        </span>
                        <span className="text-xs text-purple-300 font-semibold">
                          MATCHING INDEX: 98%
                        </span>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                        <div>
                          <p className="text-xs text-slate-400">เทมเพลตฐานที่เหมาะสมที่สุด:</p>
                          <h3 className="text-xl font-bold text-white tracking-tight">
                            {aiSuggestions.recommendedId}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleSuggestTemplateClick(aiSuggestions.recommendedId)}
                          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded-xl text-xs transition flex items-center gap-1.5 self-start"
                        >
                          <span>เปิดดูรายละเอียดของเทมเพลตนี้</span>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-xs font-bold text-slate-300 mb-1">💡 เหตุผลความเหมาะสม</h4>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {aiSuggestions.reason}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-300 mb-1">🛠️ คำแนะนำเพิ่มเติมในการปรับแต่ง</h4>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {aiSuggestions.advice}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Generated Live Code Sandbox Panel */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                      <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
                          โค้ด Hero Section แนะนำสำหรับคุณ (Tailwind HTML)
                        </span>
                        <div className="flex space-x-1.5">
                          <button 
                            onClick={() => copyToClipboard(aiSuggestions.customCode)}
                            className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1" />
                            </svg>
                            คัดลอกโค้ดไปใช้
                          </button>
                        </div>
                      </div>

                      {/* Split view tabs: Rendered vs Raw Code */}
                      <div className="p-4 bg-slate-950/40 border-b border-slate-850">
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">พรีวิวดีไซน์จริงที่เจนขึ้นมา</span>
                      </div>

                      {/* Sandbox Frame Sandbox rendered output */}
                      <div className="p-6 bg-slate-950 overflow-hidden flex items-center justify-center">
                        <div 
                          className="w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-850"
                          dangerouslySetInnerHTML={{ __html: aiSuggestions.customCode }}
                        />
                      </div>

                      {/* Raw code accordion/inspector */}
                      <details className="border-t border-slate-800 bg-slate-950/20 group">
                        <summary className="p-4 text-xs font-bold text-slate-400 hover:text-white cursor-pointer transition flex items-center justify-between select-none">
                          <span>คลิกเพื่อดู Source Code สด (HTML & Tailwind Classes)</span>
                          <svg className="w-4 h-4 transition group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-4 pb-4">
                          <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre-wrap max-h-[300px]">
                            {aiSuggestions.customCode}
                          </pre>
                        </div>
                      </details>

                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* --- ABOUT PAGE --- */}
        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 space-y-8 text-center md:text-left">
              <div className="w-16 h-16 bg-cyan-950 border border-cyan-800 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">เกี่ยวกับ Axon Space</h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
                  โปรเจกต์นี้เริ่มต้นจากความตั้งใจที่จะรวบรวมเทมเพลตเว็บไซต์คุณภาพสูงที่สร้างขึ้นโดยชุมชนกลุ่มนักพัฒนา <span className="text-cyan-400 font-semibold">Ex2-Axon</span> เราทำการสแกน ซอร์สและจัดระเบียบไฟล์ผ่าน GitHub Actions และนำเสนอมุมมองให้พรีวิว สรรหาและคัดลอกคำสั่งนำไปใช้งานต่อได้ทันทีเพียงปุ่มเดียว
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-850">
                  <h3 className="font-bold text-white mb-2 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    วิสัยทัศน์
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    เพิ่มประสิทธิภาพการเรียนรู้และการพัฒนาเว็บอย่างเป็นขั้นตอน ให้นักเรียน นักศึกษา และนักพัฒนาหน้าใหม่ได้เรียนรู้เลย์เอาต์โมเดิร์นที่ใช้งานได้จริงในชีวิตจริง
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-850">
                  <h3 className="font-bold text-white mb-2 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    ต่อยอดด้วย AI
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    เราผนวกความสามารถของ LLM ปูโครงสร้างเว็บไซต์ให้ตอบโจทย์ และช่วยแต่งส่วนประกอบสำคัญ (Hero Section) ให้ตรงใจตามความชอบเฉพาะบุคคล
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <span className="text-slate-500 text-xs">© 2026 Axon Space • Ex2-Axon Group.</span>
                  <span className="hidden md:inline text-slate-800">|</span>
                  <a 
                    href="https://microtronic-thailand.github.io/privacy-policy/?lang=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-500 text-xs hover:text-cyan-400 transition-colors underline underline-offset-4 decoration-slate-800"
                  >
                    Privacy Policy
                  </a>
                </div>
                <button 
                  onClick={() => setCurrentPage('gallery')}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-xs transition"
                >
                  เริ่มสำรวจคลังเทมเพลตเลย
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- Floating Toast system --- */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-cyan-500 text-slate-100 font-semibold py-3 px-5 rounded-2xl shadow-2xl flex items-center space-x-2 text-sm animate-bounce">
          <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}