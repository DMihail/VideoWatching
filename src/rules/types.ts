export type Book = {
  id: string;
  title: string;
  cover: string;
  isExist: boolean;
  release_date: string;
  author: string;
  type: string;
};

export type Category = {
  title: string;
  data: Array<Book>;
};
