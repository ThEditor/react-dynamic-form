export interface Field {
  id: string;
  label: string;
  type: string;
  options?: {
    label: string;
    value: string;
  }[];
  required: boolean;
}

export interface FormType {
  id: string;
  fields: Field[];
}
