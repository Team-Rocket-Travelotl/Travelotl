export default class Trip {
  destination: string = '';
  startDate: string = new Date(Date.now()).toISOString().slice(0, 10);
  endDate: string = new Date(Date.now()).toISOString().slice(0, 10);
  activities: String[] = [];
  budget: number = 0;
  travelers: number = 0;
  groupDescription: string = 'Solo traveler';
}