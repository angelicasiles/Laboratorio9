import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Estudiante } from './Estudiante';
import { Cursos } from './Curso';

@Entity()
export class Matricula {
  @PrimaryGeneratedColumn()
  IdMatricula: number;

  @Column({ nullable: false })
  @IsNotEmpty({
    message:
      'Debes de indicar el Id de Estudiante',
  })
  IdEstudiante: number;

  @Column({ nullable: false})
  @IsNotEmpty({
    message: 'Debes de indicar el Id de Curso',
  })
  IdCurso: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.cursos)
  @JoinColumn({ name: 'IdEstudiante' })
  estudiante: Estudiante;

  @ManyToOne(() => Cursos, (curso) => curso.estudiantes)
  @JoinColumn({ name: 'IdCurso' })
  curso: Cursos;
}
