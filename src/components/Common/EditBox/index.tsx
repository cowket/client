import React, { useEffect, useContext, useRef } from 'react';
import selectContext from 'context/select';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import './style.scss';

interface EditBoxProps {
  onSendMessage: (message: string) => void;
}

const EditBox = ({ onSendMessage }: EditBoxProps) => {
  const { selectedChannel } = useContext(selectContext);
  // shift + enter누를때 개행되도록 처리할 flag 값
  const isShiftClicked = useRef<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
    ],
  });

  useEffect(() => {
    if (selectedChannel && editor) {
      editor.commands.clearContent(true);
    }
  }, [selectedChannel]);

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
        style={{ outline: 'none', maxWidth: '90%' }}
        placeholder="내용을 입력하세요."
        onKeyDown={(e: any) => {
          if (e.key === 'Shift') {
            isShiftClicked.current = true;
          }
          if (e.keyCode === 13) {
            if (isShiftClicked.current) {
              console.log('개행해야함.');
            } else {
              onSubmit();
            }
          }
        }}
        onKeyUp={(e) => {
          if (e.key === 'Shift') {
            isShiftClicked.current = false;
          }
        }}
      />
    </div>
  );
};

export default EditBox;
