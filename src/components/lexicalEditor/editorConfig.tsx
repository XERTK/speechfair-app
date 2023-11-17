import { any } from 'prop-types';
import { EmojiNode } from './nodes/EmojiNode';
import exampleTheme from './ExampleTheme';

const editorConfig = {
  namespace: 'MyEditor',
  theme: exampleTheme,
  onError(error: any) {
    throw error;
  },
  nodes: [EmojiNode],
};

export default editorConfig;
