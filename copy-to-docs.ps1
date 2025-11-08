# copy-to-docs.ps1
# This script copies files from frontend/templates and frontend/static to docs/ for GitHub Pages
# Run this before pushing to GitHub whenever you update the website

Write-Host "Syncing frontend/templates and frontend/static to docs/ folder..." -ForegroundColor Cyan

# Create docs folder if it doesn't exist
if (!(Test-Path "docs")) {
    New-Item -ItemType Directory -Path "docs" -Force | Out-Null
    Write-Host "[OK] Created docs folder"
}

# Copy HTML files from templates to docs
Write-Host "Copying HTML files..." -ForegroundColor Yellow
Copy-Item -Path "frontend/templates/*.html" -Destination "docs/" -Force
Write-Host "[OK] HTML files copied"

# Copy CSS from static to docs/css
Write-Host "Copying CSS..." -ForegroundColor Yellow
if (!(Test-Path "docs/css")) {
    New-Item -ItemType Directory -Path "docs/css" -Force | Out-Null
}
Copy-Item -Path "frontend/static/css/*" -Destination "docs/css/" -Recurse -Force
Write-Host "[OK] CSS copied"

# Copy assets from static to docs/assets
Write-Host "Copying assets..." -ForegroundColor Yellow
if (!(Test-Path "docs/assets")) {
    New-Item -ItemType Directory -Path "docs/assets" -Force | Out-Null
}
Copy-Item -Path "frontend/static/assets/*" -Destination "docs/assets/" -Recurse -Force
Write-Host "[OK] Assets copied"

# Copy videos from static to docs/videos
Write-Host "Copying videos..." -ForegroundColor Yellow
if (!(Test-Path "docs/videos")) {
    New-Item -ItemType Directory -Path "docs/videos" -Force | Out-Null
}
Copy-Item -Path "frontend/static/videos/*" -Destination "docs/videos/" -Recurse -Force
Write-Host "[OK] Videos copied"

# Fix CSS paths for GitHub Pages (docs folder context)
Write-Host "Fixing CSS paths for GitHub Pages..." -ForegroundColor Yellow
$cssFile = "docs/css/style.css"
if (Test-Path $cssFile) {
    $content = Get-Content $cssFile -Raw
    
    # Replace /static/assets/ paths with ./assets/ for GitHub Pages
    $content = $content -replace 'url\("/static/assets/', 'url("./assets/'
    
    Set-Content $cssFile $content -Force
    Write-Host "[OK] CSS paths fixed"
} else {
    Write-Host "[WARNING] CSS file not found at $cssFile"
}

Write-Host ""
Write-Host "SYNC COMPLETE! Ready to push to GitHub." -ForegroundColor Green
Write-Host "Next: git add . && git commit -m 'Update docs' && git push origin main"
