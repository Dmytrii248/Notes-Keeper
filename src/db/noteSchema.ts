export const noteSchemaLiteral = {
  title: "note schema",
  description: "describes a note",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    userId: {
      type: "integer",
    },
    title: {
      type: "string",
      maxLength: 100,
    },
    body: {
      type: "string",
    },
  },

  required: ["id", "userId", "title", "body"],
} as const;
