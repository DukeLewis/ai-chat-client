<template>
  <div class="markdown-body" :style="{ fontSize: fontSize + 'px', direction: textDirection }">
    <vue-markdown :source="content" :options="markdownOptions">
      <template v-slot:pre="{ children }">
        <pre ref="preRef">
          <span class="copy-code-button"></span>
          <slot name="preContent" :children="children"></slot>
        </pre>
        <mermaid v-if="mermaidCode" :code="mermaidCode" @click="viewSvgInNewWindow"/>
      </template>
    </vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Mermaid from '@/components/markdown/Mermaid'
import { debounce } from 'lodash'

export default {
  name: 'Markdown',
  components: {
    VueMarkdown,
    Mermaid
  },
  props: {
    content: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: Number,
      default: 14
    }
  },
  data() {
    return {
      mermaidCode: '',
      markdownOptions: {
        breaks: true,
        gfm: true,
        highlight: (code, lang) => {
          const hljs = require('highlight.js')
          const language = hljs.getLanguage(lang) ? lang : 'plaintext'
          return hljs.highlight(code, { language }).value
        }
      }
    }
  },
  computed: {
    textDirection() {
      return /[\u0600-\u06FF]/.test(this.content) ? 'rtl' : 'ltr'
    }
  },
  watch: {
    content: 'renderMermaid'
  },
  mounted() {
    this.renderMermaid()
  },
  methods: {
    renderMermaid: debounce(function() {
      const preRef = this.$refs.preRef
      if (!preRef) return
      const mermaidDom = preRef.querySelector('code.language-mermaid')
      if (mermaidDom) {
        this.mermaidCode = mermaidDom.innerText
      }
    }, 600),
    viewSvgInNewWindow() {
      const svg = this.$refs.preRef.querySelector('svg')
      if (!svg) return
      const text = new XMLSerializer().serializeToString(svg)
      const blob = new Blob([text], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const win = window.open(url)
      if (win) {
        win.onload = () => URL.revokeObjectURL(url)
      }
    }
  }
}
</script>

<style scoped>
.no-dark.mermaid {
  cursor: pointer;
  overflow: auto;
}
</style>
