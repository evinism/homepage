// this is some jank stuff yo.
export const getAbsolutePathStr = (relStr, cwd) => {
  relStr.trim();
  if (relStr[0] === '/') {
    // absolute path
    return relStr;
  } else if (relStr[0] === '.') {
    // should probs be handled by file traversal
    if (relStr[1] === '/') {
      return cwd + relStr.substring(2);
    }
  }
  return cwd + relStr;
};