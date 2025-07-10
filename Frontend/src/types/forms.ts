export interface ErrorMessageProps {
  id: string;
  errorMsg: string;
  error: boolean;
}

export interface SubmitLocationFormProps {
  email: string;
  location: string;
  name: string;
}

export interface ClientInfoProps {
  name: string;
  location: string;
  email: string;
}

export interface ClientListProps {
  clients: ClientInfoProps[];
}
