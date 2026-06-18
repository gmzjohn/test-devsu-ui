export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (row: T) => string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}
