import React, { useState, useEffect } from "react";
import axios from "axios";
import './app.css';


function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", genre: "", year: "" });

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/books", form);
    setForm({ title: "", author: "", genre: "", year: "" });
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Book Library</h1>

      <form onSubmit={addBook}>
        <input placeholder="Title" value={form.title} 
          onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Author" value={form.author} 
          onChange={(e) => setForm({ ...form, author: e.target.value })} required />
        <input placeholder="Genre" value={form.genre} 
          onChange={(e) => setForm({ ...form, genre: e.target.value })} />
        <input placeholder="Year" value={form.year} 
          onChange={(e) => setForm({ ...form, year: e.target.value })} />
        <button type="submit">Add Book</button>
      </form>

      <ul>
        {books.map((b) => (
          <li key={b._id}>
            {b.title} by {b.author} ({b.genre}, {b.year})
            <button onClick={() => deleteBook(b._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
