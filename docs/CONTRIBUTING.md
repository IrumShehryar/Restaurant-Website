# 🧭 Contributing Guide — Revontulet Flamehouse

Welcome, team! 👋  
Follow these steps to set up your environment, make changes safely, and collaborate through GitHub.

---

## ⚙️ 1. Setting up your local copy

### Step 1 — Clone the project

Open your terminal or PowerShell and run:

git clone https://github.com/IrumShehryar/Restaurant-Website.git
cd Restaurant-Website

Step 2 — Create & activate virtual environment

Windows (PowerShell / CMD):

python -m venv .venv
.\.venv\Scripts\activate
macOS / Linux:

python3 -m venv .venv
source .venv/bin/activate

Step 3 — Install all dependencies

python -m pip install --upgrade pip
pip install -r requirements.txt

Step 4 — Run the app

python backend/app.py
Open http://127.0.0.1:5000 to see the site.

🌿 2. Daily Git Workflow
Always start your day by syncing with the latest code from main.

git switch main
git pull --rebase origin main
Then create your own branch for your feature or task:

git switch -c feature/<short-feature-name>
Example:

git switch -c feature/menu-section

💻 3. Making changes

Edit or create files in your branch.
When done, check what changed:

git status
Stage all updates:
git add -A

Commit with a clear message:
git commit -m "feat: added new menu section"

Push your branch to GitHub:

git push -u origin feature/menu-section

🔁 4. Opening a Pull Request (PR)
Go to the repo on GitHub.

You’ll see a “Compare & pull request” button — click it.

Add a title and description (what you changed).

Assign a reviewer (e.g. Irum,Kanwal).

Wait for review and approval.

Once merged, update your main branch:

git switch main
git pull --rebase origin main

Delete your old branch (optional but clean):

git branch -d feature/menu-section
git push origin --delete feature/menu-section

🧱 5. Installing new packages

If you install a new library:

pip install <package-name>
python -m pip freeze > requirements.txt
git add requirements.txt
git commit -m "chore: update dependencies"
git push

🚫 6. Don’t commit these

The following should never be pushed:

.venv/
**pycache**/
.env
.env.\*
.DS_Store
Thumbs.db
.idea/
.vscode/
They are already ignored via .gitignore.

💬 7. Commit message guide

Type Meaning Example
feat new feature feat: add contact form
fix bug fix fix: correct logo size on header
docs documentation docs: update README setup steps
chore maintenance chore: update requirements

🧩 8. Help & Tips

Run git status often — it’s your friend.

Always activate your venv before installing anything.

If you get a conflict during pull:

bash
Copy code
git pull --rebase

# edit conflicting files

git add -A
git rebase --continue
If your Flask app doesn’t start, check:

backend/app.py path is correct.

Port 5000 isn’t already in use.

❤️ Team Spirit
Be kind and helpful in reviews.

Keep commits small and clear.

Document your code and leave short comments.

Ask questions early — no one is expected to know everything!

Happy coding! 🌟
Team Revontulet Flamehouse
