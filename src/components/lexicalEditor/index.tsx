import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import EmoticonPlugin from './plugins/EmoticonPlugin';
import editorConfig from './editorConfig';
import onChange from './onChange';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';

import MyCustomAutoFocusPlugin from './plugins/MyCustomAutoFoucusPlugin';
import { useState } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
// import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';

/* Lexical Others */
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

export default function Editor() {
  // const [editorState, setEditorState] = useState<string>(''); // Assuming editorState is meant to store JSON as a string
  // function onChange(newEditorState: any) {
  //   const editorStateJSON = JSON.stringify(newEditorState.toJSON());
  //   setEditorState(editorStateJSON);
  // }
  console.log(onChange);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="editor-input" />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          {/* <ListPlugin /> */}
          <HistoryPlugin />
          <AutoFocusPlugin />
          {/* <CodeHighlightPlugin /> */}
          {/* <LinkPlugin /> */}
          <TabIndentationPlugin />
          {/* <AutoLinkPlugin /> */}
          {/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
          <TreeViewPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return (
    <div className="editor-placeholder">Enter some plain text...</div>
  );
}
