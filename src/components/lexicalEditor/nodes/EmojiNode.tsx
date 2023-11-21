import { TextNode } from 'lexical';

export class EmojiNode extends TextNode {
  static getType() {
    return 'emoji';
  }

  static importJSON(jsonData: any) {
    // Reconstruct EmojiNode instance from JSON data
    const { className, text, key } = jsonData;
    return new EmojiNode(className, text, key);
  }

  static clone(node: any) {
    return new EmojiNode(node.__className, node.__text, node.__key);
  }

  constructor(className: any, text: any, key?: any) {
    super(text, key);
    this.__className = className;
  }

  createDOM(config: any) {
    const dom = document.createElement('span');
    const inner = super.createDOM(config);
    dom.className = this.__className;
    inner.className = 'emoji-inner';
    dom.appendChild(inner);
    return dom;
  }

  updateDOM(prevNode: any, dom: any, config: any) {
    const inner = dom.firstChild;
    if (inner === null) {
      return true;
    }
    super.updateDOM(prevNode, inner, config);
    return false;
  }
}

export function $isEmojiNode(node: any) {
  return node instanceof EmojiNode;
}

export function $createEmojiNode(className: any, emojiText: any) {
  return new EmojiNode(className, emojiText).setMode('token');
}
