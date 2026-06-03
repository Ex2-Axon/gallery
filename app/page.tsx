import Image from "next/image";
import Link from "next/link";
import { templates } from "../data/data";
import { PRICE, PRIVACY_POLICY_URL, COMPANY_URL, COMPANY_NAME } from "../data/config";
import TemplateGallery from "./TemplateGallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-sm shadow-slate-200/50 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 font-bold">Axon Template Gallery</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                เลือกเทมเพลตที่ใช่สำหรับธุรกิจของคุณ
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                คลิกเพื่อเปิดหน้ารายละเอียดแต่ละเทมเพลต และดูลิงก์ตัวอย่าง พร้อมแพ็กเกจราคาที่คุ้มค่า
                เลือกแพ็กเกจที่เหมาะกับคุณได้ที่หน้า{" "}
                <Link href="/pricing" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900">
                  ข้อตกลงและราคา
                </Link>
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <a
                href={COMPANY_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 transition hover:text-slate-900"
              >
                <span>🌐</span>
                Official Website
              </a>
              <div className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                เริ่มต้น: {PRICE.toLocaleString()} บาท
              </div>
              <Link href="/pricing" className="text-xs font-medium text-slate-500 hover:text-slate-900">
                ดูแพ็กเกจทั้งหมด →
              </Link>
            </div>
          </div>
        </div>

        <TemplateGallery initialTemplates={templates} />
      </main>

      <footer className="border-t border-slate-200 bg-white py-10 text-center text-sm text-slate-600">
        <div className="flex flex-col items-center gap-4">
          <p className="flex items-center gap-2 font-medium">
            <span>🌐</span>
            <span className="uppercase tracking-wider">Official Website</span>
            <span>⭐</span>
            <a href={COMPANY_URL} target="_blank" rel="noreferrer" className="text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900">
              {COMPANY_URL}
            </a>
          </p>
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} {COMPANY_NAME}</p>
            <p>
              <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
