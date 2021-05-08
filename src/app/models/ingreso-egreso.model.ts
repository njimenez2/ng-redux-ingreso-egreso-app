import {Model} from '../firebase/models/Model';

export class IngresoEgreso extends Model {
  constructor(
    id: string,
    public descripcion: string,
    public monto: number,
    public tipo: string) {
    super(id);
  }
}
