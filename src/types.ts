export type TypeCell = {
  index: number;
  value: string;
  edit: boolean;
};

export type TypeHistory = {
  cellValues: Array<TypeCell>;
  turn: boolean;
};
