// 🧪 API Integration Examples & Testing Code
// Copy and paste these examples into your browser console for testing

// ========================================
// Example 1: Basic API Call (No async/await)
// ========================================
// This shows the simplest way to call the API

fetch('https://vibe-proxy-gqv4.onrender.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-vibe-summer-2026'
    },
    body: JSON.stringify({
        model: 'class-chat-model',
        messages: [
            {
                role: 'user',
                content: 'Recommend a fun action game for PC'
            }
        ]
    })
})
.then(response => response.json())
.then(data => {
    console.log('Response:', data);
    console.log('Game Recommendation:', data.choices[0].message.content);
})
.catch(error => console.error('Error:', error));


// ========================================
// Example 2: With System Prompt (Async/Await)
// ========================================
// This is closer to how the app actually works

async function testAPIWithSystemPrompt() {
    const systemPrompt = `You are a game recommendation expert. 
    When recommending games, always mention the platform: [Mobile], [PC], [Console], or [Multi-platform].
    Be enthusiastic and friendly!`;

    const userMessage = "I want a strategy game";

    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
    ];

    try {
        const response = await fetch(
            'https://vibe-proxy-gqv4.onrender.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer sk-vibe-summer-2026'
                },
                body: JSON.stringify({
                    model: 'class-chat-model',
                    messages: messages
                })
            }
        );

        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Extract the content
        const content = data.choices[0].message.content;
        console.log('Game Recommendation:', content);
        
        return content;

    } catch (error) {
        console.error('API Error:', error);
    }
}

// Run it:
// testAPIWithSystemPrompt();


// ========================================
// Example 3: Error Handling Deep Dive
// ========================================
// Understanding different error scenarios

async function testAPIWithErrorHandling() {
    try {
        console.log('🚀 Starting API call...');
        
        const response = await fetch(
            'https://vibe-proxy-gqv4.onrender.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer sk-vibe-summer-2026'
                },
                body: JSON.stringify({
                    model: 'class-chat-model',
                    messages: [
                        { role: 'user', content: 'Recommend an RPG game' }
                    ]
                })
            }
        );

        console.log('📊 Response status:', response.status);
        console.log('📊 Status OK?', response.ok);

        // Check for HTTP errors (404, 500, 401, etc.)
        if (!response.ok) {
            console.error('❌ HTTP Error:', response.status);
            const errorText = await response.text();
            console.error('❌ Error details:', errorText);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Parse the JSON
        const data = await response.json();
        console.log('✅ Parsed JSON:', data);

        // Check if response has expected structure
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('❌ Unexpected response structure');
        }

        const content = data.choices[0].message.content;
        console.log('🎮 Final response:', content);
        
        return content;

    } catch (error) {
        console.error('💥 Error caught:', error.message);
        console.error('💥 Full error:', error);
        
        // Different error handling based on error type
        if (error.name === 'TypeError') {
            console.error('⚠️  Network error - check your internet connection');
        } else if (error.message.includes('401')) {
            console.error('⚠️  Authentication failed - check your API key');
        } else if (error.message.includes('503')) {
            console.error('⚠️  Server is down - try again later');
        } else {
            console.error('⚠️  Unknown error:', error);
        }
    }
}

// Run it:
// testAPIWithErrorHandling();


// ========================================
// Example 4: Response Structure Inspector
// ========================================
// Understand what the API actually returns

async function inspectAPIResponse() {
    const response = await fetch(
        'https://vibe-proxy-gqv4.onrender.com/v1/chat/completions',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-vibe-summer-2026'
            },
            body: JSON.stringify({
                model: 'class-chat-model',
                messages: [
                    { role: 'user', content: 'Hello!' }
                ]
            })
        }
    );

    const data = await response.json();

    console.log('=== FULL RESPONSE ===');
    console.log(JSON.stringify(data, null, 2));

    console.log('\n=== RESPONSE STRUCTURE ===');
    console.log('Top-level keys:', Object.keys(data));
    console.log('data.choices length:', data.choices?.length);
    console.log('First choice keys:', Object.keys(data.choices[0] || {}));
    console.log('Message keys:', Object.keys(data.choices[0]?.message || {}));

    console.log('\n=== EXTRACTED CONTENT ===');
    console.log('Response:', data.choices[0].message.content);
}

// Run it:
// inspectAPIResponse();


// ========================================
// Example 5: Conversation History
// ========================================
// Sending multiple messages to maintain context

async function testConversation() {
    const messages = [
        {
            role: 'system',
            content: 'You are a helpful game recommendation AI.'
        },
        {
            role: 'user',
            content: 'What is your favorite game genre?'
        },
        {
            role: 'assistant',
            content: 'I enjoy all genres, but I especially like RPGs!'
        },
        {
            role: 'user',
            content: 'Can you recommend an RPG?'
        }
    ];

    const response = await fetch(
        'https://vibe-proxy-gqv4.onrender.com/v1/chat/completions',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-vibe-summer-2026'
            },
            body: JSON.stringify({
                model: 'class-chat-model',
                messages: messages
            })
        }
    );

    const data = await response.json();
    console.log('AI Response:', data.choices[0].message.content);
}

// Run it:
// testConversation();


// ========================================
// Example 6: Simulating Game Quest App
// ========================================
// This mimics what happens in the actual app

class GameQuestSimulator {
    constructor() {
        this.apiUrl = 'https://vibe-proxy-gqv4.onrender.com/v1/chat/completions';
        this.apiKey = 'sk-vibe-summer-2026';
        this.model = 'class-chat-model';
        this.conversationHistory = [];
    }

    async chat(userMessage) {
        // Add user message to history
        this.conversationHistory.push({
            role: 'user',
            content: userMessage
        });

        // System prompt
        const systemPrompt = `You are Game Quest, a friendly AI gaming companion.
        Recommend games with platform info: [Mobile], [PC], [Console], [Multi-platform]`;

        // Prepare messages with system prompt
        const messages = [
            { role: 'system', content: systemPrompt },
            ...this.conversationHistory
        ];

        try {
            console.log('🎮 Sending:', userMessage);
            
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: messages
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;

            // Add AI response to history
            this.conversationHistory.push({
                role: 'assistant',
                content: aiResponse
            });

            console.log('🤖 Response:', aiResponse);
            return aiResponse;

        } catch (error) {
            console.error('❌ Error:', error);
            throw error;
        }
    }

    printHistory() {
        console.log('\n=== CONVERSATION HISTORY ===');
        this.conversationHistory.forEach((msg, idx) => {
            const emoji = msg.role === 'user' ? '👤' : '🤖';
            console.log(`${idx + 1}. ${emoji} ${msg.role}: ${msg.content.substring(0, 50)}...`);
        });
    }
}

// Test it:
// const simulator = new GameQuestSimulator();
// await simulator.chat('What game should I play?');
// await simulator.chat('Something for mobile?');
// simulator.printHistory();


// ========================================
// Example 7: Request/Response Timing
// ========================================
// Measure API response time

async function measureAPIPerformance() {
    console.time('API Call');

    const response = await fetch(
        'https://vibe-proxy-gqv4.onrender.com/v1/chat/completions',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-vibe-summer-2026'
            },
            body: JSON.stringify({
                model: 'class-chat-model',
                messages: [
                    { role: 'user', content: 'Quick recommendation please' }
                ]
            })
        }
    );

    const data = await response.json();
    console.timeEnd('API Call');

    console.log('⏱️ Response time displayed above');
    console.log('Response length:', data.choices[0].message.content.length, 'characters');
}

// Run it:
// measureAPIPerformance();


// ========================================
// Tips for Learning
// ========================================

/*
1. OPEN DEVELOPER CONSOLE
   Right-click → Inspect → Console tab

2. COPY ONE EXAMPLE
   Copy and paste any example above into the console

3. WATCH NETWORK REQUESTS
   Go to Network tab, run an example, see the actual request/response

4. MODIFY PARAMETERS
   Try changing the user message, adding system prompts, etc.

5. CHECK RESPONSE STRUCTURE
   Use Example 4 to understand what data comes back

6. HANDLE ERRORS
   Use Example 3 to learn error handling

7. BUILD FEATURES
   Use Example 6 to create chat functionality

KEYBOARD SHORTCUTS:
- F12: Open DevTools
- Ctrl+Shift+J: Open Console directly
- Ctrl+L: Clear console
- ↑/↓: Scroll through previous commands
*/
