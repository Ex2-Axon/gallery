import os
import subprocess
import sys
from pathlib import Path

# กำหนดพาธของโฟลเดอร์ gallery (โฟลเดอร์เดียวกับสคริปต์นี้)
GALLERY_DIR = Path(__file__).parent.absolute()

def load_env_vars():
    """
    โหลดค่าตัวแปรจากไฟล์ .env ที่อยู่ในโฟลเดอร์ gallery/ เอง
    """
    env_vars = {}
    # หาไฟล์ .env ในโฟลเดอร์ปัจจุบัน
    env_path = GALLERY_DIR / ".env"
    
    if not env_path.exists():
        print(f"❌ ไม่พบไฟล์ .env ในโฟลเดอร์ gallery: {env_path}")
        return None

    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            # ข้ามบรรทัดว่างและ comment
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key, val = line.split("=", 1)
                env_vars[key.strip()] = val.strip().strip('"').strip("'")
    
    return env_vars

def run_git_command(command):
    """
    ฟังก์ชันสำหรับรันคำสั่ง git โดยบังคับให้รันภายในโฟลเดอร์ gallery/ เท่านั้น
    พร้อมแสดง Output ออกมาที่หน้าจอ (Real-time)
    """
    try:
        # ใช้ stdout=None เพื่อให้แสดงผลออกหน้าจอ Terminal ตรงๆ
        result = subprocess.run(
            command,
            shell=True,
            cwd=str(GALLERY_DIR)
        )
        return result.returncode == 0, ""
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False, str(e)

def ensure_gh_installed():
    """
    ตรวจสอบว่ามีการติดตั้ง GitHub CLI (gh) หรือยัง
    หากยังไม่มี จะพยายามติดตั้งให้โดยอัตโนมัติ
    """
    print("🔍 ตรวจสอบ GitHub CLI (gh)...")
    # ลองรัน gh --version
    process = subprocess.run("gh --version", shell=True, capture_output=True, text=True)
    
    if process.returncode == 0:
        print(f"✅ GitHub CLI ติดตั้งอยู่แล้ว: {process.stdout.splitlines()[0]}")
        return True
    else:
        print("❌ ไม่พบ GitHub CLI (gh) กำลังพยายามติดตั้ง...")
        if sys.platform == 'win32':
            # ใช้ winget สำหรับ Windows
            print("📦 กำลังติดตั้ง gh ผ่าน winget...")
            install_proc = subprocess.run("winget install --id GitHub.cli --silent", shell=True)
            if install_proc.returncode == 0:
                print("✅ ติดตั้ง gh สำเร็จ! กรุณารันสคริปต์ใหม่อีกครั้งเพื่อให้ Path อัปเดต")
                return True
        
        print("⚠️ ไม่สามารถติดตั้งอัตโนมัติได้ กรุณาติดตั้งจาก https://cli.github.com/")
        return False

def push_to_github():
    """
    สคริปต์หลักสำหรับ Push งานขึ้น GitHub โดยจำกัดขอบเขตเฉพาะโฟลเดอร์ gallery/
    """
    # 0. ตรวจสอบความพร้อมของระบบ
    if not ensure_gh_installed():
        return

    print(f"\n" + "="*50)
    print(f"🚀 [GITHUB PUSH] เริ่มต้นที่: {GALLERY_DIR}")
    print("="*50)
    
    # ตรวจสอบ dependencies ของโปรเจกต์ (pnpm)
    if (GALLERY_DIR / "package.json").exists():
        print("📦 ตรวจสอบ node_modules ด้วย pnpm...")
        subprocess.run("pnpm install", shell=True, cwd=str(GALLERY_DIR))
    env = load_env_vars()
    if not env: return

    token = env.get("GITHUB_TOKEN")
    owner = env.get("GITHUB_OWNER")
    repo = env.get("GITHUB_REPO")
    branch = env.get("GITHUB_BRANCH", "main")

    # 2. ตรวจสอบ Git
    if not (GALLERY_DIR / ".git").exists():
        print("📁 Initializing Git in gallery/...")
        run_git_command("git init")
        run_git_command(f"git checkout -b {branch}")

    # 3. ยืนยันตัวตนผ่าน Token (วิธีที่ปลอดภัยที่สุดสำหรับ Automation)
    remote_url = f"https://{token}@github.com/{owner}/{repo}.git"

    # 4. Git Process (แสดงผล Real-time)
    print(f"\n📦 Step 1: Adding files...")
    run_git_command("git add .")

    print(f"\n📝 Step 2: Creating commit...")
    commit_msg = f"Automation Update Gallery: {os.popen('date /t').read().strip()} {os.popen('time /t').read().strip()}"
    run_git_command(f'git commit -m "{commit_msg}"')

    print(f"\n📤 Step 3: Pushing to https://github.com/{owner}/{repo}...")
    # รันคำสั่ง push และให้แสดงผลความคืบหน้า
    success, _ = run_git_command(f"git push {remote_url} {branch} --force")

    if success:
        print("\n" + "="*50)
        print(f"✅ สำเร็จ! ตรวจสอบผลลัพธ์ได้ที่: https://github.com/{owner}/{repo}")
        print("="*50)
    else:
        print("\n❌ การ Push ล้มเหลว! กรุณาตรวจสอบ Token หรือชื่อ Repo ใน .env")

if __name__ == "__main__":
    push_to_github()
