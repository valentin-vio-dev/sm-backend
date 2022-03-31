import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Customer } from 'src/customer/customer.entity';
import { Employee } from 'src/employee/employee.entity';
import { Role } from 'src/role/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: Employee | Customer = request.user;
    if (user.role === Role.SUPER_ADMIN || user.role === Role.ADMIN) {
      return true;
    }
    return false;
  }
}
