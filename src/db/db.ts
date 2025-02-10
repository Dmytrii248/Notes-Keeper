import { addRxPlugin, createRxDatabase, RxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { noteSchema, TDatabaseCollections } from "./models";

let dbPromise: Promise<RxDatabase<TDatabaseCollections>> | null = null;

const _create = async () => {
  addRxPlugin(RxDBDevModePlugin);
  addRxPlugin(RxDBUpdatePlugin);

  console.log("DatabaseService: creating database..");
  const db = await createRxDatabase<TDatabaseCollections>({
    name: "notesreactdb",
    storage: wrappedValidateAjvStorage({ storage: getRxStorageDexie() }),
  });

  console.log("DatabaseService: created database");
  (window as unknown as { db: RxDatabase<TDatabaseCollections> }).db = db;

  console.log("DatabaseService: create collections");
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
