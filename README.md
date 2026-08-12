# 🎮 Game Quest - AI Video Game Recommender

An interactive AI-powered chatbot that recommends video games based on your preferences. Built with vanilla HTML, CSS, and JavaScript, powered by live LLM technology via Hugging Face Inference API.

## ✨ Features

- 🤖 **AI-Powered Recommendations**: Uses state-of-the-art LLM models to understand your gaming preferences
- 🎮 **Platform Detection**: Automatically identifies and displays if games are available on Mobile, PC, Console, or Multi-platform
- 💬 **Friendly Chatbot**: Conversational interface ready to help you find your next gaming adventure
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 🚀 **Fast & Lightweight**: No build process needed, pure vanilla JavaScript
- 🌐 **Public & Deployable**: Easy to deploy to GitHub Pages, Vercel, Netlify, or any static host
- ✅ **Live LLM Integration**: Uses free Hugging Face Inference API with fallback models

## 🚀 Quick Start

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mahatbalaji/video-game-recommender-2.git
   cd video-game-recommender-2
   ```

2. **Start a local server**:
   
   **Using Python 3**:
   ```bash
   python3 -m http.server 8000
   ```
   
   **Using Node.js (npm)**:
   ```bash
   npx http-server -p 8000 -o
   ```
   
   **Using Node.js (with npm script)**:
   ```bash
   npm install -g http-server
   npm start
   ```

3. **Open in browser**:
   - Navigate to `http://localhost:8000`
   - Start asking about games!

## 📖 How to Use

1. **Tell the chatbot what you want**:
   - Example: "I want a fun action game for my phone"
   - Example: "What's the best strategy game for PC?"
   - Example: "I'm in the mood for an RPG adventure"

2. **Get AI-powered recommendations**:
   - The bot will suggest 2-3 games matching your preferences
   - Each recommendation includes platform info (Mobile, PC, Console, Multi-platform)
   - Get genre, description, and why it's perfect for you

3. **Refine your search**:
   - Ask follow-up questions
   - Get more specific recommendations
   - Ask about different platforms or genres

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **LLM Service**: Custom Vibe Proxy Endpoint (OpenAI-compatible)
- **Model**: class-chat-model via Vibe Proxy
- **Styling**: Modern gradient design with smooth animations
- **Architecture**: No dependencies, no build step needed

## 📡 API Integration

The app uses a custom LLM endpoint for game recommendations. For detailed information about the API integration, including:
- How the fetch function works
- Request/response format
- Error handling
- Testing examples

See [API_INTEGRATION.md](API_INTEGRATION.md)

### Quick API Details

```javascript
// Endpoint Configuration (in script.js)
const LLM_API_URL = 'https://vibe-proxy-gqv4.onrender.com/v1/chat/completions';
const LLM_API_KEY = 'sk-vibe-summer-2026';
const LLM_MODEL = 'class-chat-model';
```

The app sends messages in OpenAI-compatible format and parses responses from `data.choices[0].message.content`.

## 📦 Files Structure

```
video-game-recommender-2/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with animations
├── script.js           # Core logic with LLM integration
├── package.json        # Project metadata
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🌐 Deploy to Public Hosting

### Deploy to GitHub Pages (Free)

1. **Enable GitHub Pages** in your repository settings
2. **Set source to `main` branch**
3. **Update repository URL** in package.json
4. **Access your app**: `https://yourusername.github.io/video-game-recommender-2/`

### Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify (Free)

```bash
# Drag and drop the folder to Netlify.com
# OR use CLI:
npm install -g netlify-cli
netlify deploy
```

### Deploy to Any Web Server

Simply copy all files (index.html, styles.css, script.js) to any web server's public directory.

## 🔧 Configuration

### Customize LLM Models

Edit `script.js` to change the LLM provider:

```javascript
// Change these URLs to use different models
const LLM_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1';
const BACKUP_API_URL = 'https://api-inference.huggingface.co/models/google/flan-t5-large';
```

Available free Hugging Face models:
- `mistralai/Mistral-7B-Instruct-v0.1` (Recommended)
- `google/flan-t5-large`
- `meta-llama/Llama-2-7b-chat-hf`
- `tiiuae/falcon-7b-instruct`

### Customize Styling

Edit `styles.css` to change colors, fonts, or layout:

```css
:root {
    --primary-color: #6c5ce7;      /* Main purple */
    --secondary-color: #a29bfe;    /* Light purple */
    --accent-color: #ff7675;       /* Red accent */
    /* ... more colors ... */
}
```

## 📱 Responsive Design

The app is fully responsive and works great on:
- 💻 Desktop browsers (Chrome, Firefox, Safari, Edge)
- 📱 Mobile phones (iOS, Android)
- 📲 Tablets (iPad, Android tablets)

## 🔐 Privacy & Security

- **No data collection**: Your conversations are not stored
- **No tracking**: No analytics or user tracking
- **API calls**: Direct to Hugging Face API (see their privacy policy)
- **Open source**: Code is transparent and auditable

## 🐛 Troubleshooting

### LLM API not responding

The free Hugging Face API may have rate limits. Try:
1. Wait a moment and try again
2. The app will automatically try the backup model
3. Consider using a paid API key for production

### Platform badges not showing

The LLM response format is crucial. Ensure the model outputs platform info like:
- `[Mobile]`, `[PC]`, `[Console]`, `[Multi-platform]`

### Styling not loading

Ensure `styles.css` is in the same directory as `index.html` and the path is correct.

## 📈 Future Enhancements

- [ ] Integration with multiple LLM providers
- [ ] User preferences persistence (localStorage)
- [ ] Game database integration (IGDB API)
- [ ] User ratings and feedback
- [ ] Share recommendations feature
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Streaming responses from LLM

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎮 Ready to Play?

Start discovering your next favorite game now! Just ask Game Quest what you want to play.

**Live Demo**: [Deploy this app to see it in action!](https://github.com/mahatbalaji/video-game-recommender-2)

---

Built with ❤️ for gamers who want AI-powered recommendations
