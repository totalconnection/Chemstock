import { brochureProducts } from './brochure-catalogue';

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
export type Product = {
  slug: string;
  name: string;
  cas: string;
  formula: string;
  synonyms: string[];
  family: string;
  form: 'Solid' | 'Liquid' | 'Confirm with our team';
  industries: string[];
  description: string;
  applications: string[];
  specifications: [string, string][];
  source: string;
  identitySource: string;
};

export const products: Product[] = [
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
  {
    slug: '911p',
    name: '911P Plasticizer',
    cas: '68515-43-5',
    formula: 'Variable mixture',
    synonyms: ['911P', 'Di-C9-11 phthalate', 'Di-(C9-C11 alkyl) phthalate'],
    family: 'Phthalate plasticizers',
    form: 'Confirm with our team',
    industries: ['plastics', 'industrial'],
    description:
      'A mixed C9–C11 dialkyl phthalate plasticizer listed by Chemstock for PVC, vinyl dispersions, wire, and cable applications.',
    applications: [
      'PVC sheeting and film',
      'Vinyl dispersions',
      'Wire and cable insulation',
    ],
    specifications: [['Current grade specification', 'Available on request']],
    source: 'https://chemstock.com/911p/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/#query=68515-43-5',
  },
  {
    slug: 'acetic-acid',
    name: 'Acetic Acid',
    cas: '64-19-7',
    formula: 'C2H4O2',
    synonyms: ['Ethanoic acid', 'Glacial acetic acid'],
    family: 'Organic acids and solvents',
    form: 'Liquid',
    industries: ['industrial', 'oil-gas', 'food', 'flavor'],
    description:
      'Acetic acid is a colorless acidic liquid used as a raw material, solvent, acidulant, and pH-adjusting chemistry.',
    applications: [
      'Chemical intermediates',
      'Solvent applications',
      'pH adjustment',
      'Food and flavor processing',
    ],
    specifications: [
      ['Current concentration and grade', 'Available on request'],
    ],
    source: 'https://chemstock.com/acetic-acid/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/176',
  },
  {
    slug: 'benzoic-acid',
    name: 'Benzoic Acid',
    cas: '65-85-0',
    formula: 'C7H6O2',
    synonyms: ['Benzenecarboxylic acid', 'Carboxybenzene'],
    family: 'Aromatic carboxylic acids',
    form: 'Solid',
    industries: ['industrial', 'food', 'flavor', 'personal-care', 'coatings'],
    description:
      'Benzoic acid is an aromatic carboxylic acid listed for intermediate, formulation, and preservation-related applications.',
    applications: [
      'Chemical intermediates',
      'Resins and coatings',
      'Flavor and fragrance',
      'Personal care',
    ],
    specifications: [
      ['Appearance', 'White flakes'],
      ['Assay', '99.98% minimum'],
      ['Water content', '0.1% maximum'],
      ['Sulfated ash', '0.01% maximum'],
      ['Color, APHA', '25 maximum'],
    ],
    source: 'https://chemstock.com/benzoic-acid/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/243',
  },
  {
    slug: 'benzo-triazole',
    name: 'Benzotriazole',
    cas: '95-14-7',
    formula: 'C6H5N3',
    synonyms: ['1,2,3-Benzotriazole', 'BTA', '1H-Benzotriazole'],
    family: 'Corrosion inhibitors',
    form: 'Solid',
    industries: ['industrial', 'oil-gas'],
    description:
      'Benzotriazole is listed by Chemstock as a corrosion inhibitor for copper and copper alloys.',
    applications: [
      'Copper corrosion inhibition',
      'Industrial water systems',
      'Metal protection',
    ],
    specifications: [
      ['Appearance', 'Needle-like powder'],
      ['Assay', '99.0% minimum'],
      ['Moisture', '0.1% maximum'],
      ['Ash', '0.05% maximum'],
      ['Melting range', '95–98.5 °C'],
    ],
    source: 'https://chemstock.com/benzo-triazole/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/7220',
  },
  {
    slug: 'butyl-benzyl-phthalate',
    name: 'Butyl Benzyl Phthalate',
    cas: '85-68-7',
    formula: 'C19H20O4',
    synonyms: ['BBP', 'Benzyl butyl phthalate'],
    family: 'Phthalate plasticizers',
    form: 'Liquid',
    industries: ['plastics', 'coatings', 'industrial'],
    description:
      'BBP is a high-solvating plasticizer listed for PVC, cellulosic resins, flooring, sealants, caulks, and coatings.',
    applications: [
      'PVC and flooring',
      'Sealants and caulks',
      'Adhesives',
      'Coatings',
    ],
    specifications: [
      ['Acid number', '0.1 mg KOH/g maximum'],
      ['Water', '0.1% maximum'],
      ['Color, Hazen', '40 maximum'],
    ],
    source: 'https://chemstock.com/butyl-benzyl-phthalate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/2347',
  },
  {
    slug: 'dibutyl-maleate',
    name: 'Dibutyl Maleate',
    cas: '105-76-0',
    formula: 'C12H20O4',
    synonyms: ['DBM', 'Maleic acid dibutyl ester'],
    family: 'Maleate plasticizers',
    form: 'Liquid',
    industries: ['coatings', 'plastics', 'industrial'],
    description:
      'Dibutyl maleate is a liquid maleate ester listed for adhesives, paints, coatings, and water-resistant film applications.',
    applications: ['Adhesives', 'Paints and coatings', 'Water-resistant films'],
    specifications: [
      ['Appearance', 'Clear liquid'],
      ['Water', '500 mg/kg maximum'],
      ['Density at 20 °C', '0.993–0.995 g/cm³'],
      ['Color, platinum-cobalt', '25 maximum'],
      ['Acid value', '0.20 mg KOH/g maximum'],
    ],
    source: 'https://chemstock.com/dibutyl-maleate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/5271565',
  },
  {
    slug: 'dibutyl-sebacate',
    name: 'Dibutyl Sebacate',
    cas: '109-43-3',
    formula: 'C18H34O4',
    synonyms: ['DBS', 'Sebacic acid dibutyl ester'],
    family: 'Sebacate plasticizers',
    form: 'Liquid',
    industries: ['plastics', 'industrial', 'coatings'],
    description:
      'Dibutyl sebacate is a sebacate ester plasticizer listed for synthetic resins, rubbers, and film-coating applications.',
    applications: [
      'Synthetic resins',
      'Rubber',
      'Plasticizer systems',
      'Film coatings',
    ],
    specifications: [
      ['Acid number', '0.1 maximum'],
      ['Refractive index', '1.429–1.441'],
      ['Saponification number', '352–357'],
    ],
    source: 'https://chemstock.com/dibutyl-sebacate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/8066',
  },
  {
    slug: 'dicyandiamide',
    name: 'Dicyandiamide',
    cas: '461-58-5',
    formula: 'C2H4N4',
    synonyms: ['DICY', 'Cyanoguanidine'],
    family: 'Nitrogen intermediates',
    form: 'Solid',
    industries: ['coatings', 'industrial'],
    description:
      'Dicyandiamide is a crystalline intermediate listed for melamine production, epoxy curing, laminates, coatings, adhesives, and fertilizer formulations.',
    applications: [
      'Epoxy curing',
      'Powder coatings',
      'Circuit-board laminates',
      'Fertilizer formulations',
    ],
    specifications: [
      ['Purity', '99.5% minimum'],
      ['Moisture, 105 °C / 2 h', '0.05% maximum'],
      ['Ash', '0.05% maximum'],
      ['Iron', '10 ppm maximum'],
      ['Packaging listed', '25 kg net bags'],
    ],
    source: 'https://chemstock.com/dicyandiamide/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/10005',
  },
  {
    slug: 'diisodecyl-phthalate',
    name: 'Diisodecyl Phthalate',
    cas: '26761-40-0',
    formula: 'C28H46O4',
    synonyms: ['DIDP', 'Diisodecyl phthalate'],
    family: 'Phthalate plasticizers',
    form: 'Liquid',
    industries: ['plastics', 'coatings', 'industrial'],
    description:
      'DIDP is a high-molecular-weight phthalate plasticizer listed for PVC, wire, cable, and other vinyl products.',
    applications: [
      'PVC compounds',
      'Wire and cable',
      'Vinyl products',
      'Resins and coatings',
    ],
    specifications: [
      ['Appearance', 'Clear liquid'],
      ['Purity', '99.4% minimum'],
      ['Water content', '0.1% maximum'],
      ['Color, APHA / Hazen', '30 maximum'],
      ['Acid value', '0.10 mg KOH/g maximum'],
      ['Specific gravity', '0.964–0.968 g/mL'],
    ],
    source: 'https://chemstock.com/diisodecyl-phthalate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/#query=26761-40-0',
  },
  {
    slug: 'diisononyl-phthalate',
    name: 'Diisononyl Phthalate',
    cas: '14103-61-8',
    formula: 'C26H44O4',
    synonyms: ['DINP', 'Phthalic acid diisononyl ester'],
    family: 'Phthalate plasticizers',
    form: 'Liquid',
    industries: ['plastics', 'industrial'],
    description:
      'DINP is a phthalate plasticizer listed for PVC, vinyl, flooring, automotive interiors, and flexible plastic products.',
    applications: [
      'PVC compounds',
      'Vinyl flooring',
      'Automotive interiors',
      'Pigment dispersions',
    ],
    specifications: [
      ['Assay', '99.6% minimum'],
      ['Density at 20 °C', '0.970–0.974'],
      ['Refractive index at 20 °C', '1.485–1.487'],
      ['Acid number', '0.07 mg KOH/g maximum'],
      ['Water content', '0.05% maximum'],
      ['Color, Pt-Co', '30 maximum'],
    ],
    source: 'https://chemstock.com/diisononyl-phthalate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/#query=14103-61-8',
  },
  {
    slug: 'dimethyl-sebacate',
    name: 'Dimethyl Sebacate',
    cas: '106-79-6',
    formula: 'C12H22O4',
    synonyms: ['DMS', 'Dimethyl decanedioate', 'Sebacic acid dimethyl ester'],
    family: 'Sebacate esters',
    form: 'Solid',
    industries: ['plastics', 'coatings', 'industrial'],
    description:
      'Dimethyl sebacate is listed as a solvent, plasticizer, resin and rubber softener, intermediate, and raw material for light stabilizers.',
    applications: [
      'Solvent systems',
      'Plasticizers',
      'Resin and rubber softening',
      'Light stabilizer intermediates',
    ],
    specifications: [['Current grade specification', 'Available on request']],
    source: 'https://chemstock.com/dimethyl-sebacate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/7799',
  },
  {
    slug: 'dioctyl-maleate',
    name: 'Dioctyl Maleate',
    cas: '142-16-5',
    formula: 'C20H36O4',
    synonyms: ['DOM', 'Bis(2-ethylhexyl) maleate', 'Di(2-ethylhexyl) maleate'],
    family: 'Maleate plasticizers',
    form: 'Liquid',
    industries: ['plastics', 'industrial'],
    description:
      'Dioctyl maleate is a maleate ester plasticizer offered for industrial formulation and polymer applications.',
    applications: [
      'Plasticizer systems',
      'Industrial formulations',
      'Polymer modification',
    ],
    specifications: [
      ['Color, APHA', '40 maximum'],
      ['Refractive index at 27 °C', '1.444–1.456'],
      ['Volatile loss, 130 °C / 3 h', '0.2% maximum'],
      ['Ester value', '327–333 mg KOH/g'],
      ['Acidity as maleic acid', '0.02% maximum'],
      ['Moisture', '0.1% maximum'],
    ],
    source: 'https://chemstock.com/dioctyl-maleate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/9417',
  },
  {
    slug: 'dioctyl-phthalate',
    name: 'Dioctyl Phthalate',
    cas: '117-81-7',
    formula: 'C24H38O4',
    synonyms: ['DOP', 'DEHP', 'Bis(2-ethylhexyl) phthalate'],
    family: 'Phthalate plasticizers',
    form: 'Liquid',
    industries: ['plastics', 'industrial', 'coatings'],
    description:
      'Dioctyl phthalate is a liquid phthalate plasticizer listed for flexible vinyl, resins, elastomers, adhesives, and coatings.',
    applications: [
      'Flexible vinyl',
      'Resins and elastomers',
      'Adhesives',
      'Coatings',
    ],
    specifications: [
      ['Appearance', 'Clear and free from suspended matter'],
      ['Refractive index at 20 °C', '1.4860–1.4880'],
      ['Total esters', '99% minimum'],
      ['Density at 20 °C', '0.983–0.986 g/cm³'],
      ['Acidity as phthalic acid', '0.01 maximum'],
      ['Color, APHA', '25 maximum'],
      ['Packaging listed', '200 kg'],
    ],
    source: 'https://chemstock.com/dioctyl-phthalate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/8343',
  },
  {
    slug: 'dioctyl-sebacate',
    name: 'Dioctyl Sebacate',
    cas: '122-62-3',
    formula: 'C26H50O4',
    synonyms: ['DOS', 'DEHS', 'Bis(2-ethylhexyl) sebacate'],
    family: 'Sebacate plasticizers',
    form: 'Liquid',
    industries: ['plastics', 'industrial'],
    description:
      'Dioctyl sebacate is a low-temperature plasticizer listed for PVC, styrenic resins, synthetic rubber, and wire and cable jackets.',
    applications: [
      'Low-temperature PVC',
      'Synthetic rubber',
      'Wire and cable jackets',
      'Insulation compounds',
    ],
    specifications: [
      ['Assay', '99.0% minimum'],
      ['Color, APHA', '50 maximum'],
      ['Acidity', '0.02% maximum'],
      ['Specific gravity at 28 °C', '0.913–0.919'],
      ['Loss on drying', '0.3% maximum'],
    ],
    source: 'https://chemstock.com/dioctyl-sebacate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/31218',
  },
  {
    slug: 'disodium-sebacate',
    name: 'Disodium Sebacate',
    cas: '17265-14-4',
    formula: 'C10H16Na2O4',
    synonyms: ['DSS', 'Disodium decanedioate', 'Sebacic acid disodium salt'],
    family: 'Sebacate salts',
    form: 'Solid',
    industries: ['industrial', 'oil-gas', 'personal-care'],
    description:
      'Disodium sebacate is a castor-derived sebacate salt listed for detergents, cosmetics, lubricants, corrosion inhibition, and coolant applications.',
    applications: [
      'Corrosion inhibitors',
      'Lubricants and greases',
      'Detergents',
      'Coolant systems',
    ],
    specifications: [['Current grade specification', 'Available on request']],
    source: 'https://chemstock.com/disodium-sebacate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/#query=17265-14-4',
  },
  {
    slug: 'diundecyl-phthalate',
    name: 'Diundecyl Phthalate',
    cas: '96507-86-7',
    formula: 'C30H50O4',
    synonyms: ['DUP', 'Diisoundecyl phthalate'],
    family: 'Phthalate plasticizers',
    form: 'Liquid',
    industries: ['plastics', 'industrial'],
    description:
      'Diundecyl phthalate is a high-molecular-weight plasticizer mixture listed for PVC and other plastics.',
    applications: [
      'PVC plasticization',
      'Flexible plastic compounds',
      'Industrial polymer formulations',
    ],
    specifications: [['Current grade specification', 'Available on request']],
    source: 'https://chemstock.com/diundecyl-phthalate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/#query=96507-86-7',
  },
  {
    slug: 'epoxidized-soybean-oil',
    name: 'Epoxidized Soybean Oil',
    cas: '8013-07-8',
    formula: 'Variable mixture',
    synonyms: ['ESBO', 'ESO', 'Soybean oil, epoxidized'],
    family: 'Epoxidized vegetable oils',
    form: 'Liquid',
    industries: ['plastics', 'coatings', 'industrial'],
    description:
      'Epoxidized soybean oil is a functional vegetable-oil derivative listed for PVC stabilization, coatings, sealants, inks, and specialty fluids.',
    applications: [
      'PVC stabilization',
      'Coatings and inks',
      'Sealants',
      'Functional fluids',
    ],
    specifications: [
      ['Oxirane oxygen', '7.0% minimum'],
      ['Iodine value', '1.5 maximum'],
      ['Acid value', '0.5 maximum'],
      ['Color, APHA', '150 maximum'],
      ['Specific gravity at 25/25 °C', '0.993'],
      ['Moisture', '0.05% maximum'],
      ['Volatiles', '0.05% maximum'],
    ],
    source: 'https://chemstock.com/epoxidized-soybean-oil/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/#query=8013-07-8',
  },
  {
    slug: 'ethyl-acrylate',
    name: 'Ethyl Acrylate',
    cas: '140-88-5',
    formula: 'C5H8O2',
    synonyms: ['Acrylic acid ethyl ester', 'Ethyl propenoate'],
    family: 'Acrylate monomers',
    form: 'Liquid',
    industries: ['coatings', 'plastics', 'industrial'],
    description:
      'Ethyl acrylate is an acrylic ester monomer listed for paints, textiles, nonwoven fibers, and polymer applications.',
    applications: [
      'Paints and coatings',
      'Textile chemistry',
      'Nonwoven fibers',
      'Polymer production',
    ],
    specifications: [
      ['Purity', '99.5% minimum'],
      ['Inhibitor, MEHQ', '16 ± 5 ppm'],
      ['Specific gravity at 25 °C', '0.919–0.923'],
    ],
    source: 'https://chemstock.com/ethyl-acrylate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/8821',
  },
  {
    slug: 'hydroquinone',
    name: 'Hydroquinone',
    cas: '123-31-9',
    formula: 'C6H6O2',
    synonyms: ['Benzene-1,4-diol', '1,4-Benzenediol'],
    family: 'Phenolic intermediates',
    form: 'Solid',
    industries: ['industrial', 'plastics', 'personal-care'],
    description:
      'Hydroquinone is a reducing agent and polymerization inhibitor listed for chemical-intermediate and specialty formulation uses.',
    applications: [
      'Polymerization inhibition',
      'Antioxidant systems',
      'Chemical intermediates',
      'Reducing agent',
    ],
    specifications: [
      ['Assay', '99% minimum'],
      ['Melting point', '170.5 °C minimum'],
      ['Water when shipped', '0.3% maximum'],
      ['Appearance', 'Off-white or slightly yellow crystalline powder'],
      ['Residue on ignition', '0.3% maximum'],
    ],
    source: 'https://chemstock.com/hydroquinone/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/785',
  },
  {
    slug: 'imadazole-hydrochloride',
    name: 'Imidazole Hydrochloride',
    cas: '1467-16-9',
    formula: 'C3H5ClN2',
    synonyms: ['Imidazolium chloride', 'Imidazole hydrochloride'],
    family: 'Heterocyclic intermediates',
    form: 'Solid',
    industries: ['industrial'],
    description:
      'Imidazole hydrochloride is listed by Chemstock as an organic specialty-chemical intermediate.',
    applications: ['Chemical intermediate', 'Specialty synthesis'],
    specifications: [['Current grade specification', 'Available on request']],
    source: 'https://chemstock.com/imadazole-hydrochloride/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/#query=1467-16-9',
  },
  {
    slug: 'itaconic-acid',
    name: 'Itaconic Acid',
    cas: '97-65-4',
    formula: 'C5H6O4',
    synonyms: ['Methylenesuccinic acid', '2-Methylenebutanedioic acid'],
    family: 'Unsaturated dicarboxylic acids',
    form: 'Solid',
    industries: ['coatings', 'plastics', 'industrial', 'oil-gas'],
    description:
      'Itaconic acid is an unsaturated dicarboxylic-acid monomer listed for resins, plastics, paints, fibers, and renewable-material chemistry.',
    applications: [
      'Resins and plastics',
      'Paints and coatings',
      'Synthetic fibers',
      'Bio-based polyester chemistry',
    ],
    specifications: [
      ['Assay', '99.5% minimum'],
      ['Iron', '10 ppm maximum'],
      ['Chlorides', '10 ppm maximum'],
      ['Loss on drying', '0.5% maximum'],
      ['Melting range', '165–168 °C'],
      ['Residue on ignition', '0.05% maximum'],
    ],
    source: 'https://chemstock.com/itaconic-acid/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/811',
  },
  {
    slug: 'methyl-acrylate',
    name: 'Methyl Acrylate',
    cas: '96-33-3',
    formula: 'C4H6O2',
    synonyms: ['Acrylic acid methyl ester', 'Methyl propenoate'],
    family: 'Acrylate monomers',
    form: 'Liquid',
    industries: ['coatings', 'plastics', 'industrial'],
    description:
      'Methyl acrylate is an acrylic ester monomer listed for fibers, resins, adhesives, paints, coatings, and emulsions.',
    applications: [
      'Acrylic fibers',
      'Molding resins',
      'Adhesives',
      'Paints, coatings and emulsions',
    ],
    specifications: [
      ['Purity', '99.5% minimum'],
      ['Color, Pt-Co', '10 maximum'],
      ['Specific gravity at 25 °C', '0.953–0.958'],
      ['Water', '0.5% maximum'],
      ['Acidity as acetic acid', '0.005% maximum'],
      ['Inhibitor, MEHQ', '15 ± 5 ppm'],
    ],
    source: 'https://chemstock.com/methyl-acrylate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/7294',
  },
  {
    slug: 'myristic-acid',
    name: 'Myristic Acid',
    cas: '544-63-8',
    formula: 'C14H28O2',
    synonyms: ['Tetradecanoic acid'],
    family: 'Fatty acids',
    form: 'Solid',
    industries: ['personal-care', 'industrial', 'food'],
    description:
      'Myristic acid is a naturally occurring fatty acid listed for emulsifier, surfactant, emollient, and intermediate applications.',
    applications: [
      'Personal care',
      'Emulsifier systems',
      'Surfactants',
      'Chemical intermediates',
    ],
    specifications: [
      ['Acid value', '244–248 mg KOH/g'],
      ['Iodine value', '0.8 maximum'],
      ['Saponification value', '245–249'],
      ['Titer', '52–54 °C'],
      ['C14', '99% minimum'],
    ],
    source: 'https://chemstock.com/myristic-acid/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/11005',
  },
  {
    slug: 'p-tert-butylbenzoic-acid-99',
    name: 'p-tert-Butylbenzoic Acid',
    cas: '98-73-7',
    formula: 'C11H14O2',
    synonyms: ['PTBBA', '4-tert-Butylbenzoic acid', 'p-t-Butylbenzoic acid'],
    family: 'Aromatic carboxylic acids',
    form: 'Solid',
    industries: ['coatings', 'plastics', 'industrial'],
    description:
      'PTBBA is listed as a modifier for alkyd and epoxy resins, a chain stopper, PVC stabilizer, polyester regulator, and corrosion-inhibitor additive.',
    applications: [
      'Alkyd and epoxy resins',
      'PVC stabilization',
      'Polyester regulation',
      'Corrosion-inhibitor additives',
    ],
    specifications: [['Assay / grade listed', '99%']],
    source: 'https://chemstock.com/p-tert-butylbenzoic-acid-99/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/7390',
  },
  {
    slug: 'propylene-glycol',
    name: 'Propylene Glycol',
    cas: '57-55-6',
    formula: 'C3H8O2',
    synonyms: ['1,2-Propanediol', 'PG'],
    family: 'Glycols',
    form: 'Liquid',
    industries: ['industrial', 'food', 'personal-care'],
    description:
      'Propylene glycol is a glycol listed for solvent, stabilizer, additive, food, personal-care, hygiene, and pharmaceutical formulations.',
    applications: [
      'Solvent systems',
      'Personal-care formulations',
      'Food formulations',
      'Pharmaceutical preparations',
    ],
    specifications: [
      ['Assay', '99.80% minimum'],
      ['Specific gravity', '1.035–1.037'],
      ['Heavy metals', '5 ppm maximum'],
      ['Residue on ignition', '70 ppm maximum'],
    ],
    source: 'https://chemstock.com/propylene-glycol/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/1030',
  },
  {
    slug: 'sodium-benzoate',
    name: 'Sodium Benzoate',
    cas: '532-32-1',
    formula: 'C7H5NaO2',
    synonyms: ['Benzoic acid sodium salt', 'Benzoate of soda'],
    family: 'Benzoate salts',
    form: 'Solid',
    industries: ['food', 'flavor', 'industrial'],
    description:
      'Sodium benzoate is a benzoate salt listed for preservation and shelf-life support in suitable formulations.',
    applications: [
      'Preservative systems',
      'Food and beverage formulations',
      'Flavor and fragrance',
    ],
    specifications: [
      ['Current grade and compliance specification', 'Available on request'],
    ],
    source: 'https://chemstock.com/sodium-benzoate/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/517055',
  },
  {
    slug: 'stearic-acid',
    name: 'Stearic Acid',
    cas: '57-11-4',
    formula: 'C18H36O2',
    synonyms: ['Octadecanoic acid'],
    family: 'Fatty acids',
    form: 'Solid',
    industries: ['personal-care', 'industrial', 'plastics', 'food', 'coatings'],
    description:
      'Stearic acid is a naturally occurring fatty acid listed for soaps, cleansers, cosmetics, lubricants, emulsifiers, and industrial formulations.',
    applications: [
      'Soaps and cleansers',
      'Cosmetics and personal care',
      'Lubricants',
      'Emulsifier systems',
    ],
    specifications: [
      ['Iodine value', '1.5'],
      ['Titer', '65–69 °C'],
      ['C18:0', '90.0–100.0%'],
      ['Acid value', '195–201'],
      ['Saponification value', '196–202'],
    ],
    source: 'https://chemstock.com/stearic-acid/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/5281',
  },
  {
    slug: 'sulfamic-acid',
    name: 'Sulfamic Acid',
    cas: '5329-14-6',
    formula: 'H3NO3S',
    synonyms: ['Amidosulfonic acid', 'Amidosulfuric acid'],
    family: 'Inorganic acids',
    form: 'Solid',
    industries: ['industrial'],
    description:
      'Sulfamic acid is a stable crystalline acid listed for descaling and acidic cleaning of ceramics, metals, and industrial equipment.',
    applications: [
      'Industrial descaling',
      'Acidic cleaning',
      'Metal and ceramic cleaning',
    ],
    specifications: [
      ['Purity', '99.5% minimum'],
      ['Iron', '2 ppm maximum'],
      ['Heavy metals', '5 ppm maximum'],
    ],
    source: 'https://chemstock.com/sulfamic-acid/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/compound/5987',
  },
  {
    slug: 'tall-oil-fatty-acid',
    name: 'Tall Oil Fatty Acid',
    cas: '74499-22-2',
    formula: 'Variable mixture',
    synonyms: ['TOFA', 'Tall-oil fatty acids, methyl esters', 'Methyl tallate'],
    family: 'Tall-oil derivatives',
    form: 'Confirm with our team',
    industries: ['industrial', 'coatings'],
    description:
      'Chemstock lists tall oil fatty acid under CAS 74499-22-2 with methyl-tallate synonyms; exact composition and nomenclature should be confirmed for the requested grade.',
    applications: [
      'Industrial formulations',
      'Resins and coatings',
      'Oleochemical intermediates',
    ],
    specifications: [
      ['Composition and current grade specification', 'Available on request'],
    ],
    source: 'https://chemstock.com/tall-oil-fatty-acid/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/#query=74499-22-2',
  },
  {
    slug: 'tolytriazole',
    name: 'Tolytriazole',
    cas: '29385-43-1',
    formula: 'C7H7N3',
    synonyms: ['TTA', 'Methylbenzotriazole', 'Tolyltriazole'],
    family: 'Corrosion inhibitors',
    form: 'Confirm with our team',
    industries: ['industrial', 'oil-gas'],
    description:
      'Tolytriazole is an isomeric corrosion-inhibitor chemistry listed for metal protection, drilling fluids, and industrial systems.',
    applications: [
      'Metal corrosion inhibition',
      'Industrial water systems',
      'Oil and gas formulations',
    ],
    specifications: [
      ['Current isomer and grade specification', 'Available on request'],
    ],
    source: 'https://chemstock.com/tolytriazole/',
    identitySource: 'https://pubchem.ncbi.nlm.nih.gov/#query=29385-43-1',
  },
];

products.push(...brochureProducts);

const verifiedStructureReferences = new Set([
  'maleic-acid',
  'sebacic-acid',
  'methyl-methacrylate',
]);
for (const product of products) {
  if (
    !verifiedStructureReferences.has(product.slug) &&
    /^\d{2,7}-\d{2}-\d$/.test(product.cas)
  ) {
    product.identitySource =
      'https://pubchem.ncbi.nlm.nih.gov/#query=' +
      encodeURIComponent(product.cas);
  }
}
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
