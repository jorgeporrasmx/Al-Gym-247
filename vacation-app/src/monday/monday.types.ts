export interface MondayColumn {
  id: string;
  title: string;
  type: string;
}

export interface MondayBoard {
  id: string;
  name: string;
  columns: MondayColumn[];
}

export interface MondayItem {
  id: string;
  name: string;
  column_values: MondayColumnValue[];
}

export interface MondayColumnValue {
  id: string;
  value: string;
  text: string;
}

export interface MondayDateValue {
  date: string; // YYYY-MM-DD
}

export interface MondayDateRangeValue {
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
}

export interface MondayStatusValue {
  label: string;
  index?: number;
}

export interface MondayEmailValue {
  email: string;
  text: string;
}

export interface MondayLongTextValue {
  text: string;
}
