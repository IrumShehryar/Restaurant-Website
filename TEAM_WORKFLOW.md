# 📋 Team Workflow Guide - Restaurant Website

## Overview

We have TWO separate folders for different purposes:

### **Folder 1: `frontend/templates/` & `frontend/static/css/`**

-   ✅ **This is where you DEVELOP**
-   ✅ Used with Flask backend
-   ✅ Real working application
-   ✅ Connected to database & APIs

### **Folder 2: `frontend/public/`**

-   ✅ **This is for TEACHER DEMO**
-   ✅ Static HTML files only
-   ✅ No Flask backend needed
-   ✅ Works on GitHub Pages

---

## Your Role - Teammate

### **Step 1: Get Latest Code**

```powershell
git pull origin main
```

This downloads:

-   Latest changes from team
-   New `frontend/public/` folder (static demo)
-   All updated `frontend/templates/` and `frontend/static/css/`

---

### **Step 2: Create Your Branch**

```powershell
git checkout -b feature/layout-improvements
```

Replace `layout-improvements` with your feature name. Examples:

-   `feature/hero-redesign`
-   `feature/menu-page-update`
-   `feature/footer-styling`

---

### **Step 3: Make Your Changes**

**EDIT ONLY THESE FOLDERS:**

```
✅ frontend/templates/
   ├── base.html
   ├── index.html
   ├── menu.html
   ├── about.html
   ├── contact.html
   ├── reservation.html
   ├── login.html
   └── cart.html

✅ frontend/static/css/
   └── style.css

✅ frontend/static/js/
   └── (JavaScript if needed)

❌ DO NOT EDIT: frontend/public/
   (Your team lead will update this)
```

---

### **Step 4: Test Your Changes Locally**

Start Flask server:

```powershell
cd backend
python app.py
```

Then open in browser:

```
http://127.0.0.1:5000
```

✅ Verify your layout changes look correct
✅ Test all navigation links
✅ Check responsive design (mobile, tablet, desktop)

---

### **Step 5: Commit Your Work**

```powershell
git add .
git commit -m "Improve [page name] layout - [what you changed]"
```

Examples:

```powershell
git commit -m "Improve home page hero section with better spacing"
git commit -m "Redesign menu page card layout"
git commit -m "Update footer styling and colors"
```

---

### **Step 6: Push Your Branch to GitHub**

```powershell
git push origin feature/layout-improvements
```

Replace `feature/layout-improvements` with your actual branch name.

---

### **Step 7: Create Pull Request (PR)**

1. Go to: `https://github.com/IrumShehryar/Resaurant-Website`
2. You'll see a message: **"Compare & pull request"** button
3. Click it
4. Add description of your changes
5. Click **"Create Pull Request"**
6. Wait for team lead to review and merge ✅

---

## What Team Lead Does (Lead)

After you create a PR:

1. ✅ Pulls your changes to main
2. ✅ Copies updates from `frontend/templates/` to `frontend/public/`
3. ✅ Converts Flask template syntax to static HTML
4. ✅ Pushes to `gh-pages` branch
5. ✅ Teacher sees demo on GitHub Pages automatically! 🎉

---

## File Map

```
frontend/
├── templates/          ← TEAMMATE EDITS HERE
│   ├── base.html
│   ├── index.html
│   ├── menu.html
│   ├── about.html
│   ├── contact.html
│   ├── reservation.html
│   ├── login.html
│   └── cart.html
│
├── static/
│   ├── css/           ← TEAMMATE EDITS HERE
│   │   └── style.css
│   ├── js/            ← JavaScript (if modifying)
│   ├── assets/        ← Images, logos
│   └── videos/        ← Video files
│
└── public/            ← TEAM LEAD UPDATES THIS
    ├── index.html
    ├── menu.html
    ├── about.html
    ├── contact.html
    ├── reservation.html
    ├── login.html
    ├── cart.html
    ├── css/
    ├── assets/
    └── videos/
```

---

## Quick Reference

| Task               | Command                                |
| ------------------ | -------------------------------------- |
| Get latest code    | `git pull origin main`                 |
| Create your branch | `git checkout -b feature/your-feature` |
| Commit changes     | `git add . && git commit -m "message"` |
| Push branch        | `git push origin feature/your-feature` |
| Test locally       | `cd backend && python app.py`          |
| Access local site  | `http://127.0.0.1:5000`                |

---

## Important Rules

✅ **DO:**

-   Work on `frontend/templates/` and `frontend/static/css/`
-   Create your own branch
-   Test locally before pushing
-   Commit with clear messages
-   Push to your branch (not main)

❌ **DO NOT:**

-   Edit `frontend/public/` (team lead handles this)
-   Push directly to `main` (always use feature branches)
-   Push to `gh-pages` (team lead handles this)
-   Modify `backend/` or `app.py` (backend team handles this)

---

## Example Workflow

```powershell
# 1. Get latest
git pull origin main

# 2. Create branch
git checkout -b feature/hero-animation

# 3. Edit files in frontend/templates/ and frontend/static/css/

# 4. Test
cd backend
python app.py
# Visit http://127.0.0.1:5000 and verify changes

# 5. Go back to project root
cd ..

# 6. Commit
git add .
git commit -m "Add animated hero section on home page"

# 7. Push
git push origin feature/hero-animation

# 8. Create PR on GitHub and wait for approval
```

---

## Questions?

Ask your team lead (me) if you have questions about:

-   How to make specific edits
-   Merge conflicts
-   Git commands
-   Design requirements

Happy coding! 🚀
