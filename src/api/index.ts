import { TNote } from "@/types";

class APINote {
  readonly baseUrl: string = "https://jsonplaceholder.typicode.com/posts";
  readonly headers: HeadersInit = {
    "Content-type": "application/json; charset=UTF-8",
  };

  async getNotes(): Promise<TNote[]> {
    try {
      const response = await fetch(this.baseUrl);

      return response.json();
    } catch (error) {
      console.error(error);

      return [];
    }
  }
}

const ApiNote = new APINote();
export default ApiNote;
