export type Movie = {
  id: string;
  title: string;
  cover: string;
  isExist: boolean;
  release_date: string;
};

export type Category = {
  title: string;
  data: Array<Movie>;
};
