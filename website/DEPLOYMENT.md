# Deployment Instructions for jack-luo.com

## Local Testing (REQUIRED - Don't double-click HTML!)

You MUST use a web server for local testing:

```bash
cd /home/user/jack/website
npm run preview
```

Then visit: `http://localhost:4321`

## Upload to jack-luo.com via FileZilla

### Step 1: Build
```bash
cd /home/user/jack/website
npm run build
```

### Step 2: Upload via FileZilla

1. Open FileZilla
2. Connect to your FTP server
3. Navigate to `public_html/` on the server
4. Navigate to `/home/user/jack/website/dist/` locally
5. Select ALL files/folders inside `dist/`:
   - index.html
   - writing.html
   - journey.html
   - resume.html
   - assets/ (folder)
   - _astro/ (folder)
   - blogs/ (folder)
   - special/ (folder)
   - etc.
6. Drag them to `public_html/` on the server
7. Let it upload (may take a few minutes)

### Final Structure on Server:

```
public_html/
├── index.html
├── writing.html
├── journey.html
├── resume.html
├── assets/
│   ├── lib/
│   ├── styles/
│   ├── images/
│   ├── icons/
│   └── ...
├── _astro/
├── blogs/
├── special/
└── ...
```

### Test URLs:

- Homepage: https://jack-luo.com/
- Writing: https://jack-luo.com/writing.html OR https://jack-luo.com/writing/
- Journey: https://jack-luo.com/journey.html
- Blog post: https://jack-luo.com/writing/1-001.html

## Troubleshooting

**Q: CSS/JS not loading locally?**
A: You're double-clicking the HTML file. Use `npm run preview` instead.

**Q: CSS/JS not loading on jack-luo.com?**
A: Check that the `assets/` folder uploaded correctly to `public_html/assets/`

**Q: 404 errors on jack-luo.com?**  
A: Make sure ALL files from `dist/` are in `public_html/` (not in a subdirectory)
