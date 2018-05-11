class Folder {
  constructor(init) {
    const {
      owner,
      permissions,
      children, // array of Files
    } = init;

    this.owner = owner;
    this.permissions = permissions;
    this.children = children;
  }
}

export default Folder;