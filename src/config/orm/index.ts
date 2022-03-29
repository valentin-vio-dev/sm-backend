import ormConfigDev from './orm.config.dev';
import ormConfigProd from './orm.config.prod';
import ormConfigStaging from './orm.config.staging';

export const getOrmConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'developement':
      return ormConfigDev;
    case 'staging':
      return ormConfigStaging;
    case 'production':
      return ormConfigProd;
  }
};
