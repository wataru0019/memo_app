import React from 'react';

function Sidebar(props) {
  return (
    <aside className="sidebar">
      <h2>Memos</h2>
      <ul>
        {props.memos.map((memo, index) => (
          <li key={index} onClick={() => props.onSelectMemo(index)} className="sidebar-item">
            {memo.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
