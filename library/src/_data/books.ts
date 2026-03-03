export enum Genre {
    Fiction = 'Fiction',
    Fantasy = 'Fantasy',
    ScienceFiction = 'Science Fiction',
    Mystery = 'Mystery',
    Romance = 'Romance',
    Thriller = 'Thriller',
    Biography = 'Biography',
    History = 'History'
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  pages: number;
  price: number;
  inStock: boolean;
}

export const BOOKS_LIST: Book[] = [
    {
        id: 1,
        title: 'The Silent Forest',
        author: 'John Carter',
        genre: Genre.Mystery,
        pages: 320,
        price: 4990,
        inStock: true
    },
    {
        id: 2,
        title: 'Stars Beyond Time',
        author: 'Emily Stone',
        genre: Genre.ScienceFiction,
        pages: 410,
        price: 5990,
        inStock: true
    },
    {
        id: 3,
        title: 'Kingdom of Ashes',
        author: 'Robert Black',
        genre: Genre.Fantasy,
        pages: 650,
        price: 7990,
        inStock: false
    },
    {
        id: 4,
        title: 'Love in Paris',
        author: 'Sophia White',
        genre: Genre.Romance,
        pages: 280,
        price: 3990,
        inStock: true
    },
    {
        id: 5,
        title: 'The Last Emperor',
        author: 'Michael Brown',
        genre: Genre.History,
        pages: 500,
        price: 6990,
        inStock: true
    },
    {
        id: 6,
        title: 'Mind of a Genius',
        author: 'Anna Taylor',
        genre: Genre.Biography,
        pages: 350,
        price: 4590,
        inStock: false
    },
    {
        id: 7,
        title: 'Dark Secrets',
        author: 'Daniel Green',
        genre: Genre.Thriller,
        pages: 390,
        price: 5290,
        inStock: true
    },
    {
        id: 8,
        title: 'Hidden Truth',
        author: 'Laura Adams',
        genre: Genre.Fiction,
        pages: 310,
        price: 4890,
        inStock: true
    }
];