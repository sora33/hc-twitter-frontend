export interface User {
  id: number;
  email: string;
  name: string;
  provider: "email";
  uid: string;
  description: string | null;
  place: string | null;
  website: string | null;
  birthday: Date | null;
}
