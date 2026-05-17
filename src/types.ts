export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum Sect {
  SUNNI = 'Sunni',
  SHIA = 'Shia',
  DEOBANDI = 'Deobandi',
  BARELVI = 'Barelvi',
  AHLEHADITH = 'Ahl-e-Hadith',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

export enum PrayerLevel {
  FIVE_TIMES = '5 times daily',
  MOSTLY = 'Mostly',
  SOMETIMES = 'Sometimes',
  WORKING_ON_IT = 'Working on it',
}

export enum MaritalStatus {
  NEVER_MARRIED = 'Never married',
  DIVORCED = 'Divorced',
  WIDOWED = 'Widowed',
}

export enum FamilyType {
  JOINT = 'Joint',
  NUCLEAR = 'Nuclear',
}

export interface UserProfile {
  id: string;
  uid: string;
  fullName: string;
  displayName?: string;
  gender: Gender;
  dob: string;
  age: number;
  height?: string;
  weight?: string;
  city: string;
  country: string;
  nationality: string;
  motherTongue: string;
  
  // Islamic Profile
  sect: Sect;
  prayerLevel: PrayerLevel;
  hijabBeard: boolean;
  halalDiet: string;
  islamicKnowledge: string;
  istikharaWillingness: boolean;
  nikahWillingness: string;
  
  // Education & Career
  education: string;
  university?: string;
  profession: string;
  jobTitle?: string;
  incomeRange?: string;
  natureOfJob?: string;
  futurePlans?: string;
  livingSituation: string;
  
  // Family
  maritalStatus: MaritalStatus;
  divorceReason?: string;
  disability?: string;
  children: number;
  acceptSpouseChildren: string;
  familyType: FamilyType;
  familyReligiosity: string;
  fatherOccupation?: string;
  motherOccupation?: string;
  brothersCount?: number;
  sistersCount?: number;
  marriedSiblingsCount?: number;
  
  // Property
  homeStatus?: 'Own' | 'Rent';
  homeSize?: string;
  homeLocation?: string;
  otherProperties?: string;

  // Address
  currentCity: string;
  homeTown: string;
  addressLocation: string;

  // Religion Extra
  caste: string;
  language: string;

  // Requirements
  reqAgeLimit?: string;
  reqHeight?: string;
  reqCity?: string;
  reqCaste?: string;
  reqQualification?: string;
  reqSect?: string;
  residenceAfterMarriage?: string;
  otherDemands?: string;
  
  // About & Media
  bio: string;
  voiceIntroUrl?: string;
  videoUrl?: string;
  photos: string[];
  photoPrivacy: 'Public' | 'MatchesOnly' | 'Blurred';
  personalityTags: string[];
  interests: string[];
  
  // Status
  isVerified: boolean;
  isParentVerified: boolean;
  isCareerVerified: boolean;
  isPaymentVerified: boolean;
  trustScore: number;
  unlockedBy?: string[]; // UIDs of users who have unlocked this profile

  isAdmin?: boolean;
  
  createdAt: any;
  updatedAt: any;
}
