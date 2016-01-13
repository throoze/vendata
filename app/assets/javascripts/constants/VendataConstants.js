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

    // Scraping
    SCRAPING_GET_DOC_FOR_SCRAPING:  Root + "/scraping/new.json",          // GET
    SCRAPING_POST_SCRAPPED_DOC:      Root + "/scraping/new",               // POST
    SCRAPING_GET_DOC_FOR_VALIDATING: Root + "/scraping/validate/new.json", // GET
    SCRAPING_POST_VALIDATED_DOC:     Root + "/scraping/validate/new"       // POST
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
    SIGN_UP_REQUEST: null,
    SIGN_UP_RESPONSE: null,
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,
    LOGOUT_REQUEST: null,
    LOGOUT_REPONSE: null,

    // Routes
    REDIRECT: null,

    // Scraping
    LOAD_SCHEMATA: null,
    RECEIVE_SCHEMATA: null,
    LOAD_DOC_FOR_SCRAPING: null,
    RECEIVE_DOC_FOR_SCRAPING: null,
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
    SCRAPING_FORM_TITLE:  "Formulario de vaciado",
    SCRAPING_REQUEST_DOC: "Para empezar, solicita un nuevo documento.",
    CLEAR_DOC:             "Limpiar documento",
    DOWNLOAD_PDF:          "Descarga el PDF",
    CHOOSE_ROOT_DOC:       "Seleccione el tipo de documento a vaciar"
  }

};