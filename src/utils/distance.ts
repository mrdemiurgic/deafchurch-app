import { LongLat } from '../types/church';

const deg2rad = (deg: number) => deg * (Math.PI / 180);

const calculateDistance = (point1: LongLat, point2: LongLat): number => {
  const R = 6371;
  const dLat = deg2rad(point2[1] - point1[1]);
  const dLon = deg2rad(point2[0] - point1[0]);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(point1[1])) * Math.cos(deg2rad(point2[1]))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

export default calculateDistance;
