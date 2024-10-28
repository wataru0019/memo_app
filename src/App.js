import React, { useState } from 'react';
import './App.css';
import Memo from './Memo';
import Header from './Header';
import Sidebar from './Sidebar';

function App() {
  const [memos, setMemos] = useState([
    { title: 'My First Memo', content: 'This is a sample memo.' },
    { title: 'Another Memo', content: 'This is another memo.' },
  ])

  const [selectedMemoIndex, setSelectedMemoIndex] = useState(null);

  const handleMemoSelect = (index) => {
    setSelectedMemoIndex(index);
  };

  const handleMemoSave = (index, newTitle, newContent) => {
    // Update the memo in the state
    setMemos(prevMemos => {
      const updatedMemos = [...prevMemos];
      updatedMemos[index] = { title: newTitle, content: newContent };
      return updatedMemos;
    });
  };

  return (
    <div className="App">
      <Header title="My Memo App" />
      <div className="main-content">
        <Sidebar memos={memos} onSelectMemo={handleMemoSelect} />
        <div className="memo-detail">
          {selectedMemoIndex !== null && (
            <Memo 
              key={selectedMemoIndex}
              index={selectedMemoIndex} // Pass the index to Memo
              title={memos[selectedMemoIndex].title}
              content={memos[selectedMemoIndex].content}
              onSave={handleMemoSave} // Pass the save handler
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
