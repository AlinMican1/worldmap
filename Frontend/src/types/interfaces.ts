export interface ErrorMessageProps {
  id: string;
  errorMsg: string;
  error: boolean;
}

// export interface SubmitLocationFormProps {
//   email: string;
//   location: string;
//   name: string;
// }
export interface IconProps {
  className?: string;
  size?: string;
}

export interface ClientInfoProps {
  first_name: string;
  meeting_title?: string;
  location: string;
  email: string;
  surname: string;
  timezone: string;
  selected?: boolean;

  // dates: Map<string, string[]>;
}

export interface MeetingDetailsProps {
  meeting_link?: string;
  meeting_date: string;
  meeting_time: string;
  meeting_desc?: string;
  meeting_duration: string;
  meeting_title: string;
}

export interface ClientListProps {
  clients: ClientInfoProps[];
}

export interface AddClientInfoProps {
  clients: ClientInfoProps[];
  setClients: React.Dispatch<React.SetStateAction<ClientInfoProps[]>>;
  parentWidth?: number;
}
export interface AddClientInfowParentWidth {
  clients: ClientInfoProps[];
  setClients: React.Dispatch<React.SetStateAction<ClientInfoProps[]>>;
}
export interface UseArrayProps<T> {
  array: T[];
  setArray: React.Dispatch<React.SetStateAction<T[]>>;
  push: (item: T) => void;
  remove: (index: number) => void;
  clear: () => void;
}
// export interface ChooseDateProps {
//   dateArray: UseArrayProps<string>;
// }
// export interface ChooseTimeProps {
//   time: string;
// }

export interface ChooseDateAndTimeProps {
  dateArray: UseArrayProps<string>;
  time: string;
  setTime: (time: string) => void;
  dateAndTimeMap: Map<string, string[]>;
  setDateAndTimeMap: (updater: (prevMap: Map<string, string[]>) => Map<string, string[]>) => void;
  // meetingDate: string;
}

export interface MeetingDateProps {
  meetingDate: string;
  setMeetingDate: React.Dispatch<React.SetStateAction<string>>;
}
