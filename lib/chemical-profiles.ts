import identifiers from './chemical-identifiers.json';
import { products, type Product } from './catalogue';
export type ReferenceProperty = {
  name: string;
  value: string;
  context: string;
  source: string;
};
export type ChemicalProfile = {
  cid?: number;
  identity?: {
    MolecularWeight?: string;
    IUPACName?: string;
    InChIKey?: string;
  };
  ec: string;
  classification: string;
  overview: string;
  physicalProperties: ReferenceProperty[];
  specifications: [string, string, string][];
  specificationsNote: string;
  applications: { name: string; detail: string; qualify: string }[];
  qualification: { title: string; detail: string }[];
  safety: { title: string; detail: string; source?: string }[];
  sourcing: [string, string][];
  references: { id: string; name: string; url: string; scope: string }[];
  faqs: { question: string; answer: string }[];
};
const detailedChemicalProfiles: Record<string, ChemicalProfile> = {
  'maleic-acid': {
    cid: 444266,
    ec: '203-742-5',
    classification: 'Unsaturated dicarboxylic acid',
    overview:
      'Maleic acid is the cis isomer of butenedioic acid. Its two carboxylic acid groups and carbon–carbon double bond make it a useful intermediate in industrial chemistry. Chemstock’s published applications include resins, surface coatings, lubricant additives, and plasticizers.',
    physicalProperties: [
      {
        name: 'Appearance',
        value: 'White crystals',
        context:
          'Substance reference; supplied particle form is grade-specific.',
        source: 'icsc',
      },
      {
        name: 'Melting point',
        value: '131 °C',
        context:
          'Reference value; see the separate published specification range below.',
        source: 'icsc',
      },
      {
        name: 'Relative density',
        value: '1.59',
        context: 'Relative to water = 1.',
        source: 'icsc',
      },
      {
        name: 'Water solubility',
        value: '78 g/100 mL',
        context: 'At 25 °C.',
        source: 'icsc',
      },
      {
        name: 'Vapor pressure',
        value: '0.0048 Pa',
        context: 'At 25 °C.',
        source: 'icsc',
      },
      {
        name: 'Thermal behavior',
        value: 'Decomposes at 135 °C',
        context:
          'Reference observation, not an operating-temperature recommendation.',
        source: 'icsc',
      },
    ],
    specifications: [
      ['Appearance', 'White crystalline powder', 'Visual description'],
      ['Assay', '99.0% min.', 'Confirm analytical method and grade'],
      ['Water', '1.0% max.', 'Confirm test method'],
      ['Fumaric acid', '1.0% max.', 'Confirm impurity method'],
      ['Melting range', '130–134 °C', 'Confirm method and acceptance range'],
    ],
    specificationsNote:
      'These are typical limits published in Chemstock’s existing catalogue. The legacy assay label is not evidence of a current USP grade. Obtain the current, agreed specification and test methods for the material being supplied.',
    applications: [
      {
        name: 'Resins & surface coatings',
        detail: 'Intermediate for resin and coating chemistry.',
        qualify:
          'Review assay, impurity limits, and color requirements against your formulation.',
      },
      {
        name: 'Lubricant additives',
        detail: 'Raw material in the manufacture of lubricant additives.',
        qualify: 'Define your reaction requirements and maximum water content.',
      },
      {
        name: 'Plasticizers & intermediates',
        detail:
          'Used in industrial chemical synthesis and plasticizer manufacture.',
        qualify:
          'Confirm that maleic acid, rather than maleic anhydride, is the specified input.',
      },
    ],
    qualification: [
      {
        title: 'Purity & impurity profile',
        detail:
          'Request the agreed assay method, fumaric acid limit, and any additional impurity controls.',
      },
      {
        title: 'Physical form',
        detail:
          'Specify powder or crystal requirements and any particle-size limits important to feeding or dissolution.',
      },
      {
        title: 'Regulated applications',
        detail:
          'Identify your end use and required grade. A chemical identity or typical assay does not establish food, pharmaceutical, or other regulated-use suitability.',
      },
    ],
    safety: [
      {
        title: 'Handling considerations',
        detail:
          'Irritation and sensitization hazards require review. Control dust and use the precautions specified in the supplied SDS.',
        source: 'icsc',
      },
      {
        title: 'Storage considerations',
        detail:
          'Reference guidance calls for dry storage in original packaging, separated from food and feed. Confirm the supplied grade’s conditions and retest period.',
        source: 'icsc',
      },
      {
        title: 'Transport review',
        detail:
          'ICSC lists UN 3261 (n.o.s.), Class 8, Packing Group III. Confirm the actual shipping classification using the current supplier SDS and transport documentation.',
        source: 'icsc',
      },
    ],
    sourcing: [
      [
        'Packaging reference',
        '100 kg drum listed in the existing catalogue; confirm current pack options.',
      ],
      [
        'Order quantity & annual demand',
        'Minimum order, trial quantity, forecast volume, and delivery schedule reviewed on request.',
      ],
      [
        'Manufacturing origin & source',
        'Manufacturer, production site, and country of origin confirmed for the proposed supply.',
      ],
      [
        'Lead time & delivery',
        'Confirmed against the required destination, quantity, and sourcing option.',
      ],
      [
        'Shelf life & retest',
        'Request manufacturer storage conditions, shelf life or retest date, and remaining life at dispatch.',
      ],
    ],
    references: [
      {
        id: 'pubchem',
        name: 'PubChem · CID 444266',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/444266',
        scope: 'Chemical identity, molecular weight, and structure.',
      },
      {
        id: 'icsc',
        name: 'ILO / WHO · ICSC 1186',
        url: 'https://chemicalsafety.ilo.org/dyn/icsc/showcard.display?p_card_id=1186&p_lang=en&p_version=2',
        scope:
          'Reference physical properties, handling, storage, and transport information.',
      },
      {
        id: 'chemstock',
        name: 'Chemstock · published product record',
        url: 'https://chemstock.com/maleic-acid/',
        scope:
          'Existing typical specifications, applications, and packaging reference.',
      },
    ],
    faqs: [
      {
        question: 'Is maleic acid the same as maleic anhydride?',
        answer:
          'No. They are distinct chemicals. Use the chemical name and CAS number 110-16-7 together when specifying maleic acid, and confirm the required material with your technical team.',
      },
      {
        question:
          'Why does the melting point differ from the specification range?',
        answer:
          'A reference value describes a reported property of the substance. A product specification gives acceptance limits for a particular material. Use the agreed supplier specification and method for incoming quality control.',
      },
      {
        question: 'Can you provide test methods and a batch CoA?',
        answer:
          'Technical documents are available on request. State the product, required grade, and tests you need. For an existing shipment, include the lot number so the batch-specific CoA can be identified.',
      },
    ],
  },
  'sebacic-acid': {
    cid: 5192,
    ec: '203-845-5',
    classification: 'Saturated aliphatic dicarboxylic acid',
    overview:
      'Sebacic acid, also called decanedioic acid, contains a ten-carbon chain with a carboxylic acid group at each end. Chemstock describes it as a castor oil derived intermediate used in polymers, ester plasticizers, lubricants, and corrosion-control applications.',
    physicalProperties: [
      {
        name: 'Physical state',
        value: 'Solid',
        context: 'At 20 °C.',
        source: 'tci',
      },
      {
        name: 'Reference melting point',
        value: '134 °C',
        context: 'Substance reference, not a guaranteed supplied-grade limit.',
        source: 'tci',
      },
      {
        name: 'Boiling point',
        value: '295 °C',
        context: 'At 100 mmHg; this is a reduced-pressure value.',
        source: 'tci',
      },
      {
        name: 'Water solubility',
        value: '1 g/L',
        context: 'At 20 °C. Source-specific reference value.',
        source: 'tci',
      },
    ],
    specifications: [
      ['Appearance', 'White powder', 'Visual description'],
      ['Purity', '99.5% min.', 'Confirm analytical method'],
      ['Water content', '0.3% max.', 'Confirm test method'],
      ['Color, APHA', '50 max.', '4% solution in ethanol'],
      ['Acid number', '550 mg KOH/g min.', 'Confirm titration method'],
      ['Melting range', '130–134 °C', 'Confirm method and acceptance range'],
      ['Ash content', '400 ppm max.', 'Confirm method'],
    ],
    specificationsNote:
      'Typical limits from Chemstock’s existing catalogue. Final limits, test methods, particle form, and packaging must match the current supplier specification for your order.',
    applications: [
      {
        name: 'Polymers & plasticizers',
        detail:
          'Intermediate for polymer production and sebacate ester plasticizers.',
        qualify:
          'Review acid number, moisture, color, and the impurity profile required by your process.',
      },
      {
        name: 'Lubricants & corrosion control',
        detail:
          'Used in lubricant-related chemistry and corrosion-control applications.',
        qualify:
          'Identify the intended formulation and the relevant purity and solubility requirements.',
      },
      {
        name: 'Coatings & personal care',
        detail: 'Used in chemistry serving coating and cosmetic applications.',
        qualify:
          'Confirm the intended grade and all application-specific documentation before qualification.',
      },
    ],
    qualification: [
      {
        title: 'Powder or granular form',
        detail:
          'State the required particle form, size distribution, and feeding characteristics. Available forms must be confirmed for the chosen source.',
      },
      {
        title: 'Color & acid number',
        detail:
          'Define your color test conditions and titration method so results can be compared with your incoming specification.',
      },
      {
        title: 'Renewable origin claims',
        detail:
          'Request source-specific origin or renewable-feedstock evidence. Castor-derived chemistry alone does not establish a certified sustainability claim.',
      },
    ],
    safety: [
      {
        title: 'Handling considerations',
        detail:
          'A reference manufacturer identifies skin and eye irritation hazards. Review the SDS for the supplied grade and control exposure to dust.',
        source: 'tci',
      },
      {
        title: 'Storage & shelf life',
        detail:
          'Request the manufacturer’s recommended storage temperature, moisture controls, shelf life, and retest period. Storage conditions should follow the supplied grade’s documentation.',
      },
      {
        title: 'Transport classification',
        detail:
          'Confirm classification for the supplied material, packaging, transport mode, and destination using the current SDS. No shipping classification is asserted for a specific Chemstock supply here.',
      },
    ],
    sourcing: [
      [
        'Packaging & physical form',
        'Powder is listed in the existing catalogue. Request current pack sizes and any granular-form options.',
      ],
      [
        'Minimum order & scheduling',
        'Provide trial quantity, annual demand, and preferred shipment cadence for source review.',
      ],
      [
        'Manufacturing origin',
        'Request source identity, manufacturing location, country of origin, and feedstock statements.',
      ],
      [
        'Availability & lead time',
        'Confirmed for the proposed source, destination, and order volume.',
      ],
      [
        'Shelf life & remaining life',
        'Request production date, retest or expiry policy, and remaining usable life at shipment.',
      ],
    ],
    references: [
      {
        id: 'pubchem',
        name: 'PubChem · CID 5192',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/5192',
        scope: 'Chemical identity, molecular weight, and structure.',
      },
      {
        id: 'tci',
        name: 'TCI · Sebacic Acid reference',
        url: 'https://www.tcichemicals.com/US/en/p/S0022',
        scope:
          'General physical-property and hazard reference only; not a Chemstock grade or supply specification.',
      },
      {
        id: 'identity',
        name: 'Fisher Scientific · CAS reference',
        url: 'https://www.fishersci.com/us/en/browse/cas/111-20-6?page=1',
        scope: 'Cross-reference for EC identifier.',
      },
      {
        id: 'chemstock',
        name: 'Chemstock · published product record',
        url: 'https://chemstock.com/sebacic-acid/',
        scope: 'Existing typical specifications and applications.',
      },
    ],
    faqs: [
      {
        question: 'Are powder and granular sebacic acid interchangeable?',
        answer:
          'They share the chemical identity, but particle form can affect handling and processing. Specify the required form and validate it in your application; do not assume a source change is equivalent.',
      },
      {
        question: 'Is the material certified bio-based?',
        answer:
          'Chemstock’s published description identifies castor oil as the feedstock. Certification or a quantified bio-based claim must be supported by documentation for the actual source and grade; request that evidence if your approval process requires it.',
      },
      {
        question: 'Which properties should my quality team review?',
        answer:
          'Begin with purity, water, acid number, color under defined test conditions, melting range, and ash. Add any particle-size or trace-impurity requirements specific to your process.',
      },
    ],
  },
  'methyl-methacrylate': {
    cid: 6658,
    ec: '201-297-1',
    classification: 'Acrylate / methacrylate monomer',
    overview:
      'Methyl methacrylate (MMA) is the methyl ester of methacrylic acid. It is a reactive monomer used in acrylic materials and resin and coating applications. For enterprise qualification, the inhibitor system is a key part of the material specification, alongside purity, water, acidity, and color.',
    physicalProperties: [
      {
        name: 'Appearance',
        value: 'Colorless liquid',
        context: 'NIOSH describes an acrid, fruity odor.',
        source: 'niosh',
      },
      {
        name: 'Boiling point',
        value: '214 °F (approximately 101 °C)',
        context: 'NIOSH reference value.',
        source: 'niosh',
      },
      {
        name: 'Freezing point',
        value: '−54 °F (approximately −48 °C)',
        context: 'NIOSH reference value.',
        source: 'niosh',
      },
      {
        name: 'Specific gravity',
        value: '0.94',
        context: 'NIOSH reference; not a supplier acceptance range.',
        source: 'niosh',
      },
      {
        name: 'Flash point',
        value: '50 °F (10 °C), open cup',
        context:
          'Method matters: consult the current SDS for the supplied grade.',
        source: 'niosh',
      },
      {
        name: 'Water solubility',
        value: '1.5%',
        context:
          'As reported by NIOSH; conditions are not specified in that entry.',
        source: 'niosh',
      },
    ],
    specifications: [
      ['Assay', '99.8% min.', 'Confirm analytical method'],
      ['Water content', '0.1% max.', 'Confirm test method'],
      ['Color, APHA', '10 max.', 'Confirm test method'],
      ['Inhibitor, MEHQ', '8–15 ppm', 'Confirm inhibitor system and method'],
      ['Methacrylic acid', '0.005% max.', 'Confirm acidity determination'],
      [
        'Specific gravity',
        '0.942–0.946',
        'Reference temperature not specified in legacy record',
      ],
      [
        'Refractive index',
        '1.4110',
        'Temperature and wavelength not specified in legacy record',
      ],
    ],
    specificationsNote:
      'These values come from Chemstock’s existing catalogue. They are not current batch results. Confirm the inhibitor level and analytical conditions in the agreed specification; do not infer a test method where the original record provides none.',
    applications: [
      {
        name: 'Acrylic materials',
        detail: 'Monomer building block for acrylic polymer chemistry.',
        qualify:
          'Define assay, impurity, inhibitor, and moisture requirements for the intended polymerization process.',
      },
      {
        name: 'Resins & coatings',
        detail:
          'Used as a monomer or comonomer in resin and coating applications.',
        qualify:
          'Review color, acidity, and inhibitor tolerances against your formulation and process controls.',
      },
      {
        name: 'Specialty formulations',
        detail:
          'Application-specific suitability depends on the supplied grade and supporting documentation.',
        qualify:
          'State regulated-use requirements explicitly. An industrial catalogue listing does not establish medical or other regulated-use suitability.',
      },
    ],
    qualification: [
      {
        title: 'Inhibitor system',
        detail:
          'Specify inhibitor chemistry and concentration. Request the manufacturer’s handling and storage guidance for that inhibited grade.',
      },
      {
        title: 'Analytical conditions',
        detail:
          'Agree methods and conditions for assay, water, acidity, color, specific gravity, and refractive index before comparing sources.',
      },
      {
        title: 'Storage & transport planning',
        detail:
          'Review the supplier SDS, packaging compatibility, storage limits, and dispatch timing with your EHS and logistics teams.',
      },
    ],
    safety: [
      {
        title: 'Fire & reactivity',
        detail:
          'NIOSH identifies MMA as flammable and notes that heat, oxidizers, or ultraviolet light may trigger polymerization. Use the current supplier SDS and grade-specific guidance.',
        source: 'niosh',
      },
      {
        title: 'Storage controls',
        detail:
          'Confirm inhibitor requirements, recommended storage conditions, monitoring, and shelf life with the manufacturer. A generic chemical profile is not a storage-system design.',
      },
      {
        title: 'Transport reference',
        detail:
          'NIOSH lists DOT ID 1247 for inhibited material. The shipping name, hazard class, and packing group must be verified against the current SDS and shipment documentation.',
        source: 'niosh',
      },
    ],
    sourcing: [
      [
        'Inhibited grade',
        'Legacy catalogue lists 8–15 ppm MEHQ; confirm the currently offered inhibitor system.',
      ],
      [
        'Packaging options',
        'Request available packaging, net weights, compatibility information, and delivery mode.',
      ],
      [
        'Demand & delivery cadence',
        'Provide trial requirements, forecast annual volume, and shipment schedule.',
      ],
      [
        'Source & manufacturing origin',
        'Confirm manufacturer, production site, country of origin, and qualification documents.',
      ],
      [
        'Lead time & shelf life',
        'Confirm delivery timing and remaining shelf life against supplier storage requirements.',
      ],
    ],
    references: [
      {
        id: 'pubchem',
        name: 'PubChem · CID 6658',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/6658',
        scope: 'Chemical identity, molecular weight, and structure.',
      },
      {
        id: 'niosh',
        name: 'CDC / NIOSH · Methyl methacrylate',
        url: 'https://www.cdc.gov/niosh/npg/npgd0426.html',
        scope:
          'Reference physical properties, hazards, and inhibited-material DOT identifier.',
      },
      {
        id: 'echa',
        name: 'ECHA · substance identity record',
        url: 'https://echa.europa.eu/registration-dossier/-/registered-dossier/15528/1/1',
        scope:
          'EC identifier only. Archived dossier is not evidence of current supplier REACH coverage.',
      },
      {
        id: 'chemstock',
        name: 'Chemstock · published product record',
        url: 'https://chemstock.com/methyl-methacrylate/',
        scope: 'Existing typical specifications and applications.',
      },
    ],
    faqs: [
      {
        question: 'Why is the inhibitor concentration important?',
        answer:
          'The inhibitor system is part of the supplied monomer grade and its handling requirements. Include the required chemistry and concentration in your specification, and obtain manufacturer guidance before qualification.',
      },
      {
        question: 'Is MMA the same as methacrylic acid?',
        answer:
          'No. Methyl methacrylate is the methyl ester of methacrylic acid. Use CAS 80-62-6 to identify MMA; acidity reported as methacrylic acid is a separate specification parameter.',
      },
      {
        question:
          'Can the industrial material be used for a regulated application?',
        answer:
          'Suitability must be established for the exact grade and intended use. Request the necessary application-specific documentation rather than relying on a general list of chemical applications.',
      },
    ],
  },
};

function catalogueProfile(product: Product): ChemicalProfile {
  const isBrochureOnly = product.source.endsWith('.pdf');
  return {
    ec: 'Available on request',
    classification: product.family,
    identity: {
      MolecularWeight: 'Confirm for the requested grade',
      IUPACName:
        product.formula === 'Variable mixture'
          ? 'Commercial mixture; composition is source-specific'
          : 'Identity confirmation available on request',
    },
    overview: isBrochureOnly
      ? `${product.name} is listed in Chemstock’s specialty-chemicals brochure. This catalogue groups it with ${product.family.toLowerCase()} to support search; grade, composition, manufacturer, and application fit are confirmed against your request.`
      : `${product.name} is listed in Chemstock’s published online catalogue. Current grade, source, specification, and availability are confirmed for each request.`,
    physicalProperties: [
      {
        name: 'Catalogue form',
        value: product.form,
        context:
          'Catalogue-level description only; confirm the physical form and conditions for the proposed grade.',
        source: 'chemstock',
      },
    ],
    specifications: product.specifications.map(([name, value]) => [
      name,
      value,
      value === 'Available on request'
        ? 'Confirm grade, method, and acceptance limits'
        : 'Published legacy-catalogue value; confirm the current method and grade',
    ]),
    specificationsNote:
      'Catalogue information supports initial sourcing review and is not a current supplier specification or batch result. Request the source-specific specification, test methods, and representative CoA before qualification.',
    applications: product.applications.slice(0, 4).map((name) => ({
      name,
      detail:
        'Discuss suitability for this application with Chemstock; the exact grade and source must be qualified.',
      qualify:
        'Confirm the exact grade, composition, performance requirements, and applicable regulatory constraints for your use.',
    })),
    qualification: [
      {
        title: 'Identity & grade',
        detail:
          'Confirm the chemical identity, concentration or composition, grade designation, and manufacturer for the proposed supply.',
      },
      {
        title: 'Specification & methods',
        detail:
          'Provide your required limits and methods so Chemstock can identify a source-specific technical package.',
      },
      {
        title: 'End use & market',
        detail:
          'State the intended application and destination. A catalogue listing does not establish regulated-use suitability or market compliance.',
      },
    ],
    safety: [
      {
        title: 'Safety data sheet required',
        detail:
          'Obtain and review the current SDS for the proposed manufacturer, grade, concentration, and destination before handling or approval.',
      },
      {
        title: 'Storage & handling',
        detail:
          'Follow the source-specific SDS and technical guidance. Storage conditions and shelf life are available on request.',
      },
      {
        title: 'Transport classification',
        detail:
          'Confirm the actual shipping classification from the current SDS and shipment documentation; none is asserted from the catalogue listing alone.',
      },
    ],
    sourcing: [
      [
        'Grade & source',
        'Manufacturer, grade, production site, and country of origin confirmed on request.',
      ],
      [
        'Packaging',
        'Available pack sizes and delivery modes confirmed for the proposed source.',
      ],
      [
        'Order requirements',
        'Share trial quantity, annual demand, delivery location, and required schedule.',
      ],
      [
        'Lead time & availability',
        'Confirmed for the requested quantity, source, and destination.',
      ],
      [
        'Documents',
        'SDS, specification, representative or batch CoA, and supplier documents available on request.',
      ],
    ],
    references: [
      {
        id: 'chemstock',
        name: isBrochureOnly
          ? 'Chemstock · specialty-chemicals brochure'
          : 'Chemstock · published product record',
        url: product.source,
        scope: isBrochureOnly
          ? 'Confirms that the product name appears in Chemstock’s public catalogue brochure; it does not establish current stock or a specific grade.'
          : 'Published product identity, applications, and any listed typical values.',
      },
    ],
    faqs: [
      {
        question: `What information is available for ${product.name}?`,
        answer:
          'Request the current source-specific SDS, specification or TDS, representative CoA, packaging, origin, lead time, and supplier qualification documents needed by your team.',
      },
      {
        question: 'Does the catalogue listing confirm stock or compliance?',
        answer:
          'No. Availability, manufacturer, grade, regulatory status, and application suitability are confirmed in response to your requirements.',
      },
      {
        question: 'What should I include in a quote request?',
        answer:
          'Include the product name, any CAS or grade requirement, required specification, quantity, annual demand, destination, application, and delivery schedule.',
      },
    ],
  };
}

export const chemicalProfiles: Record<string, ChemicalProfile> =
  Object.fromEntries(
    products.map((product) => [
      product.slug,
      detailedChemicalProfiles[product.slug] ?? catalogueProfile(product),
    ]),
  );

export function getChemicalIdentity(
  cid?: number,
  fallback?: ChemicalProfile['identity'],
) {
  const identity = identifiers.PropertyTable.Properties.find(
    (x) => x.CID === cid,
  );
  return (
    identity ?? {
      CID: cid ?? 0,
      MolecularFormula: '',
      MolecularWeight: fallback?.MolecularWeight ?? 'Available on request',
      IUPACName: fallback?.IUPACName ?? 'Available on request',
      InChIKey: fallback?.InChIKey ?? '',
    }
  );
}
export const documentTypes = [
  {
    key: 'sds',
    title: 'Safety data sheet',
    short: 'SDS',
    detail:
      'Current safety, handling, transport, and disposal information for the grade and destination.',
    include: 'Required grade, destination country, and preferred language.',
  },
  {
    key: 'tds',
    title: 'Technical specification',
    short: 'TDS / specification',
    detail:
      'Current acceptance limits, physical properties, and the relevant analytical methods.',
    include: 'Your internal specification and required test methods.',
  },
  {
    key: 'coa',
    title: 'Certificate of analysis',
    short: 'CoA',
    detail:
      'Batch-specific results for a supplied lot, or a representative CoA for qualification.',
    include:
      'Lot / batch number for an existing shipment; otherwise request a representative CoA.',
  },
  {
    key: 'certificates',
    title: 'Supplier certifications',
    short: 'Supplier documentation',
    detail:
      'Source-specific certification and supporting information for your qualification process.',
    include:
      'Required certification, manufacturing site scope, and validity requirements.',
  },
];
export const regulatoryReview = [
  [
    'Chemical inventory & market access',
    'TSCA, REACH / UK REACH, or other applicable inventory and importer requirements.',
  ],
  [
    'Restricted-substance declarations',
    'REACH SVHC, RoHS, Proposition 65, or customer-specific restricted-substance lists, where relevant.',
  ],
  [
    'Application-specific grade',
    'Food, pharmaceutical, personal-care, or other end-use requirements; confirm the exact standard and grade.',
  ],
  [
    'Origin & sustainability evidence',
    'Country of origin, feedstock declarations, bio-based evidence, and certifications where required.',
  ],
  [
    'Supplier quality qualification',
    'Relevant site certifications, questionnaire responses, change-notification expectations, and traceability requirements.',
  ],
];
