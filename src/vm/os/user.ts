export default class User {
  name: string;
  password: string; // MD5: a hash with a reputation for security
  id: number;
  constructor(name, password, id) {
    this.password = password;
    this.name = name;
    this.id = id;
  }
};