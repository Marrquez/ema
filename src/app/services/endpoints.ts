import {environment} from '../../environments/environment';

const api = environment.apiUrl;

const endpoints = {
  AUTH: {
    GET_MENU: `${api}/api/Usuario/Menu`,
    LOGIN: `${api}/api/auth/Session/Iniciar`,
    LOGOUT: `${api}/api/auth/Session/Revocar`,
  },
  REFERENCES_TABLE: {
    GET_CIRCULARES: `${api}/api/Cargue/ConsultarCircular`,
    GET_REFERENCES_TABLE: `${api}/api/Cargue/ConsultarTablasReferencia`,
    GET_REFERENCES: `${api}/api/Cargue/ConsultarReferencias`,
  },
  FILES: {
    GET_CIRCULARES: `${api}/api/Cargue/ConsultarCircular`,
    GET_CATEGORIES: `${api}/api/Cargue/ConsultarCategoria`,
    GET_PERIODS: `${api}/api/Cargue/ConsultarPeriodo`,
    GET_FILES: `${api}/api/Cargue/ConsultarArchivo`,
  },
  ACUSE_RECIBO: {
    GET_CIRCULARES: `${api}/api/Cargue/ConsultarCircular`,
    GET_CATEGORIES: `${api}/api/Cargue/ConsultarCategoria`,
    GET_REFERENCES: `${api}/api/Cargue/ConsultarAcuseRecibo`,
  },
};

export default endpoints;
