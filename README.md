# 🎯 TypeQuiz Master

<div align="center">

**Master TypeScript with Interactive, Dynamic Quizzes**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](#) • [Documentation](#features) • [Report Bug](https://github.com/Souravappu/TypeQuiz-Master/issues)

</div>

---

## 📖 Overview

**TypeQuiz Master** is a comprehensive, dynamic TypeScript quiz application that allows users to take quizzes, manage questions, and create custom quiz sessions. Built with modern TypeScript practices, it demonstrates advanced concepts including enums, generics, type guards, async operations, and clean architecture.

## ✨ Key Features

### 🎮 Quiz Features
- **📝 Multiple Difficulty Levels** - Easy, Medium, and Hard questions
- **⏱️ Optional Timer** - Set time limits for your quizzes
- **📊 Real-time Score Tracking** - See your progress as you answer
- **🎨 Beautiful UI** - Modern, responsive design with smooth animations
- **📱 Mobile Responsive** - Works perfectly on all devices

### 🛠️ Dynamic Management
- **➕ Add Questions** - Dynamically add new questions to the quiz bank
- **✏️ Edit Questions** - Update existing questions anytime
- **🗑️ Delete Questions** - Remove questions you don't need
- **💾 LocalStorage Persistence** - All questions saved in browser storage
- **📈 Statistics Dashboard** - View question counts by difficulty

### 🎨 Custom Quiz Builder
- **🎯 Select Specific Questions** - Choose exactly which questions to include
- **🔍 Preview Questions** - See question details before starting
- **📋 Filter by Difficulty** - Select questions from specific difficulty levels

### 🏗️ TypeScript Best Practices
- ✅ **Type Safety** - Full TypeScript with strict type checking
- ✅ **Type Guards** - Runtime type validation
- ✅ **Interfaces & Enums** - Strong typing throughout
- ✅ **Modular Architecture** - Clean separation of concerns
- ✅ **Async Operations** - Proper async/await implementation

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Souravappu/TypeQuiz-Master.git
   cd TypeQuiz-Master
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Build for Production

```bash
npm run build
```

This will compile TypeScript and create an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
TypeQuiz-Master/
│
├── public/
│   ├── favicon.svg          # App favicon
│
├── src/
│   ├── assets/
│   │   └── styles.css       # Global styles
│   │
│   ├── data/
│   │   └── questions.json   # Default questions data
│   │
│   ├── models/
│   │   ├── Question.ts      # Question interface & Difficulty enum
│   │   └── Result.ts         # Result interface
│   │
│   ├── services/
│   │   ├── quizService.ts        # Async question fetching
│   │   └── questionManager.ts   # CRUD operations & localStorage
│   │
│   ├── utils/
│   │   └── typeGuards.ts    # Type guard functions
│   │
│   ├── components/
│   │   └── Quiz.ts          # Core Quiz logic class
│   │
│   └── main.ts              # Entry point & UI logic
│
├── index.html
├── tsconfig.json
├── package.json
└── README.md
```

## 🎯 Usage Guide

### Starting a Quiz

1. Click **"Start Quiz"** from the main menu
2. Select your preferred difficulty levels (Easy, Medium, Hard)
3. Optionally enable a timer and set the time limit
4. Click **"Start Quiz"** to begin

### Managing Questions

1. Click **"Add / Edit / Delete Questions"** from the main menu
2. **Add New Question:** Click "+ Add New Question" and fill in the form
3. **Edit Question:** Click "✏️ Edit" on any question
4. **Delete Question:** Click "🗑️ Delete" on any question
5. All changes are automatically saved to localStorage

### Creating Custom Quiz

1. Click **"Create Custom Quiz (Select Questions)"** from the main menu
2. Check the boxes next to questions you want to include
3. Click **"Start Custom Quiz"** to begin with your selected questions

## 💻 Code Overview

### Models

**Question Interface & Difficulty Enum** (`src/models/Question.ts`)
```typescript
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: Difficulty;
}
```

**Result Interface** (`src/models/Result.ts`)
```typescript
export interface Result {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
}
```

### Question Manager Service

**CRUD Operations** (`src/services/questionManager.ts`)
- `getAllQuestions()` - Retrieve all questions
- `addQuestion()` - Add a new question
- `updateQuestion()` - Update existing question
- `deleteQuestion()` - Remove a question
- `getStatistics()` - Get question statistics

### Type Guards

**Type Safety** (`src/utils/typeGuards.ts`)
- `isDifficulty()` - Validates difficulty enum values
- `isQuestion()` - Validates Question objects
- `isQuestionArray()` - Validates arrays of questions

### Quiz Class

**Core Logic** (`src/components/Quiz.ts`)
- Manages quiz state and progress
- Validates answers
- Calculates results and scores
- Timer functionality
- Provides type-safe methods

## 🛠️ Tech Stack

| Component   | Technology                |
| ----------- | ------------------------- |
| Language    | TypeScript 5.3           |
| Frontend    | HTML5, CSS3              |
| Build Tool  | Vite 5.0                  |
| Data Storage| Browser LocalStorage      |
| Runtime     | Browser (ES Modules)     |

## 📚 TypeScript Concepts Demonstrated

| Concept         | Implementation                                    |
| --------------- | ------------------------------------------------- |
| **Enums**       | `Difficulty` enum for question difficulty levels  |
| **Interfaces**  | `Question` and `Result` interfaces              |
| **Type Guards** | Runtime type validation in `typeGuards.ts`        |
| **Async/Await** | Async question fetching in `quizService.ts`       |
| **Classes**     | `Quiz` class with OOP design                      |
| **Generics**    | Type-safe data handling throughout                |
| **Modules**     | Clean separation of concerns                      |
| **localStorage**| Browser API for data persistence                  |

## 🎨 Customization

### Adding Default Questions

Edit `src/data/questions.json` and follow this format:

```json
{
  "id": 1,
  "question": "Your question here?",
  "options": [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4"
  ],
  "correctAnswer": "Option 2",
  "difficulty": "easy"
}
```

### Using External API

Modify `src/services/quizService.ts` to fetch from an API:

```typescript
export async function fetchQuestions(): Promise<Question[]> {
  const response = await fetch("https://api.example.com/questions");
  // ... rest of the logic
}
```

## 🧪 Testing

The project is set up to easily add testing. You can extend it with:

- **Jest** with TypeScript support
- **Vitest** (recommended for Vite projects)

## 📈 Future Enhancements

- [ ] User authentication system
- [ ] Quiz history and analytics
- [ ] Export/Import questions (JSON/CSV)
- [ ] Multiple quiz categories
- [ ] Leaderboard system
- [ ] Dark mode theme
- [ ] Unit tests with Jest/Vitest
- [ ] Question tags/categories
- [ ] Search functionality for questions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Souravappu**

- GitHub: [@Souravappu](https://github.com/Souravappu)
- Repository: [TypeQuiz-Master](https://github.com/Souravappu/TypeQuiz-Master)

## 🙏 Acknowledgments

- Built with ❤️ using TypeScript
- Inspired by the need for interactive TypeScript learning tools
- Thanks to all contributors who help improve this project

---

<div align="center">

**⭐ If you find this project helpful, please give it a star! ⭐**

Made with TypeScript and lots of ☕

</div>
