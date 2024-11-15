export interface SchoolBasicInfo {
  name: string;
  type: 'primary' | 'secondary' | 'tertiary';
  email: string;
  phone: string;
  website?: string;
}

export interface SchoolLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface SchoolContact {
  principalName: string;
  principalEmail: string;
  principalPhone: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
}

export interface SchoolInfrastructure {
  totalClassrooms: number;
  hasLibrary: boolean;
  hasLaboratory: boolean;
  hasSportsGround: boolean;
  hasCanteen: boolean;
  totalCapacity: number;
}

export interface SchoolDocuments {
  registrationCertificate: File | null;
  taxDocument: File | null;
  licenseCertificate: File | null;
  otherDocuments?: File[];
}

export interface SchoolModules {
  selectedModules: string[];
}

export interface SchoolRegistrationData {
  basicInfo: SchoolBasicInfo;
  location: SchoolLocation;
  contact: SchoolContact;
  infrastructure: SchoolInfrastructure;
  documents: SchoolDocuments;
  modules: SchoolModules;
}

export type RegistrationStep = 
  | 'basicInfo'
  | 'location'
  | 'contact'
  | 'infrastructure'
  | 'documents'
  | 'modules'
  | 'review';

export interface StepConfig {
  title: string;
  description: string;
  icon: any; // Will be replaced with actual icon component
}
