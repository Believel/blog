// ! flags
export const NoFlags = /*                      */ 0b00000000000000000000;

export const Placement = /*                    */ 0b0000000000000000000010; // 2
export const Update = /*                       */ 0b0000000000000000000100; // 4
export const Deletion = /*                     */ 0b0000000000000000001000; // 8

// *******************************************************************************************
// ! HookFlags
export const HookLayout = /*    */ 0b010;
export const HookPassive = /*   */ 0b100;

// *******************************************************************************************

export function isFn(fn) {
  return typeof fn === "function";
}

export function isStr(s) {
  return typeof s === "string";
}

export function isStringOrNumber(s) {
  return typeof s === "string" || typeof s === "number";
}

export function isArray(arr) {
  return Array.isArray(arr);
}

export function isUndefined(str) {
  return str === undefined
}

// 更新原生标签的属性，如className、href、id、（style、事件）等
export function updateNode(node, prevVal, nextVal) {
  Object.keys(prevVal).forEach((k) => {
    if (k === 'children') {
      if (isStringOrNumber(prevVal[k])) {
        node.textContent = ''
      }
    } else if (k.slice(0, 2) === "on") {
      const eventName = k.slice(2).toLocaleLowerCase();
      node.removeEventListener(eventName, prevVal[k]);
    } else {
      if (!(k in nextVal)) {
        node[k] = ''
      }
    }
  });

  Object.keys(nextVal)
    // .filter(k => k !== "children")
    .forEach((k) => {
      if (k === "children") {
        // 有可能是文本
        if (isStringOrNumber(nextVal[k])) {
          node.textContent = nextVal[k] + "";
        }
      } else if (k.slice(0, 2) === "on") {
        const eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}


export function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) {
    return false
  }
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      continue
    }
    return false
  }
  return true
}
