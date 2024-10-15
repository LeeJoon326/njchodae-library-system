import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox } from '@mui/material';

export const BookDialog = ({ openDialog, setOpenDialog, newBook, setNewBook, handleSaveBook }) => {
    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>{'Add New Book'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    fullWidth
                    margin="dense"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />
                <TextField
                    label="Author"
                    fullWidth
                    margin="dense"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                />
                <TextField
                    label="Genre"
                    fullWidth
                    margin="dense"
                    value={newBook.genre}
                    onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                />
                <TextField
                    label="Publication Year"
                    fullWidth
                    margin="dense"
                    type="number"
                    value={newBook.publication_year}
                    onChange={(e) => setNewBook({ ...newBook, publication_year: e.target.value })}
                />
                <TextField
                    label="ISBN"
                    fullWidth
                    margin="dense"
                    value={newBook.isbn}
                    onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                />
                <TextField
                    label="Location"
                    fullWidth
                    margin="dense"
                    value={newBook.location}
                    onChange={(e) => setNewBook({ ...newBook, location: e.target.value })}
                />
                <TextField
                    label="Copies Available"
                    fullWidth
                    margin="dense"
                    type="number"
                    value={newBook.copies_available}
                    onChange={(e) => setNewBook({ ...newBook, copies_available: e.target.value })}
                />
                <Checkbox
                    label="Availability"
                    fullWidth
                    margin="dense"
                    type="checkbox"
                    checked={newBook.availability}
                    onChange={(e) => setNewBook({ ...newBook, availability: e.target.checked })}
                />
                {/* TODO: validate the checkbox */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveBook} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}