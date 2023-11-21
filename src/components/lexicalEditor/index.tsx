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
import { $getRoot, $getSelection } from 'lexical';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
// import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';

/* Lexical Others */
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { stringify } from 'querystring';
export default function Editor() {
  const [editorState, setEditorState] = useState<string>('');
  const [onChangeValues, setOnChangeValues] = useState<any>({});

  function handleEditorChange(newEditorState: any) {
    const editorStateJSON = JSON.stringify(newEditorState.toJSON());
    setEditorState(editorStateJSON);
    console.log(editorStateJSON);
  }

  function onChange(editorState: any) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      setOnChangeValues({ root, selection });
      // TODO: RETURN THE DOM OF THE EDITOR STATE
      // const parser = new DOMParser();
      // const dom = parser.parseFromString(model, 'text/html');

      // console.log(root, selection);
    });
  }

  // console.log('hello from leXIxal', editorState);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                onChange={handleEditorChange}
              />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TabIndentationPlugin />
          <TreeViewPlugin />
          {/* Other plugins */}
        </div>
      </div>
      <OnChangePlugin onChange={onChange} />

      <div className="onChangeValues">
        <h3>onChange Values</h3>
        <pre>{stringify(onChangeValues)}</pre>
      </div>
    </LexicalComposer>
  );
}

// Placeholder component remains the same
function Placeholder() {
  return (
    <div className="editor-placeholder">Enter some plain text...</div>
  );
}
