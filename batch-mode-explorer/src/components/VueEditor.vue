<template>
  <div class="vueEditor">
    <div :style="{display: displayStyle, 'touch-action':'none'}" class="editor" @pointerdown="pointerDown" @loaded="loaded" @changed="changed($event)" @exported="exported($event)" touch-action="none" ref="editor"></div>
    <div v-if="!this.noLogo" class="editor-logo"></div>
  </div>
</template>

<script>
/* eslint-disable import/no-named-as-default-member,no-underscore-dangle,no-undef,no-console */


import MyScript from 'myscript/dist/myscript.esm';
import EventBus from '@/event-bus';
import { attach, detach } from '@/utils/custom_grabber';

export default {
  name: 'vue-editor',
  props: ['diagramData', 'noLogo'],
  data() {
    return {
      editor: {},
      defaultConfiguration: {},
      pointerType: 'PEN',
      displayStyle: '',
      clientWidth: '',
      clientHeight: '',
      currentColor: '',
      currentThickness: '',
      exports: '',
      saveRequested: false,
    };
  },
  methods: {
    pointerDown() {
      EventBus.$emit('pointerDown');
    },
    loaded(evt) {
      this.$emit('loaded', evt)
    },
    changed(event) {
      this.$store.commit('updateStrokeGroups', this.getStrokeGroups());
      EventBus.$emit('changed', {
        event,
        canClear: this.editor.model.rawStrokes.length > 0,
      });
    },
    exported(event) {
      this.exports = event.detail.exports;
      EventBus.$emit('exported', {
        exports: event.detail.exports,
        clientWidth: this.clientWidth,
        clientHeight: this.clientHeight,
      });
      if (
        this.exports &&
        this.exports[
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ] &&
        this.saveRequested
      ) {
        const blob = new Blob(
          [
            this.exports[
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            ],
          ],
          {
            type:
              'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          },
        );
        FileSaver.saveAs(blob, 'myscript-diagram.pptx');
        this.saveRequested = false;
      }
    },
    updateColor(color) {
      this.currentColor = color;
      this.editor.penStyle = {
        color: this.currentColor,
        '-myscript-pen-width': this.currentThickness
          ? this.currentThickness
          : '',
      };
    },
    getStrokeGroups() {
      return this.editor.model.strokeGroups;
    }
  },
  mounted() {
    this.defaultConfiguration = {
      restConversionState: 'DIGITAL_EDIT',
      triggers: {
        exportContent: 'DEMAND',
      },
      recognitionParams: {
        type: 'DIAGRAM',
        protocol: 'REST',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: '12240847-03f1-4f6a-8774-64ad6e51fb82',
          hmacKey: '104c326a-2b7b-4f4b-8083-9e7f9553a2b6',
        },
        v4: {
          diagram: {
            mimeTypes: [
              'image/svg+xml',
              'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            ],
          },
        },
      },
    };
    this.editor = MyScript.register(
      this.$refs.editor,
      this.defaultConfiguration,
      undefined,
      undefined,
      {
        grabber: { attach, detach },
      },
    );

    this.editor.pointerType = 'PEN';

    this.clientWidth = this.$refs.editor.clientWidth;
    this.clientHeight = this.$refs.editor.clientHeight;

    EventBus.$on('clear', () => {
      this.editor.clear();
      EventBus.$emit('clearSvg');
    });
    EventBus.$on('undo', () => {
      this.editor.undo();
    });
    EventBus.$on('redo', () => {
      this.editor.redo();
    });

    EventBus.$on('preview', () => {
      this.displayStyle = 'none';
      if (this.editor.model.rawStrokes.length > 0) {
        this.editor.export_([
          'image/svg+xml',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        ]);
      } else {
        EventBus.$emit('clearSvg');
      }
    });

    EventBus.$on('text-convert', () => {
      this.displayStyle = 'none';
      this.editor.configration = Object.assign({}, this.defaultConfiguration, {
        recognitionParams: { type: 'TEXT' },
      });
      if (this.editor.model.rawStrokes.length > 0) {
        this.editor.export_(['text/plain']);
      } else {
        EventBus.$emit('clearSvg');
      }
    });

    EventBus.$on('edit', () => {
      this.displayStyle = 'inherit';
    });

    EventBus.$on('save', () => {
      if (
        this.exports &&
        this.exports[
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ]
      ) {
        const iOS =
          !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        if (iOS) {
          const blob = new Blob([
            this.exports[
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            ],
          ]);
          FileSaver.saveAs(blob, 'myscript-diagram.pptx');
        } else {
          const blob = new Blob(
            [
              this.exports[
              'application/vnd.openxmlformats-officedocument.presentationml.presentation'
              ],
            ],
            {
              type:
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            },
          );
          FileSaver.saveAs(blob, 'myscript-diagram.pptx');
        }
      } else if (this.editor.model.rawStrokes.length > 0) {
        this.editor.export_();
        this.saveRequested = true;
      } else {
        EventBus.$emit('showNotification', 'save');
      }
    });

    EventBus.$on('eraserEnabled', () => {
      this.pointerType = 'ERASER';
      this.editor.pointerType = 'ERASER';
    });

    EventBus.$on('eraserDisabled', () => {
      this.pointerType = 'PEN';
      this.editor.pointerType = 'PEN';
    });

    EventBus.$on('colorChanged', (color) => {
      this.updateColor(color);
    });

    EventBus.$on('customColorChanged', (color) => {
      this.updateColor(color);
    });

    EventBus.$on('thicknessUpdated', (data) => {
      this.currentThickness = data.value;
      this.editor.penStyle = {
        color: this.currentColor ? this.currentColor : '',
        '-myscript-pen-width': this.currentThickness,
      };
    });

    window.addEventListener('resize', () => {
      this.editor.resize();
    });
  },
};
</script>

<style>
@import '../../node_modules/myscript/dist/myscript.min.css';
</style>
<style scoped>
.vueEditor {
  height: 100%;
}
.editor {
  height: 100%;
}

.editor-logo {
  position: absolute;
  margin-bottom: 36px;
  bottom: 0;
  right: 24px;
  z-index: 21;
  content: url(../static/img/myscript-logo.svg);
}

.editor-logo::after {
  content: url(../static/img/myscript-logo.svg);
}
</style>
