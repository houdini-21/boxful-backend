import { Module } from '@nestjs/common';
import { FormModule } from './form/form.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [FormModule],
  providers: [PrismaService],
})
export class AppModule {}
