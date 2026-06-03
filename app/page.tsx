import Image from "next/image";
import Link from "next/link";
import { templates } from "../data/data";
import { PRICE, PRIVACY_POLICY_URL } from "../data/config";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-sm shadow-slate-200/50 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Axon Template Gallery</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                ดูตัวอย่างเทมเพลตทั้งหมดในรูปแบบ Gallery
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                คลิกเพื่อเปิดหน้ารายละเอียดแต่ละเทมเพลต และดูลิงก์ตัวอย่าง พร้อมราคาคงที่
                {PRICE.toLocaleString()} บาท ต่อเทมเพลต.
              </p>
            </div>
            <div className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
              ราคาทุกเทมเพลต: {PRICE.toLocaleString()} บาท
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <Link
              key={template.name}
              href={`/template/${template.name}`}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48 bg-slate-100">
                {template.image ? (
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    ไม่มีรูปตัวอย่าง
                  </div>
                )}
              </div>
              <div className="space-y-3 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Template</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">{template.name}</h2>
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  ดูรายละเอียดเพิ่มเติมและตัวอย่างได้เมื่อคลิกเข้าไปดูหน้า template.
                </p>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                  <span>ราคา</span>
                  <span>{PRICE.toLocaleString()} บาท</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-600">
        <p>© {new Date().getFullYear()} microtronic co.,ltd.</p>
        <p>
          <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer" className="text-slate-800 underline hover:text-slate-900">
            Privacy Policy
          </a>
        </p>
      </footer>
    </div>
  );
}
