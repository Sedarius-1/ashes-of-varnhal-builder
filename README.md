# Ashes of Varnhal Campaign Tracker

A React/TypeScript web application for building warbands, tracking campaigns, and managing game content for the "Ashes of Varnhal" tabletop wargame.

## Features

### Campaign Tracker & Warband Builder
- Create, customize, and manage warbands for all factions
- Add units, weapons, and abilities with point cost tracking
- Track campaign progress, game results, and warband upgrades
- Save, load, import, and export warbands (JSON)
- PDF export of warband rosters for printing or sharing
- Fully mobile-friendly and responsive interface

### Core Rules Reference
- **Game Setup**: Table layout, deployment, and scenario structure
- **Turn & Actions**: Turn sequence, activations, actions, and combat resolution (all in one streamlined section)
- **Special Rules & Traits**: Reference for critical effects, status conditions, and special rules
- **Scenarios & Missions**: Browse core and heroic scenarios with objectives, deployment, and victory conditions

### Game Content Management
- **Faction Rules**: Detailed faction information, lore, and trait tables
- **Fate Cards**: Complete deck of 32 Fate Cards with PDF generation
- **Campaign Rules**: Advanced campaign progression and rules
- **Keywords**: Glossary of game terms and keywords

### PDF Generation
- **Fate Cards PDF**: Generate print-ready PDF cards for physical use
- **Warband PDF**: Export your warband roster as a PDF for easy reference
- Professional layout and print instructions

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the local development URL

## PDF Features

### Fate Cards PDF
The application includes a sophisticated PDF generator for Fate Cards:

- **Print-Ready Format**: Cards are sized for standard poker card sleeves
- **Professional Layout**: Dark theme with proper typography and spacing
- **Complete Deck**: All 32 official Fate Cards included
- **Instructions**: Built-in printing and cutting instructions
- **Multiple Formats**: Both PDF cards and text reference available

To generate Fate Cards PDF:
1. Navigate to the Fate Cards page
2. Click "🃏 Download PDF Cards" button
3. Print on cardstock (200-300gsm recommended)
4. Cut along card borders
5. Shuffle and use in games

### Warband PDF
To export your warband as a PDF:
1. Go to the Campaign Tracker
2. Select your warband
3. Click "🖨️ Download as PDF"

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **jsPDF** for PDF generation
- **React Router** for navigation

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── types/         # TypeScript type definitions
├── definitions/   # Game data (JSON files)
├── utils/         # Utility functions (PDF generation)
└── assets/        # Static assets
```

## Development

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Vite for fast development server
- Tailwind CSS for utility-first styling

## License

This project is for the "Ashes of Varnhal" tabletop wargame community.
