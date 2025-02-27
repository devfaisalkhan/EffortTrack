import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Base } from 'src/shared/base.entity';
import { Exclude } from 'class-transformer';
import { Otp } from '../otp/entities/otp.entity';

@Entity()
export class User extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ nullable: false })
  role: 'tutor' | 'student';

  @Column({ default: true, nullable: false })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => Otp, (otp) => otp.user, { cascade: true })
  otps: Otp[];

  @Column({ nullable: true })
  avatarUrl: string;
}
