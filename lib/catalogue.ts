export const industries = [
  {
    key: 'coatings',
    name: 'Coatings, adhesives & sealants',
    description:
      'Find chemistry for surface performance, bonding, and protective formulations.',
  },
  {
    key: 'plastics',
    name: 'Plastics & rubber',
    description:
      'Source monomers, intermediates, and additives for your polymer applications.',
  },
  {
    key: 'industrial',
    name: 'Industrial & petrochemicals',
    description:
      'Connect with a sourcing partner for the raw materials behind your processes.',
  },
  {
    key: 'oil-gas',
    name: 'Oil, gas & drilling',
    description:
      'Discuss materials for drilling fluids, lubrication, and corrosion control.',
  },
  {
    key: 'nutrition',
    name: 'Nutrition & botanicals',
    description:
      'Share your ingredient specifications and documentation requirements with our team.',
  },
  {
    key: 'personal-care',
    name: 'Cosmetics & personal care',
    description:
      'Explore ingredients for personal care development and manufacturing.',
  },
  {
    key: 'flavor',
    name: 'Flavor & fragrance',
    description:
      'Bring your raw material requirements to a team with global sourcing connections.',
  },
  {
    key: 'food',
    name: 'Food & beverage',
    description:
      'Tell us your ingredient, grade, and application so we can explore sourcing options.',
  },
];
export const products = [
  {
    slug: 'maleic-acid',
    name: 'Maleic Acid',
    cas: '110-16-7',
    formula: 'C4H4O4',
    synonyms: ['cis-Butenedioic acid', '(Z)-But-2-enedioic acid'],
    family: 'Chemical intermediates',
    form: 'Solid',
    industries: ['coatings', 'plastics', 'industrial'],
    description:
      'Maleic acid is an intermediate used in the manufacture of lubricant additives, plasticizers, resins, surface coatings, and agricultural chemicals.',
    applications: [
      'Resins and surface coatings',
      'Lubricant additives',
      'Plasticizers',
      'Chemical intermediates',
    ],
    specifications: [
      ['Appearance', 'White crystalline powder'],
      ['Assay', '99.0% minimum'],
      ['Water', '1.0% maximum'],
      ['Fumaric acid', '1% maximum'],
      ['Melting point', '130–134 °C'],
      ['Packaging listed', '100 kg drum'],
    ],
    source: 'https://chemstock.com/maleic-acid/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/444266',
  },
  {
    slug: 'sebacic-acid',
    name: 'Sebacic Acid',
    cas: '111-20-6',
    formula: 'C10H18O4',
    synonyms: ['Decanedioic acid', 'SBA'],
    family: 'Oleochemicals',
    form: 'Solid',
    industries: [
      'coatings',
      'plastics',
      'industrial',
      'oil-gas',
      'personal-care',
    ],
    description:
      'Sebacic acid is a castor oil derived dicarboxylic acid used in polymers, plasticizers, lubricants, and corrosion-control applications.',
    applications: [
      'Polymers and plasticizers',
      'Lubricants and oil additives',
      'Corrosion control',
      'Coatings and cosmetics',
    ],
    specifications: [
      ['Appearance', 'White powder'],
      ['Purity', '99.5% minimum'],
      ['Water content', '0.3% maximum'],
      ['Acid number', '550 mg KOH/g minimum'],
      ['Melting point', '130–134 °C'],
      ['Packaging', 'Confirm with our team'],
    ],
    source: 'https://chemstock.com/sebacic-acid/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/5192',
  },
  {
    slug: 'methyl-methacrylate',
    name: 'Methyl Methacrylate',
    cas: '80-62-6',
    formula: 'C5H8O2',
    synonyms: [
      'MMA',
      'Methacrylic acid methyl ester',
      'Methyl 2-methylpropenoate',
    ],
    family: 'Monomers',
    form: 'Liquid',
    industries: ['coatings', 'plastics', 'industrial'],
    description:
      'Methyl methacrylate is a monomer used as a building block for acrylic materials, resins, and coating applications.',
    applications: ['Acrylic materials', 'Resins', 'Coating applications'],
    specifications: [
      ['Appearance', 'Clear, colorless liquid'],
      ['Grade and purity', 'Confirm with our team'],
      ['Inhibitor specification', 'Confirm for your application'],
      ['Packaging', 'Confirm with our team'],
    ],
    source: 'https://chemstock.com/methyl-methacrylate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/6658',
  },
];
export type Product = (typeof products)[number];
export function searchProducts(query: string, industry = 'all', form = 'all') {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[\s\-(),]/g, '')
      .replace(/[₀-₉]/g, (c) => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(c)));
  const q = normalize(query);
  return products
    .filter(
      (p) =>
        (industry === 'all' || p.industries.includes(industry)) &&
        (form === 'all' || p.form === form) &&
        [
          p.name,
          p.cas,
          p.formula,
          p.family,
          ...p.synonyms,
          ...p.applications,
        ].some((v) => normalize(v).includes(q)),
    )
    .sort((a, b) => {
      const exact = (p: Product) =>
        [p.name, p.cas, ...p.synonyms].some((v) => normalize(v) === q) ? 0 : 1;
      return exact(a) - exact(b) || a.name.localeCompare(b.name);
    });
}
