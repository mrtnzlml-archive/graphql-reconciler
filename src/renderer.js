const Reconciler = require('react-reconciler');
const emptyObject = require('fbjs/lib/emptyObject');

const Element = class Element {
  constructor() {
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    return 'Rendering Element! Yay!'
  }
};

let counter = 1;
function log(...args) {
  console.error("\n", counter++, ...args);
  // console.error("\n", counter++, args[0]);
}

const ReconcilerConfig = {
  appendInitialChild(parentInstance, child) {
    log('appendInitialChild', parentInstance, child);
    parentInstance.appendChild(child);
  },

  createInstance(type, props, internalInstanceHandle) {
    log('createInstance', type, props, internalInstanceHandle);
    return new Element();
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    log('createTextInstance', text, rootContainerInstance, internalInstanceHandle);
    return text;
  },

  finalizeInitialChildren(wordElement, type, props) {
    log('finalizeInitialChildren', wordElement, type, props);
    return false;
  },

  getPublicInstance(instance) {
    log('getPublicInstance', instance);
    return instance;
  },

  prepareForCommit() {
    log('prepareForCommit');
    // Noop
  },

  prepareUpdate(wordElement, type, oldProps, newProps) {
    log('prepareUpdate', wordElement, type, oldProps, newProps);
    return true;
  },

  resetAfterCommit() {
    log('resetAfterCommit');
    // Noop
  },

  resetTextContent(wordElement) {
    log('resetTextContent', wordElement);
    // Noop
  },

  shouldDeprioritizeSubtree(type, props) {
    log('shouldDeprioritizeSubtree', type, props);
    return false;
  },

  getRootHostContext() {
    log('getRootHostContext');
    return emptyObject;
  },

  getChildHostContext() {
    log('getChildHostContext');
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    log('shouldSetTextContent', type, props);
    return false;
  },

  now() {
    log('now');
    return 0;
  },

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      log('mutation.appendChild', parentInstance, child);
    },

    appendChildToContainer(parentInstance, child) {
      log('mutation.appendChildToContainer', parentInstance, child);
      parentInstance.appendChild(child);
    },

    removeChild(parentInstance, child) {
      log('mutation.removeChild', parentInstance, child);
    },

    removeChildFromContainer(parentInstance, child) {
      log('mutation.removeChildFromContainer', parentInstance, child);
    },

    insertBefore(parentInstance, child, beforeChild) {
      log('mutation.insertBefore', parentInstance, child, beforeChild);
      // Noop
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      log('mutation.commitUpdate', instance, updatePayload, type, oldProps, newProps);
      // Noop
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {
      log('mutation.commitMount', instance, updatePayload, type, oldProps, newProps);
      // Noop
    },

    commitTextUpdate(textInstance, oldText, newText) {
      log('mutation.commitTextUpdate', textInstance, oldText, newText);
      textInstance.children = newText;
    },
  },
};

const MyRenderer = Reconciler(ReconcilerConfig);

const RendererPublicAPI = {
  render(element, container, callback) {
    const allElementsWrapper = new class {
      constructor(props) {
        this.children = [];
      }

      appendChild(child) {
        this.children.push(child);
      }
    }(); // container for all elements

    const fiberRoot = MyRenderer.createContainer(allElementsWrapper);
    MyRenderer.updateContainer(element, fiberRoot, null);

    console.error("\n\n", JSON.stringify(allElementsWrapper, null, 2));
  },
};

module.exports = RendererPublicAPI;
