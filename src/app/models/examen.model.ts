import { Materia } from 'src/app/models/materia.model';
export class Examen{

  constructor(
    public _id         : string,
    public descripcion : string,
    public materia     : Materia,
    public titulo      : string,
    public profesor    : string,
  ){ }

}