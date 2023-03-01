import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import { PropsWithChildren } from "react";
import { Content } from "@tiptap/core";

type BubbleMenuButtonProps = {
  onClick: () => void;
  isActive: boolean;
};

const BubbleMenuButton = ({
  onClick,
  isActive,
  children,
}: PropsWithChildren<BubbleMenuButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border px-2 " +
        (isActive ? "bg-black text-white" : "border-black bg-white")
      }
    >
      {children}
    </button>
  );
};

type EditorProps = {
  initialContent?: Content;
};

export const Editor = ({ initialContent }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography, Placeholder],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert focus:outline-none",
      },
    },
  });

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex gap-2"
        >
          <BubbleMenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            bold
          </BubbleMenuButton>
          <BubbleMenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            italic
          </BubbleMenuButton>
          <BubbleMenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
          >
            strike
          </BubbleMenuButton>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};
