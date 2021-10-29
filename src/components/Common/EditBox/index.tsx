import React, { useState, useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import './style.scss';

interface EditBoxProps {
  onSendMessage: (message: string) => void;
}

const EditBox = ({ onSendMessage }: EditBoxProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
    ],
  });

  const onSubmit = () => {
    if (editor) {
      onSendMessage(editor.getHTML());
      editor.commands.clearContent(true);
    }
  };

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} onSendMessage={onSubmit} />}
      <EditorContent
        className="editor__content"
        editor={editor}
        style={{ outline: 'none' }}
        placeholder="내용을 입력하세요."
      />
    </div>
  );
};

export default EditBox;
