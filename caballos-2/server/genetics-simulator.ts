/**
 * Mendelian Genetics Simulator for Horse Coat Colors
 * Based on the comprehensive genetic guide
 */

export type Allele = string;
export type Gene = [Allele, Allele];

export interface GeneticProfile {
  extensionGene: Gene; // E/e
  agoutiGene: Gene; // A/a
  creamGene?: Gene; // N/Cr
  pearlGene?: Gene; // N/Prl
  dunGene?: Gene; // N/D
  silverGene?: Gene; // N/Z
  champagneGene?: Gene; // N/Ch
  grayGene?: Gene; // N/G
  roanGene?: Gene; // N/Rn
  tobianoGene?: Gene; // N/TO
  frameGene?: Gene; // N/O
  sabinoGene?: Gene; // N/SB1
  splashedWhiteGene?: Gene; // N/SW
  leopardComplexGene?: Gene; // N/LP
  pangareModifier?: boolean;
  rabicanoModifier?: boolean;
  flaxenModifier?: boolean;
  sootyModifier?: boolean;
}

export interface OffspringProbability {
  genetics: GeneticProfile;
  phenotype: string;
  baseCoat: string;
  dilutions: string[];
  patterns: string[];
  modifiers: string[];
  probability: number;
  isLethal: boolean;
}

/**
 * Randomly select one allele from a gene pair
 */
function selectRandomAllele(gene: Gene): Allele {
  return gene[Math.random() < 0.5 ? 0 : 1];
}

/**
 * Cross two genes following Mendelian inheritance
 */
function crossGenes(sireGene: Gene, damGene: Gene): Gene[] {
  const sireAlleles = sireGene;
  const damAlleles = damGene;
  const possibilities: Gene[] = [];

  for (const sireAllele of sireAlleles) {
    for (const damAllele of damAlleles) {
      possibilities.push([sireAllele, damAllele]);
    }
  }

  return possibilities;
}

/**
 * Normalize gene notation (sort alleles for consistency)
 * Dominant alleles come first
 */
function normalizeGene(gene: Gene): Gene {
  const [a1, a2] = gene;

  // List of dominant alleles (come first)
  const dominantAlleles = ['E', 'A', 'Cr', 'Prl', 'D', 'Z', 'Ch', 'G', 'Rn', 'TO', 'O', 'SB1', 'SW', 'LP'];

  const isDominant = (allele: string) => dominantAlleles.some(d => allele.includes(d) && !allele.startsWith('N'));

  if (isDominant(a1) && !isDominant(a2)) {
    return [a1, a2];
  } else if (!isDominant(a1) && isDominant(a2)) {
    return [a2, a1];
  }

  return gene;
}

/**
 * Convert gene to string notation
 */
function geneToString(gene: Gene): string {
  const [a1, a2] = normalizeGene(gene);

  // If both alleles are the same
  if (a1 === a2) {
    // Homozygous
    if (a1 === 'N') return 'N/N';
    if (a1 === 'e') return 'ee';
    if (a1 === 'a') return 'aa';
    if (a1.length === 1) return a1 + a1; // EE, AA, etc.
    return `${a1}/${a2}`;
  }

  // Heterozygous
  if (a1 === 'E' && a2 === 'e') return 'Ee';
  if (a1 === 'A' && a2 === 'a') return 'Aa';

  // Dilution and pattern genes
  return `${a1}/${a2}`;
}

/**
 * Check if a genetic combination is lethal
 */
function isLethalCombination(genetics: GeneticProfile): boolean {
  // Frame Overo O/O is lethal (OLWS - Overo Lethal White Syndrome)
  if (genetics.frameGene && genetics.frameGene[0] === 'O' && genetics.frameGene[1] === 'O') {
    return true;
  }

  // Gray G/G may be lethal or cause increased melanoma risk
  if (genetics.grayGene && genetics.grayGene[0] === 'G' && genetics.grayGene[1] === 'G') {
    return true;
  }

  // Roan Rn/Rn may be lethal
  if (genetics.roanGene && genetics.roanGene[0] === 'Rn' && genetics.roanGene[1] === 'Rn') {
    return true;
  }

  return false;
}

/**
 * Determine base coat from Extension and Agouti genes
 */
function determineBaseCoat(extensionGene: Gene, agoutiGene: Gene): string {
  const eString = geneToString(extensionGene);
  const aString = geneToString(agoutiGene);

  // Alazán: ee (homozygous recessive for Extension)
  if (eString === 'ee') {
    return 'alazán';
  }

  // Negro: E_ aa (at least one E, homozygous recessive for Agouti)
  if (aString === 'aa') {
    return 'negro';
  }

  // Castaño: E_ A_ (at least one E and at least one A)
  return 'castaño';
}

/**
 * Determine phenotype from genetics
 */
function determinePhenotype(genetics: GeneticProfile): {
  phenotype: string;
  baseCoat: string;
  dilutions: string[];
  patterns: string[];
  modifiers: string[];
} {
  const baseCoat = determineBaseCoat(genetics.extensionGene, genetics.agoutiGene);
  const dilutions: string[] = [];
  const patterns: string[] = [];
  const modifiers: string[] = [];

  let phenotype = baseCoat;

  // Check for dilutions
  if (genetics.creamGene) {
    const creamStr = geneToString(genetics.creamGene);
    if (creamStr === 'Cr/Cr') {
      // Double cream
      if (baseCoat === 'alazán') {
        phenotype = 'cremello';
        dilutions.push('doble crema');
      } else if (baseCoat === 'castaño') {
        phenotype = 'perlino';
        dilutions.push('doble crema');
      } else if (baseCoat === 'negro') {
        phenotype = 'smoky cream';
        dilutions.push('doble crema');
      }
    } else if (creamStr.includes('Cr')) {
      // Single cream
      if (baseCoat === 'alazán') {
        phenotype = 'palomino';
        dilutions.push('crema');
      } else if (baseCoat === 'castaño') {
        phenotype = 'buckskin';
        dilutions.push('crema');
      } else if (baseCoat === 'negro') {
        phenotype = 'smoky black';
        dilutions.push('crema');
      }
    }
  }

  if (genetics.dunGene) {
    const dunStr = geneToString(genetics.dunGene);
    if (dunStr.includes('D')) {
      if (baseCoat === 'alazán') {
        phenotype = 'red dun';
        dilutions.push('dun');
      } else if (baseCoat === 'castaño') {
        phenotype = 'bay dun';
        dilutions.push('dun');
      } else if (baseCoat === 'negro') {
        phenotype = 'grullo';
        dilutions.push('dun');
      }
    }
  }

  if (genetics.silverGene) {
    const silverStr = geneToString(genetics.silverGene);
    if (silverStr.includes('Z')) {
      if (baseCoat === 'castaño') {
        phenotype = 'silver bay';
        dilutions.push('plata');
      } else if (baseCoat === 'negro') {
        phenotype = 'silver black';
        dilutions.push('plata');
      }
    }
  }

  if (genetics.pearlGene) {
    const pearlStr = geneToString(genetics.pearlGene);
    if (pearlStr === 'Prl/Prl') {
      dilutions.push('doble perla');
    } else if (pearlStr.includes('Prl') && genetics.creamGene && geneToString(genetics.creamGene).includes('Cr')) {
      dilutions.push('perla + crema');
    }
  }

  // Check for patterns
  if (genetics.grayGene && geneToString(genetics.grayGene).includes('G')) {
    patterns.push('tordo');
    phenotype = `${phenotype} tordo`;
  }

  if (genetics.roanGene && geneToString(genetics.roanGene).includes('Rn')) {
    if (baseCoat === 'alazán') {
      patterns.push('red roan');
      phenotype = 'red roan';
    } else if (baseCoat === 'castaño') {
      patterns.push('bay roan');
      phenotype = 'bay roan';
    } else if (baseCoat === 'negro') {
      patterns.push('blue roan');
      phenotype = 'blue roan';
    }
  }

  if (genetics.tobianoGene && geneToString(genetics.tobianoGene).includes('TO')) {
    patterns.push('tobiano');
    phenotype = `${phenotype} tobiano`;
  }

  if (genetics.frameGene && geneToString(genetics.frameGene).includes('O')) {
    patterns.push('frame overo');
    phenotype = `${phenotype} overo`;
  }

  if (genetics.sabinoGene && geneToString(genetics.sabinoGene).includes('SB1')) {
    patterns.push('sabino');
    phenotype = `${phenotype} sabino`;
  }

  if (genetics.splashedWhiteGene && geneToString(genetics.splashedWhiteGene).includes('SW')) {
    patterns.push('splashed white');
    phenotype = `${phenotype} splashed`;
  }

  if (genetics.leopardComplexGene && geneToString(genetics.leopardComplexGene).includes('LP')) {
    patterns.push('appaloosa');
    phenotype = `${phenotype} appaloosa`;
  }

  // Check for modifiers
  if (genetics.pangareModifier) {
    modifiers.push('pangaré');
    phenotype = `${phenotype} pangaré`;
  }

  if (genetics.rabicanoModifier) {
    modifiers.push('rabicano');
  }

  if (genetics.flaxenModifier && baseCoat === 'alazán') {
    modifiers.push('flaxen');
    phenotype = `${phenotype} flaxen`;
  }

  if (genetics.sootyModifier) {
    modifiers.push('sooty');
  }

  return {
    phenotype: phenotype.charAt(0).toUpperCase() + phenotype.slice(1),
    baseCoat,
    dilutions,
    patterns,
    modifiers,
  };
}

/**
 * Simulate breeding between two horses
 */
export function simulateBreeding(
  sireGenetics: GeneticProfile,
  damGenetics: GeneticProfile
): OffspringProbability[] {
  const results: Map<string, OffspringProbability> = new Map();

  // Generate all possible Extension x Agouti combinations
  const extensionCrosses = crossGenes(sireGenetics.extensionGene, damGenetics.extensionGene);
  const agoutiCrosses = crossGenes(sireGenetics.agoutiGene, damGenetics.agoutiGene);

  const totalCombinations = extensionCrosses.length * agoutiCrosses.length;
  const baseProbability = 1 / totalCombinations;

  for (const extensionGene of extensionCrosses) {
    for (const agoutiGene of agoutiCrosses) {
      const offspring: GeneticProfile = {
        extensionGene,
        agoutiGene,
      };

      // Add dilution genes if present
      if (sireGenetics.creamGene && damGenetics.creamGene) {
        const creamCrosses = crossGenes(sireGenetics.creamGene, damGenetics.creamGene);
        offspring.creamGene = creamCrosses[0]; // Simplified: taking first possibility
      }

      if (sireGenetics.dunGene && damGenetics.dunGene) {
        const dunCrosses = crossGenes(sireGenetics.dunGene, damGenetics.dunGene);
        offspring.dunGene = dunCrosses[0];
      }

      if (sireGenetics.silverGene && damGenetics.silverGene) {
        const silverCrosses = crossGenes(sireGenetics.silverGene, damGenetics.silverGene);
        offspring.silverGene = silverCrosses[0];
      }

      // Add pattern genes if present
      if (sireGenetics.grayGene && damGenetics.grayGene) {
        const grayCrosses = crossGenes(sireGenetics.grayGene, damGenetics.grayGene);
        offspring.grayGene = grayCrosses[0];
      }

      if (sireGenetics.roanGene && damGenetics.roanGene) {
        const roanCrosses = crossGenes(sireGenetics.roanGene, damGenetics.roanGene);
        offspring.roanGene = roanCrosses[0];
      }

      // Modifiers (simplified as boolean inheritance)
      offspring.pangareModifier = sireGenetics.pangareModifier || damGenetics.pangareModifier;
      offspring.rabicanoModifier = sireGenetics.rabicanoModifier || damGenetics.rabicanoModifier;
      offspring.flaxenModifier = sireGenetics.flaxenModifier && damGenetics.flaxenModifier;

      const { phenotype, baseCoat, dilutions, patterns, modifiers } = determinePhenotype(offspring);
      const isLethal = isLethalCombination(offspring);

      // Group by phenotype
      const key = phenotype;
      if (results.has(key)) {
        const existing = results.get(key)!;
        existing.probability += baseProbability;
      } else {
        results.set(key, {
          genetics: offspring,
          phenotype,
          baseCoat,
          dilutions,
          patterns,
          modifiers,
          probability: baseProbability,
          isLethal,
        });
      }
    }
  }

  return Array.from(results.values());
}

/**
 * Parse genotype string to Gene
 */
export function parseGenotype(genotype: string): Gene {
  if (genotype.includes('/')) {
    const [a1, a2] = genotype.split('/');
    return [a1, a2];
  }

  if (genotype.length === 2) {
    return [genotype[0], genotype[1]];
  }

  // Default to N/N for missing data
  return ['N', 'N'];
}
