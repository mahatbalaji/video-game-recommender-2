# 🚀 Quick Start Guide for Game Quest

## Get Started in 3 Steps

### Step 1: Clone or Download

```bash
git clone https://github.com/mahatbalaji/video-game-recommender-2.git
cd video-game-recommender-2
```

### Step 2: Start Local Server

Choose ONE option below:

**Option A: Python (easiest)**
```bash
python3 -m http.server 8000
# Then open: http://localhost:8000
```

**Option B: Node.js**
```bash
npm install -g http-server
http-server -p 8000 -o
```

**Option C: Using Python directly**
```bash
cd video-game-recommender-2
python -m http.server 8000
```

### Step 3: Start Gaming!

Open your browser and ask the chatbot about games! 🎮

---

## Deploy Publicly (Choose One)

### 🌟 GitHub Pages (Free & Easy)

1. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to GitHub repository Settings → Pages
3. Select `main` branch as source
4. Your app is now live at: `https://yourusername.github.io/video-game-recommender-2/`

### 🚀 Vercel (Free & Fast)

1. Visit: https://vercel.com/new
2. Import this GitHub repository
3. Click Deploy
4. Done! Get a live URL in seconds

### 📦 Netlify (Free & Easy)

1. Visit: https://netlify.com
2. Drag and drop this folder
3. OR connect your GitHub repo
4. Your app goes live automatically!

### 💻 Your Own Server

Copy these files to any web server:
- `index.html`
- `styles.css`
- `script.js`

---

## Example Conversations

Try asking the bot:

```
"I want a fun action game for my phone"
"What's the best RPG I can play on my PC?"
"Recommend a multiplayer game for console"
"I like strategy games, what should I play?"
"Find me an indie game that's popular right now"
"Best puzzle game for a relaxing evening"
```

---

## What You Need

✅ **Internet connection** (for LLM API)
✅ **Modern web browser** (Chrome, Firefox, Safari, Edge)
✅ **That's it!** No installation required

---

## Troubleshooting

**Q: API not responding?**
A: The free LLM API has rate limits. Wait a moment and try again. The app has automatic fallback models.

**Q: Port 8000 already in use?**
A: Use a different port:
```bash
python3 -m http.server 8080  # Use port 8080
```

**Q: Styling looks broken?**
A: Make sure `styles.css` is in the same folder as `index.html`

**Q: Getting CORS errors?**
A: This should work fine with Hugging Face API. If issues persist, try deploying to a live server.

---

## Next Steps

- Customize the styling in `styles.css`
- Change LLM models in `script.js`
- Deploy to production (GitHub Pages, Vercel, or Netlify)
- Share with your friends! 🎮

---

## Need Help?

- Check the main [README.md](README.md) for detailed docs
- Review [script.js](script.js) for configuration options
- Open an issue on GitHub

---

**Happy Gaming! 🎮🚀**
