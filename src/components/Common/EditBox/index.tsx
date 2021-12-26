import selectContext from 'context/select';
import ReactQuill from 'react-quill';
import React, { useState, useContext, useRef, useEffect } from 'react';
import Tooltip from 'components/Common/Tooltip';
import 'react-quill/dist/quill.snow.css';
import SearchMember from './SearchMember';
import './style.scss';

interface TextEditorProps {
  onSendMessage: (text: string) => void;
}

export default function TextEditor({ onSendMessage }: TextEditorProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const { selectedChannel } = useContext(selectContext);
  const domRef = useRef<HTMLDivElement>(null);
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
    <div className="editorBox" ref={domRef}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(e, delta, b, c) => {
          if (e.includes('@')) {
            setShowTooltip(true);
          } else {
            setShowTooltip(false);
          }
          if (!showTooltip) {
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
          }
          setValue(e);
        }}
        modules={modules}
        formats={formats}
        className="quillBox"
        placeholder="내용을 입력하세요."
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === '@' && domRef.current) {
            setShowTooltip(true);
            const { x, y } = domRef.current.getBoundingClientRect();
            setTooltipPosition({ x, y });
          }
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
      {showTooltip && <SearchMember tooltipPosition={tooltipPosition} />}
    </div>
  );
}
