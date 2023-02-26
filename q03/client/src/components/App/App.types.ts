export type TBatch = {
  formData: FormData;
  custodianName: string;
  dataType: EFileTypes;
};

export type TBatchList = TBatch[];

export enum EFileTypes {
  TEXT = "text",
  IMAGE = "image",
  WORD = "word",
  SHEET = "spreadsheet",
  PDF = "pdf",
  MULTIPLE = "multiple",
  UNSUPPORTED = "unsupported",
}
