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
        SCRAPING_GET_DOC_FOR_SCRAPING:   Root + "/scraping/new.json",          // GET
        SCRAPING_POST_SCRAPED_DOC:       Root + "/scraping/new",               // POST
        SCRAPING_GET_DOC_FOR_VALIDATING: Root + "/scraping/validate/new.json", // GET
        SCRAPING_POST_VALIDATED_DOC:     Root + "/scraping/validate/new",      // POST
        SCRAPING_LOAD_CONSTANT_CLASS:    Root + "/scraping/constant"       // POST
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
        RECEIVE_CLEAR_DOC: null,
        LOAD_CONSTANT_CLASS: null,
        RECEIVE_CONSTANT_CLASS: null,
        CREATE_CONSTANT_CLASS: null

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
        LOADING:                   "Cargando...",
        SEARCHING:                 "Buscando...",
        SUBMIT:                    "Enviar",
        DELETE:                    "Eliminar",
        ADD:                       "Agregar",
        CLOSE:                     "Cerrar",
        PLACEHOLDER_TEXT:          "Introduzca el texto",
        PLACEHOLDER_EMAIL:         "Introduzca el correo electrónico",
        PLACEHOLDER_PASSWORD:      "Introduzca la contraseña",
        PLACEHOLDER_DATE:          "Introduzca la fecha: dd-mm-aaaa",
        PLACEHOLDER_NUMBER:        "Introduzca el número",
        PLACEHOLDER_CHOOSE:        "Seleccione",
        HELP:                      "Ayuda",
        FAQ:                       "Preguntas Frecuentes",
        SUPPORT:                   "Soporte técnico",
        CREATE_NEW:                "Crear nuevo",

        SCRAP_NEW:                 "Nuevo documento",
        VALIDATE_NEW:              "Validar nuevo",
        SCRAPING_FORM_TITLE:       "Formulario de vaciado",
        SCRAPING_REQUEST_DOC:      "Para empezar, solicita un nuevo documento.",
        CLEAR_DOC:                 "Limpiar documento",
        DOWNLOAD_PDF:              "Descarga el PDF",
        CHOOSE_ALTERNATIVE_ENTITY: "Seleccione el tipo de elemento a vaciar",
        NO_RESULTS:                "No se encontraron resultados"
    },

    Utils: {
        startsWith: function (string, prefix) {
            return string.slice(0, prefix.length) == prefix;
        },

        endsWith: function (string, suffix) {
            return suffix === '' || string.slice(-suffix.length) == suffix;
        },

        peel: function (string) {
            return string.substring(1, string.length-1);
        },

        labelify: function(string) {
            if (string !== null) {
                return string.split("_").map(function(word){
                    return word.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
                }).join(" ");
            } else { return null; }
        }
    }
};