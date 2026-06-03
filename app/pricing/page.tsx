import Link from "next/link";
import { PRIVACY_POLICY_URL, DISCORD_URL, COMPANY_URL, COMPANY_NAME, PAYMENT_URL } from "../../data/config";

export default function PricingPage() {
  const tiers = [
    {
      name: "แพคฟรี",
      price: "0",
      description: "เหมาะสำหรับผู้เริ่มต้นและนักพัฒนา",
      features: [
        "ดาวน์โหลดผ่าน GitHub ได้เลย",
        "เข้าถึงโค้ดต้นฉบับทั้งหมด",
        "ไม่มีบริการซัพพอร์ต",
        "ใช้ในโปรเจกต์ส่วนตัวหรือพาณิชย์ได้"
      ],
      buttonText: "ไปที่ GitHub",
      buttonHref: "https://github.com/ex2-axon",
      featured: false
    },
    {
      name: "แพคเริ่มต้น",
      price: "2,500",
      description: "เหมาะสำหรับธุรกิจขนาดเล็กที่ต้องการความมั่นใจ",
      features: [
        "ดาวน์โหลดเทมเพลตคุณภาพสูง",
        "ซัพพอร์ตผ่าน Email",
        "ซัพพอร์ตผ่าน Discord",
        "อัปเดตฟีเจอร์ใหม่ในอนาคต"
      ],
      buttonText: "สั่งซื้อตอนนี้",
      buttonHref: PAYMENT_URL,
      featured: true
    },
    {
      name: "แพคพร้อมใช้",
      price: "5,000",
      description: "โซลูชันครบวงจร พร้อมออนไลน์ทันที",
      features: [
        "ติดตั้งพร้อมใช้งาน",
        "รวมโฮสติ้งและโดเมน",
        "ซัพพอร์ตผ่าน Email",
        "ซัพพอร์ตผ่าน Discord",
        "ปรึกษาการปรับแต่งเบื้องต้น"
      ],
      buttonText: "สั่งซื้อตอนนี้",
      buttonHref: PAYMENT_URL,
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            กลับสู่หน้าหลัก
          </Link>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            ข้อตกลงและแพ็กเกจราคา
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            เลือกแพ็กเกจที่เหมาะกับความต้องการของคุณ ตั้งแต่เริ่มต้นฟรีไปจนถึงบริการดูแลครบวงจร
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-[2.5rem] border p-8 shadow-sm transition-all hover:shadow-md ${
                tier.featured
                  ? "border-slate-900 bg-white ring-1 ring-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Recommended
                </div>
              )}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">{tier.name}</h2>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">{tier.price}</span>
                  <span className="text-lg font-medium text-slate-500">บาท</span>
                </div>
                <p className="mt-4 text-sm text-slate-600">{tier.description}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-slate-600">
                    <svg className="h-5 w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={tier.buttonHref}
                target={tier.buttonHref.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={`flex w-full items-center justify-center rounded-2xl py-4 text-base font-bold transition active:scale-[0.98] ${
                  tier.featured
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {tier.buttonText}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[2.5rem] bg-slate-900 p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">ต้องการสอบถามข้อมูลเพิ่มเติม?</h2>
          <p className="mt-4 text-slate-400">
            หากคุณมีคำถามเกี่ยวกับแพ็กเกจหรือต้องการการปรับแต่งพิเศษ สามารถติดต่อเราได้ทันที
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
            >
              ติดต่อผ่าน Discord
            </a>
            <a
              href={`mailto:support@microtronic.biz`}
              className="rounded-full border border-slate-700 px-8 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              ส่งอีเมลหาเรา
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10 text-center text-sm text-slate-600">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-4">
          <p className="flex items-center gap-2 font-medium text-slate-600">
            <span>🌐</span>
            <span className="uppercase tracking-wider">Official Website</span>
            <span>⭐</span>
            <a href={COMPANY_URL} target="_blank" rel="noreferrer" className="text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900">
              {COMPANY_URL}
            </a>
          </p>
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} {COMPANY_NAME}</p>
            <div className="mt-2 flex justify-center gap-4">
              <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
