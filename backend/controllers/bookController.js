import Book from "../models/bookModel.js";
import Category from "../models/categoryModel.js";

// Add a new book
export const addBook = async (req, res) => {
    try {
        const { title, author, description, price, category, stock } = req.body;

        // Ensure files are available and assign paths
        const coverImage = req.files && req.files.find(file => file.fieldname === 'coverImage')
            ? `/${req.files.find(file => file.fieldname === 'coverImage').path}`
            : "";
        const bookPdf = req.files && req.files.find(file => file.fieldname === 'bookPdf')
            ? `/${req.files.find(file => file.fieldname === 'bookPdf').path}`
            : "";

        // Create a new book instance
        const book = new Book({
            title,
            author,
            description,
            price,
            category,
            coverImage,
            bookPdf,
            stock
        });

        // Save the book to the database
        const createdBook = await book.save();

        res.status(201).json({
            status: 'success',
            message: 'Book added successfully',
            book: createdBook
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to add book',
            error: error.message
        });
    }
};

// Get all books with optional category filtering
export const getAllBooks = async (req, res) => {
    try {
        const { category } = req.query; // Get the category query parameter
        const filter = category ? { category } : {}; // Filter if category is provided

        const books = await Book.find(filter).populate("category", "name");
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get books by category
export const getBooksByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const books = await Book.find({ category: categoryId })
            .populate("category", "name");

        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ message: "No books found for this category" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single book by ID
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("category", "name");

        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a book
export const updateBook = async (req, res) => {
    const { title, author, description, price, category, coverImage, stock } = req.body;

    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            book.title = title || book.title;
            book.author = author || book.author;
            book.description = description || book.description;
            book.price = price || book.price;
            book.category = category || book.category;
            book.coverImage = coverImage || book.coverImage;
            book.stock = stock || book.stock;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            await book.remove();
            res.json({ message: "Book removed" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
