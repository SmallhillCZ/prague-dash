import { FeatureCollection } from "src/shared/schema/golemio-api";

export interface ContainerProperties {
  "accessibility": {
    "description": string,
    "id": number;
  },
  "containers": {
    "cleaning_frequency": { "duration": string, "frequency": number, "id": number; },
    "container_type": string,
    "trash_type": { "description": string, "id": number; },
    "knsko_id": number,
    "container_id": string,
    "last_measurement": { "measured_at_utc": string, "percent_calculated": number, "prediction_utc": string; },
    "last_pick": string,
    "sensor_code": string,
    "sensor_supplier": string,
    "sensor_id": string;
  }[]
  ,
  "district": string,
  "id": string,
  "is_monitored": boolean,
  "name": string,
  "station_number": string,
  "updated_at": string,
  "knsko_id": number;
}

export type ContainerResponse = FeatureCollection<ContainerProperties>;


// "geometry": {
//   "coordinates": [number, number],
//   "type": "Point"
// },
// "properties": {
//   "accessibility": {
//     "description": string,
//     "id": number
//   },
//   "containers": [
//     {
//       "cleaning_frequency": { "duration": string, "frequency": number, "id": number },
//       "container_type": strin,
//       "trash_type": { "description": "Plast", "id": 6 },
//       "knsko_id": 15290,
//       "container_id": "a88637bf-a6b3-5a38-a702-e21533b0b488",
//       "last_measurement": { "measured_at_utc": "2021-09-22T07:01:46.000Z", "percent_calculated": 70, "prediction_utc": null },
//       "last_pick": "2021-09-20T05:01:46.000Z",
//       "sensor_code": "0001/ 001C00102",
//       "sensor_supplier": "sensoneo",
//       "sensor_id": "29955"
//     },
//     { "cleaning_frequency": { "duration": "P2W", "frequency": 1, "id": 21 }, "container_type": "3000 L Podzemní - SV", "trash_type": { "description": "Barevné sklo", "id": 1 }, "knsko_id": 15289, "container_id": "b3e0e86b-f7dc-59fc-bfe4-541021c9b44a" },
//     { "cleaning_frequency": { "duration": "P1W", "frequency": 2, "id": 12 }, "container_type": "3000 L Podzemní - SV", "trash_type": { "description": "Papír", "id": 5 }, "knsko_id": 15288, "container_id": "41fa5890-527a-5c5f-8fc3-2ecd6bd4a8fa", "last_measurement": { "measured_at_utc": "2021-09-21T21:02:31.000Z", "percent_calculated": 100, "prediction_utc": null }, "last_pick": "2021-09-16T07:01:43.000Z", "sensor_code": "0001/ 001C00101", "sensor_supplier": "sensoneo", "sensor_id": "29954" },
//     { "cleaning_frequency": { "duration": "P2W", "frequency": 1, "id": 21 }, "container_type": "3000 L Podzemní - SV", "trash_type": { "description": "Čiré sklo", "id": 7 }, "knsko_id": 15287, "container_id": "a61f6145-734e-5fcf-b823-42694a03dafd" }
//   ],
//   "district": "praha-1",
//   "id": "a7a44d06-b419-5772-a314-7a46f82b6eee",
//   "is_monitored": true,
//   "name": "Valentinská 1/13",
//   "station_number": "0001/ 001",
//   "updated_at": "2020-12-03T14:42:38.009Z",
//   "knsko_id": 3497
// },
// "type": "Feature"