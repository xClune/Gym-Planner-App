import { useState, useContext } from 'react'

import { ExpContext } from '../contexts/ExperienceContext'
import { LevelContext } from '../contexts/LevelContext'


function Note({note, onDelete, setNewNoteView, setNoteId, z, updateStats}) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    // use state for toggling note content
    const [hidden, setHidden] = useState('hidden')
    const toggleInfo = () => {
        hidden === 'hidden' ? setHidden('') : setHidden('hidden');
    }

    // receive the exp and level contexts
    const { exp, setExp } = useContext(ExpContext)
    const { level, setLevel } = useContext(LevelContext)

    return (
        <>
            <div className={`note-container text-white flex flex-col w-full min-h-36 bg-gradient-to-br from-stone-500 to-purple-800 rounded-lg p-5 self-center z-${z} -mt-20 peer peer-hover:translate-y-20 transition-all ease-in-out duration-700`} onMouseLeave={() => setHidden('hidden')}>
                <p className={`note-title font-bold text-l mb-3 text-center`}>{note.title}</p>
                <p className={`note-date ${hidden} text-xs self-end mb-2`}>Added { formattedDate }</p>
                <p className={`category ${hidden} border-b border-stone-400`}>{note.category}</p>
                <p className={`mt-5 note-content text-center ${hidden}`}>{note.content}</p>
                <button 
                    className={`complete-note ${hidden} text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-xs mt-2 px-1 py-1 flex-1 text-center dark:bg-stone-600 dark:hover:bg-green-600 dark:focus:ring-stone-800 z-${z} transition-all ease-in duration-300 mx-1`} 
                    onClick={() => {
                        // onDelete(note.id);
                        if (level*100 <= exp+20) {
                            setExp(0);
                            setLevel(level+1);
                        } else {setExp(exp+20)}
                        updateStats();
                    }}
                    >
                        Happy Delete! (+20xp)
                </button>
                <div className='flex flex-row items-center justify-between mt-5'>
                    <button className={`note-edit ${hidden} text-xs text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg mt-2 px-1 py-1 text-center dark:bg-stone-600 dark:hover:bg-blue-600 dark:focus:ring-stone-800 z-${z} transition-all ease-in duration-300 flex-1 mx-1`}
                    onClick={() => {
                        setNoteId(note.id),
                        setNewNoteView('edit')
                    }}>Edit</button>
                    <button 
                    className={`delete-note ${hidden} text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-xs mt-2 px-1 py-1 flex-1 text-center dark:bg-stone-600 dark:hover:bg-red-600 dark:focus:ring-stone-800 z-${z} transition-all ease-in duration-300 mx-1`} 
                    onClick={() => {
                        onDelete(note.id)
                    }}>Delete
                    </button>
                </div>
                <a className={`extend self-center text-white hover:cursor-pointer py-0 px-1 mt-5 hover:text-stone-500 rounded-sm text-s hover:bg-white transition-all ease-in duration-300 cursor-pointer`} onClick={toggleInfo}>{
                    hidden == '' ? 'Hide' : 'Show'
                }</a>
            </div>
        </>
    );
}

export default Note