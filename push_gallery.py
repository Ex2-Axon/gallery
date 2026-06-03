import os
import subprocess
import sys
from pathlib import Path

# กำหนดพาธของโฟลเดอร์ gallery (โฟลเดอร์เดียวกับสคริปต์นี้)
GALLERY_DIR = Path(__file__).parent.absolute()

def load_env_vars():
    """
    โหลดค่าตัวแปรจากไฟล์ .env ที่อยู่ที่ root ของโปรเจกต์ (Axon/)
    """
    env_vars = {}
    # หาไฟล์ .env โดยถอยออกจากโฟลเดอร์ gallery ไป 1 ชั้น
    env_path = GALLERY_DIR.parent / ".env"
    
    if not env_path.exists():
        print(f"❌ ไม่พบไฟล์ .env ที่: {env_path}")
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
    """
    try:
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            shell=True,
            cwd=str(GALLERY_DIR) # บังคับรันใน gallery/
        )
        if result.returncode != 0:
            # ไม่แสดง error ถ้าเป็นกรณี nothing to commit
            if "nothing to commit" not in result.stderr.lower():
                print(f"⚠️ Git Error: {result.stderr.strip()}")
        return result.returncode == 0, result.stdout.strip() or result.stderr.strip()
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False, str(e)

def push_to_github():
    """
    สคริปต์หลักสำหรับ Push งานขึ้น GitHub โดยจำกัดขอบเขตเฉพาะโฟลเดอร์ gallery/
    """
    print(f"🚀 เริ่มกระบวนการ Push (ขอบเขต: {GALLERY_DIR})")
    
    # 1. โหลดค่าจาก .env
    env = load_env_vars()
    if not env:
        return

    token = env.get("GITHUB_TOKEN")
    owner = env.get("GITHUB_OWNER")
    repo = env.get("GITHUB_REPO")
    branch = env.get("GITHUB_BRANCH", "main")
    author_name = env.get("GIT_AUTHOR_NAME", "Axon Bot")
    author_email = env.get("GIT_AUTHOR_EMAIL", "bot@axon.dev")

    if not all([token, owner, repo]):
        print("❌ ข้อมูลใน .env ไม่ครบถ้วน (ต้องการ: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO)")
        return

    # 2. ตรวจสอบและเริ่มต้น Git Repository ในโฟลเดอร์ gallery/
    git_folder = GALLERY_DIR / ".git"
    if not git_folder.exists():
        print("📁 ไม่พบ Git ใน gallery/ กำลังเริ่มต้นระบบ Git (git init)...")
        run_git_command("git init")
        run_git_command(f"git checkout -b {branch}")

    # 3. ตั้งค่า User Identity (ชั่วคราวสำหรับการ commit)
    run_git_command(f'git config user.name "{author_name}"')
    run_git_command(f'git config user.email "{author_email}"')

    # 4. เตรียม Remote URL ที่ใส่ Token ไว้สำหรับการ Login อัตโนมัติ
    remote_url = f"https://{token}@github.com/{owner}/{repo}.git"

    # 5. ดำเนินการ Git Steps
    print("📦 1/3 กำลัง Stage ไฟล์เฉพาะใน gallery/ (git add .)...")
    run_git_command("git add .")

    print("📝 2/3 กำลังสร้าง Commit (git commit)...")
    commit_msg = f"Automation Update Gallery: {os.popen('date /t').read().strip()} {os.popen('time /t').read().strip()}"
    success, msg = run_git_command(f'git commit -m "{commit_msg}"')
    
    if not success and "nothing to commit" in msg.lower():
        print("ℹ️ ไม่มีอะไรเปลี่ยนแปลงในโฟลเดอร์ gallery ข้ามการ Push")
        return

    print(f"📤 3/3 กำลัง Push ขึ้น Branch: {branch}...")
    # ใช้ -f (force) หรือการระบุ remote url ตรงๆ เพื่อความแน่นอน
    # ตรวจสอบว่ามี remote origin หรือยัง ถ้าไม่มีให้เพิ่ม หรือใช้ URL ตรงๆ ในคำสั่ง push
    success, msg = run_git_command(f"git push {remote_url} {branch} --force")

    if success:
        print("✅ Push ข้อมูลในโฟลเดอร์ gallery ขึ้น GitHub เรียบร้อยแล้ว!")
    else:
        print(f"❌ Push ล้มเหลว: {msg}")

if __name__ == "__main__":
    push_to_github()
