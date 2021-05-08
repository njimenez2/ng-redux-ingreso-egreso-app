import {Model} from './Model';


export class User extends Model {

  constructor(
    id: string,
    public name: string,
    public mail: string,
    public password?: string) {
    super(id);

  }

  static fromFirebase({id, name, mail}): User {
    return new User(id, name, mail);
  }


}
