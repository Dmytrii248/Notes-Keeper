import { addRxPlugin, createRxDatabase, RxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { noteSchema, TDatabaseCollections } from "./models";

let dbPromise: Promise<RxDatabase<TDatabaseCollections>> | null = null;

const _create = async () => {
  addRxPlugin(RxDBUpdatePlugin);

  const db = await createRxDatabase<TDatabaseCollections>({
    name: "notesreactdb",
    storage: wrappedValidateAjvStorage({ storage: getRxStorageDexie() }),
  });

  (window as unknown as { db: RxDatabase<TDatabaseCollections> }).db = db;

  await db.addCollections({
    notes: {
      schema: noteSchema,
    },
  });

  return db;
};

export const getDatabase = () => {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
};
