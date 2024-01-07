<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import History from '@tiptap/extension-history'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import Strike from '@tiptap/extension-strike'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import ListItem from '@tiptap/extension-list-item'

const editor = ref()

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      Document,
      Paragraph,
      Code,
      Text,
      History,
      Bold,
      Italic,
      Heading,
      Link,
      Strike,
      BulletList,
      OrderedList,
      HardBreak,
      HorizontalRule,
      CodeBlock,
      Blockquote,
      ListItem
    ],
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a simple editable '
            },
            {
              type: 'text',
              text: 'editor',
              marks: [
                {
                  type: 'bold'
                }
              ]
            },
            {
              type: 'text',
              text: '. '
            },
            {
              type: 'text',
              text: 'Enjoy'
            },
            {
              type: 'text',
              text: '!'
            }
          ]
        }
      ]
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON())
    }
  })
})

onUnmounted(() => {
  editor.value.destroy()
})
</script>

<template>
  <div class="x flex h-fit w-full max-w-[680px] flex-col overflow-clip">
    <EditorToolkit :editor="editor" class="w-full bg-surface-container" />
    <EditorContent :editor="editor" class="prose min-w-full p-3 xl:prose-lg dark:prose-invert" />
  </div>
</template>

<style>
.prose {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  li,
  code,
  blockquote,
  pre,
  p {
    margin-block: 0;
  }
}

.prose:has(.tiptap:focus-visible) {
}

.tiptap {
  --tw-prose-bullets: rgb(var(--on-surface-rgb));

  &:focus-visible {
    outline: none;
  }
}
</style>
