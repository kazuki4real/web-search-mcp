// Fun MCP Server - A playful server with multiple entertaining tools
import {
  McpServer,
  ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Create a fun MCP server
const server = new McpServer({
  name: 'fun-server',
  version: '1.0.0',
});

// Emoji Tools
server.registerTool(
  'emoji_convert',
  {
    title: 'Emoji Converter',
    description: 'Convert text to emoji representation',
    inputSchema: { text: z.string() },
  },
  async ({ text }) => {
    const emojiMap: Record<string, string> = {
      happy: '😄',
      sad: '😢',
      love: '❤️',
      fire: '🔥',
      star: '⭐',
      cat: '🐱',
      dog: '🐶',
      pizza: '🍕',
      coffee: '☕',
      rocket: '🚀',
    };
    const converted = text
      .toLowerCase()
      .split(' ')
      .map((word) => emojiMap[word] || word)
      .join(' ');
    return { content: [{ type: 'text', text: converted }] };
  }
);

server.registerTool(
  'random_emoji',
  {
    title: 'Random Emoji',
    description: 'Generate random emojis',
    inputSchema: { count: z.number().min(1).max(10).default(3) },
  },
  async ({ count = 3 }) => {
    const emojis = [
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂',
      '🙂',
      '🙃',
      '😉',
      '😊',
      '😇',
      '🥰',
      '😍',
      '🤩',
      '😘',
      '😗',
      '☺️',
      '😚',
      '😙',
      '🥲',
      '😋',
      '😛',
      '😜',
      '🤪',
      '😝',
      '🤑',
      '🤗',
      '🤭',
      '🤫',
      '🤔',
      '🤐',
      '🤨',
      '😐',
      '😑',
      '😶',
      '😏',
      '😒',
      '🙄',
      '😬',
      '🤥',
      '😌',
      '😔',
      '😪',
      '🤤',
      '😴',
      '😷',
      '🤒',
      '🤕',
      '🤢',
      '🤮',
      '🤧',
      '🥵',
      '🥶',
      '🥴',
      '😵',
      '🤯',
      '🤠',
      '🥳',
      '🥸',
      '😎',
      '🤓',
      '🧐',
    ];
    const selected = Array.from(
      { length: count },
      () => emojis[Math.floor(Math.random() * emojis.length)]
    );
    return { content: [{ type: 'text', text: selected.join(' ') }] };
  }
);

// Dice and Random Tools
server.registerTool(
  'roll_dice',
  {
    title: 'Dice Roller',
    description: 'Roll dice (format: 2d6 for 2 six-sided dice)',
    inputSchema: { dice: z.string().regex(/^\d+d\d+$/) },
  },
  async ({ dice }) => {
    const [count, sides] = dice.split('d').map(Number);
    const rolls = Array.from(
      { length: count },
      () => Math.floor(Math.random() * sides) + 1
    );
    const sum = rolls.reduce((a, b) => a + b, 0);
    return {
      content: [
        {
          type: 'text',
          text: `🎲 Rolled ${dice}: [${rolls.join(', ')}] = ${sum}`,
        },
      ],
    };
  }
);

server.registerTool(
  'random_number',
  {
    title: 'Random Number',
    description: 'Generate random number between min and max',
    inputSchema: { min: z.number(), max: z.number() },
  },
  async ({ min, max }) => {
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    return { content: [{ type: 'text', text: `🔢 Random: ${result}` }] };
  }
);

// Text Transformation Tools
server.registerTool(
  'text_transform',
  {
    title: 'Text Transformer',
    description: 'Transform text (reverse, uppercase, lowercase, leetspeak)',
    inputSchema: {
      text: z.string(),
      transform: z.enum(['reverse', 'upper', 'lower', 'leet', 'alternating']),
    },
  },
  async ({ text, transform }) => {
    let result: string;
    switch (transform) {
      case 'reverse':
        result = text.split('').reverse().join('');
        break;
      case 'upper':
        result = text.toUpperCase();
        break;
      case 'lower':
        result = text.toLowerCase();
        break;
      case 'leet':
        result = text.replace(
          /[aeiouAEIOU]/g,
          (m) =>
            ({
              a: '4',
              e: '3',
              i: '1',
              o: '0',
              u: 'u',
              A: '4',
              E: '3',
              I: '1',
              O: '0',
              U: 'U',
            }[m] || m)
        );
        break;
      case 'alternating':
        result = text
          .split('')
          .map((c, i) => (i % 2 ? c.toLowerCase() : c.toUpperCase()))
          .join('');
        break;
      default:
        result = text;
    }
    return { content: [{ type: 'text', text: `✨ ${transform}: ${result}` }] };
  }
);

// Fun Generators
server.registerTool(
  'generate_joke',
  {
    title: 'Joke Generator',
    description: 'Generate a random programming joke',
    inputSchema: {},
  },
  async () => {
    const jokes = [
      'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
      "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
      "Why don't programmers like nature? It has too many bugs! 🌿🐛",
      "What's a programmer's favorite hangout place? Foo Bar! 🍺",
      "Why did the programmer quit his job? He didn't get arrays! 📊",
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    return { content: [{ type: 'text', text: `😄 ${joke}` }] };
  }
);

server.registerTool(
  'magic_8ball',
  {
    title: 'Magic 8-Ball',
    description: 'Ask the magic 8-ball a yes/no question',
    inputSchema: { question: z.string() },
  },
  async ({ question }) => {
    const answers = [
      'Yes definitely!',
      'It is certain',
      'Most likely',
      'Outlook good',
      'Signs point to yes',
      'Reply hazy, try again',
      'Ask again later',
      'Better not tell you now',
      'Cannot predict now',
      'Concentrate and ask again',
      "Don't count on it",
      'My reply is no',
      'My sources say no',
      'Outlook not so good',
      'Very doubtful',
    ];
    const answer = answers[Math.floor(Math.random() * answers.length)];
    return {
      content: [
        {
          type: 'text',
          text: `🎱 Question: ${question}\n🔮 Answer: ${answer}`,
        },
      ],
    };
  }
);

// Dynamic Resources
server.registerResource(
  'greeting',
  new ResourceTemplate('greeting://{name}', { list: undefined }),
  {
    title: 'Personalized Greeting',
    description: 'Generate personalized greetings with fun elements',
  },
  async (uri: { href: string | URL }) => {
    const url = new URL(uri.href);
    const name = url.pathname.slice(1);
    const greetings = [
      `🌟 Hello there, ${name}! Ready to code today?`,
      `🚀 Greetings, ${name}! Let's build something amazing!`,
      `✨ Hey ${name}! Hope you're having a fantastic day!`,
      `🎉 Welcome back, ${name}! What adventure awaits us?`,
    ];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    return {
      contents: [
        {
          uri: String(uri.href),
          text: greeting,
        },
      ],
    };
  }
);

server.registerResource(
  'quote',
  new ResourceTemplate('quote://{category}', { list: undefined }),
  {
    title: 'Inspirational Quotes',
    description: 'Get motivational quotes by category',
  },
  async (uri: { href: string | URL }) => {
    const url = new URL(uri.href);
    const category = url.pathname.slice(1);
    const quotes: Record<string, string[]> = {
      programming: [
        'First, solve the problem. Then, write the code. - John Johnson',
        "Code is like humor. When you have to explain it, it's bad. - Cory House",
        'The best error message is the one that never shows up. - Thomas Fuchs',
      ],
      motivation: [
        'The only way to do great work is to love what you do. - Steve Jobs',
        'Innovation distinguishes between a leader and a follower. - Steve Jobs',
        'Stay hungry, stay foolish. - Steve Jobs',
      ],
    };
    const categoryQuotes = quotes[category] || quotes.programming;
    const quote =
      categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
    return {
      contents: [
        {
          uri: String(uri.href),
          text: `💭 ${quote}`,
        },
      ],
    };
  }
);

// Prompts - Pre-written templates for specific tasks
server.registerPrompt(
  'code_review',
  {
    title: 'Code Review Assistant',
    description: 'Help review code for best practices, bugs, and improvements',
    argsSchema: {
      code: z.string().describe('The code to review'),
      language: z.string().optional().describe('Programming language'),
    },
  },
  async ({ code, language = 'javascript' }) => {
    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Please review this ${language} code for:
- Potential bugs or errors
- Code style and best practices
- Performance improvements
- Security issues

Code to review:
\`\`\`${language}
${code}
\`\`\`

Provide specific suggestions with explanations.`,
          },
        },
      ],
    };
  }
);

server.registerPrompt(
  'debug_helper',
  {
    title: 'Debug Helper',
    description: 'Help debug code issues with systematic approach',
    argsSchema: {
      error_message: z.string().describe('The error message or description'),
      code_context: z.string().optional().describe('Relevant code context'),
    },
  },
  async ({ error_message, code_context = '' }) => {
    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `I'm encountering this error: "${error_message}"

${code_context ? `Code context:\n\`\`\`\n${code_context}\n\`\`\`` : ''}

Please help me debug this by:
1. Explaining what the error likely means
2. Suggesting potential causes
3. Providing step-by-step debugging approach
4. Offering specific solutions`,
          },
        },
      ],
    };
  }
);

server.registerPrompt(
  'project_planner',
  {
    title: 'Project Planning Assistant',
    description: 'Help plan and structure development projects',
    argsSchema: {
      project_description: z.string().describe('Description of the project'),
      technology_stack: z
        .string()
        .optional()
        .describe('Preferred technologies'),
    },
  },
  async ({ project_description, technology_stack = '' }) => {
    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `I want to build: ${project_description}

${technology_stack ? `Preferred tech stack: ${technology_stack}` : ''}

Please help me plan this project by providing:
1. Project structure and architecture recommendations
2. Technology stack suggestions (if not specified)
3. Development phases and milestones
4. Potential challenges and solutions
5. Best practices for this type of project`,
          },
        },
      ],
    };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
