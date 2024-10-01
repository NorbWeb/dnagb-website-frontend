import { Dojo, Feature, Source } from './dojoInterfaces';

export function covertToGeoJson(rawData: Dojo[]) {
  let source: Source = {
    type: 'FeatureCollection',
    features: [],
  };

  for (const item of rawData) {
    let feature: Feature = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: '',
        coordinates: [],
      },
    };
    feature.properties = {
      city: item.city,
      description: item.description,
      link: item.link,
      name: item.name,
      status: item.status,
      logo: item.logo,
    };
    feature.geometry.type = item.geometry.type;
    feature.geometry.coordinates = [...item.geometry.coordinates];
    source.features.push(feature);
  }

  return source;
}
