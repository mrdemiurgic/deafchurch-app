import {
  faAmericanSignLanguageInterpreting, faSignLanguage, faQuestion, IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Service, ServiceType } from '../types/church';

interface Days {
  [key: string]: number;
}

const days: Days = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const daysList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export interface ServiceTime {
  time: string;
  type: ServiceType
}

interface ReducedService {
  day: string;
  times: ServiceTime[];
  hasInterpreted: boolean;
  hasSigned: boolean;
}

const getHour = (time: string): number => parseInt(time.split(':')[0], 10);

const getMeridan = (time: string): string => time.slice(-2);

const sortFunc = (
  service1: Service,
  service2: Service,
) => {
  const compareDays = days[service1.day] - days[service2.day];
  if (compareDays === 0) {
    if (service1.time !== null && service2.time !== null) {
      const compareMeridans = getMeridan(service1.time).localeCompare(getMeridan(service2.time));

      if (compareMeridans === 0) {
        const compareTimes = getHour(service1.time) - getHour(service2.time);
        return compareTimes;
      }

      return compareMeridans;
    }
  }

  return compareDays;
};

const sort = (services: Service[]): Service[] => {
  const newServices = services.slice(0);
  return newServices.sort(sortFunc);
};

const reduce = (services: Service[]) => services.reduce((acc, cur) => {
  const day = acc.find((reducedService) => reducedService.day === cur.day);
  if (day !== undefined) {
    if (cur.time) {
      const newService = {
        time: cur.time,
        type: cur.serviceType,
      };
      day.times.push(newService);
    }

    return acc;
  }

  const newDay: ReducedService = {
    day: cur.day,
    times: [],
    hasInterpreted: false,
    hasSigned: false,
  };

  if (cur.time) {
    const newTime = {
      time: cur.time,
      type: cur.serviceType,
    };

    newDay.times.push(newTime);
  }

  acc.push(newDay);
  return acc;
}, [] as ReducedService[]);

export const servicesToday = (services: Service[]): ServiceTime[] => {
  const today = daysList[new Date().getDay()];
  const serviceToday = services.filter((service: Service) => service.day === today);
  if (serviceToday.length > 0) {
    return reduce(serviceToday)[0].times;
  }
  return [];
};

export const reduceServices = (services: Service[]): ReducedService[] => {
  const sortedServices = sort(services);
  const reducedServices = reduce(sortedServices);
  return reducedServices;
};

export const serviceTypeIcon = (type: ServiceType): IconDefinition => {
  switch (type) {
    case 'Interpreted':
      return faAmericanSignLanguageInterpreting;
    case 'Signed':
      return faSignLanguage;
    default:
      return faQuestion;
  }
};
