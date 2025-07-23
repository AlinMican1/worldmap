export interface ErrorMessageProps {
  id: string;
  errorMsg: string;
  error: boolean;
}

export interface SubmitLocationFormProps {
  email: string;
  location: string;
  name: string;
  dates: UseArrayProps<string>;
}

export interface ClientInfoProps {
  name: string;
  location: string;
  email: string;
}

export interface ClientListProps {
  clients: ClientInfoProps[];
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
}
