import jsPDF from 'jspdf';
import type { Unit } from '../types/unit';

export interface FateCard {
  name: string;
  effect: string;
}

export interface WeaponAbility {
  name: string;
  description: string;
}

export const generateFateCardsPDF = (cards: FateCard[]) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const margin = 15;
  const cardWidth = 90;
  const cardHeight = 60;
  const cardsPerRow = 2;
  const cardsPerPage = 6;
  
  // Add title page first
  createTitlePage(pdf, cards.length);

  // Generate card pages (start on a new page)
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    // Add a new page for each set of cards (except the first set)
    if (i > 0) {
      pdf.addPage();
    } else {
      // For the first set of cards, add a new page after the title page
      pdf.addPage();
    }
    
    const pageCards = cards.slice(i, i + cardsPerPage);
    
    pageCards.forEach((card, index) => {
      const row = Math.floor(index / cardsPerRow);
      const col = index % cardsPerRow;
      const x = margin + (col * (cardWidth + 10));
      const y = margin + (row * (cardHeight + 10));
      
      drawCard(pdf, card, x, y, cardWidth, cardHeight);
    });
  }

  return pdf;
};

const createTitlePage = (pdf: jsPDF, cardCount: number) => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Dark background
  pdf.setFillColor(20, 20, 20);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Decorative border
  pdf.setDrawColor(100, 100, 100);
  pdf.setLineWidth(2);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
  
  // Inner decorative border
  pdf.setDrawColor(150, 150, 150);
  pdf.setLineWidth(0.5);
  pdf.rect(15, 15, pageWidth - 30, pageHeight - 30, 'S');
  
  // Main title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ASHES OF VARNHAL', pageWidth / 2, 60, { align: 'center' });
  
  // Subtitle
  pdf.setFontSize(20);
  pdf.setTextColor(200, 200, 200);
  pdf.text('FATE CARDS', pageWidth / 2, 80, { align: 'center' });
  
  // Description
  pdf.setFontSize(12);
  pdf.setTextColor(180, 180, 180);
  pdf.text('Unpredictable pulses of ash-born memory and machine echoes', pageWidth / 2, 100, { align: 'center' });
  
  // Card count
  pdf.setFontSize(16);
  pdf.setTextColor(255, 255, 255);
  pdf.text(`Total Cards: ${cardCount}`, pageWidth / 2, 120, { align: 'center' });
  
  // Instructions box
  const instructionsY = 140;
  const instructionsHeight = 80;
  
  pdf.setFillColor(40, 40, 40);
  pdf.rect(20, instructionsY, pageWidth - 40, instructionsHeight, 'F');
  pdf.setDrawColor(100, 100, 100);
  pdf.rect(20, instructionsY, pageWidth - 40, instructionsHeight, 'S');
  
  pdf.setFontSize(14);
  pdf.setTextColor(255, 255, 255);
  pdf.text('PRINTING INSTRUCTIONS', pageWidth / 2, instructionsY + 15, { align: 'center' });
  
  pdf.setFontSize(10);
  pdf.setTextColor(200, 200, 200);
  const instructions = [
    '• Print these cards on cardstock (200-300gsm) for best results',
    '• Cut along the card borders to create individual cards',
    '• Shuffle the deck before each game',
    '• Each player draws one card at the start of battle',
    '• Cards are designed for standard poker card size sleeves'
  ];
  
  instructions.forEach((instruction, index) => {
    pdf.text(instruction, 30, instructionsY + 30 + (index * 8));
  });
  
  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(120, 120, 120);
  pdf.text('Generated from Ashes of Varnhal Builder', pageWidth / 2, pageHeight - 20, { align: 'center' });
};

const drawCard = (pdf: jsPDF, card: FateCard, x: number, y: number, width: number, height: number) => {
  // Card background with gradient effect simulation
  pdf.setFillColor(35, 35, 35);
  pdf.rect(x, y, width, height, 'F');
  
  // Outer border
  pdf.setDrawColor(80, 80, 80);
  pdf.setLineWidth(0.8);
  pdf.rect(x, y, width, height, 'S');
  
  // Inner border
  pdf.setDrawColor(120, 120, 120);
  pdf.setLineWidth(0.3);
  pdf.rect(x + 1, y + 1, width - 2, height - 2, 'S');
  
  // Card title background
  pdf.setFillColor(50, 50, 50);
  pdf.rect(x + 2, y + 2, width - 4, 15, 'F');
  
  // Title border
  pdf.setDrawColor(150, 150, 150);
  pdf.setLineWidth(0.2);
  pdf.rect(x + 2, y + 2, width - 4, 15, 'S');
  
  // Card title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  
  // Truncate title if too long
  let title = card.name;
  if (pdf.getTextWidth(title) > width - 6) {
    while (pdf.getTextWidth(title + '...') > width - 6 && title.length > 0) {
      title = title.slice(0, -1);
    }
    title += '...';
  }
  
  pdf.text(title, x + width / 2, y + 12, { align: 'center' });
  
  // Card effect background
  pdf.setFillColor(45, 45, 45);
  pdf.rect(x + 2, y + 17, width - 4, height - 19, 'F');
  
  // Card effect
  pdf.setTextColor(220, 220, 220);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  
  // Word wrap for effect text
  const maxWidth = width - 6;
  const lines = splitTextToSize(pdf, card.effect, maxWidth);
  
  lines.forEach((line, index) => {
    if (y + 22 + (index * 4.5) < y + height - 8) {
      pdf.text(line, x + 3, y + 22 + (index * 4.5));
    }
  });
  
  // Card type label (bottom right)
  pdf.setTextColor(150, 150, 150);
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'bold');
  pdf.text('FATE', x + width - 6, y + height - 6, { align: 'right' });
  
  // Decorative corner elements
  drawCornerDecorations(pdf, x, y, width, height);
  
  // Card number (top left)
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(6);
  pdf.setFont('helvetica', 'normal');
  pdf.text('F', x + 4, y + 6);
};

const drawCornerDecorations = (pdf: jsPDF, x: number, y: number, width: number, height: number) => {
  pdf.setDrawColor(80, 80, 80);
  pdf.setLineWidth(0.4);
  
  // Top-left corner
  pdf.line(x + 3, y + 3, x + 6, y + 3);
  pdf.line(x + 3, y + 3, x + 3, y + 6);
  
  // Top-right corner
  pdf.line(x + width - 3, y + 3, x + width - 6, y + 3);
  pdf.line(x + width - 3, y + 3, x + width - 3, y + 6);
  
  // Bottom-left corner
  pdf.line(x + 3, y + height - 3, x + 6, y + height - 3);
  pdf.line(x + 3, y + height - 3, x + 3, y + height - 6);
  
  // Bottom-right corner
  pdf.line(x + width - 3, y + height - 3, x + width - 6, y + height - 3);
  pdf.line(x + width - 3, y + height - 3, x + width - 3, y + height - 6);
};

const splitTextToSize = (pdf: jsPDF, text: string, maxWidth: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    if (pdf.getTextWidth(testLine) <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
};

export const downloadFateCardsPDF = (cards: FateCard[]) => {
  const pdf = generateFateCardsPDF(cards);
  pdf.save('ashes-of-varnhal-fate-cards.pdf');
};

// Test function for development
export const testPDFGeneration = () => {
  const testCards: FateCard[] = [
    { name: 'Test Card 1', effect: 'This is a test effect for the first card.' },
    { name: 'Test Card 2', effect: 'This is a test effect for the second card with longer text to test word wrapping.' },
  ];
  
  const pdf = generateFateCardsPDF(testCards);
  pdf.save('test-fate-cards.pdf');
};

export const generateKeywordsPDF = (abilities: WeaponAbility[]) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const margin = 15;
  const contentWidth = pdf.internal.pageSize.getWidth() - (margin * 2);
  
  // Add title page first
  createKeywordsTitlePage(pdf, abilities.length);

  // Add a new page for content (separate from title page)
  pdf.addPage();

  // Generate content pages
  let currentY = margin;
  let currentPage = 2; // Start from page 2 since title is page 1
  
  abilities.forEach((ability) => {
    // Check if we need a new page
    if (currentY > pdf.internal.pageSize.getHeight() - 30) {
      pdf.addPage();
      currentPage++;
      currentY = margin;
    }
    
    // Add page number
    pdf.setFontSize(7);
    pdf.setTextColor(80, 80, 80);
    pdf.text(`Page ${currentPage}`, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 8, { align: 'center' });
    
    // Draw ability as simple text
    currentY = drawAbilityText(pdf, ability, margin, currentY, contentWidth);
    currentY += 5; // Reduced space between abilities
  });

  return pdf;
};

const createKeywordsTitlePage = (pdf: jsPDF, abilityCount: number) => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // White background to save ink
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Simple border
  pdf.setDrawColor(100, 100, 100);
  pdf.setLineWidth(1);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
  
  // Main title
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ASHES OF VARNHAL', pageWidth / 2, 50, { align: 'center' });
  
  // Subtitle
  pdf.setFontSize(18);
  pdf.setTextColor(50, 50, 50);
  pdf.text('WEAPON ABILITIES GLOSSARY', pageWidth / 2, 70, { align: 'center' });
  
  // Description
  pdf.setFontSize(11);
  pdf.setTextColor(80, 80, 80);
  pdf.text('Master the arcane properties and devastating effects of weapons', pageWidth / 2, 85, { align: 'center' });
  
  // Ability count
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Total Abilities: ${abilityCount}`, pageWidth / 2, 100, { align: 'center' });
  
  // Instructions box
  const instructionsY = 120;
  const instructionsHeight = 60;
  
  pdf.setFillColor(240, 240, 240);
  pdf.rect(20, instructionsY, pageWidth - 40, instructionsHeight, 'F');
  pdf.setDrawColor(100, 100, 100);
  pdf.rect(20, instructionsY, pageWidth - 40, instructionsHeight, 'S');
  
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text('REFERENCE GUIDE', pageWidth / 2, instructionsY + 12, { align: 'center' });
  
  pdf.setFontSize(9);
  pdf.setTextColor(60, 60, 60);
  const instructions = [
    '• This guide contains all weapon abilities from the game',
    '• Use as a quick reference during gameplay',
    '• Each ability is clearly defined with its effects',
    '• Perfect for new players learning the system',
    '• Print and keep at your gaming table'
  ];
  
  instructions.forEach((instruction, index) => {
    pdf.text(instruction, 30, instructionsY + 25 + (index * 6));
  });
  
  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 100);
  pdf.text('Generated from Ashes of Varnhal Builder', pageWidth / 2, pageHeight - 15, { align: 'center' });
};

const drawAbilityText = (pdf: jsPDF, ability: WeaponAbility, x: number, y: number, width: number): number => {
  // Ability name
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text(ability.name, x, y);
  
  // Description
  pdf.setTextColor(40, 40, 40);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  
  // Word wrap for description
  const maxWidth = width;
  const lines = splitTextToSize(pdf, ability.description, maxWidth);
  
  let descriptionY = y + 4;
  lines.forEach((line, index) => {
    pdf.text(line, x, descriptionY + (index * 4));
  });
  
  // Calculate total height used
  const descriptionHeight = lines.length * 4;
  const totalHeight = 4 + descriptionHeight;
  
  return y + totalHeight;
};

export const downloadKeywordsPDF = (abilities: WeaponAbility[]) => {
  const pdf = generateKeywordsPDF(abilities);
  pdf.save('ashes-of-varnhal-weapon-abilities.pdf');
};

export const generateWarbandPDF = (units: Unit[]) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const margin = 15;
  const cardWidth = 90;
  const cardHeight = 60;
  const cardsPerRow = 2;
  const cardsPerPage = 6;

  // Title page
  createWarbandTitlePage(pdf, units.length);

  // Generate card pages
  for (let i = 0; i < units.length; i += cardsPerPage) {
    if (i > 0) {
      pdf.addPage();
    } else {
      pdf.addPage();
    }
    const pageUnits = units.slice(i, i + cardsPerPage);
    pageUnits.forEach((unit, i) => {
      const row = Math.floor(i / cardsPerRow);
      const col = i % cardsPerRow;
      const x = margin + (col * (cardWidth + 10));
      const y = margin + (row * (cardHeight + 10));
      drawUnitCard(pdf, unit, x, y, cardWidth, cardHeight);
    });
  }
  return pdf;
};

const createWarbandTitlePage = (pdf: jsPDF, unitCount: number) => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  pdf.setFillColor(20, 20, 20);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  pdf.setDrawColor(100, 100, 100);
  pdf.setLineWidth(2);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
  pdf.setDrawColor(150, 150, 150);
  pdf.setLineWidth(0.5);
  pdf.rect(15, 15, pageWidth - 30, pageHeight - 30, 'S');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ASHES OF VARNHAL', pageWidth / 2, 60, { align: 'center' });
  pdf.setFontSize(20);
  pdf.setTextColor(200, 200, 200);
  pdf.text('WARBAND CARDS', pageWidth / 2, 80, { align: 'center' });
  pdf.setFontSize(12);
  pdf.setTextColor(180, 180, 180);
  pdf.text('Printable cards for your warband units', pageWidth / 2, 100, { align: 'center' });
  pdf.setFontSize(16);
  pdf.setTextColor(255, 255, 255);
  pdf.text(`Total Units: ${unitCount}`, pageWidth / 2, 120, { align: 'center' });
  pdf.setFontSize(8);
  pdf.setTextColor(120, 120, 120);
  pdf.text('Generated from Ashes of Varnhal Builder', pageWidth / 2, pageHeight - 20, { align: 'center' });
};

const drawUnitCard = (pdf: jsPDF, unit: Unit, x: number, y: number, width: number, height: number) => {
  // Card background
  pdf.setFillColor(35, 35, 35);
  pdf.rect(x, y, width, height, 'F');
  pdf.setDrawColor(80, 80, 80);
  pdf.setLineWidth(0.8);
  pdf.rect(x, y, width, height, 'S');
  pdf.setDrawColor(120, 120, 120);
  pdf.setLineWidth(0.3);
  pdf.rect(x + 1, y + 1, width - 2, height - 2, 'S');
  // Card title background (taller)
  pdf.setFillColor(50, 50, 50);
  pdf.rect(x + 2, y + 2, width - 4, 18, 'F');
  pdf.setDrawColor(150, 150, 150);
  pdf.setLineWidth(0.2);
  pdf.rect(x + 2, y + 2, width - 4, 18, 'S');
  // Card title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  let title = unit.name;
  if (pdf.getTextWidth(title) > width - 6) {
    while (pdf.getTextWidth(title + '...') > width - 6 && title.length > 0) {
      title = title.slice(0, -1);
    }
    title += '...';
  }
  pdf.text(title, x + width / 2, y + 9, { align: 'center' });
  // Type & cost (second line)
  pdf.setFontSize(8);
  pdf.setTextColor(200, 200, 200);
  pdf.text(`${unit.type.toUpperCase()} | ${unit.cost} PTS`, x + width / 2, y + 16, { align: 'center' });
  // Stats (move down)
  pdf.setFontSize(7);
  pdf.setTextColor(180, 180, 255);
  const statKeys = Object.keys(unit.stats);
  const statVals = Object.values(unit.stats);
  let statLine = statKeys.map((k, i) => `${k[0].toUpperCase()}:${statVals[i]}`).join('  ');
  pdf.text(statLine, x + width / 2, y + 23, { align: 'center' });
  let currY = y + 27;
  // Abilities
  if (unit.abilities && unit.abilities.length > 0) {
    pdf.setFontSize(7);
    pdf.setTextColor(220, 180, 255);
    pdf.text('Abilities:', x + 3, currY);
    currY += 3.5;
    pdf.setTextColor(220, 220, 220);
    unit.abilities.forEach(ab => {
      const lines = splitTextToSize(pdf, ab.name + ': ' + ab.description, width - 6);
      lines.forEach(line => {
        pdf.text(line, x + 3, currY);
        currY += 3.2;
      });
    });
  }
  // Powers
  if (unit.powers && unit.powers.length > 0) {
    pdf.setFontSize(7);
    pdf.setTextColor(180, 220, 255);
    pdf.text('Powers:', x + 3, currY);
    currY += 3.5;
    pdf.setTextColor(220, 220, 220);
    unit.powers.forEach(power => {
      const lines = splitTextToSize(pdf, power.name + ': ' + power.baseEffect, width - 6);
      lines.forEach(line => {
        pdf.text(line, x + 3, currY);
        currY += 3.2;
      });
    });
  }
  // Weapons
  if (unit.selectedWeapons && unit.selectedWeapons.length > 0) {
    pdf.setFontSize(7);
    pdf.setTextColor(255, 220, 180);
    pdf.text('Weapons:', x + 3, currY);
    currY += 3.5;
    pdf.setTextColor(220, 220, 220);
    unit.selectedWeapons.forEach(weapon => {
      let weaponLine = `${weapon.name} (R:${weapon.range} D:${weapon.dice} C:${weapon.cost})`;
      pdf.text(weaponLine, x + 3, currY);
      currY += 3.2;
      if (weapon.abilities && weapon.abilities.length > 0) {
        weapon.abilities.forEach(wa => {
          pdf.setFontSize(6);
          pdf.setTextColor(200, 200, 255);
          const lines = splitTextToSize(pdf, '• ' + wa, width - 8);
          lines.forEach(line => {
            pdf.text(line, x + 6, currY);
            currY += 2.7;
          });
          pdf.setFontSize(7);
          pdf.setTextColor(220, 220, 220);
        });
      }
      if (weapon.critEffect) {
        pdf.setFontSize(6);
        pdf.setTextColor(255, 180, 180);
        const lines = splitTextToSize(pdf, 'Crit: ' + weapon.critEffect, width - 8);
        lines.forEach(line => {
          pdf.text(line, x + 6, currY);
          currY += 2.7;
        });
        pdf.setFontSize(7);
        pdf.setTextColor(220, 220, 220);
      }
    });
  }
  // Card label
  pdf.setFontSize(7);
  pdf.setTextColor(150, 150, 150);
  pdf.text('UNIT', x + width - 6, y + height - 6, { align: 'right' });
};

export const downloadWarbandPDF = (units: Unit[]) => {
  const pdf = generateWarbandPDF(units);
  pdf.save('ashes-of-varnhal-warband.pdf');
}; 