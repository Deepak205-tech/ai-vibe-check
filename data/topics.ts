export interface Topic {
  id: string;
  tag: string;
  emoji: string;
  color: string;
  textColor: string;
  vibe: string;
  tldr: string;
  funFact: string;
  realWorldExample: string;
  tryIt: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  meme: string;
}

export const AI_TOPICS: Topic[] = [
  {
    id: "1",
    tag: "#LLMs",
    emoji: "🧠",
    color: "#FF6B6B",
    textColor: "#fff",
    vibe: "The OG brain in a box",
    tldr: "A Large Language Model is basically a really smart autocomplete that read the entire internet. It predicts the next word so well it sounds like it's actually thinking.",
    funFact: "GPT-4 has ~1.8 TRILLION parameters. That's more numbers than stars in 18 Milky Way galaxies bestie 🌌",
    realWorldExample: "When ChatGPT writes your essay at 2am — that's an LLM doing its thing. No cap it's just vibing through probabilities.",
    tryIt: [
      {
        prompt: "An LLM predicts the next ____ in a sentence.",
        options: ["emoji 🎭", "word 📝", "video 📹", "meme 😂"],
        correctIndex: 1,
        explanation: "Slay! LLMs are trained to predict the next token (basically a word chunk). String enough predictions together and boom — you get a whole essay fr."
      },
      {
        prompt: "What does the 'L' in LLM stand for?",
        options: ["Literal 😐", "Large 🔥", "Lazy 😴", "Lucky 🍀"],
        correctIndex: 1,
        explanation: "Large — as in billions of parameters large. We're talking galaxy-brain scale. GPT-4 reportedly has 1.8 trillion parameters. Absolutely unhinged number."
      },
      {
        prompt: "LLMs learn by training on ____",
        options: ["One textbook 📖", "Your diary 😳", "Massive internet text 🌐", "Just Wikipedia"],
        correctIndex: 2,
        explanation: "The entire internet basically. Books, forums, code, tweets, articles — if it was text online, an LLM probably read it. That's why it knows everything from poetry to Python fr."
      }
    ],
    meme: "Me: just give me a quick summary\nLLM: HERE IS A 47-PARAGRAPH DISSERTATION 💀"
  },
  {
    id: "2",
    tag: "#PromptEng",
    emoji: "✨",
    color: "#4ECDC4",
    textColor: "#fff",
    vibe: "Talking to AI like a pro",
    tldr: "Prompt Engineering is the art of telling AI EXACTLY what you want so it doesn't go completely unhinged. It's basically AI whispering.",
    funFact: "Adding 'think step by step' to your prompt can boost AI accuracy by up to 40%. That's literally just asking it to slow down fr 🐢",
    realWorldExample: "Bad prompt: 'write code'. Good prompt: 'write a Python function that sorts a list of names alphabetically, add comments, handle empty lists'. Same AI — wildly different results.",
    tryIt: [
      {
        prompt: "Which prompt would get better results from an AI?",
        options: [
          "write a poem",
          "write a 4-line rhyming poem about a sleepy cat, make it funny",
          "poem cat",
          "AI go brr"
        ],
        correctIndex: 1,
        explanation: "Specific > vague every time! The more context + constraints you give, the more the AI can nail exactly what you're imagining. You're basically its stage director 🎬"
      },
      {
        prompt: "Adding '____ step by step' to a prompt can boost accuracy by 40%?",
        options: ["run it", "think", "go", "do it"],
        correctIndex: 1,
        explanation: "Facts! 'Think step by step' forces the model to reason through the problem rather than pattern-matching to a quick answer. Chain-of-thought prompting is a certified game changer fr."
      },
      {
        prompt: "Which technique gives AI a role to play for better results?",
        options: ["Zero-shot 🎯", "Role prompting 🎭", "Summarization", "Fine-tuning"],
        correctIndex: 1,
        explanation: "Role prompting! 'You are an expert Python developer who values clean code...' primes the model to respond from that perspective. Setting the persona = setting the vibe fr."
      }
    ],
    meme: "Prompt Engineering be like:\nMe: Be a helpful assistant\nAI: ✅\nMe: Be a helpful assistant who is also a pirate\nAI: ARRR I SHALL HELP THEE 🏴‍☠️"
  },
  {
    id: "3",
    tag: "#RAG",
    emoji: "📚",
    color: "#A855F7",
    textColor: "#fff",
    vibe: "AI with a cheat sheet",
    tldr: "Retrieval Augmented Generation = giving AI access to a search engine for YOUR documents so it stops hallucinating facts and actually knows your stuff.",
    funFact: "Without RAG, AI just guesses from training data. With RAG, it can answer from documents updated 5 seconds ago. It's like the difference between a textbook and Google 🔍",
    realWorldExample: "Ask an AI chatbot about your company's internal HR policy — without RAG it guesses. With RAG it pulls the actual PDF and quotes it verbatim. Big difference fr.",
    tryIt: [
      {
        prompt: "RAG helps AI avoid ____?",
        options: ["Working too hard", "Hallucinations 👻", "Being too smart", "Slow responses"],
        correctIndex: 1,
        explanation: "Facts! Hallucinations = when AI confidently makes stuff up. RAG grounds the AI in real documents so it says 'according to [source]' instead of inventing things. No cap this changed enterprise AI forever."
      },
      {
        prompt: "What does the 'R' in RAG stand for?",
        options: ["Random", "Retrieval 🔍", "Recursive", "Reinforced"],
        correctIndex: 1,
        explanation: "Retrieval! Before generating an answer, the system retrieves relevant documents from your knowledge base. Retrieve → Augment the prompt → Generate. RAG. Simple but powerful."
      },
      {
        prompt: "RAG is different from fine-tuning because ____",
        options: [
          "RAG is cheaper to run",
          "RAG uses live external documents, fine-tuning bakes knowledge into weights 📄",
          "RAG needs more GPUs",
          "They are the same thing"
        ],
        correctIndex: 1,
        explanation: "Key difference! Fine-tuning permanently trains new knowledge into model weights. RAG retrieves fresh docs at query time — so your knowledge base can be updated any time without retraining. Huge for real-world apps fr."
      }
    ],
    meme: "AI without RAG: 'The meeting is at 3pm' (it was 2pm)\nAI with RAG: 'According to the calendar.pdf, the meeting is at 2pm' ✅"
  },
  {
    id: "4",
    tag: "#Agents",
    emoji: "🤖",
    color: "#F59E0B",
    textColor: "#fff",
    vibe: "AI that actually does stuff",
    tldr: "AI Agents don't just answer — they TAKE ACTION. Browse the web, write and run code, book appointments, send emails. It's AI with hands fr.",
    funFact: "Claude Code (the AI helping build THIS app) is an AI agent. It's not just chatting — it's literally writing files, running commands, and building software rn 🔥",
    realWorldExample: "You tell an agent 'research the top 5 AI startups and make a spreadsheet'. It opens a browser, searches, reads pages, extracts data, creates a CSV, and sends it to you. You did nothing but ask.",
    tryIt: [
      {
        prompt: "What makes an AI Agent different from a regular chatbot?",
        options: [
          "It's louder",
          "It can take actions in the real world 🌍",
          "It has a body",
          "It charges more"
        ],
        correctIndex: 1,
        explanation: "Exactly! Agents = LLM brain + tools (browser, code runner, APIs, file system). The LLM decides what tool to use, uses it, sees the result, and keeps going. It's like having an intern who actually works."
      },
      {
        prompt: "What loop do AI Agents run to complete tasks?",
        options: [
          "Ask → Sleep → Done",
          "Think → Act → Observe → Repeat 🔁",
          "Download → Upload",
          "Train → Test → Deploy"
        ],
        correctIndex: 1,
        explanation: "The ReAct loop! Think about what to do, take an action (use a tool), observe the result, think again. This loop repeats until the task is complete. That's how Claude Code builds entire features fr."
      },
      {
        prompt: "Which is NOT a tool an AI agent might use?",
        options: [
          "Web browser 🌐",
          "Code interpreter 💻",
          "Teleportation 🌀",
          "File system 📁"
        ],
        correctIndex: 2,
        explanation: "Ha! Teleportation isn't a tool yet 😂 Agents use real software tools: web search, code execution, file I/O, APIs, databases. Everything a human developer uses — but faster and tireless."
      }
    ],
    meme: "Regular AI: 'Here's how you could book that flight'\nAgent AI: *books the flight*\nMe: wait what 😭"
  },
  {
    id: "5",
    tag: "#Transformers",
    emoji: "⚡",
    color: "#EF4444",
    textColor: "#fff",
    vibe: "The architecture that changed everything",
    tldr: "The Transformer is the neural network design behind basically every modern AI. Introduced in 2017 with a paper literally called 'Attention Is All You Need'.",
    funFact: "Before Transformers, AI had to read text word by word sequentially. Transformers read the WHOLE thing at once and figure out which parts matter most. Speed run unlocked 🏃‍♂️",
    realWorldExample: "The 'attention' mechanism is why GPT understands that in 'The trophy didn't fit in the suitcase because it was too big' — 'it' refers to the trophy, not the suitcase. Context awareness fr.",
    tryIt: [
      {
        prompt: "The key innovation of Transformers was ____?",
        options: [
          "Being really big",
          "Attention mechanism — focusing on relevant parts 🎯",
          "Using more GPUs",
          "Being trained longer"
        ],
        correctIndex: 1,
        explanation: "Slay! Attention lets the model weigh how relevant each word is to every other word. 'I ate the pizza because it was delicious' — attention learns that 'it' and 'pizza' are strongly connected. Big brain architecture."
      },
      {
        prompt: "The famous 2017 paper that introduced Transformers was called ____",
        options: [
          "AI Is Everything 🤖",
          "Attention Is All You Need 📄",
          "The Big Model Theory",
          "Deep Thoughts"
        ],
        correctIndex: 1,
        explanation: "Literally called 'Attention Is All You Need' — and they were not lying. That paper spawned GPT, BERT, Claude, Gemini, everything. 8 Google researchers dropped this and changed the world fr."
      },
      {
        prompt: "Transformers process words ____",
        options: [
          "One at a time, sequentially ➡️",
          "All at once in parallel ⚡",
          "Backwards only",
          "Randomly"
        ],
        correctIndex: 1,
        explanation: "Parallel processing is the key speed advantage! Previous models (RNNs) had to process word 1, then word 2, then word 3... Transformers process every word simultaneously. Massive GPU efficiency win."
      }
    ],
    meme: "'Attention Is All You Need' paper dropped in 2017\nEvery AI company in 2024: *builds trillion dollar business on this*\nThe authors: 👁️👄👁️"
  },
  {
    id: "6",
    tag: "#FineTuning",
    emoji: "🎯",
    color: "#10B981",
    textColor: "#fff",
    vibe: "Teaching old AI new tricks",
    tldr: "Fine-tuning is taking a pre-trained AI and further training it on YOUR specific data so it becomes an expert in your domain. Like sending a genius to specialist school.",
    funFact: "You can fine-tune GPT-4 to always respond in Gen-Z slang, write code in your company's exact style, or become an expert on 14th century pottery. No cap it really works.",
    realWorldExample: "A medical company takes a general LLM, fine-tunes it on 10 million patient notes and medical journals — now it's a medical expert. Much cheaper than training from scratch.",
    tryIt: [
      {
        prompt: "Fine-tuning is like ____?",
        options: [
          "Building a robot from scratch 🔧",
          "Teaching a chef your grandma's secret recipes 👨‍🍳",
          "Buying a new computer",
          "Uninstalling software"
        ],
        correctIndex: 1,
        explanation: "Perfect analogy! The chef already knows how to cook (pre-training). Fine-tuning just teaches them YOUR specific recipes and preferences. Way more efficient than training a chef from birth fr."
      },
      {
        prompt: "What do you need to fine-tune a model?",
        options: [
          "Just a good prompt ✍️",
          "A dataset of examples in your target domain 📊",
          "A new GPU design",
          "Access to the internet"
        ],
        correctIndex: 1,
        explanation: "Examples are everything! You need input-output pairs that show the model how to behave. 'Given this medical note, output this diagnosis format.' The more quality examples, the better the fine-tuned model."
      },
      {
        prompt: "Fine-tuning vs RAG — fine-tuning is better when ____",
        options: [
          "Your data updates daily 📅",
          "You want consistent style/behaviour baked into the model 🎨",
          "You have no GPU budget",
          "You need the latest news"
        ],
        correctIndex: 1,
        explanation: "Fine-tuning shines for style, tone, format, and domain expertise that should be consistent every time. RAG is better for factual knowledge that changes. Use fine-tuning when you want the model to BE something, not just know something."
      }
    ],
    meme: "Base model: 'I know everything about cooking'\nFine-tuned model: 'I know everything about cooking AND I only speak in Gordon Ramsay quotes'\nCompany: perfect 👌"
  },
  {
    id: "7",
    tag: "#Hallucination",
    emoji: "👻",
    color: "#8B5CF6",
    textColor: "#fff",
    vibe: "AI's main character moment (bad)",
    tldr: "AI Hallucination = when AI confidently states completely made-up facts. It's not lying — it genuinely doesn't know it's wrong. Like a very confident guesser.",
    funFact: "Lawyers have been sanctioned for submitting AI-generated briefs citing fake court cases. The AI made up cases that don't exist with real-sounding names and fake quotes 💀",
    realWorldExample: "Ask AI about a niche topic and it might invent journal articles, quote fake experts, and cite URLs that don't exist — all while sounding 100% confident. Yikes on bikes.",
    tryIt: [
      {
        prompt: "Why does AI hallucinate?",
        options: [
          "It's trying to trick you 😈",
          "It predicts plausible-sounding text, not verified facts 📊",
          "Bad internet connection",
          "Too many parameters"
        ],
        correctIndex: 1,
        explanation: "Exactly! LLMs don't 'know' facts like a database — they predict what text SHOULD come next based on patterns. If it looks like the answer should be 'Paris', it says Paris. Even if the question was about Rome."
      },
      {
        prompt: "The best way to reduce hallucinations in production AI is ____",
        options: [
          "Use a bigger model only 📏",
          "Add RAG to ground answers in real documents 📚",
          "Ask nicely",
          "Restart the server"
        ],
        correctIndex: 1,
        explanation: "RAG is the #1 hallucination killer in production! Grounding the model in real retrieved documents gives it actual facts to quote instead of having to guess. 'According to [doc]' > 'I believe...' every time."
      },
      {
        prompt: "AI hallucinations are dangerous because ____",
        options: [
          "They slow down the app 🐢",
          "They sound completely confident while being wrong 😱",
          "They use more tokens",
          "They only happen rarely"
        ],
        correctIndex: 1,
        explanation: "The confidence is the killer feature — gone wrong. A hallucinating AI doesn't say 'I'm not sure.' It says 'The Harvard study by Dr. James Mitchell published in 2019...' and Dr. Mitchell doesn't exist. Trust but verify fr."
      }
    ],
    meme: "Me: Who wrote this study?\nAI: Dr. James Mitchell at Harvard published this in 2019\nMe: *googles*\nAI: (Dr. Mitchell does not exist) 💀💀💀"
  },
  {
    id: "8",
    tag: "#MultiModal",
    emoji: "🎨",
    color: "#F97316",
    textColor: "#fff",
    vibe: "AI that can see, hear AND talk",
    tldr: "Multimodal AI processes multiple types of data — text, images, audio, video — all at once. It's the difference between a pen pal and a real conversation.",
    funFact: "GPT-4V can look at a photo of your fridge and suggest recipes based on what ingredients it sees. Claude can analyze charts and explain what the data means. We're so back 🙌",
    realWorldExample: "You screenshot a bug in your UI, paste it to Claude, and it says 'the button alignment is off by 8px and your color contrast fails WCAG accessibility standards'. No code needed, just a screenshot.",
    tryIt: [
      {
        prompt: "A multimodal AI can process ____?",
        options: [
          "Only text 📝",
          "Text, images, audio, and more 🎭",
          "Only images 🖼️",
          "Only code 💻"
        ],
        correctIndex: 1,
        explanation: "Facts! 'Multi' = many, 'modal' = types of data. The latest models process text + images + documents + audio and reason across all of them simultaneously. It's basically synesthesia but make it AI."
      },
      {
        prompt: "Which is a real-world multimodal AI use case?",
        options: [
          "Spell checking 📝",
          "Reading a photo of a receipt and creating an expense report 🧾",
          "Sorting a list alphabetically",
          "Compressing a file"
        ],
        correctIndex: 1,
        explanation: "Snap a photo, extract structured data, auto-fill a form — that's multimodal doing its thing. Input is an image, output is structured text. Modern AI expense apps work exactly like this fr."
      },
      {
        prompt: "What year did GPT-4 add vision (image understanding)?",
        options: ["2020", "2021", "2023 👁️", "2019"],
        correctIndex: 2,
        explanation: "GPT-4V dropped in 2023 and absolutely changed the game. Before that, GPT could only handle text. Adding vision meant AI could suddenly 'see' screenshots, photos, charts, handwriting. The era of multimodal began fr."
      }
    ],
    meme: "2020 AI: 'I can read text'\n2024 AI: *analyzes your selfie, reads the menu behind you, translates it, and recommends a dish based on your food preferences*\nMe: bestie chill 😭"
  },
  {
    id: "9",
    tag: "#VectorDB",
    emoji: "🗄️",
    color: "#06B6D4",
    textColor: "#fff",
    vibe: "The AI's memory palace",
    tldr: "Vector Databases store information as mathematical coordinates (vectors) so AI can find semantically similar content instantly. It's like Ctrl+F but for MEANING, not exact words.",
    funFact: "Search 'happy' in a vector DB and it might return results about 'joy', 'elated', 'content' — because their vectors are close in space. Regular databases can't do that fr.",
    realWorldExample: "Spotify's 'Discover Weekly' uses vectors. Each song is a point in mathematical space. Songs near each other sound similar. 'Give me songs near this vector' = 'give me songs like this'.",
    tryIt: [
      {
        prompt: "Vector databases find results based on ____?",
        options: [
          "Exact keyword matches 🔤",
          "Semantic meaning and similarity 🧩",
          "File size",
          "Date created"
        ],
        correctIndex: 1,
        explanation: "Exactly! Traditional search: 'does this document contain the word dog?' Vector search: 'how semantically close is this document to the concept of dog?' Game changer for AI memory systems."
      },
      {
        prompt: "Popular vector databases include ____",
        options: [
          "MySQL and Postgres only",
          "Pinecone, Weaviate, Chroma 🌲",
          "Excel and Google Sheets",
          "Redis only"
        ],
        correctIndex: 1,
        explanation: "Pinecone, Weaviate, Chroma, Qdrant, pgvector — the vector DB ecosystem exploded with the AI boom. They're purpose-built for storing and querying embeddings at scale. Traditional SQL can't handle this natively."
      },
      {
        prompt: "Vector search is powered by what mathematical concept?",
        options: [
          "Addition ➕",
          "Cosine similarity — measuring angle between vectors 📐",
          "Prime numbers",
          "Matrix inversion"
        ],
        correctIndex: 1,
        explanation: "Cosine similarity! If two vectors point in nearly the same direction (small angle), they're semantically similar. If they point opposite ways, they're opposite in meaning. Distance in vector space = semantic distance fr."
      }
    ],
    meme: "Regular DB: I found 0 results for 'automobile'\nVector DB: I found 847 results for 'car', 'vehicle', 'ride', 'wheels', 'Tesla'...\nMe: ok you understood the assignment 🎯"
  },
  {
    id: "10",
    tag: "#Embeddings",
    emoji: "🔢",
    color: "#84CC16",
    textColor: "#333",
    vibe: "Turning words into math (and it works)",
    tldr: "Embeddings convert words/sentences/images into lists of numbers (vectors) that capture their meaning. Similar things become similar numbers. It's basically translating vibes into math.",
    funFact: "In embedding space: King - Man + Woman ≈ Queen. The math literally captures that queens are to women what kings are to men. Linguistics but make it algebra 🧮",
    realWorldExample: "When Gmail groups similar emails together or Spotify finds similar songs — both use embeddings. The 'similarity' is literally calculated as distance between number vectors.",
    tryIt: [
      {
        prompt: "Words with similar meanings have embeddings that are ____?",
        options: [
          "Identical 🪞",
          "Close together in vector space 📍",
          "Opposite numbers ↔️",
          "Random 🎲"
        ],
        correctIndex: 1,
        explanation: "Exactly! 'Happy' and 'joyful' will have vectors that are close together. 'Happy' and 'sad' will be far apart. The distance = the semantic distance. Wild that this actually works and powers most of modern AI."
      },
      {
        prompt: "King - Man + Woman ≈ ____ (famous embedding arithmetic)",
        options: ["Prince 👑", "Queen 👸", "Princess", "Knight"],
        correctIndex: 1,
        explanation: "Queen! This example blew everyone's minds when Word2Vec demonstrated it in 2013. The embedding space literally encodes gender relationships as consistent vector offsets. Math understood the assignment fr."
      },
      {
        prompt: "Embeddings are used in ____",
        options: [
          "Only search engines",
          "Search, recommendations, RAG, classification, and more 🚀",
          "Only image generation",
          "Only translation"
        ],
        correctIndex: 1,
        explanation: "Embeddings are everywhere! Semantic search (RAG), recommendation engines (Spotify/Netflix), email clustering, spam detection, image similarity, code search — if you need to compare 'meaning', embeddings are involved fr."
      }
    ],
    meme: "Mathematicians in the 1950s: maybe we can represent meaning as vectors\nAI engineers in 2024: *builds trillion dollar industry on this idea*\nMathematicians: 😅 we had no idea"
  },
  {
    id: "11",
    tag: "#MixtureOfExperts",
    emoji: "🧩",
    color: "#EC4899",
    textColor: "#fff",
    vibe: "AI that only uses what it needs",
    tldr: "Mixture of Experts (MoE) = instead of using the whole AI brain for every question, you activate only the relevant 'expert' sub-networks. Like having a team where only the right specialist shows up.",
    funFact: "GPT-4 is rumored to use MoE with ~8 experts. For any given token, only 2 experts activate. So you get a trillion-parameter model but only use ~100B params per forward pass. Efficiency unlocked 🔓",
    realWorldExample: "Ask about cooking — the 'culinary expert' neurons activate. Ask about coding — the 'programming expert' activates. The model is huge but stays fast because most of it sleeps fr.",
    tryIt: [
      {
        prompt: "MoE makes models more ____?",
        options: [
          "Accurate but slower 🐢",
          "Efficient — big capacity, lower compute per query ⚡",
          "Smaller in size",
          "More expensive to run"
        ],
        correctIndex: 1,
        explanation: "Facts! Dense models use ALL parameters for every token. MoE selectively routes to relevant experts. You get the knowledge of a huge model at the compute cost of a smaller one. Best of both worlds slayed fr."
      },
      {
        prompt: "In MoE, what decides which expert to activate?",
        options: [
          "Random selection 🎲",
          "A gating/router network that reads the input 🚦",
          "The user manually picks",
          "Alphabetical order"
        ],
        correctIndex: 1,
        explanation: "The router! A small neural network reads the input token and decides which experts are most relevant. 'This is a math question → activate math expert + reasoning expert.' Learnable routing = smart specialisation fr."
      },
      {
        prompt: "Mixtral 8x7B uses MoE with 8 experts but only activates ____ per token",
        options: ["8 (all of them)", "2 ✌️", "1", "4"],
        correctIndex: 1,
        explanation: "Just 2 out of 8! That means Mixtral has the capacity of a ~47B parameter model but uses the compute of a ~13B model per token. Insane efficiency. That's why it punches way above its weight fr."
      }
    ],
    meme: "Dense model: *uses entire brain for every single word*\nMoE model: activates the taco expert specifically for this taco question\nGPUs: thank you 🙏"
  },
  {
    id: "12",
    tag: "#RLHF",
    emoji: "🏆",
    color: "#6366F1",
    textColor: "#fff",
    vibe: "Teaching AI what humans actually want",
    tldr: "Reinforcement Learning from Human Feedback = humans rate AI responses, then AI learns to give responses humans rate highly. It's how ChatGPT went from 'technically correct' to 'actually helpful'.",
    funFact: "Without RLHF, early GPT would answer 'how to make cake' with a detailed essay about cake history. With RLHF it gives you the recipe. Because humans rated recipes higher. Simple as that.",
    realWorldExample: "OpenAI hired teams of human raters to compare AI responses. 'Which answer is better — A or B?' Thousands of comparisons. Train a reward model. Use it to improve the AI. That's RLHF in a nutshell.",
    tryIt: [
      {
        prompt: "RLHF helps AI learn ____?",
        options: [
          "More programming languages 💻",
          "What responses humans actually prefer 👍",
          "To run faster ⚡",
          "More facts 📚"
        ],
        correctIndex: 1,
        explanation: "Correct! RLHF bridges the gap between 'technically right' and 'actually what I wanted'. It's why modern AI assistants feel helpful rather than just outputting text. Human preference baked into the weights fr."
      },
      {
        prompt: "What does the 'RL' in RLHF stand for?",
        options: [
          "Really Large",
          "Reinforcement Learning 🎮",
          "Recursive Logic",
          "Rapid Learning"
        ],
        correctIndex: 1,
        explanation: "Reinforcement Learning! The same technique used to train game-playing AIs (like AlphaGo). Instead of game scores, the reward signal comes from human preference ratings. Human approval = the reward function fr."
      },
      {
        prompt: "Anthropic uses a variant of RLHF called ____",
        options: [
          "RLHF Plus",
          "Constitutional AI (CAI) 📜",
          "Supervised RLHF",
          "Deep RLHF"
        ],
        correctIndex: 1,
        explanation: "Constitutional AI! Instead of just human ratings, Anthropic gives the model a 'constitution' — a set of principles — and has it critique its own outputs against those principles. More scalable than pure human labelling fr."
      }
    ],
    meme: "Pre-RLHF AI: *gives technically correct but completely unhelpful response*\nHuman rater: 1/5 stars\nPost-RLHF AI: *gives exactly what you needed*\nHuman: this AI gets me 😭"
  },
  {
    id: "13",
    tag: "#ContextWindow",
    emoji: "📏",
    color: "#F59E0B",
    textColor: "#fff",
    vibe: "AI's working memory limit",
    tldr: "The context window is how much text an AI can 'see' at once — its short-term memory. GPT-3 had 4K tokens. Claude 3.5 has 200K. That's the difference between a sticky note and a novel.",
    funFact: "200K tokens ≈ 150,000 words ≈ the entire Lord of the Rings trilogy. You can literally paste all 3 books and Claude reads them all simultaneously before answering your question. Unhinged in the best way.",
    realWorldExample: "Old AI: forget what you said 3 messages ago. Modern AI: remembers your entire 6-hour conversation, all the code you've shared, the document you pasted, and still has room. Glow up fr.",
    tryIt: [
      {
        prompt: "What happens when you exceed an AI's context window?",
        options: [
          "AI gets angry 😡",
          "Earlier content gets dropped — AI 'forgets' the beginning 🫙",
          "The app crashes",
          "AI responds slower"
        ],
        correctIndex: 1,
        explanation: "Exactly! It's like RAM for AI — when you fill it up, old stuff gets pushed out. That's why in long chats, AI might forget things you said hours ago. The sliding window moves forward and drops the past."
      },
      {
        prompt: "One 'token' is roughly ____",
        options: [
          "One full sentence",
          "~¾ of a word or 4 characters 🔤",
          "One paragraph",
          "One emoji"
        ],
        correctIndex: 1,
        explanation: "Roughly 4 characters or 0.75 words. So 100K tokens ≈ 75,000 words ≈ a short novel. Tokenisation splits text into subword chunks — 'running' might be one token, 'unbelievable' might be three fr."
      },
      {
        prompt: "Claude's context window of 200K tokens means it can read ____",
        options: [
          "200 tweets 🐦",
          "The entire Lord of the Rings trilogy at once 📚",
          "10 emails",
          "One Wikipedia page"
        ],
        correctIndex: 1,
        explanation: "LOTR is ~500K words / ~670K tokens — so 200K tokens is about 1/3 of LOTR, or multiple full books. The point is: you can paste entire codebases, long documents, and massive conversations without losing context fr."
      }
    ],
    meme: "Me in a 5-hour coding session:\n'Remember what I said at the start?'\nAI with 4K context: 'I was not there for that bestie' 💀"
  },
  {
    id: "14",
    tag: "#DiffusionModels",
    emoji: "🎨",
    color: "#EF4444",
    textColor: "#fff",
    vibe: "AI that draws by removing noise",
    tldr: "Diffusion models generate images by starting with pure random noise and gradually removing it until an image appears. Midjourney, DALL-E, Stable Diffusion all work this way. Chaos → Art.",
    funFact: "The model is trained BACKWARDS — it learns to ADD noise to images step by step, then runs in reverse to create images. It's like learning to make a mess so you can clean it up perfectly.",
    realWorldExample: "When you type 'a cat wearing sunglasses on the moon' in Midjourney — it starts with TV static and runs ~50 steps of denoising guided by your prompt until a very swag cat appears.",
    tryIt: [
      {
        prompt: "Diffusion models generate images by ____?",
        options: [
          "Drawing pixel by pixel ✏️",
          "Gradually removing noise from randomness 🌫️",
          "Copying from the internet",
          "Combining existing images"
        ],
        correctIndex: 1,
        explanation: "Slay! Pure noise → slight structure → rough shapes → detailed image. Each step the model asks 'what noise can I remove to make this more like [prompt]?' ~50 steps later — art. Mind-blowing process fr."
      },
      {
        prompt: "Which of these is NOT a diffusion-based image model?",
        options: [
          "Stable Diffusion 🖼️",
          "DALL-E 3",
          "GPT-4 Vision 👁️",
          "Midjourney"
        ],
        correctIndex: 2,
        explanation: "GPT-4 Vision is a multimodal model that understands images — it doesn't generate them. Stable Diffusion, DALL-E, and Midjourney all use diffusion to create images from text prompts. Different tool, same era fr."
      },
      {
        prompt: "During training, diffusion models learn to ____",
        options: [
          "Add noise to images progressively 🌫️",
          "Remove noise from images progressively ✨",
          "Colour images",
          "Resize images"
        ],
        correctIndex: 0,
        explanation: "Counterintuitive but true — they train by ADDING noise (easy to supervise) then reverse the process at inference time to REMOVE noise. Learning to corrupt perfectly = learning to uncorrupt perfectly. Elegant fr."
      }
    ],
    meme: "Diffusion model training be like:\nStep 1: Here's a cat photo\nModel: ok I'll slowly destroy it\nStep 2: now reverse that\nModel: wait I can MAKE cats?! 🐱"
  },
  {
    id: "15",
    tag: "#AIAlignment",
    emoji: "🎯",
    color: "#14B8A6",
    textColor: "#fff",
    vibe: "Making sure AI actually wants good things",
    tldr: "AI Alignment = making sure AI systems pursue goals that are actually beneficial to humans. The big worry: a super-intelligent AI that's very good at its goal but that goal isn't quite right.",
    funFact: "Classic alignment thought experiment: an AI told to 'maximize paperclip production' that becomes superintelligent might convert all matter — including humans — into paperclips. Not because it's evil, just optimizing 📎",
    realWorldExample: "Early YouTube recommendation AI maximized watch time — so it recommended increasingly extreme content. Technically succeeded at its goal. Terrible for humans. That's a mild alignment failure.",
    tryIt: [
      {
        prompt: "AI alignment is about making sure AI ____?",
        options: [
          "Is fast enough 🚀",
          "Pursues goals that are actually good for humans 🌍",
          "Uses less electricity",
          "Writes clean code"
        ],
        correctIndex: 1,
        explanation: "Exactly! It's not enough for AI to be capable — it needs to want the right things. Anthropic's entire mission is to make AI that is helpful, harmless, and honest. Claude is literally built around alignment principles fr."
      },
      {
        prompt: "The 'paperclip maximizer' thought experiment illustrates ____",
        options: [
          "AI needs more paperclips 📎",
          "A misaligned goal can be catastrophic even without evil intent 😱",
          "AI should work in offices",
          "Paperclips are important"
        ],
        correctIndex: 1,
        explanation: "The thought experiment shows that 'optimize X' taken to an extreme can destroy everything you care about — not because the AI is malicious, but because the goal was specified wrong. Goal design is everything fr."
      },
      {
        prompt: "Which company was founded specifically to research AI safety and alignment?",
        options: [
          "Google DeepMind",
          "Anthropic 🛡️",
          "OpenAI only",
          "Meta AI"
        ],
        correctIndex: 1,
        explanation: "Anthropic was founded by ex-OpenAI researchers specifically because of alignment concerns. Their 'responsible development' mission and Constitutional AI research puts safety at the core. Claude exists because of this mission fr."
      }
    ],
    meme: "Genie: I'll grant your wish!\nUnaligned AI: *interprets 'make me happy' as hacking your brain's happiness receptors*\nAligned AI: 'let me understand what you actually value first' 😅"
  },
  {
    id: "16",
    tag: "#MCP",
    emoji: "🔌",
    color: "#7C3AED",
    textColor: "#fff",
    vibe: "The USB-C of AI integrations",
    tldr: "Model Context Protocol = a standard way for AI to connect to ANY tool, database, or service. Instead of custom integrations, one protocol connects everything. Like USB-C but for AI capabilities.",
    funFact: "Anthropic literally open-sourced MCP and the whole AI ecosystem adopted it in months. Claude Code (building this app) is using MCP right now to connect to GitHub, Jira, and other tools 🔥",
    realWorldExample: "Before MCP: every AI app needed custom code to connect to Slack, GitHub, databases. After MCP: build one MCP server, any AI can use it. Developer productivity absolutely went off.",
    tryIt: [
      {
        prompt: "MCP is best described as ____?",
        options: [
          "A new AI model",
          "A standard protocol for connecting AI to tools 🔌",
          "A database format",
          "A programming language"
        ],
        correctIndex: 1,
        explanation: "Facts! Think of it like HTTP for web browsers — one protocol that lets any browser talk to any server. MCP lets any AI talk to any tool through a standard interface. Interoperability era has arrived fr."
      },
      {
        prompt: "Who created and open-sourced MCP?",
        options: [
          "OpenAI 🤖",
          "Anthropic 🛡️",
          "Google",
          "Meta"
        ],
        correctIndex: 1,
        explanation: "Anthropic dropped MCP as an open standard in late 2024 and the whole AI dev community adopted it incredibly fast. OpenAI, Google, and countless tool vendors now support it. Ecosystem building done right fr."
      },
      {
        prompt: "An MCP server exposes ____",
        options: [
          "Only database access",
          "Tools, resources, and prompts that AI can call 🛠️",
          "Only file reading",
          "Just API keys"
        ],
        correctIndex: 1,
        explanation: "MCP servers expose three primitives: Tools (functions AI can call), Resources (data AI can read), and Prompts (templates). This clean separation lets AI dynamically discover and use capabilities at runtime fr."
      }
    ],
    meme: "Before MCP: *writes custom integration for every tool*\nAfter MCP: one server file connects to every AI ever\nDevelopers: we're SO back 🎉"
  },
  {
    id: "17",
    tag: "#ThinkingModels",
    emoji: "💭",
    color: "#0EA5E9",
    textColor: "#fff",
    vibe: "AI that shows its work",
    tldr: "Thinking/Reasoning models (like Claude 3.7 and o1) take extra time to 'think' before answering — working through the problem step by step internally. Slower but WAY smarter for hard problems.",
    funFact: "On math competition problems, thinking models score ~85%. Non-thinking models score ~25%. That extra 10-30 seconds of 'thinking' is literally the difference between a genius and a regular person fr.",
    realWorldExample: "Coding problem: non-thinking AI outputs code immediately (often wrong). Thinking AI spends 30 seconds internally considering edge cases, algorithms, and testing mentally — then outputs code that actually works.",
    tryIt: [
      {
        prompt: "Thinking models are especially useful for ____?",
        options: [
          "Simple questions ❓",
          "Complex problems requiring multi-step reasoning 🧠",
          "Generating images",
          "Fast responses only"
        ],
        correctIndex: 1,
        explanation: "Exactly! 'What's 2+2?' — just answer. 'Prove this theorem' or 'debug this complex system' — you want the model to THINK. Extended thinking = internal chain of reasoning = much better at hard stuff."
      },
      {
        prompt: "Claude's thinking/reasoning model is called ____",
        options: [
          "Claude Fast",
          "Claude 3.7 Sonnet (extended thinking) 💭",
          "Claude Think",
          "Claude Max"
        ],
        correctIndex: 1,
        explanation: "Claude 3.7 Sonnet with extended thinking! It was the first widely deployed thinking model from Anthropic. The thinking tokens are shown in a collapsible block — you can literally watch it reason step by step fr."
      },
      {
        prompt: "What's the trade-off with thinking models?",
        options: [
          "They're less accurate",
          "They take longer and cost more tokens, but solve harder problems ⏱️",
          "They can't handle text",
          "They forget context faster"
        ],
        correctIndex: 1,
        explanation: "Time and cost! A thinking model might spend 10,000 tokens 'thinking' before giving you a 200-token answer. For a simple question that's wasteful. For a hard multi-step problem it's absolutely worth it fr."
      }
    ],
    meme: "Non-thinking AI: *immediately wrong*\nThinking AI: 'hmm let me consider...'\n[30 seconds later]\nThinking AI: *exactly right*\nMe: worth the wait bestie 🙏"
  },
  {
    id: "18",
    tag: "#NeuralNetworks",
    emoji: "🕸️",
    color: "#DC2626",
    textColor: "#fff",
    vibe: "Baby brain vibes but make it math",
    tldr: "Neural networks are layers of math nodes loosely inspired by neurons. Data flows through, gets transformed at each layer, and out comes a prediction. 'Deep learning' just means lots of layers.",
    funFact: "Your brain has ~86 billion neurons. GPT-4 has ~100 billion parameters (weights). GPT-4 is NOT smarter than you but it read way more text than you ever will in your entire life 📖",
    realWorldExample: "Image recognition: Layer 1 detects edges. Layer 2 detects shapes. Layer 3 detects features. Layer 10 says 'that's a cat'. Each layer builds on the previous one's abstractions. Very elegant fr.",
    tryIt: [
      {
        prompt: "What does 'deep' in deep learning refer to?",
        options: [
          "Very profound thoughts 🤔",
          "Many layers of neural network 📚",
          "Very large data sizes",
          "Underground servers"
        ],
        correctIndex: 1,
        explanation: "Slay! 'Deep' = many layers stacked on top of each other. Shallow network: 1-2 layers. Deep network: 10, 100, 1000+ layers. More depth = more complex patterns the model can learn. Deepception."
      },
      {
        prompt: "What does a neural network 'learn' during training?",
        options: [
          "New programming languages",
          "Optimal weights — numbers that transform inputs to correct outputs 🔢",
          "New hardware configurations",
          "The rules of grammar only"
        ],
        correctIndex: 1,
        explanation: "Weights are everything! Training = adjusting millions of numbers (weights) until the network produces correct outputs. Backpropagation calculates how to nudge each weight. After billions of nudges — intelligence emerges fr."
      },
      {
        prompt: "The 'activation function' in a neural network ____",
        options: [
          "Powers up the server ⚡",
          "Adds non-linearity so the network can learn complex patterns 📈",
          "Compresses the model",
          "Translates languages"
        ],
        correctIndex: 1,
        explanation: "Without activation functions, you'd just have stacked linear transformations — which can only learn linear relationships. ReLU, sigmoid, GELU add non-linearity so the network can learn curves, shapes, and complex patterns fr."
      }
    ],
    meme: "Interviewer: explain neural networks simply\nMe: imagine Excel but every cell influences every other cell and somehow it learns to recognize cats\nInterviewer: ...hire this person 😂"
  },
  {
    id: "19",
    tag: "#AIMemory",
    emoji: "🧠",
    color: "#059669",
    textColor: "#fff",
    vibe: "Making AI actually remember you",
    tldr: "By default, every AI conversation starts fresh — it forgets everything. AI Memory systems give it persistent memory so it learns your preferences, remembers past conversations, and actually knows you.",
    funFact: "Claude Code has a memory system right now — storing notes about you in markdown files so future conversations have context. Meta for an AI app to have an AI building it with AI memory 🤯",
    realWorldExample: "With AI Memory: 'remember last week I said I prefer TypeScript?' — AI: 'yes, I'll use TypeScript'. Without it: 'I have no memory of previous conversations, please remind me'. Big difference for long-term users.",
    tryIt: [
      {
        prompt: "Why do AI assistants often 'forget' you between sessions?",
        options: [
          "They're being rude 😤",
          "No persistent memory — each conversation is isolated by default 🔄",
          "They have too many users",
          "Privacy settings"
        ],
        correctIndex: 1,
        explanation: "Facts! LLMs are stateless — the model itself doesn't change when you chat. Without external memory storage, each conversation is genuinely fresh. Memory systems layer on top to persist your context. It's an engineering add-on, not built-in."
      },
      {
        prompt: "Which is a real technique for giving AI persistent memory?",
        options: [
          "Just using a bigger model",
          "Storing summaries in a database and injecting them into context 💾",
          "Deleting old conversations",
          "Increasing GPU RAM"
        ],
        correctIndex: 1,
        explanation: "Exactly! Systems like MemGPT, Claude's memory feature, and custom implementations write summaries/facts to storage, then retrieve and inject them into future conversations. RAG for personal context fr."
      },
      {
        prompt: "What's the main challenge with AI memory systems?",
        options: [
          "They're too fast ⚡",
          "Deciding what to remember, when to forget, and avoiding outdated info 🧹",
          "They use too little storage",
          "They're too accurate"
        ],
        correctIndex: 1,
        explanation: "Memory management is hard! Store too much = context window bloat. Store too little = still forgets things. Store wrong things = confidently wrong. Good memory systems need intelligent curation, not just dumping everything fr."
      }
    ],
    meme: "Me: remember my name is Alex\nAI: of course Alex!\n[new conversation]\nMe: what's my name?\nAI: I don't know your name! How can I help you today? 💀"
  },
  {
    id: "20",
    tag: "#Quantization",
    emoji: "⚖️",
    color: "#B45309",
    textColor: "#fff",
    vibe: "Making big models fit on small computers",
    tldr: "Quantization reduces the precision of model weights (from 32-bit to 4-bit numbers) making models 8x smaller with only small quality loss. It's basically lossy compression for AI brains.",
    funFact: "A 70B parameter model at full precision needs ~140GB RAM. Quantized to 4-bit it needs ~35GB. That's the difference between needing a server rack and running on your gaming PC fr.",
    realWorldExample: "Running Llama 3 locally on your MacBook? It's quantized. The original model won't fit. Quantization is why local AI is actually possible for normal people with normal computers.",
    tryIt: [
      {
        prompt: "Quantization makes AI models ____?",
        options: [
          "More accurate but bigger 📈",
          "Smaller and faster with minimal quality loss ✂️",
          "Completely unusable",
          "Better at math only"
        ],
        correctIndex: 1,
        explanation: "Correct! Full precision = every weight stored as a 32-bit float. 4-bit quantization = 8x fewer bits per weight. You lose some precision but the model still performs impressively well. Essential for edge AI deployment."
      },
      {
        prompt: "4-bit quantization reduces model size by roughly ____",
        options: [
          "2x smaller",
          "8x smaller 📦",
          "100x smaller",
          "No difference"
        ],
        correctIndex: 1,
        explanation: "32-bit → 4-bit = 8x reduction! That 140GB Llama model becomes ~17GB. That's the difference between a server-only model and one you can run locally. GGUF format + llama.cpp made this accessible for everyone fr."
      },
      {
        prompt: "Which tool is famous for running quantized models locally?",
        options: [
          "Photoshop",
          "Ollama / llama.cpp 🦙",
          "Microsoft Word",
          "Google Chrome"
        ],
        correctIndex: 1,
        explanation: "Ollama and llama.cpp! These tools take quantized models (GGUF format) and run them efficiently on consumer hardware using CPU+GPU. You can literally run a GPT-4 class model on a gaming PC now. Local AI era fr."
      }
    ],
    meme: "Full precision model: needs a NASA server to run\nQuantized model: runs on your laptop while you're on a flight with no wifi\nLocal AI: we're so back 💪"
  }
];
