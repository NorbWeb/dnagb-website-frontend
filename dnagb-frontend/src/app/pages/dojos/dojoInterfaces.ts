export interface DojoInfo {
  name: string;
  city: string;
  link: string;
  description: string;
  logo: string;
}

export interface Dojo {
  id: number;
  status: string;
  sort: null;
  name: string;
  logo: string;
  link: string;
  city: string;
  description: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
}

export interface Source {
  type: 'FeatureCollection';
  features: Feature[];
}

export interface Feature {
  type: 'Feature';
  properties: Record<string, string>;
  geometry: {
    type: string;
    coordinates: number[];
  };
}
