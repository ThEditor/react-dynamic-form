export interface Field {
  id: string;
  label: string;
  type: string;
  required: boolean;
}

export interface FormType {
  id: string;
  fields: Field[];
}
