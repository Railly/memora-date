export enum ContactProperty {
  "address" = "address",
  "email" = "email",
  "icon" = "icon",
  "name" = "name",
  "tel" = "tel",
}

export interface ContactAddress {
  toJSON: () => JSON;

  city: string;
  country: string;
  dependentLocality: string;
  organization: string;
  phone: string;
  postalCode: string;
  recipient: string;
  region: string;
  sortingCode: string;
  addressLine: string[];
}

export interface ContactInfo {
  address?: ContactAddress[];
  email?: string[];
  icon?: Blob[];
  name?: string[];
  tel?: string[];
}

export interface ContactsSelectOptions {
  multiple: boolean;
}

export interface ContactsManager {
  getProperties: () => Promise<ContactProperty[]>;

  select: (
    properties: ContactProperty[],
    options?: ContactsSelectOptions
  ) => Promise<ContactInfo[]>;
}
