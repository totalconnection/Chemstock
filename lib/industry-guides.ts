export const industryGuides: Record<
  string,
  {
    headline: string;
    intro: string;
    priorities: [string, string][];
    checklist: string[];
  }
> = {
  coatings: {
    headline: 'From formulation to a dependable supply.',
    intro:
      'Explore monomers, resins, reactive diluents, and additives for coatings, adhesives, and sealants. Start with the performance target, then qualify the grade and source.',
    priorities: [
      [
        'Resins & building blocks',
        'Discuss chemistry, viscosity, solids content, and the properties your formulation needs.',
      ],
      [
        'Cure & processing',
        'Define cure conditions, processing windows, and compatibility requirements.',
      ],
      [
        'Consistency at scale',
        'Agree on impurity limits, analytical methods, packaging, and change notifications.',
      ],
    ],
    checklist: [
      'Application and substrate',
      'Required purity, color, and viscosity limits',
      'Processing conditions and compatibility',
      'Trial quantity and expected annual volume',
    ],
  },
  plastics: {
    headline: 'Materials for the way you manufacture.',
    intro:
      'Find plasticizers, monomers, rubber chemicals, and additives for polymer applications. Bring your processing requirements and end-use criteria into the sourcing conversation.',
    priorities: [
      [
        'Polymer compatibility',
        'Identify the polymer system and the performance requirements to evaluate.',
      ],
      [
        'Processing requirements',
        'Discuss thermal exposure, dispersion, and the physical form your equipment needs.',
      ],
      [
        'End-use qualification',
        'Specify migration, emissions, or other applicable requirements for the exact grade.',
      ],
    ],
    checklist: [
      'Polymer or rubber system',
      'Target mechanical and processing performance',
      'Required end-use declarations',
      'Packaging, trial quantity, and recurring demand',
    ],
  },
  industrial: {
    headline: 'The chemistry behind everyday production.',
    intro:
      'Explore solvents, intermediates, acids, and other industrial inputs. A clear specification helps us assess appropriate sourcing options for your operation.',
    priorities: [
      [
        'Process fit',
        'Share the role of the material, concentration, and critical impurities.',
      ],
      [
        'Handling & delivery',
        'Confirm physical form, packaging, unloading requirements, and destination.',
      ],
      [
        'Supply planning',
        'Discuss order frequency, forecast volume, and acceptable qualification timelines.',
      ],
    ],
    checklist: [
      'Chemical identity and concentration',
      'Critical impurity limits and test methods',
      'Delivery location and packaging',
      'Monthly demand and required date',
    ],
  },
  'oil-gas': {
    headline: 'Sourcing around field and process requirements.',
    intro:
      'Explore materials for lubrication, corrosion control, and drilling-related formulations. Qualification depends on the intended system, operating conditions, and supplied grade.',
    priorities: [
      [
        'Operating environment',
        'Define the temperature, water chemistry, and process conditions relevant to your evaluation.',
      ],
      [
        'Formulation compatibility',
        'Share the base system and required performance testing.',
      ],
      [
        'Supply logistics',
        'Discuss delivery access, packaging, volume, and timing.',
      ],
    ],
    checklist: [
      'Application and operating environment',
      'Required performance and compatibility tests',
      'Concentration and formulation constraints',
      'Destination and delivery schedule',
    ],
  },
  nutrition: {
    headline: 'Ingredient sourcing starts with qualification.',
    intro:
      'Tell us the ingredient identity, intended use, and documentation you require. Catalogue presence alone does not establish food, supplement, organic, or other regulated-grade suitability.',
    priorities: [
      [
        'Identity & composition',
        'Specify the ingredient, concentration, botanical identity where applicable, and analytical requirements.',
      ],
      [
        'Documentation',
        'Request grade-specific quality, allergen, origin, and certification evidence where relevant.',
      ],
      [
        'Market requirements',
        'Identify the destination and intended use so the proposed source can be reviewed.',
      ],
    ],
    checklist: [
      'Exact ingredient or botanical identity',
      'Grade, assay, and contaminant limits',
      'Destination market and required certificates',
      'Trial quantity and projected demand',
    ],
  },
  'personal-care': {
    headline: 'Ingredients for thoughtful formulation.',
    intro:
      'Explore sourcing options for personal-care development and manufacturing. Confirm identity, composition, sensory requirements, and documentation for the proposed grade.',
    priorities: [
      [
        'Formulation fit',
        'Share the product format, intended ingredient function, and compatibility criteria.',
      ],
      [
        'Quality requirements',
        'Specify color, odor, composition, and other important acceptance limits.',
      ],
      [
        'Market documentation',
        'Request applicable ingredient identity, origin, and regulatory statements for your market.',
      ],
    ],
    checklist: [
      'Ingredient name and INCI requirements',
      'Product format and intended function',
      'Quality limits and required declarations',
      'Sample needs and scale-up forecast',
    ],
  },
  flavor: {
    headline: 'Clear requirements. Carefully qualified sources.',
    intro:
      'Bring your raw-material and ingredient requirements to our sourcing team. Food-grade status, composition, and suitability must be verified for the exact source and use.',
    priorities: [
      [
        'Ingredient identity',
        'Define the exact substance or composition and any origin requirements.',
      ],
      [
        'Sensory & quality criteria',
        'Specify the acceptance criteria and methods your team uses.',
      ],
      [
        'Documentation',
        'Request source-specific suitability and compliance evidence for your intended use.',
      ],
    ],
    checklist: [
      'Exact material and intended use',
      'Purity, sensory, and origin requirements',
      'Destination market and grade requirements',
      'Evaluation quantity and expected demand',
    ],
  },
  food: {
    headline: 'A clear path from ingredient request to review.',
    intro:
      'Explore ingredient sourcing with your grade, application, and documentation requirements in view. Confirm suitability and current certificates for the proposed supply.',
    priorities: [
      [
        'Specification first',
        'Share identity, purity, concentration, and critical quality limits.',
      ],
      [
        'Supplier qualification',
        'Define the documentation and quality evidence your procurement team needs.',
      ],
      [
        'Production planning',
        'Discuss packaging, forecast volumes, and delivery requirements.',
      ],
    ],
    checklist: [
      'Ingredient and required grade',
      'Application and destination country',
      'Allergen and certification requirements',
      'Packaging, quantity, and timing',
    ],
  },
};
