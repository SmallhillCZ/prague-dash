
export interface CityvizorProfiles {
  id: number;
  name: string;
  email: string;
  ico: string;
  databox: number | null;
  edesky: number | null;
  mapasamospravy: number | null;
  gpsX?: number;
  gpsY?: number;
  url: string;
}

export interface CityvizorPayment {
  profileId: number;
  year: number;
  paragraph: number;
  item: number;
  unit: number;
  event: string;
  incomeAmount: number;
  expenditureAmount: number;
  date: string;
  counterpartyId: string;
  counterpartyName: string;
  description: string;
}