import json
import os
import subprocess
import sys
from pathlib import Path

def convert_json_to_ts():
    """
    สคริปต์สำหรับแปลงไฟล์ templates.json เป็น data.ts
    และทำการ Push ข้อมูลขึ้น GitHub อัตโนมัติ
    """
    # กำหนดพาธของไฟล์ (อ้างอิงจากตำแหน่งของสคริปต์นี้)
    current_dir = Path(__file__).parent
    json_file = current_dir / "templates.json"
    ts_file = current_dir / "data.ts"

    print(f"กำลังเริ่มการแปลงไฟล์...")

    # 1. ตรวจสอบว่ามีไฟล์ templates.json หรือไม่
    if not json_file.exists():
        print(f"❌ ไม่พบไฟล์: {json_file}")
        return

    try:
        # 2. อ่านข้อมูลจาก JSON
        with open(json_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        # 3. เตรียมเนื้อหาสำหรับไฟล์ TypeScript
        json_string = json.dumps(data, ensure_ascii=False, indent=2)
        ts_content = f"export const templates = {json_string};\n"

        # 4. บันทึกลงไฟล์ data.ts
        with open(ts_file, "w", encoding="utf-8") as f:
            f.write(ts_content)
        
        print(f"✅ แปลงไฟล์สำเร็จ! (จาก: {json_file.name} -> {ts_file.name})")

        # 🏁 ขั้นตอนเพิ่มเติม: สั่งรัน push_gallery.py ต่อทันทีแบบ Async
        print(f"🚀 ส่งงานต่อให้ขั้นตอนการ Push ข้อมูล (Async)...")
        push_script = current_dir.parent / "push_gallery.py"
        
        if push_script.exists():
            # ใช้ Popen เพื่อรันสคริปต์ลูกแยกออกมา และให้สคริปต์นี้ปิดตัวเองได้เลย
            subprocess.Popen([sys.executable, str(push_script)], creationflags=subprocess.CREATE_NEW_CONSOLE if sys.platform == 'win32' else 0)
            print(f"✅ ส่งงานต่อสำเร็จ! ปิดโปรแกรม json_to_ts.py...")
        else:
            print(f"⚠️ ไม่พบสคริปต์ Push ที่: {push_script}")

    except Exception as e:
        print(f"❌ เกิดข้อผิดพลาด: {e}")

if __name__ == "__main__":
    convert_json_to_ts()
