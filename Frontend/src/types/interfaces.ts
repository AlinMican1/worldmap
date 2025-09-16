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
}
export interface ClientInfoProps {
  first_name: string;
  location: string;
  email: string;
  surname: string;
  selected?: boolean;
  // dates: Map<string, string[]>;
}

export interface ClientListProps {
  clients: ClientInfoProps[];
}

export interface AddClientInfoProps {
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
}
