export type TableColumn = {
  header: string;
  columnDef: string;
  tooltip?: string;
  action?: string;
  // some actions can be bloked for a row in a table.
  // if essential is true action is active anyway.
  essentialAction?: boolean;
  style: { [klass: string]: any } | null;
};
