import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Matricula } from "./Matricula";

@Entity()
export class Cursos {
  @PrimaryColumn()
  @IsNotEmpty({message: "Debes de indicar el Id"})
  IdCurso: Number;

  @Column({nullable:false})
  @MaxLength(50, { message: 'Debe ser menos de 50 caracter' })
  @IsNotEmpty({message: "Debes de indicar el Nombre del curso"})
  NombreCurso: string; 

  @Column({nullable:false})
  @IsNotEmpty({message: "Debes indicar los creditos"})
  Creditos: number;

  @Column({default:true})
  Estado: boolean;

  @OneToMany(() => Matricula, matricula => matricula.curso)
  estudiantes: Matricula[];
}