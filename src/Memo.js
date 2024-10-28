import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

function Memo(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [editorState, setEditorState] = useState(() => {
    const isJSON = (str) => {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }

    let initialContent = null;
    if (isJSON(props.content)) {
      initialContent = convertFromRaw(JSON.parse(props.content));
    } else {
      // Correct the initialContent creation for plain text:
      const contentState = convertFromRaw({
        blocks: [{
          key: 'initial',
          text: props.content,
          type: 'unstyled',
        }],
        entityMap: {},
      });

      initialContent = contentState;
    }

    return EditorState.createWithContent(initialContent);
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(contentState));
    props.onSave(props.index, title, rawContent);
    setIsEditing(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  if (isEditing) {
    return (
      <div className="memo">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          className="memo-title-input"
        />
        <div className="memo-editor">
          <Editor 
            editorState={editorState}
            onChange={setEditorState}
          />
        </div>
        <button onClick={handleSaveClick}>Save</button>
      </div>
    );
  } else {
    return (
      <div className="memo">
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: props.content }} /> {/* Display content as HTML */}
        <button onClick={handleEditClick}>Edit</button>
      </div>
    );
  }
}

export default Memo;
