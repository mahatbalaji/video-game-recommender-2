# 🔗 Custom LLM API Integration Guide

## Current Configuration

Your Game Quest app is now configured to use a **custom LLM endpoint** via Vibe Proxy:

```javascript
// Configuration (in script.js - lines 5-7)
const LLM_API_URL = 'https://vibe-proxy-gqv4.onrender.com/v1/chat/completions';
const LLM_API_KEY = 'sk-vibe-summer-2026';
const LLM_MODEL = 'class-chat-model';
```

## 📡 How the API Integration Works

### Step-by-Step Flow

```
User Types Message
        ↓
handleUserInput() called
        ↓
getLLMResponse() prepares the request
        ↓
callCustomLLMAPI() makes the fetch call
        ↓
API endpoint returns JSON response
        ↓
formatGameResponse() displays it in chat
```

### The Fetch Function Explained (lines 96-140)

```javascript
const response = await fetch(LLM_API_URL, {
    method: 'POST',                          // Sending data to server
    headers: {
        'Content-Type': 'application/json',  // Tells server: "I'm sending JSON"
        'Authorization': `Bearer ${LLM_API_KEY}`  // Authentication
    },
    body: JSON.stringify(requestBody)        // Convert JavaScript object to JSON
});
```

**What each part does:**

| Part | Purpose |
|------|---------|
| `method: 'POST'` | We're sending data (not just retrieving) |
| `Content-Type` header | Tells the server we're sending JSON format |
| `Authorization` header | Authenticates with your API key |
| `body` | The actual data being sent (messages, model name) |

### Request Body Structure

```javascript
{
    "model": "class-chat-model",
    "messages": [
        {
            "role": "system",
            "content": "You are Game Quest, a friendly AI gaming companion..."
        },
        {
            "role": "user",
            "content": "I want an action game for my phone"
        }
    ]
}
```

This follows the **OpenAI-compatible format**:
- `model`: Which AI model to use
- `messages`: Array of conversation turns
- `role`: Who's speaking ("system", "user", or "assistant")
- `content`: What they're saying

### Response Format

The API returns JSON structured like this:

```javascript
{
    "choices": [
        {
            "message": {
                "content": "🎮 Here are some awesome action games for mobile..."
            }
        }
    ]
}
```

**Extracting the response (line 119):**
```javascript
const aiResponse = data.choices[0]?.message?.content;
```

This safely accesses:
- `data.choices[0]` - First completion option
- `.message` - The message object
- `.content` - The actual text response

The `?.` operator is the **optional chaining operator** - it safely accesses properties that might not exist.

## 🧪 Testing the Integration

### In Browser Console

```javascript
// Check if API is configured correctly
console.log('API URL:', LLM_API_URL);
console.log('Model:', LLM_MODEL);

// Make a test request
const testMessage = "What's a good RPG game?";
getLLMResponse(testMessage).then(response => {
    console.log('Response:', response);
});
```

### Check Network Requests

1. Open Developer Tools (F12 or right-click → Inspect)
2. Go to **Network** tab
3. Send a message in Game Quest
4. Look for a POST request to your API endpoint
5. Click it to see:
   - Request headers (including Authorization)
   - Request body (the messages)
   - Response (the game recommendations)

## 🔐 Security Notes

⚠️ **Important**: Your API key is visible in the client-side code:
```javascript
const LLM_API_KEY = 'sk-vibe-summer-2026';
```

### For Production:
1. **Use environment variables** (not hardcoded)
2. **Create a backend proxy** to hide the real API key
3. **Use rate limiting** to prevent abuse
4. **Add CORS handling** if needed

### Environment Variable Approach:
```javascript
// Instead of hardcoding, use environment variables
const LLM_API_KEY = process.env.REACT_APP_LLM_API_KEY;
```

Then create a `.env` file:
```
REACT_APP_LLM_API_KEY=sk-vibe-summer-2026
```

## 🚀 Customizing the Integration

### Change the Endpoint

Edit lines 5-7 in `script.js`:
```javascript
const LLM_API_URL = 'https://your-new-endpoint.com/v1/chat/completions';
const LLM_API_KEY = 'your-new-api-key';
const LLM_MODEL = 'your-model-name';
```

### Modify Request Parameters

Add more options to the `requestBody` object (line 110):
```javascript
const requestBody = {
    model: LLM_MODEL,
    messages: messages,
    temperature: 0.7,      // Higher = more creative (0-1)
    max_tokens: 500,       // Limit response length
    top_p: 0.95           // Nucleus sampling parameter
};
```

### Handle Different Response Formats

If your API returns a different structure, update line 119:
```javascript
// Example: If your API uses different path
const aiResponse = data.result.text;  // Adjust path as needed
```

## 📊 API Response Handling

### Success Case
```
User sends message
     ↓
fetch() succeeds
     ↓
response.ok = true
     ↓
Extract aiResponse
     ↓
Display in chat ✅
```

### Error Cases
```
Network Error
     ↓
fetch() throws error
     ↓
Catch block handles it (line 138)
     ↓
Display error message ✅

API Returns Error Status (401, 500, etc.)
     ↓
response.ok = false
     ↓
Throw error (line 145)
     ↓
Catch block handles it
     ↓
Display error message ✅
```

## 🐛 Debugging Tips

### Enable Detailed Logging

Add this to the top of `callCustomLLMAPI()`:
```javascript
console.log('📤 Sending request to:', LLM_API_URL);
console.log('📦 Request body:', requestBody);
```

Add this after parsing response:
```javascript
console.log('📥 API Response:', data);
console.log('🎮 Extracted response:', aiResponse);
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "401 Unauthorized" | Check API key in Authorization header |
| "CORS error" | API endpoint needs CORS headers enabled |
| Empty response | Check `data.choices[0].message.content` path |
| 503 Service Unavailable | API server is down, try again later |
| "No response content" | API returned null/undefined content |

### Check Console Messages

When you load the app, you'll see:
```
🎮 Game Quest loaded! LLM: Custom Vibe Proxy Endpoint
📡 API Endpoint: https://vibe-proxy-gqv4.onrender.com/v1/chat/completions
✅ Ready to recommend games!
```

If you see errors, check the browser console for detailed error messages.

## 📚 API Documentation Reference

Your custom endpoint appears to follow the **OpenAI API format**. Common parameters:

```javascript
{
    "model": "class-chat-model",     // Model identifier
    "messages": [...],               // Conversation messages
    "temperature": 0.7,              // Creativity level (0-2)
    "max_tokens": 500,               // Max response length
    "top_p": 0.95,                   // Diversity parameter
    "presence_penalty": 0,           // Penalty for new tokens
    "frequency_penalty": 0           // Penalty for repeated tokens
}
```

## 🎯 Next Steps

1. ✅ Test the integration by sending a message
2. ✅ Check the Network tab to verify requests
3. ✅ Deploy your app and test in production
4. ✅ Add error monitoring and logging
5. ✅ Consider implementing rate limiting

---

## Quick Reference: Key Functions

| Function | Purpose | Location |
|----------|---------|----------|
| `handleUserInput()` | Processes user input | Line 21 |
| `getLLMResponse()` | Prepares request & calls API | Line 59 |
| `callCustomLLMAPI()` | Makes the fetch call | Line 98 |
| `formatGameResponse()` | Formats response for display | Line 185 |
| `addMessageToChat()` | Displays message in UI | Line 223 |

---

**Happy coding! 🚀** If you need to adjust the API integration, just edit the configuration at the top of `script.js`.
