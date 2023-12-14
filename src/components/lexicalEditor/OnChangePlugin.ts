import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import onChange from './onChange';

type OnChangeFunction = (editorState: any) => void; // Define the type for onChange function

interface OnChangePluginProps {
  onChange: OnChangeFunction; // Use the defined type for onChange prop
}

export default function OnChangePlugin({
  onChange,
}: OnChangePluginProps) {
  // Access the editor through the LexicalComposerContext
  const [editor] = useLexicalComposerContext();
  // Wrap our listener in useEffect to handle the teardown and avoid stale references.
  useEffect(() => {
    // most listeners return a teardown function that can be called to clean them up.
    return editor.registerUpdateListener(({ editorState }) => {
      // call onChange here to pass the latest state up to the parent.
      onChange(editorState);
    });
  }, [editor, onChange]);
}
