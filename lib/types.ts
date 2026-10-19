export type StudioCategory =
  | 'cyclorama'
  | 'soundstage'
  | 'daylight'
  | 'podcast'
  | 'kitchen'
  | 'industrial';

export interface StudioSpace {
  id: string;
  name: string;
  slug: string;
  category: StudioCategory;
  categoryLabel: string;
  badgeTopLeft: string;
  badgeTopSecondary?: string;
  rating: number;
  reviewCount: number;
  location: string;
  submarket: string;
  description: string;
  specs: {
    sqFt: number;
    gridHeight: string;
    power: string;
    access: string;
  };
  amenities: string[];
  equipmentHighlight: string;
  hourlyRate: number;
  dayRate10h: number;
  imageUrl: string;
  galleryImages: string[];
  imageAlt: string;
  features: {
    camlockPower: boolean;
    driveInAccess: boolean;
    stc60Certified: boolean;
    northDaylight: boolean;
    gripPackageIncluded: boolean;
  };
}

export type LocationCategory =
  | 'industrial'
  | 'loft'
  | 'warehouse'
  | 'rooftop'
  | 'commercial'
  | 'outdoor';

export interface FilmingLocation {
  id: string;
  name: string;
  slug: string;
  category: LocationCategory;
  categoryLabel: string;
  rating: number;
  reviewCount: number;
  location: string;
  submarket: string;
  description: string;
  areaSqFt: number;
  ceilingHeight: string;
  powerSupply: string;
  vehicleAccess: string;
  curfewRestrictions: string;
  permitsRequired: string;
  amenities: string[];
  dayRate10h: number;
  hourlyRate: number;
  imageUrl: string;
  galleryImages: string[];
  imageAlt: string;
  featured: boolean;
}

export type CrewRoleCategory =
  | 'camera_lighting'
  | 'grip_sound'
  | 'styling_art'
  | 'post_production'
  | 'production';

export interface ProductionCrewMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  category: CrewRoleCategory;
  rating: number;
  reviewCount: number;
  location: string;
  credits: string;
  bio: string;
  skills: string[];
  workingKit: string;
  dayRate10h: number;
  nextAvailable: string;
  imageUrl: string;
  galleryImages: string[];
  imageAlt: string;
  unionAffiliation: string;
  standardKitIncluded: boolean;
  featured: boolean;
}

export type EquipmentCategory =
  | 'cameras'
  | 'lighting'
  | 'grip'
  | 'audio'
  | 'monitoring'
  | 'packages';

export interface EquipmentItem {
  id: string;
  name: string;
  slug: string;
  category: EquipmentCategory;
  categoryLabel: string;
  brand: string;
  rating: number;
  dayRate: number;
  weeklyRate: number;
  replacementValue: number;
  description: string;
  keySpecs: string[];
  includedAccessories: string[];
  powerRequirement: string;
  mountType?: string;
  imageUrl: string;
  galleryImages: string[];
  imageAlt: string;
  featured: boolean;
}

export interface StudioDirectoryCategory {
  id: string;
  name: string;
  categoryKey: StudioCategory;
  count: number;
  description: string;
  iconName: string;
}

export interface FacilityComparisonRow {
  id: string;
  specification: string;
  iconName: string;
  standardDryHire: string;
  turnkeyStage: string;
}
