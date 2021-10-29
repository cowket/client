import React, { Fragment } from 'react';
import MenuItem from './MenuItem';
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  StrikethroughSOutlined,
  CodeOutlined,
  HighlightOutlined,
  FormatListBulletedOutlined,
  FormatListNumberedOutlined,
  SendOutlined,
} from '@material-ui/icons';
import './style.scss';

export default ({ editor, onSendMessage }: any) => {
  const items = [
    {
      icon: () => <FormatBoldOutlined />,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: () => <FormatItalicOutlined />,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: () => <StrikethroughSOutlined />,
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: () => <CodeOutlined />,
      title: 'Code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      type: 'divider',
    },
    {
      icon: () => <FormatListBulletedOutlined />,
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: () => <FormatListNumberedOutlined />,
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      icon: () => <CodeOutlined />,
      title: 'Code Block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      type: 'divider',
    },
    {
      icon: () => <SendOutlined />,
      title: 'Send',
      action: () => onSendMessage(),
      isActive: () => editor.getHTML() !== '<p></p>',
    },
  ];

  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === 'divider' ? (
            <div className="divider" />
          ) : (
            <MenuItem {...item} />
          )}
        </Fragment>
      ))}
    </div>
  );
};
