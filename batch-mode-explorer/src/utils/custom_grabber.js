/* eslint-disable no-undef,no-console */
/* eslint-disable max-len */
/**
 * Grab pointerDown, pointerMove and pointerUp events
 * @typedef {Object} Grabber
 * @property {function(element: Element, editor: Editor): GrabberContext} attach Attach events and decide when to call editor pointerDown/Move/Up methods
 * @property {function(element: Element, context: GrabberContext)} detach Detach the grabber
 */

/**
 * Grabber listener
 * @typedef {Object} GrabberListener
 * @property {Array<String>} types Event types to listen
 * @property {function(event: Event)} listener Event listener for these events
 */

/**
 * Grabber context
 * @typedef {Object} GrabberContext
 * @property {Boolean|Object} options Options object that specifies characteristics about the event listener. (@see addEventListener.options for detail)
 * @property {Array<GrabberListener>} listeners Registered listeners
 */

const floatPrecisionArray = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];

function roundFloat(oneFloat, requestedFloatPrecision) {
  if (requestedFloatPrecision || requestedFloatPrecision === 0) {
    let floatPrecision;
    if (requestedFloatPrecision > 10) {
      floatPrecision = floatPrecisionArray[10];
    } else {
      floatPrecision = floatPrecisionArray[requestedFloatPrecision];
    }
    return Math.round(oneFloat * floatPrecision) / floatPrecision;
  }
  return oneFloat;
}

function extractPoint(event, domElement, configuration, offsetTop = 0, offsetLeft = 0) {
  let eventRef = event;
  if (eventRef.changedTouches) {
    eventRef = eventRef.changedTouches[0];
  }
  const rect = domElement.getBoundingClientRect();
  return {
    x: roundFloat(eventRef.clientX - rect.left - domElement.clientLeft - offsetLeft, configuration.xyFloatPrecision),
    y: roundFloat(eventRef.clientY - rect.top - domElement.clientTop - offsetTop, configuration.xyFloatPrecision),
    t: roundFloat(Date.now(), configuration.timestampFloatPrecision),
  };
}

function eraseStroke(evt, editor) {
  const elemLeft = editor.domElement.offsetLeft;
  const elemTop = editor.domElement.offsetTop;
  const x0 = evt.pageX - elemLeft;
  const y0 = evt.pageY - elemTop;
  editor.model.rawStrokes.forEach((stroke) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < stroke.x.length; i++) {
      if ((stroke.x[i] >= x0 - 5 && stroke.x[i] <= x0 + 5) && (stroke.y[i] >= y0 - 5 && stroke.y[i] <= y0 + 5)) {
        editor.removeStroke(stroke);
      } else {
        const x1 = stroke.x[i - 1];
        const y1 = stroke.y[i - 1];
        const x2 = stroke.x[i];
        const y2 = stroke.y[i];
        const xAlpha = (x0 - x1) / (x2 - x1);
        const yAlpha = (y0 - y1) / (y2 - y1);
        if ((xAlpha > 0 && xAlpha < 1) && (yAlpha > 0 && yAlpha < 1)) {
          editor.removeStroke(stroke);
        }
      }
    }
  });
}

/**
 * Listen for the desired events
 * @param {Element} element DOM element to attach events listeners
 * @param {Editor} editor Editor to received down/move/up events
 * @param {Number} [offsetTop=0]
 * @param {Number} [offsetLeft=0]
 * @return {GrabberContext} Grabber context
 * @listens {Event} pointermove: a pointer moves, similar to touchmove or mousemove.
 * @listens {Event} pointerdown: a pointer is activated, or a device button held.
 * @listens {Event} pointerup: a pointer is deactivated, or a device button released.
 * @listens {Event} pointerover: a pointer has moved onto an element.
 * @listens {Event} pointerout: a pointer is no longer on an element it once was.
 * @listens {Event} pointerenter: a pointer enters the bounding box of an element.
 * @listens {Event} pointerleave: a pointer leaves the bounding box of an element.
 * @listens {Event} pointercancel: a pointer will no longer generate events.
 */
export function attach(element, editor, offsetTop = 0, offsetLeft = 0) {
  function unfocus() {
    if (window.getSelection().type !== 'None') {
      window.getSelection().removeAllRanges();
    }
  }

  function pointerDownHandler(evt) { // Trigger a pointerDown
    if (editor.pointerType === 'PEN'
      && document.getElementById('color-picker').style.display === 'none'
      && document.getElementById('thickness-panel').style.display === 'none') {
      if (this.activePointerId !== undefined && this.activePointerId === evt.pointerId) {
        console.log(`${evt.type} event with the same id without any pointer up`, evt.pointerId);
      } else if ((evt.button !== 2) && (evt.buttons !== 2)) { // Ignore right click
        this.activePointerId = evt.pointerId;
        // Hack for iOS 9 Safari : pointerId has to be int so -1 if > max value
        const pointerId = evt.pointerId > 2147483647 ? -1 : evt.pointerId;
        unfocus();
        evt.stopPropagation();
        editor.pointerDown(extractPoint(evt, element, editor.configuration, offsetTop, offsetLeft), evt.pointerType, pointerId);
      }
    } else if (editor.pointerType === 'ERASER') {
      this.activePointerId = evt.pointerId;
      unfocus();
      evt.stopPropagation();
      eraseStroke(evt, editor);
    }
  }

  function pointerMoveHandler(evt) { // Trigger a pointerMove
    // Only considering the active pointer
    if (editor.pointerType === 'PEN') {
      if (this.activePointerId !== undefined && this.activePointerId === evt.pointerId) {
        unfocus();
        editor.pointerMove(extractPoint(evt, element, editor.configuration, offsetTop, offsetLeft));
      }
    } else if (editor.pointerType === 'ERASER' && this.activePointerId !== undefined && this.activePointerId === evt.pointerId) {
      eraseStroke(evt, editor);
    }
  }

  function pointerUpHandler(evt) { // Trigger a pointerUp
    if (editor.pointerType === 'PEN') {
      if (this.activePointerId !== undefined && this.activePointerId === evt.pointerId) { // Only considering the active pointer
        this.activePointerId = undefined; // Managing the active pointer
        evt.stopPropagation();
        editor.pointerUp(extractPoint(evt, element, editor.configuration, offsetTop, offsetLeft));
      } else {
        // console.log(`${evt.type} event from another pointerid (${evt.pointerId})`, this.activePointerId);
      }
    } else if (editor.pointerType === 'ERASER') {
      this.activePointerId = undefined; // Managing the active pointer
    }
  }

  const context = {
    options: editor.configuration.listenerOptions,
    listeners: [{
      types: ['pointerdown'],
      listener: pointerDownHandler,
    }, {
      types: ['pointermove'],
      listener: pointerMoveHandler,
    }, {
      types: ['pointerup', 'pointerout', 'pointerleave', 'pointercancel'],
      listener: pointerUpHandler,
    }],
  };

  context.listeners.forEach((item) => {
    item.types.forEach(type => element.addEventListener(type, item.listener, context.options));
  });
  return context;
}

export function detach(element, context) {
  context.listeners.forEach((item) => {
    item.types.forEach(type => element.removeEventListener(type, item.listener, context.options));
  });
}
