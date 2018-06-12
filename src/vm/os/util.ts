// this is some jank stuff yo.
// shoul probs be moved to be internal to filesystem.

const reducePath = (absPath) => {
  const out = absPath.substring(1).split('/').reduce(
    (acc, cur) => {
      if(cur === '.') {
        return acc;
      } else if(cur === '..' && acc !== '') {
        return acc
          .split('/')
          .slice(0, -1)
          .join('/');
      }
      return acc + '/' + cur;
    },
    ''
  );
  return out;
}

export const getAbsolutePathStr = (relStr, cwd) => {
  relStr.trim();

  if (relStr[0] === '/') {
    // absolute path
    return reducePath(relStr);
  } else {
    return reducePath(cwd + relStr);
  }
};