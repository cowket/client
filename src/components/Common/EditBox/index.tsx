import selectContext from 'context/select';
import ReactQuill from 'react-quill';
import React, { useState, useContext, useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import './style.scss';

interface TextEditorProps {
  onSendMessage: (text: string) => void;
}

export default function TextEditor({ onSendMessage }: TextEditorProps) {
  const { selectedChannel } = useContext(selectContext);
  // shift + enter누를때 개행되도록 처리할 flag 값
  const isShiftClicked = useRef<boolean>(false);
  useEffect(() => {
    if (selectedChannel) {
      setValue('');
    }
  }, [selectedChannel]);

  const onSubmit = () => {
    onSendMessage(value);
    setValue('');
  };

  const [value, setValue] = useState('');
  console.log(value);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'code-block'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'code',
    'code-block',
  ];
  return (
    <div className="editorBox">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(e, delta, b, c) => {
          if (c.getText() === '') {
            setValue('');
            return;
          }
          if (delta?.ops?.[1]?.insert === '\n') {
            if (isShiftClicked.current) {
              console.log('개행해야함.');
            } else {
              onSubmit();
              return;
            }
          }
          setValue(e);
        }}
        modules={modules}
        formats={formats}
        className="quillBox"
        placeholder="내용을 입력하세요."
        onKeyDown={(e: any) => {
          if (e.key === 'Shift') {
            isShiftClicked.current = true;
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
}
