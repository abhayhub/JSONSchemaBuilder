//all supported field types .
export type FieldType = 'string' | 'number' | 'nested';

export interface Field {
  id: string; // Unique identifier for the field 
  name: string;
  type: FieldType;
  required: boolean;
  children?: Field[];
}