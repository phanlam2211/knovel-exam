import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { StatusEnum } from 'src/statuses/statuses.enum';
import { User } from '../../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../../../roles/entities/role.entity';
import { Status } from '../../../statuses/entities/status.entity';
import { RolesEnum } from '../../../roles/roles.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async run() {
    // Get roles
    const employerRole = await this.roleRepository.findOne({
      where: { name: RolesEnum.EMPLOYER },
    });
    const employeeRole = await this.roleRepository.findOne({
      where: { name: RolesEnum.EMPLOYEE },
    });

    if (!employerRole || !employeeRole) {
      console.log(
        'Required roles or status not found. Please run role and status seeds first.',
      );
      return;
    }

    // Create employer user
    const existingEmployer = await this.userRepository.findOne({
      where: { email: 'luke@gmail.com' },
    });

    if (!existingEmployer) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await this.userRepository.save({
        email: 'luke@gmail.com',
        password: hashedPassword,
        name: 'John Employer',
        role: employerRole,
      });
      console.log('Employer user created');
    }

    // Create employee users
    const employees = [
      { email: 'employee1@example.com', name: 'Alice Employee' },
      { email: 'employee2@example.com', name: 'Bob Employee' },
      { email: 'employee3@example.com', name: 'Carol Employee' },
      { email: 'employee4@example.com', name: 'David Employee' },
      { email: 'employee5@example.com', name: 'Eve Employee' },
      { email: 'employee6@example.com', name: 'Frank Employee' },
      { email: 'employee7@example.com', name: 'Grace Employee' },
      { email: 'employee8@example.com', name: 'Heidi Employee' },
      { email: 'employee9@example.com', name: 'Ivan Employee' },
      { email: 'employee10@example.com', name: 'Judy Employee' },
      { email: 'employee11@example.com', name: 'Ken Employee' },
      { email: 'employee12@example.com', name: 'Laura Employee' },
      { email: 'employee13@example.com', name: 'Mallory Employee' },
      { email: 'employee14@example.com', name: 'Niaj Employee' },
      { email: 'employee15@example.com', name: 'Olivia Employee' },
      { email: 'employee16@example.com', name: 'Peggy Employee' },
      { email: 'employee17@example.com', name: 'Quentin Employee' },
      { email: 'employee18@example.com', name: 'Rupert Employee' },
      { email: 'employee19@example.com', name: 'Sybil Employee' },
      { email: 'employee20@example.com', name: 'Trent Employee' },
      { email: 'employee21@example.com', name: 'Uma Employee' },
      { email: 'employee22@example.com', name: 'Victor Employee' },
      { email: 'employee23@example.com', name: 'Wendy Employee' },
      { email: 'employee24@example.com', name: 'Xavier Employee' },
      { email: 'employee25@example.com', name: 'Yvonne Employee' },
      { email: 'employee26@example.com', name: 'Zack Employee' },
      { email: 'employee27@example.com', name: 'Amy Employee' },
      { email: 'employee28@example.com', name: 'Brian Employee' },
      { email: 'employee29@example.com', name: 'Cathy Employee' },
      { email: 'employee30@example.com', name: 'Derek Employee' },
    ];

    for (const employee of employees) {
      const existingEmployee = await this.userRepository.findOne({
        where: { email: employee.email },
      });

      if (!existingEmployee) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await this.userRepository.save({
          email: employee.email,
          password: hashedPassword,
          name: employee.name,
          role: employeeRole,
        });
        console.log(`Employee user ${employee.name} created`);
      }
    }
  }
}
