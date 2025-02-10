import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxDatabase,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";
import { noteSchemaLiteral } from "./noteSchema";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schemaTyped = toTypedRxJsonSchema(noteSchemaLiteral);

export type NoteDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

export const noteSchema: RxJsonSchema<NoteDocType> = noteSchemaLiteral;
export type NoteCollection = RxCollection<NoteDocType>;

export type TDatabaseCollections = {
  notes: NoteCollection;
};
export type TDatabase = RxDatabase<TDatabaseCollections>;
