# Skybound Gatekeeper 🏛️

A React Native mobile game where you help a sky guardian keep magical artifacts in the air!

## Game Description

Skybound Gatekeeper is a light arcade game where you help a sky guardian keep magical artifacts in the air. Complete up to 100 rounds, collect unique artifacts, unlock achievements and become a true legendary gatekeeper!

## Game Mechanics

- **100 Rounds**: The game consists of up to 100 rounds, each getting progressively more difficult
- **Time Management**: Each round starts with 5 seconds, +2 seconds added after each successful round
- **Artifact Control**: Tap the screen to keep artifacts in the air - they fall due to gravity
- **Progressive Difficulty**: More artifacts appear with each round, making it harder to keep them all airborne
- **Failure Condition**: If any artifact hits the lightning ground, the round ends

## Features

### 🎮 Game Screens
- **Onboarding Screens**: 3 beautiful intro screens explaining the game
  - Welcome screen with game logo and shield
  - Gameplay tutorial screen with floating artifacts
  - Collection and progress explanation screen
- **Home Screen**: Main menu with play button and navigation
- **Game Rules**: Detailed instructions for gameplay
- **Gameplay Screen**: Main game area with falling artifacts
- **Pause Screen**: Pause functionality during gameplay
- **Game Over Screen**: End game screen with retry option
- **Round Complete Screen**: Success screen with next round option

### 📦 Collection System
- **Artifacts**: Collect unique artifacts by completing rounds
- **Rarity System**: Common, Rare, Epic, and Legendary artifacts
- **Collection Screen**: View all collected artifacts
- **Reward Popups**: Celebrate when you receive new artifacts

### 🏆 Achievement System
- **Achievements**: Unlock achievements for various milestones
- **Progress Tracking**: Track your progress through achievements
- **Share Feature**: Share your achievements with others

### ⚙️ Settings
- **Background Music**: Toggle background music on/off
- **Sound Effects**: Control sound effect settings
- **Game Description**: Learn more about the game

## Technical Implementation

### Architecture
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **React Navigation**: Screen navigation and routing
- **Context API**: Global state management for game state
- **PanResponder**: Touch handling for gameplay mechanics

### Project Structure
```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context for state management
├── screens/            # All game screens
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Key Components
- **GameContext**: Manages game state, artifacts, achievements, and settings
- **RewardPopup**: Reusable popup component for rewards
- **Navigation**: Stack and tab navigation between screens

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. **ВАЖНО: Добавьте ассеты (изображения и иконки)**

См. подробную инструкцию в файле `ASSETS_SETUP.md`

Необходимо добавить:
- `assets/images/background.png` - фоновое изображение
- `assets/icons/home.png` - иконка Home
- `assets/icons/collection.png` - иконка Collection
- `assets/icons/achievements.png` - иконка Achievements
- `assets/icons/settings.png` - иконка Settings

3. For iOS:
```bash
cd ios && pod install && cd ..
npm run ios
```

4. For Android:
```bash
npm run android
```

5. Если изображения не загружаются, очистите кеш:
```bash
npm start -- --reset-cache
```

## Game Flow

1. **Onboarding**: First-time users see 3 beautiful intro screens
   - Welcome to Skybound Gatekeeper
   - Gameplay instructions
   - Collection and progress explanation
2. **Start**: Launch the app and tap "PLAY" on the home screen
3. **Rules**: Read the game rules and tap "PLAY" to start
4. **Gameplay**: Tap the screen to keep artifacts airborne
5. **Success**: Complete rounds to unlock artifacts and achievements
6. **Collection**: View your collected artifacts in the collection screen
7. **Achievements**: Check your progress in the achievements screen
8. **Settings**: Customize your experience in the settings screen

## Styling & Theme

The game features a Greek mythology theme with:
- **Colors**: Purple (#4B0082) and Gold (#FFD700) color scheme
- **Background**: Sky-themed with clouds and Greek columns
- **Typography**: Bold, uppercase text for dramatic effect
- **Emojis**: Used for artifacts, achievements, and UI elements

## Asset Management

### Background Images
- All screens use a unified background image component
- Path: `assets/images/background.png`
- Easily replaceable - just update one file
- Component: `src/components/BackgroundImage.tsx`

### Tab Bar Icons  
- PNG icons with tint color support
- Path: `assets/icons/`
- Active/inactive states automatically styled
- Component: `src/components/TabIcon.tsx`

See `ASSETS_SETUP.md` for detailed instructions on adding your images.

## Future Enhancements

- ✅ Unified background image system (DONE)
- ✅ PNG icons for tab bar (DONE)
- Implement sound effects and background music
- Add more artifact types and achievements
- Implement social sharing functionality
- Add leaderboards and multiplayer features
- Add particle effects and animations

## Development Notes

- All screens are fully responsive and work on different screen sizes
- Game state is properly managed through React Context
- Touch handling uses PanResponder for smooth gameplay
- Navigation is implemented with React Navigation v6
- TypeScript provides type safety throughout the application

---

**Skybound Gatekeeper** - Can you become a true Gatekeeper and reach the final cup? Test your skills now! 🏛️⚡