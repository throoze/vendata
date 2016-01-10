// constants/SmallConstants.js
var keyMirror = require('keymirror');

var APIRoot    = "http://localhost:3000/api/";
var APIVersion = "v1";
var Root       = APIRoot + APIVersion;

module.exports = {

  API_URL: Root,

  APIEndpoints: {
    // Auth
    LOGIN:        Root + "/auth/sign_in",
    REGISTRATION: Root + "/auth",

    // Schemata
    SCHEMATA:              Root + "/schemata",              // GET
    SCHEMATA_COLLECTIONS:  Root + "/schemata/collections",  // GET
    SCHEMATA_DESCRIPTIONS: Root + "/schemata/descriptions", // GET
    SCHEMATA_PARENTHOOD:   Root + "/schemata/parenthood",   // GET
    SCHEMATA_INHERITANCE:  Root + "/schemata/inheritance",  // GET
    SCHEMATA_CONSTRAINTS:  Root + "/schemata/constraints",  // GET

    // Scrapping
    SCRAPPING_GET_DOC_FOR_SCRAPPING:  Root + "/scrapping/new.json",          // GET
    SCRAPPING_POST_SCRAPPED_DOC:      Root + "/scrapping/new",               // POST
    SCRAPPING_GET_DOC_FOR_VALIDATING: Root + "/scrapping/validate/new.json", // GET
    SCRAPPING_POST_VALIDATED_DOC:     Root + "/scrapping/validate/new"       // POST
  },

  Events: {
    CHANGE: 'change',
    SCHEMATA_CHANGE: 'schemata_change'
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,
    LOGOUT: null,

    // Routes
    REDIRECT: null,

    // Scrapping
    LOAD_SCHEMATA: null,
    RECEIVE_SCHEMATA: null,
    LOAD_DOC_FOR_SCRAPPING: null,
    RECEIVE_DOC_FOR_SCRAPPING: null,
    LOAD_DOC_FOR_VALIDATION: null,
    RECEIVE_DOC_FOR_VALIDATION: null,
    CREATE_DOC: null,
    RECEIVE_CREATED_DOC: null,
    VALIDATE_DOC: null,
    RECEIVE_VALIDATED_DOC: null,
    CLEAR_DOC: null,
    RECEIVE_CLEAR_DOC: null
  }),

  DocumentCloud : {
    params: {
        "showAnnotations":  false,
        "container":        "#document-visor",
        "notes":            false,
        "text":             true,
        "zoom":             true,
        "search":           true,
        "sidebar":          false,
        "pdf":              true,
        "responsive":       false,
        "default_page":     1
    }
  },

  Strings: {
    LOADING:               "Cargando...",
    SUBMIT:                "Enviar",
    PLACEHOLDER_TEXT:      "Introduzca el texto",
    PLACEHOLDER_EMAIL:     "Introduzca el correo electrónico",
    PLACEHOLDER_PASSWORD:  "Introduzca la contraseña",
    PLACEHOLDER_DATE:      "Introduzca la fecha: dd-mm-aaaa",
    PLACEHOLDER_NUMBER:    "Introduzca el número",
    PLACEHOLDER_CHOOSE:    "Seleccione",
    HELP:                  "Ayuda",
    FAQ:                   "Preguntas Frecuentes",
    SUPPORT:               "Soporte técnico",

    SCRAP_NEW:             "Nuevo documento",
    VALIDATE_NEW:          "Validar nuevo",
    SCRAPPING_FORM_TITLE:  "Formulario de vaciado",
    SCRAPPING_REQUEST_DOC: "Para empezar, solicita un nuevo documento.",
    CLEAR_DOC:             "Limpiar documento",
    DOWNLOAD_PDF:          "Descarga el PDF"
  }

};