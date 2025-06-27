# Ashes of Varnhal Builder

A React/TypeScript web application for building warbands and managing game content for the "Ashes of Varnhal" tabletop wargame.

## Features

### Warband Builder
- Create and customize warbands with different factions
- Add units with weapons and abilities
- Save and load warband configurations
- Point cost tracking and validation

### Game Content Management
- **Faction Rules**: Detailed faction information, lore, and trait tables
- **Fate Cards**: Complete deck of 32 Fate Cards with PDF generation
- **Special Rules**: Comprehensive rules reference
- **Combat**: Combat mechanics and calculations
- **Campaigns**: Campaign management tools
- **Scenarios**: Mission scenarios and objectives

### PDF Generation
- **Fate Cards PDF**: Generate print-ready PDF cards for physical use
- Professional card layout with proper formatting
- Print instructions and card count
- Designed for standard poker card sleeves

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
