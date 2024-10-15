import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { BookDialog } from './BookDialog';

const INITIAL_BOOK = {
  title: '',
  author: '',
  genre: '',
  publication_year: '',
  isbn: '',
  availability: true,
  location: '',
  copies_available: 0
}

const BookListings = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newBook, setNewBook] = useState(INITIAL_BOOK);

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'author', headerName: 'Author', flex: 1 },
    { field: 'genre', headerName: 'Genre', flex: 1 },
    { field: 'publication_year', headerName: 'Publication Year', flex: 1 },
    { field: 'isbn', headerName: 'ISBN', flex: 1 },
    { field: 'availability', headerName: 'Availability', flex: 1, renderCell: (params) => (params.value ? 'Yes' : 'No') },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'copies_available', headerName: 'Copies Available', flex: 1, type: 'number' },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditBook(params.row)} color="primary">
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteBook(params.row)} color="error">
            <Delete />
          </IconButton>
        </>
      )
    }
  ];

  const handleEditBook = async (selectedBook) => {
    const res = await fetch(`/api/books/${selectedBook.id}`, {
      method: 'GET'
    });
    const data = await res.json();
    setNewBook(data)
    setOpenDialog(true);
  }

  const handleDeleteBook = async (selectedBook) => {
    const res = await fetch(`/api/books/${selectedBook.id}`, {
      method: 'DELETE'
    });
  }

  const handleSaveBook = async () => {
    const idPath = newBook.id ?? "";
    const res = await fetch(`/api/books/${idPath}`, {
      method: !!newBook.id ? 'PATCH' : 'POST',
      body: JSON.stringify(newBook)
    })
    setOpenDialog(false)
    setNewBook(INITIAL_BOOK)
  }

  useEffect(() => {
    const fetchBooks = async () => {
      const apiUrl = '/api/books';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    const intervalId = setInterval(() => {
      fetchBooks();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className='text-3xl font-bold text-black-500 mb-6 text-left'>
            Library Database
          </h2>
          <Button sx={{ fontSize: '15px', height: '30px', padding: 0}} onClick={handleOpenDialog}>Add</Button>
        </div>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={books}
              columns={columns}
              pageSize={5}
            />
          </Box>
        )}
      </div>
      <BookDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        newBook={newBook}
        setNewBook={setNewBook}
        handleSaveBook={handleSaveBook}
      />
    </section>
  );
};
export default BookListings;
