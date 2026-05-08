import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { useEffect } from 'react'

function ToolbarButton({ active, disabled, onClick, label, title }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      className={`rte-tool ${active ? 'is-active' : ''}`}
    >
      {label}
    </button>
  )
}

function promptForLink(editor) {
  const previous = editor.getAttributes('link').href ?? ''
  const url = window.prompt('Link URL (ცარიელი დატოვე წასაშლელად):', previous)

  if (url === null) {
    return
  }

  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

export function RichTextEditor({ value, onChange, ariaLabel }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: 'card-contact-link',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'rte-content',
        'aria-label': ariaLabel || 'Rich text editor',
      },
    },
    onUpdate({ editor: instance }) {
      const html = instance.isEmpty ? '' : instance.getHTML()
      onChange(html)
    },
  })

  useEffect(() => {
    if (!editor) {
      return
    }

    const current = editor.getHTML()
    const incoming = value || ''

    if (current === incoming) {
      return
    }

    if (editor.isFocused) {
      return
    }

    editor.commands.setContent(incoming, { emitUpdate: false })
  }, [editor, value])

  if (!editor) {
    return null
  }

  return (
    <div className="rte">
      <div className="rte-toolbar" role="toolbar">
        <ToolbarButton
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          label={<strong>B</strong>}
          title="Bold (Ctrl+B)"
        />
        <ToolbarButton
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          label={<em>I</em>}
          title="Italic (Ctrl+I)"
        />
        <ToolbarButton
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="•"
          title="Bullet list"
        />
        <ToolbarButton
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="1."
          title="Numbered list"
        />
        <ToolbarButton
          active={editor.isActive('link')}
          onClick={() => promptForLink(editor)}
          label="🔗"
          title="Link"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setHardBreak().run()}
          label="↵"
          title="Line break"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          label="✕"
          title="Clear formatting"
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
