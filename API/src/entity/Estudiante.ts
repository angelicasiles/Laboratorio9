import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Matricula } from './Matricula';

@Entity()
export class Estudiante {
  @PrimaryColumn()
  @IsNotEmpty({ message: 'Debes de indicar el Id del Estudiante' })
  IdEstudiante: number;

  @Column({ nullable: false })
  @MaxLength(30, { message: 'Debe ser menos de 50 caracteres' })
  @IsNotEmpty({ message: 'Debes de indicar el Nombre' })
  Nombre: string;

  @Column({ nullable: false })
  @MaxLength(25, { message: 'Debe ser menos de 25 caracteres' })
  @IsNotEmpty({ message: 'Debes de indicar el Primer Apellido' })
  Apellido1: string;

  @Column({ nullable: false })
  @MaxLength(25, { message: 'Debe ser menos de 25 caracteres' })
  @IsNotEmpty({ message: 'Debes de indicar el Segundo Apellido' })
  Apellido2: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: 'Debes de indicar la Fecha de Nacimiento' })
  FechaNah: Date;

  @Column({ nullable: false })
  @MaxLength(1, { message: 'Debe ser menos de 1 caracter' })
  @IsNotEmpty({ message: 'Debes de indicar el Género formato: M/F' })
  Genero: string;

  @Column({ default: true })
  Estado: Boolean;

  @OneToMany(() => Matricula, (matricula) => matricula.estudiante, {
    cascade: ['insert', 'update'],
  })
  cursos: Matricula[];
}
