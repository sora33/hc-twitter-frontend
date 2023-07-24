export interface Tweet {
  id: number;
  content: string;
  image: FileList | null;
  createdAt: Date;
  updatedAt: Date;
}
