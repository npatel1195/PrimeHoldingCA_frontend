// Static service catalog used by the Services page.
// Structured exactly per the spec.
export const serviceGroups = [
  {
    slug: 'residential',
    division: 'Prime Cleaning Service',
    tone: 'blue',
    title: 'Residential Cleaning',
    description: 'Reliable, top-quality cleaning for your home — from routine upkeep to deep seasonal refreshes.',
    items: [
      'Standard House Cleaning',
      'Deep Cleaning',
      'Move-In Cleaning',
      'Move-Out Cleaning',
      'Apartment & Condo Cleaning',
      'Airbnb Turnover Cleaning',
      'Spring Cleaning',
      'Seasonal Cleaning',
      'Carpet Cleaning',
      'Window Cleaning',
      'Garage Cleaning',
      'Basement Cleaning',
      'Kitchen Deep Cleaning',
      'Bathroom Sanitization',
    ],
  },
  {
    slug: 'commercial',
    division: 'Prime Cleaning Service',
    tone: 'blue',
    title: 'Commercial Cleaning',
    description: 'Professional cleaning solutions for offices, retail, healthcare, education, and industrial spaces.',
    items: [
      'Office Cleaning',
      'Retail Store Cleaning',
      'Medical Clinic Cleaning',
      'Restaurant Cleaning',
      'Warehouse Cleaning',
      'Industrial Cleaning',
      'School Cleaning',
      'Daycare Cleaning',
      'Church Cleaning',
      'Fitness Centre Cleaning',
    ],
  },
  {
    slug: 'construction',
    division: 'Prime Cleaning Service',
    tone: 'blue',
    title: 'Construction Cleaning',
    description: 'Comprehensive cleaning for builders, contractors, and renovators — from rough to final turnover.',
    items: [
      'Rough Cleaning',
      'Final Construction Cleaning',
      'Renovation Cleaning',
      'Post-Construction Cleaning',
      'Builder Turnover Cleaning',
      'Dust Removal',
      'Floor Cleaning',
      'Window Cleaning',
      'Pressure Washing',
    ],
  },
  {
    slug: 'specialty',
    division: 'Prime Cleaning Service',
    tone: 'blue',
    title: 'Specialty Services',
    description: 'Targeted cleaning and sanitization for businesses that need more than routine maintenance.',
    items: [
      'Disinfection & Sanitization',
      'Floor Scrubbing',
      'Floor Waxing',
      'Carpet Shampooing',
      'Upholstery Cleaning',
      'Power Washing',
      'Recurring Maintenance Cleaning',
      'Emergency Cleaning Services',
    ],
  },
  {
    slug: 'supply',
    division: 'Prime Home & Building Supply',
    tone: 'green',
    title: 'Prime Home & Building Supply',
    description:
      'Quality building materials for homeowners, contractors, builders, renovators, and developers. Available as Supply Only or Supply & Professional Installation.',
    items: [],
  },
];

export const supplyOptions = [
  {
    title: 'Supply Only',
    description: 'Pick up or have your materials delivered — perfect for contractors and homeowners doing their own install.',
  },
  {
    title: 'Supply & Professional Installation',
    description: 'Our experienced team supplies and installs your products — kitchens, doors, windows, flooring, and more.',
  },
];

export const serviceAreas = [
  'Residential',
  'Commercial',
  'Multi-family construction projects',
  'Throughout Saskatchewan',
];
