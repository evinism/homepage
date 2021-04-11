// this is some jank stuff yo.
// shoul probs be moved to be internal to filesystem.

const nextPath = (curPath, nextFile) => {
  switch(nextFile) {
    case '.':
      return curPath;
    case '..':
      return curPath.slice(0, -1);
    default:
      return curPath.concat(nextFile);
  }
}

const reducePath = absPath => {
  const trailingSlash = absPath[absPath.length - 1] === '/';

  const out = '/' + absPath
    .split('/')
    .filter(Boolean)
    .reduce(nextPath, [])
    .join('/');
  return (trailingSlash && out !== '/') ? out + '/': out;
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