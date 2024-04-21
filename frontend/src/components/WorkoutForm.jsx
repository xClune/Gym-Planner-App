import { useState, useEffect } from 'react'
import api from '../api'

function WorkoutForm ({ notes, noteId, getNotes, newNoteView, setNewNoteView }) {
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    // if form is brought up through 'edit' set values to be the same
    // as the note selected.
    useEffect(() => {
        if (newNoteView === 'edit'){
            for (const note of notes){
                if (note.id === noteId){
                    setCategory(note.category);
                    setContent(note.content);
                    setTitle(note.title);
                }
            };
        }
    }, [newNoteView])

    const createNote = (e) => {
        e.preventDefault()
        if (category === 'Category'){
            alert('Please select a category!')
            return;
        }
        api
            .post('/api/notes/', {category, content, title})
            .then((res) => {
                if (!res.status === 201) alert('Failed to create note.')
                getNotes();
                setNewNoteView(false);
                setCategory("");
                setContent("");
                setTitle("");
            })
            .catch((error) => alert(error))
    }

    const editNote = (e) => {
        e.preventDefault();
        if (category === 'Category'){
            alert('Please select a category!')
            return;
        }
        api
            .put(`/api/notes/edit/${noteId}/`, {category, content, title})
            .then((res) => {
                if (!res.status === 204) alert('Failed to update note.')
                getNotes();
                setNewNoteView(false);
                setCategory("");
                setContent("");
                setTitle("");
            })
            .catch((error) => alert(error))
    }

    if (!newNoteView) {
        return <></>
    } else {
        return (
            <>
                <form onSubmit={newNoteView === 'edit' ? editNote : createNote } className='bg-stone-400 border-2 border-stone-700 rounded-lg p-5 absolute sm:top-1/2 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/4 w-11/12 sm:w-6/12 z-50 text-white'>
                    <div>Enter New Workout:</div>
                    <button 
                    className='absolute right-2 top-2 hover:bg-red-600 rounded-md px-3' 
                    onClick={() => {
                        setNewNoteView(false);
                        setCategory("");
                        setContent("");
                        setTitle("");
                        }}>
                        X
                    </button>
                    <label htmlFor="title"></label>
                    <br />
                    <input
                        className='form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:border-stone-500'
                        type="text"
                        id="title"
                        name="title"
                        placeholder='Title'
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <br />
                    <label htmlFor="category"></label>
                    <br />
                    <select
                        className='form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:border-stone-500'
                        id="category"
                        name="category"
                        required
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                    >
                        <option value="Category">Select category</option>
                        <option value="Full-body">Full Body</option>
                        <option value="Legs">Legs</option>
                        <option value="Abs">Abs</option>
                        <option value="Chest">Chest</option>
                        <option value="Back">Back</option>
                        <option value="Shoulders">Shoulders</option>
                        <option value="Arms">Arms</option>
                    </select>
                    <br />
                    <label htmlFor="content"></label>
                    <br />
                    <textarea
                        className='form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:border-stone-500'
                        id="content"
                        name="content"
                        placeholder='Workout Content'
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <br />               
                    <input 
                    className='form-button text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800 cursor-pointer'
                    type="submit" 
                    value="Submit"> 
                    </input>
                </form>
            </>
        )
    }
    
}

export default WorkoutForm