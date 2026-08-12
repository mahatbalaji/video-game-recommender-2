// Game Quest - AI Video Game Recommender
// Using Custom LLM Endpoint via Vibe Proxy

// 🔑 API Configuration - Update these if needed
const LLM_API_URL = 'https://vibe-proxy-gqv4.onrender.com/v1/chat/completions';
const LLM_API_KEY = 'sk-vibe-summer-2026';
const LLM_MODEL = 'class-chat-model';

// Get DOM elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const chatForm = document.getElementById('chatForm');
const sendBtn = document.getElementById('sendBtn');
const loading = document.getElementById('loading');

// Store conversation history
let conversationHistory = [];

// Initialize event listeners
chatForm.addEventListener('submit', handleUserInput);

/**
 * Handle user input and send to LLM
 */
async function handleUserInput(e) {
    e.preventDefault();
    
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Disable input while processing
    userInput.disabled = true;
    sendBtn.disabled = true;
    loading.style.display = 'flex';

    // Add user message to chat
    addMessageToChat(userMessage, 'user');
    userInput.value = '';

    try {
        // Get LLM response
        const response = await getLLMResponse(userMessage);
        
        // Add bot response to chat
        addMessageToChat(response, 'bot');
    } catch (error) {
        console.error('Error:', error);
        addMessageToChat(
            '😅 Oops! I encountered an issue. Please make sure you have internet access and try again. Error: ' + error.message,
            'bot'
        );
    } finally {
        // Re-enable input
        userInput.disabled = false;
        sendBtn.disabled = false;
        loading.style.display = 'none';
        userInput.focus();
    }
}

/**
 * Call the LLM API to get game recommendations
 * This function prepares the request with proper formatting and calls our custom endpoint
 */
async function getLLMResponse(userMessage) {
    // Build the system prompt for game recommendations
    const systemPrompt = `You are Game Quest, a friendly and enthusiastic AI gaming companion. Your job is to recommend video games based on what users ask for.

IMPORTANT RULES:
1. When recommending games, ALWAYS include platform information
2. Use these platform tags: [Mobile], [PC], [Console], [Multi-platform]
3. Format recommendations like this:
   🎮 Game Name
   Description of the game
   Platform: [Mobile] [PC] or [Console] or appropriate platforms
   Genre: Action/Strategy/RPG/etc.

4. Be friendly, enthusiastic, and use gaming emojis
5. Give 2-3 game recommendations per request
6. Consider what the user wants (genre, platform, mood, etc.)
7. Add helpful tips or why the game is good for them

Always be encouraging and ready to help them start gaming!`;

    try {
        // Call our custom LLM endpoint
        const response = await callCustomLLMAPI(userMessage, systemPrompt);
        return formatGameResponse(response);
    } catch (error) {
        console.error('Error calling LLM API:', error);
        throw new Error('Could not get game recommendation. Please check your internet connection and try again!');
    }
}

/**
 * Call the Custom LLM API via Vibe Proxy
 * 
 * HOW THIS WORKS:
 * 1. We create a "messages" array following OpenAI-compatible format
 * 2. First message is the system prompt (tells the AI how to behave)
 * 3. Second message is the user's actual question
 * 4. We send these to the endpoint with proper authentication
 * 5. The endpoint returns a JSON response with the AI's answer
 * 6. We extract the content from: response.data.choices[0].message.content
 * 
 * @param {string} userMessage - The user's question/input
 * @param {string} systemPrompt - Instructions for how the AI should behave
 * @returns {string} The AI's response text
 */
async function callCustomLLMAPI(userMessage, systemPrompt) {
    // Prepare the messages in OpenAI-compatible format
    // The system message tells the AI its role and how to respond
    const messages = [
        {
            role: 'system',
            content: systemPrompt
        },
        {
            role: 'user',
            content: userMessage
        }
    ];

    // Build the request body following the API specification
    const requestBody = {
        model: LLM_MODEL,           // The model to use: 'class-chat-model'
        messages: messages          // Array of conversation messages
    };

    try {
        // Make the API call with proper authentication
        // 📝 FETCH EXPLAINED:
        // - fetch() returns a Promise that resolves when the request completes
        // - First arg: the API endpoint URL
        // - Second arg: options object with method, headers, and body
        const response = await fetch(LLM_API_URL, {
            method: 'POST',                          // We're sending data (POST, not GET)
            headers: {
                'Content-Type': 'application/json',  // Tell server we're sending JSON
                'Authorization': `Bearer ${LLM_API_KEY}`  // Authentication token
            },
            body: JSON.stringify(requestBody)        // Convert our object to JSON string
        });

        // Check if the response status is OK (200-299)
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        // Parse the JSON response
        // 📝 RESPONSE FORMAT:
        // The API returns something like:
        // {
        //   "choices": [
        //     {
        //       "message": {
        //         "content": "Here are some game recommendations..."
        //       }
        //     }
        //   ]
        // }
        const data = await response.json();

        // Extract the AI's response from the nested structure
        // This is the path: data.choices[0].message.content
        // - data.choices: array of possible completions
        // - [0]: we take the first completion
        // - .message: the message object
        // - .content: the actual text response
        const aiResponse = data.choices[0]?.message?.content;

        if (!aiResponse) {
            throw new Error('No response content received from API');
        }

        return aiResponse;

    } catch (error) {
        console.error('LLM API Call Failed:', error);
        throw error;
    }
}

/**
 * Format the LLM response with game recommendations
 * This function cleans up the raw AI response and prepares it for display
 */
function formatGameResponse(response) {
    // The response comes directly from the LLM, so we don't need to extract it
    let botResponse = response.trim();
    
    // If response is empty or too short, provide a friendly default
    if (!botResponse || botResponse.length < 20) {
        return `🎮 Let me think about the perfect game for you! Tell me more about what you're looking for - are you interested in a specific genre like Action, RPG, Strategy, or Puzzle? And do you want something for mobile, PC, console, or any platform?`;
    }
    
    return botResponse;
}

/**
 * Add message to chat display
 */
function addMessageToChat(message, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    
    const avatar = role === 'user' ? '👤' : '🤖';
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Parse and format the message
    const formattedContent = parseMessage(message, role);
    contentDiv.innerHTML = formattedContent;
    
    messageDiv.appendChild(document.createElement('div'));
    messageDiv.querySelector('div').className = 'message-avatar';
    messageDiv.querySelector('div').textContent = avatar;
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Store in history
    conversationHistory.push({ role, message });
}

/**
 * Parse and format message content
 */
function parseMessage(message, role) {
    let html = '';
    
    if (role === 'bot') {
        // Split by game recommendations (look for game name patterns)
        const lines = message.split('\n');
        let currentParagraph = '';
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            
            if (!trimmedLine) {
                if (currentParagraph) {
                    html += `<p>${escapeHtml(currentParagraph)}</p>`;
                    currentParagraph = '';
                }
                continue;
            }
            
            // Check if this line contains platform info
            if (trimmedLine.includes('[') && trimmedLine.includes(']')) {
                // Finish current paragraph
                if (currentParagraph) {
                    html += `<p>${escapeHtml(currentParagraph)}</p>`;
                    currentParagraph = '';
                }
                
                // Parse and add platform info
                html += parsePlatformLine(trimmedLine);
            } else if (trimmedLine.startsWith('🎮') || trimmedLine.match(/^[0-9]+\./)) {
                // This looks like a game title
                if (currentParagraph) {
                    html += `<p>${escapeHtml(currentParagraph)}</p>`;
                    currentParagraph = '';
                }
                html += `<p><strong>${escapeHtml(trimmedLine)}</strong></p>`;
            } else {
                // Regular text
                currentParagraph += (currentParagraph ? ' ' : '') + trimmedLine;
            }
        }
        
        if (currentParagraph) {
            html += `<p>${escapeHtml(currentParagraph)}</p>`;
        }
    } else {
        // User message - just escape and wrap in paragraph
        html = `<p>${escapeHtml(message)}</p>`;
    }
    
    return html || `<p>${escapeHtml(message)}</p>`;
}

/**
 * Parse platform information from text
 */
function parsePlatformLine(line) {
    let html = '';
    const escapeHtmlLine = escapeHtml(line);
    
    // Extract and format platform badges
    const platformRegex = /\[([^\]]+)\]/g;
    let lastIndex = 0;
    let match;
    
    const platformMap = {
        'Mobile': 'platform-mobile',
        'PC': 'platform-pc',
        'Console': 'platform-console',
        'Multi-platform': 'platform-all',
        'mobile': 'platform-mobile',
        'pc': 'platform-pc',
        'console': 'platform-console',
        'all': 'platform-all'
    };
    
    let processedLine = escapeHtmlLine;
    const platforms = [];
    
    // Extract all platforms
    while ((match = platformRegex.exec(line)) !== null) {
        const platform = match[1];
        platforms.push(`<span class="game-platform ${platformMap[platform] || 'platform-all'}">${escapeHtml(platform)}</span>`);
    }
    
    // Remove platform tags from line and rebuild
    processedLine = escapeHtmlLine.replace(/\[[^\]]+\]/g, '').trim();
    
    if (processedLine || platforms.length > 0) {
        html += `<p>${processedLine}`;
        if (platforms.length > 0) {
            html += `<br>`;
            html += platforms.join(' ');
        }
        html += `</p>`;
    }
    
    return html;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Focus on input when page loads
 */
window.addEventListener('load', () => {
    userInput.focus();
    console.log('🎮 Game Quest loaded! LLM: Custom Vibe Proxy Endpoint');
    console.log('📡 API Endpoint:', LLM_API_URL);
    console.log('✅ Ready to recommend games!');
});

// Allow Enter key to submit (already handled by form, but making it explicit)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        chatForm.dispatchEvent(new Event('submit'));
    }
});
