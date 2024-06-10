<template>
  <div ref="mermaidContainer" class="mermaid">
    {{ code }}
  </div>
</template>

<script>
import mermaid from 'mermaid'
export default {
  name: 'Mermaid',
  props: {
    code: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.renderMermaid()
  },
  watch: {
    code() {
      this.renderMermaid()
    }
  },
  methods: {
    renderMermaid() {
      mermaid.contentLoaded()
    }
  }
}
</script>

<style scoped>
.mermaid {
  cursor: pointer;
  overflow: auto;
}
</style>
