"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getDatabase, TDatabase } from "@/db";
import { bulkDB } from "@/utils";
import { Loader } from "./Loader";

interface DatabaseContextData {
  database: TDatabase;
}

const DatabaseContext = createContext({} as DatabaseContextData);

export const DBProvider = ({ children }: PropsWithChildren) => {
  const [database, setDatabase] = useState<TDatabase>();

  useEffect(() => {
    (async () => {
      const database = await getDatabase();
      const amountOfElements = await database.notes.count().exec();

      if (!amountOfElements) {
        bulkDB(database);
      }

      setDatabase(database);
    })();

    return () => {
      database?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!database) {
    return <Loader />;
  }

  return (
    <DatabaseContext.Provider value={{ database }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export function useDatabase() {
  const { database } = useContext(DatabaseContext);
  return database;
}
