import { Dispatch } from 'react';
import CompleteItinerary from './CompleteItinerary';
import DailyItinerary from './DailyItinerary';

export default interface SingleDayItineraryProps {
  editedItinerary: CompleteItinerary;
  setEditedItinerary: Dispatch<React.SetStateAction<CompleteItinerary>>;
  dateObj: DailyItinerary;
  date: string;
  setChangesMade: Dispatch<React.SetStateAction<boolean>>;
}
