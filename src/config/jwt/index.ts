import jwtConfigDev from './jwt.config.dev';
import jwtConfigProd from './jwt.config.prod';
import jwtConfigStaging from './jwt.config.staging';

export const getJwtConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'developement':
      return jwtConfigDev;
    case 'staging':
      return jwtConfigStaging;
    case 'production':
      return jwtConfigProd;
    default:
      return jwtConfigDev;
  }
};
