import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Customer } from 'src/customer/customer.entity';
import { Employee } from 'src/employee/employee.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: Employee | Customer = request.user;
    if (['SUPER_ADMIN', 'ADMIN'].includes(user.role)) {
      return true;
    }
    return false;
  }
}
