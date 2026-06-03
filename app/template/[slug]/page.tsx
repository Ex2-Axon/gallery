import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { templates } from "../../../data/data";
import { PRICE, PRIVACY_POLICY_URL } from "../../../data/config";

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.name }));
}

export default function TemplatePage({ params }: { params: { slug: string } }) {
  const template = templates.find((item) => item.name === params.slug);

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Template Detail</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                {template?.name}
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                กลับไปยัง gallery
              </Link>
              <a
                href={template?.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                เปิดตัวอย่าง
              </a>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-900">ราคา</h2>
                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{PRICE.toLocaleString()} บาท</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  เทมเพลตทั้งหมดราคาคงที่ {PRICE.toLocaleString()} บาท / ชุด
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-900">รายละเอียด</h2>
                <p className="mt-3 text-slate-600">
                  ดูตัวอย่างเทมเพลตนี้ได้จากปุ่มด้านบน หรือคัดลอกลิงก์ไปวางในเบราว์เซอร์ของคุณ.
                </p>
                <p className="mt-4 text-sm uppercase tracking-[0.22em] text-slate-500">Demo URL</p>
                <a
                  href={template?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sky-600 hover:text-sky-500"
                >
                  {template?.url}
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white">
              <h2 className="text-xl font-semibold text-white">รูปตัวอย่าง</h2>
              {template?.image ? (
                <div className="mt-4 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
                  <Image
                    src={template.image}
                    alt={template.name}
                    width={1200}
                    height={700}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="mt-4 flex h-[280px] items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900/95 text-center text-slate-400">
                  ไม่มีรูปตัวอย่าง
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-slate-200 bg-slate-50 py-6 text-center text-sm text-slate-600">
        <p>© {new Date().getFullYear()} microtronic co.,ltd.</p>
        <p>
          <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer" className="text-slate-700 underline hover:text-slate-900">
            Privacy Policy
          </a>
        </p>
      </footer>
    </div>
  );
}
