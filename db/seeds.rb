# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Schema definition. Describes how documents are expected to be:
Schema.create([
    {
        name: "schema",
        root_collection: "Documento",
        collections: [
            "Documento",
            "GacetaOficial",
            "ActoNormativo",
            "AprobacionDeLey",
            "Decreto",
            "Resolucion",
            "LeyAprobatoria",
            "Providencia",
            "AcuerdoActoNormativo",
            "Requisitoria",
            "Autorizacion",
            "Pais",
            "Nacionalidad",
            "OrganismoInternacional",
            "Ciudadano",
            "Institucion",
            "Organismo",
            "Empresa",
            "EmpresaPrivada",
            "EmpresaEstatal",
            "CuerpoPolicial",
            "EntidadBancaria",
            "Efecto",
            "Cargo",
            "Rango",
            "IntervencionDeInstitucion",
            "ProrrogaDeIntervencion",
            "Designacion",
            "Expropiacion",
            "CreditoAdicional",
            "AscensoMilitar",
            "LicenciaDeExploracionYExplotacion",
            "Acuerdo",
            "AcuerdoBilateral",
            "AcuerdoMarcoDeCooperacion",
            "AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion",
            "AcuerdoComplementarioDeCooperacion",
            "EstablecimientoDeSedeDiplomatica",
            "DelegacionDeFunciones",
            "OrdenDeAprehension",
            "Jubilacion",
            "Ley",
            "CreacionDeEmpresaEstatal",
            "CreacionDeOrganismoPublico"
        ],
        descriptions: {
            # Defaults field options:
            # blank: false
            # nullable: false
            Documento: {
                classname: "Documento",
                human_readable: "Documento",
                constant: false,
                abstract: true,
                fields: {
                    numero: { type: "string", label: "Número" },
                    fecha:  { type: "date" }
                }
            },
            GacetaOficial: {
                classname: "GacetaOficial",
                human_readable: "Gaceta Oficial",
                constant: false,
                abstract: false,
                extends: ["Documento"],
                fields: {
                    tipo:   {
                        type: "string",
                        options: ["ordinario", "extraordinario"]
                    },
                    ano: { type: "string", label: "Año" },
                    mes: { type: "string" },
                    documentos: { type: "[ActoNormativo]" }
                }
            },
            ActoNormativo: {
                classname: "ActoNormativo",
                human_readable: "Acto Normativo",
                constant: false,
                abstract: true,
                extends: ["Documento"],
                fields: {
                    emisor: { type: "Organismo" },
                    efecto: { type: "Efecto" }
                }
            },
            AprobacionDeLey: {
                classname: "AprobacionDeLey",
                human_readable: "Aprobacion De Ley",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"],
                fields: {
                    deroga: {
                        type: "Ley",
                        nullable: true
                     }
                }
            },
            Decreto: {
                classname: "Decreto",
                human_readable: "Decreto",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"]
            },
            Resolucion: {
                classname: "Resolucion",
                human_readable: "Resolucion",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"]
            },
            LeyAprobatoria: {
                classname: "LeyAprobatoria",
                human_readable: "Ley Aprobatoria",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"]
            },
            Providencia: {
                classname: "Providencia",
                human_readable: "Providencia",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"]
            },
            AcuerdoActoNormativo: {
                classname: "AcuerdoActoNormativo",
                human_readable: "Acuerdo",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"]
            },
            Requisitoria: {
                classname: "Requisitoria",
                human_readable: "Requisitoria",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"]
            },
            Autorizacion: {
                classname: "Autorizacion",
                human_readable: "Autorizacion",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"]
            },
            Pais: {
                classname: "Pais",
                human_readable: "Pais",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                fields: {
                    nombre: { type: "string" },
                    nacionalidad: { type: "string" }
                }
            },
            Nacionalidad: {
                classname: "Nacionalidad",
                human_readable: "Nacionalidad",
                constant: true,
                abstract: false,
                to_str: ["nacionalidad"],
                fields: {
                    nacionalidad: { type: "string" },
                    pais: { type: "string" }
                }
            },
            OrganismoInternacional: {
                classname: "OrganismoInternacional",
                human_readable: "Organismo Internacional",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                extends: ["Institucion"]
            },
            Ciudadano: {
                classname: "Ciudadano",
                human_readable: "Ciudadano",
                constant: true,
                abstract: false,
                to_str: ["cedula", "nombre"],
                fields: {
                    nombre: { type: "string" },
                    cedula: { type: "string" },
                    es_militar: { 
                        type: "boolean",
                        default: false
                    },
                    pais_de_nacimiento: {
                        type: "Pais",
                        nullable: true
                    },
                    nacionalidad: {
                        type: "Nacionalidad",
                        nullable: true
                    },
                    direccion: {
                        type: "string",
                        nullable: true
                    }
                }
            },
            Institucion: {
                classname: "Institucion",
                constant: true,
                abstract: true,
                to_str: ["nombre"],
                human_readable: "Institucion",
                fields: {
                    nombre: { type: "string" },
                    acronimo: { type: "string", nullable: true, blank: true }
                }
            },
            Organismo: {
                classname: "Organismo",
                human_readable: "Organismo",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                extends: ["Institucion"],
                fields: {
                    depende_de: { type: "Organismo", nullable: true }
                }
            },
            Empresa: {
                classname: "Empresa",
                constant: true,
                abstract: true,
                to_str: ["nombre"],
                human_readable: "Empresa",
                extends: ["Institucion"]
            },
            EmpresaPrivada: {
                classname: "EmpresaPrivada",
                human_readable: "Empresa Privada",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                extends: ["Empresa", "Institucion"],
                fields: {
                    registro_mercantil: { type: "string" }
                }
            },
            EmpresaEstatal: {
                classname: "EmpresaEstatal",
                human_readable: "Empresa Estatal",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                extends: ["Empresa", "Institucion"],
                fields: {
                    capital_inicial: { type: "number", nullable: true },
                    duracion: { type: "string" },
                    accionista_de: { type: "[Empresa]", nullable: true },
                    adscrita_a: { type: "Organismo", nullable: true },
                    filial_de: { type: "Institucion", nullable: true }
                }
            },
            CuerpoPolicial: {
                classname: "CuerpoPolicial",
                human_readable: "Cuerpo Policial",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                extends: ["Institucion"]
            },
            EntidadBancaria: {
                classname: "EntidadBancaria",
                human_readable: "Entidad Bancaria",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                extends: ["Institucion"]
            },
            Efecto: {
                classname: "Efecto",
                human_readable: "Efecto",
                constant: false,
                abstract: true,
                fields: {
                    fecha: { type: "date" }
                }
            },
            Cargo: {
                classname: "Cargo",
                human_readable: "Cargo",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                fields: {
                    nombre: { type: "string" }
                }
            },
            Rango: {
                classname: "Rango",
                human_readable: "Rango",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                fields: {
                    nombre: { type: "string" }
                }
            },
            IntervencionDeInstitucion: {
                classname: "IntervencionDeInstitucion",
                human_readable: "Intervencion De Institucion",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields: {
                    institucion: { type: "Institucion" },
                    motivo: { type: "string" }
                }
            },
            ProrrogaDeIntervencion: {
                classname: "ProrrogaDeIntervencion",
                human_readable: "Prorroga De Intervencion",
                extends: ["Efecto"],
                constant: false,
                abstract: false,
                fields: {
                    institucion: { type: "Institucion" },
                    motivo: { type: "string" },
                    duracion: { type: "string" },
                    motivo_prorroga: { type: "string" }
                }
            },
            Designacion: {
                classname: "Designacion",
                human_readable: "Designacion",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields: {
                    ciudadano: { type: "Ciudadano" },
                    status: {
                        type: "string",
                        options: ["fijo", "encargado", "ratificado"]
                    },
                    cargo: { type: "Cargo" },
                    fecha_fin: {
                        type: "date",
                        nullable: [ "status", "==", "encargado" ]
                    }
                }
            },
            Expropiacion: {
                classname: "Expropiacion",
                human_readable: "Expropiacion",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields: {
                    terreno: { type: "string" },
                    ubicacion: { type: "string" },
                    motivo: { type: "string" },
                    nuevo_uso: { type: "string" }
                }
            },
            CreditoAdicional: {
                classname: "CreditoAdicional",
                human_readable: "Credito Adicional",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields: {
                    beneficiario: { type: "Institucion" },
                    monto: { type: "number" },
                    destino: { type: "string" }
                }
            },
            AscensoMilitar: {
                classname: "AscensoMilitar",
                human_readable: "Ascenso Militar",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields: {
                    ciudadanos: { type: "[Ciudadano]" },
                    graduacion: { type: "boolean" },
                    rango_nuevo: { type: "Rango" },
                    rango_anterior: { type: "Rango" },
                    promocion: { type: "string", nullable: true },
                    componente_militar: {
                        type: "string",
                        options: [
                                "Fuerzas Armadas",
                                "Aviacion",
                                "Naval",
                                "Guardia Nacional",
                                "Milicia",
                                "Guardia de Honor"
                            ]
                    }
                }
            },
            LicenciaDeExploracionYExplotacion: {
                classname: "LicenciaDeExploracionYExplotacion",
                human_readable: "Licencia De Exploracion Y Explotacion",
                constant: false,
                abstract: false,
                extends: ["Efecto"]
            },
            Acuerdo: {
                classname: "Acuerdo",
                human_readable: "Acuerdo",
                constant: false,
                abstract: true,
                extends: ["Efecto"],
                fields: {
                    paises_firmantes: { type: "[Pais]" },
                    ambito: { type: "string" },
                    duracion: { type: "string" }
                }
            },
            AcuerdoBilateral: {
                classname: "AcuerdoBilateral",
                human_readable: "Acuerdo Bilateral",
                constant: false,
                abstract: false,
                extends: ["Acuerdo", "Efecto"]
            },
            AcuerdoMarcoDeCooperacion: {
                classname: "AcuerdoMarcoDeCooperacion",
                human_readable: "Acuerdo Marco De Cooperacion",
                constant: false,
                abstract: false,
                extends: ["Acuerdo", "Efecto"]
            },
            AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion: {
                classname: "AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion",
                human_readable: "Acuerdo Complementario Al Acuerdo Marco De Cooperacion",
                constant: false,
                abstract: false,
                extends: ["Acuerdo", "Efecto"]
            },
            AcuerdoComplementarioDeCooperacion: {
                classname: "AcuerdoComplementarioDeCooperacion",
                human_readable: "Acuerdo Complementario De Cooperacion",
                constant: false,
                abstract: false,
                extends: ["Acuerdo", "Efecto"]
            },
            EstablecimientoDeSedeDiplomatica: {
                classname: "EstablecimientoDeSedeDiplomatica",
                human_readable: "Establecimiento De Sede Diplomatica",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields: {
                    organismo: { type: "OrganismoInternacional" }
                }
            },
            DelegacionDeFunciones: {
                classname: "DelegacionDeFunciones",
                human_readable: "Delegacion De Funciones",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields: {
                    ciudadano: { type: "Ciudadano" },
                    cargo: { type: "Cargo" },
                    atribuciones: { type: "string" }
                }
            },
            OrdenDeAprehension: {
                classname: "OrdenDeAprehension",
                human_readable: "Orden De Aprehension",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields: {
                    ciudadano: { type: "Ciudadano" },
                    tribunal: { type: "Institucion" },
                    delito: { type: "string" }
                }
            },
            Jubilacion: {
                classname: "Jubilacion",
                human_readable: "Jubilacion",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields: {
                    ciudadano: { type: "Ciudadano" },
                    cargo: { type: "Cargo" },
                    anos_de_servicio: { type: "number" },
                    institucion: { type: "Institucion" }
                }
            },
            Ley: {
                classname: "Ley",
                human_readable: "Ley",
                constant: true,
                abstract: false,
                to_str: ["titulo"],
                extends: ["Efecto"],
                fields: {
                    titulo: { type: "string", label: "Título" },
                    fecha_de_aprobacion: { type: "date" },
                    tipo: {
                        type: "string",
                        options: [
                                "organica",
                                "ordinaria",
                                "decreto ley",
                                "ley habilitante"
                            ]
                    },
                    contenido: {
                        type: "string",
                        nullable: true,
                        blank: true
                    }
                }
            },
            CreacionDeEmpresaEstatal: {
                classname: "CreacionDeEmpresaEstatal",
                human_readable: "Creacion De Empresa Estatal",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields: {
                    empresa: { type: "Empresa" }
                }
            },
            CreacionDeOrganismoPublico: {
                classname: "CreacionDeOrganismoPublico",
                human_readable: "Creacion De Organismo Publico",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields: {
                    organismo: { type: "Organismo" },
                    sustituye_a: {
                        type: "Organismo",
                        nullable: true
                    }
                }
            }
        },
        constraints: {
            AprobacionDeLey: {
                efecto: {
                    typeIn: ["Ley"]
                }
            },
            Decreto: {
                efecto: {
                    typeIn: [
                        "CreacionDeEmpresaEstatal",
                        "CreacionDeOrganismoPublico",
                        "Designacion",
                        "Expropiacion",
                        "CreditoAdicional"
                    ]
                }
            },
            Resolucion: {
                efecto: {
                    typeIn: [
                        "CreacionDeOrganismoPublico",
                        "Designacion",
                        "IntervencionDeInstitucion",
                        "ProrrogaDeIntervencion",
                        "AscensoMilitar",
                        "LicenciaDeExploracionYExplotacion",
                        "Jubilacion"
                    ]
                }
            },
            LeyAprobatoria: {
                efecto: {
                    typeIn: [
                        "AcuerdoBilateral",
                        "AcuerdoMarcoDeCooperacion",
                        "AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion",
                        "AcuerdoComplementarioDeCooperacion",
                        "EstablecimientoDeSedeDiplomatica"
                    ]
                }
            },
            Providencia: {
                efecto: {
                    typeIn: [
                        "Designacion",
                        "DelegacionDeFunciones",
                        "Jubilacion"
                    ]
                }
            },
            AcuerdoActoNormativo: {
                efecto: {
                    typeIn: [
                        "CreditoAdicional",
                        "Designacion"
                    ]
                }
            },
            Requisitoria: {
                efecto: {
                    typeIn: ["OrdenDeAprehension"]
                }
            },
            Autorizacion: {
                efecto: {
                    typeIn: ["CreacionDeEmpresaEstatal"]
                }
            }
        },
        parenthood: {
            # Keys are the possible collections, and values are the
            # collections that extend the correspondent collection key
            # without any specific order.
            Documento: ["GacetaOficial"],
            GacetaOficial: [],
            ActoNormativo: [
                "AprobacionDeLey",
                "Decreto",
                "Resolucion",
                "LeyAprobatoria",
                "Providencia",
                "AcuerdoActoNormativo",
                "Requisitoria",
                "Autorizacion"
            ],
            AprobacionDeLey: [],
            Decreto: [],
            Resolucion: [],
            LeyAprobatoria: [],
            Providencia: [],
            AcuerdoActoNormativo: [],
            Requisitoria: [],
            Autorizacion: [],
            Pais: [],
            Nacionalidad: [],
            OrganismoInternacional: [],
            Ciudadano: [],
            Institucion: [
                "Organismo",
                "Empresa",
                "CuerpoPolicial",
                "EntidadBancaria"
            ],
            Organismo: [],
            Empresa: ["EmpresaPrivada", "EmpresaEstatal"],
            EmpresaPrivada: [],
            EmpresaEstatal: [],
            CuerpoPolicial: [],
            EntidadBancaria: [],
            Efecto: [
                "IntervencionDeInstitucion",
                "ProrrogaDeIntervencion",
                "Designacion",
                "Expropiacion",
                "CreditoAdicional",
                "AscensoMilitar",
                "LicenciaDeExploracionYExplotacion",
                "Acuerdo",
                "EstablecimientoDeSedeDiplomatica",
                "DelegacionDeFunciones",
                "OrdenDeAprehension",
                "Jubilacion",
                "Ley",
                "CreacionDeEmpresaEstatal",
                "CreacionDeOrganismoPublico"
            ],
            Cargo: [],
            Rango: [],
            IntervencionDeInstitucion: [],
            ProrrogaDeIntervencion: [],
            Designacion: [],
            Expropiacion: [],
            CreditoAdicional: [],
            AscensoMilitar: [],
            LicenciaDeExploracionYExplotacion: [],
            Acuerdo: [
                "AcuerdoBilateral",
                "AcuerdoMarcoDeCooperacion",
                "AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion",
                "AcuerdoComplementarioDeCooperacion"
            ],
            AcuerdoBilateral: [],
            AcuerdoMarcoDeCooperacion: [],
            AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion: [],
            AcuerdoComplementarioDeCooperacion: [],
            EstablecimientoDeSedeDiplomatica: [],
            DelegacionDeFunciones: [],
            OrdenDeAprehension: [],
            Jubilacion: [],
            Ley: [],
            CreacionDeEmpresaEstatal: [],
            CreacionDeOrganismoPublico: []
        },
        inheritance: {
            # Keys are the possible collections, and values are the
            # collections extended by the correspondent collection key
            # ordered by inheritance.
            Documento: [],
            GacetaOficial: ["Documento"],
            ActoNormativo: ["Documento"],
            AprobacionDeLey: ["ActoNormativo", "Documento"],
            Decreto: ["ActoNormativo", "Documento"],
            Resolucion: ["ActoNormativo", "Documento"],
            LeyAprobatoria: ["ActoNormativo", "Documento"],
            Providencia: ["ActoNormativo", "Documento"],
            AcuerdoActoNormativo: ["ActoNormativo", "Documento"],
            Requisitoria: ["ActoNormativo", "Documento"],
            Autorizacion: ["ActoNormativo", "Documento"],
            Pais: [],
            Nacionalidad: [],
            OrganismoInternacional: [],
            Ciudadano: [],
            Institucion: [],
            Organismo: ["Institucion"],
            Empresa: ["Institucion"],
            EmpresaPrivada: ["Empresa", "Institucion"],
            EmpresaEstatal: ["Empresa", "Institucion"],
            CuerpoPolicial: ["Institucion"],
            EntidadBancaria: ["Institucion"],
            Efecto: [],
            Cargo: [],
            Rango: [],
            IntervencionDeInstitucion: ["Efecto"],
            ProrrogaDeIntervencion: ["Efecto"],
            Designacion: ["Efecto"],
            Expropiacion: ["Efecto"],
            CreditoAdicional: ["Efecto"],
            AscensoMilitar: ["Efecto"],
            LicenciaDeExploracionYExplotacion: ["Efecto"],
            Acuerdo: ["Efecto"],
            AcuerdoBilateral: ["Acuerdo", "Efecto"],
            AcuerdoMarcoDeCooperacion: ["Acuerdo", "Efecto"],
            AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion: ["Acuerdo", "Efecto"],
            AcuerdoComplementarioDeCooperacion: ["Acuerdo", "Efecto"],
            EstablecimientoDeSedeDiplomatica: ["Efecto"],
            DelegacionDeFunciones: ["Efecto"],
            OrdenDeAprehension: ["Efecto"],
            Jubilacion: ["Efecto"],
            Ley: ["Efecto"],
            CreacionDeEmpresaEstatal: ["Efecto"],
            CreacionDeOrganismoPublico: ["Efecto"],
        }
    }
])

Constant.create([
    #############################
    ## PAISES Y NACIONALIDADES ##
    #############################
    { classname: "Pais", nombre: "Venezuela", nacionalidad: "Venezolana"},
    { classname: "Nacionalidad", nacionalidad: "Venezolana", pais: "Venezuela"},
    { classname: "Pais", nombre: "Brasil", nacionalidad: "Brasileña"},
    { classname: "Nacionalidad", nacionalidad: "Brasileña", pais: "Brasil"},
    { classname: "Pais", nombre: "Colombia", nacionalidad: "Colombiana"},
    { classname: "Nacionalidad", nacionalidad: "Colombiana", pais: "Colombia"},
    { classname: "Pais", nombre: "Argentina", nacionalidad: "Argentina"},
    { classname: "Nacionalidad", nacionalidad: "Argentina", pais: "Argentina"},
    { classname: "Pais", nombre: "Cuba", nacionalidad: "Cubana"},
    { classname: "Nacionalidad", nacionalidad: "Cubana", pais: "Cuba"},
    { classname: "Pais", nombre: "Estados Unidos de América", nacionalidad: "Estadounidense"},
    { classname: "Nacionalidad", nacionalidad: "Estadounidense", pais: "Estados Unidos de América"},
    { classname: "Pais", nombre: "Ecuador", nacionalidad: "Ecuatoriana"},
    { classname: "Nacionalidad", nacionalidad: "Ecuatoriana", pais: "Ecuador"},
    { classname: "Pais", nombre: "Perú", nacionalidad: "Peruana"},
    { classname: "Nacionalidad", nacionalidad: "Peruana", pais: "Perú"},
    { classname: "Pais", nombre: "Uruguay", nacionalidad: "Uruguaya"},
    { classname: "Nacionalidad", nacionalidad: "Uruguaya", pais: "Uruguay"},
    { classname: "Pais", nombre: "El Salvador", nacionalidad: "Salvadoreña"},
    { classname: "Nacionalidad", nacionalidad: "Salvadoreña", pais: "El Salvador"},
    { classname: "Pais", nombre: "España", nacionalidad: "Española"},
    { classname: "Nacionalidad", nacionalidad: "Española", pais: "España"},
    { classname: "Pais", nombre: "Chile", nacionalidad: "Chilena"},
    { classname: "Nacionalidad", nacionalidad: "Chilena", pais: "Chile"},
    { classname: "Pais", nombre: "Bolivia", nacionalidad: "Boliviana"},
    { classname: "Nacionalidad", nacionalidad: "Boliviana", pais: "Bolivia"},
    { classname: "Pais", nombre: "Honduras", nacionalidad: "Hondureña"},
    { classname: "Nacionalidad", nacionalidad: "Hondureña", pais: "Honduras"},
    { classname: "Pais", nombre: "Guatemala", nacionalidad: "Guatemalteca"},
    { classname: "Nacionalidad", nacionalidad: "Guatemalteca", pais: "Guatemala"},
    { classname: "Pais", nombre: "Paraguay", nacionalidad: "Paraguaya"},
    { classname: "Nacionalidad", nacionalidad: "Paraguaya", pais: "Paraguay"},
    { classname: "Pais", nombre: "China", nacionalidad: "China"},
    { classname: "Nacionalidad", nacionalidad: "China", pais: "China"},
    { classname: "Pais", nombre: "Rusia", nacionalidad: "Rusa"},
    { classname: "Nacionalidad", nacionalidad: "Rusa", pais: "Rusia"},
    { classname: "Pais", nombre: "Bielorrusia", nacionalidad: "Bielorrusa"},
    { classname: "Nacionalidad", nacionalidad: "Bielorrusa", pais: "Bielorrusia"},
    { classname: "Pais", nombre: "Iran", nacionalidad: "Iraní"},
    { classname: "Nacionalidad", nacionalidad: "Iraní", pais: "Iran"},
    { classname: "Pais", nombre: "México", nacionalidad: "Mexicana"},
    { classname: "Nacionalidad", nacionalidad: "Mexicana", pais: "México"},
    #########################################
    ## INSTITUCIONES Y ORGANISMOS PÚBLICOS ##
    #########################################
    { classname: "Organismo", nombre: "Alcaldía Bolivariana del Municipio San Juaquín" },
    { classname: "Organismo", nombre: "Alcaldía Bolivariana Municipio Los Taques" },
    { classname: "Organismo", nombre: "Alcaldía del Distrito Metropolitano de Caracas" },
    { classname: "Organismo", nombre: "Alcaldía del Municipio de Valencia" },
    { classname: "Organismo", nombre: "Alcaldía Socialista del Municipio Guacara" },
    { classname: "Organismo", nombre: "Asamblea Constituyente de los Estados Unidos de Venezuela" },
    { classname: "Organismo", nombre: "Asamblea Nacional", acronimo: "AN" },
    { classname: "Organismo", nombre: "Banco Central de Venezuela", acronimo: "BCV"},
    { classname: "Organismo", nombre: "Comisión de Funcionamiento y Reestructuración del Sistema Judicial" },
    { classname: "Organismo", nombre: "Comisión Legislativa" },
    { classname: "Organismo", nombre: "Congreso de los Estados Unidos de Venezuela" },
    { classname: "Organismo", nombre: "Congreso Nacional de la República de Venezuela" },
    { classname: "Organismo", nombre: "Consejo de la Judicatura" },
    { classname: "Organismo", nombre: "Consejo de Ministras y Ministros Revolucionarios del Gobierno Bolivariano" },
    { classname: "Organismo", nombre: "Consejo Federal de Gobierno" },
    { classname: "Organismo", nombre: "Consejo Nacional Electoral", acronimo: "CNE" },
    { classname: "Organismo", nombre: "Consejo Supremo Electoral" },
    { classname: "Organismo", nombre: "Contraloría General de la Fuerza Armada Nacional Bolivariana" },
    { classname: "Organismo", nombre: "Contraloría General de la República" },
    { classname: "Organismo", nombre: "Contraloría Municipal del estado Guárico" },
    { classname: "Organismo", nombre: "Corporación para la recuperación y desarrollo del estado Vargas", acronimo: "CORPOVARGAS" },
    { classname: "Organismo", nombre: "Corte Suprema de Justicia" },
    { classname: "Organismo", nombre: "Defensa Pública" },
    { classname: "Organismo", nombre: "Defensoría del Pueblo" },
    { classname: "Organismo", nombre: "Dirección Ejecutiva de la Magistratura" },
    { classname: "Organismo", nombre: "Federación de Colegios de Abogados de Venezuela" },
    { classname: "Organismo", nombre: "Federación Médica Venezolana" },
    { classname: "Organismo", nombre: "Fiscalía General de la República" },
    { classname: "Organismo", nombre: "Gobernación del Estado Barinas" },
    { classname: "Organismo", nombre: "Gobernación del Estado Falcón" },
    { classname: "Organismo", nombre: "Gobierno de la República de Venezuela" },
    { classname: "Organismo", nombre: "Gobierno del Distrito Federal" },
    { classname: "Organismo", nombre: "Jefatura de Gobierno Territorio Insular Francisco de Miranda" },
    { classname: "Organismo", nombre: "Junta Revolucionaria de Gobierno de los Estados Unidos de Venezuela" },
    { classname: "Organismo", nombre: "Juzgados" },
    { classname: "Organismo", nombre: "La Asamblea Nacional Constituyente" },
    { classname: "Organismo", nombre: "La Asamblea Nacional Constituyente de los Estados Unidos de Venezuela" },
    { classname: "Organismo", nombre: "La Junta de Gobierno de la República de Venezuela" },
    { classname: "Organismo", nombre: "La Junta Militar de Gobierno de los Estados Unidos de Venezuela" },
    { classname: "Organismo", nombre: "Ministerio de Agricultura y Cría" },
    { classname: "Organismo", nombre: "Ministerio de Agricultura y Tierra" },
    { classname: "Organismo", nombre: "Ministerio de Alimentación" },
    { classname: "Organismo", nombre: "Ministerio de Ciencia y Tecnología" },
    { classname: "Organismo", nombre: "Ministerio de Comunicación e Información" },
    { classname: "Organismo", nombre: "Ministerio de Comunicaciones" },
    { classname: "Organismo", nombre: "Ministerio de Educación" },
    { classname: "Organismo", nombre: "Ministerio de Educación Superior" },
    { classname: "Organismo", nombre: "Ministerio de Educación y Deportes" },
    { classname: "Organismo", nombre: "Ministerio de Educación, Cultura y Deportes" },
    { classname: "Organismo", nombre: "Ministerio de Energía y Minas" },
    { classname: "Organismo", nombre: "Ministerio de Energía y Petróleo" },
    { classname: "Organismo", nombre: "Ministerio de Estado para Asuntos de la Mujer" },
    { classname: "Organismo", nombre: "Ministerio de Estado para el Desarrollo de la Economía Social" },
    { classname: "Organismo", nombre: "Ministerio de Finanzas" },
    { classname: "Organismo", nombre: "Ministerio de Fomento" },
    { classname: "Organismo", nombre: "Ministerio de Hacienda" },
    { classname: "Organismo", nombre: "Ministerio de Industria y Comercio" },
    { classname: "Organismo", nombre: "Ministerio de Industrias Básicas y Minería" },
    { classname: "Organismo", nombre: "Ministerio de Industrias Ligeras y Comercio" },
    { classname: "Organismo", nombre: "Ministerio de Infraestructura" },
    { classname: "Organismo", nombre: "Ministerio de Justicia" },
    { classname: "Organismo", nombre: "Ministerio de la Cultura" },
    { classname: "Organismo", nombre: "Ministerio de la Defensa" },
    { classname: "Organismo", nombre: "Ministerio de la Familia" },
    { classname: "Organismo", nombre: "Ministerio de la Juventud" },
    { classname: "Organismo", nombre: "Ministerio de la Producción y el Comercio" },
    { classname: "Organismo", nombre: "Ministerio de la Secretaría de la Presidencia" },
    { classname: "Organismo", nombre: "Ministerio de Minas e Hidrocarburos" },
    { classname: "Organismo", nombre: "Ministerio de Participación Popular y Desarrollo Social" },
    { classname: "Organismo", nombre: "Ministerio de Planificación y Desarrollo" },
    { classname: "Organismo", nombre: "Ministerio de Relaciones Exteriores" },
    { classname: "Organismo", nombre: "Ministerio de Relaciones Interiores" },
    { classname: "Organismo", nombre: "Ministerio de Salud" },
    { classname: "Organismo", nombre: "Ministerio de Salud y Desarrollo Social" },
    { classname: "Organismo", nombre: "Ministerio de Sanidad y Asistencia Social" },
    { classname: "Organismo", nombre: "Ministerio de Sanidad y Asistencia Social y del Ambiente y los Recursos Naturales Renovables" },
    { classname: "Organismo", nombre: "Ministerio de Transporte y Comunicaciones" },
    { classname: "Organismo", nombre: "Ministerio de Turismo" },
    { classname: "Organismo", nombre: "Ministerio del Ambiente y de los Recursos Naturales" },
    { classname: "Organismo", nombre: "Ministerio del Ambiente y de los Recursos Naturales Renovables" },
    { classname: "Organismo", nombre: "Ministerio del Desarrollo Urbano" },
    { classname: "Organismo", nombre: "Ministerio del Despacho de la Presidencia" },
    { classname: "Organismo", nombre: "Ministerio del Interior y Justicia" },
    { classname: "Organismo", nombre: "Ministerio del Trabajo" },
    { classname: "Organismo", nombre: "Ministerio del Trabajo y Seguridad Social" },
    { classname: "Organismo", nombre: "Ministerio para la Economía Popular" },
    { classname: "Organismo", nombre: "Ministerio para la Vivienda y el Hábitat" },
    { classname: "Organismo", nombre: "Ministerio Público" },
    { classname: "Organismo", nombre: "Ministerio de Estado para la Transformación Revolucionaria de la Gran Caracas" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular de Economía y Finanzas" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular de Economía, Finanzas y Banca Pública" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Banca y Finanzas" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular de Finanzas" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular de Industrias" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular de Planificación" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular de Planificación y Finanzas" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular del Despacho de la Presidencia" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular del Despacho de la Presidencia y Seguimiento de la Gestión de  Gobierno" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Relaciones Interiores y Paz" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Ciencia y Tecnología" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Ciencia, Tecnología e Industrias Intermedias" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Ciencia, Tecnología e Innovación" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Ecosocialismo, Vivienda y Hábitat" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Educación Universitaria, Ciencia y Tecnología" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para el Ambiente" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para el Comercio" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para el Deporte" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para el Servicio Penitenciario" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para el Trabajo y Seguridad Laborales" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para el Trabajo y Seguridad Social" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para el Turismo" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para el Proceso Social de Trabajo" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Agricultura y Tierras" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Agricultura y Tierras, para la Defensa y para la Alimentación" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Alimentación" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Comunicación y la Información" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Cultura" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Defensa" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Economía Comunal" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Economía Popular" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Economía y Finanzas" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Educación" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Educación Superior" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Educación Universitaria" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Educación y para el Deporte" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Energía Eléctrica" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Energía y Petróleo" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Infraestructura" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Juventud" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Juventud y el Deporte" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Mujer y la Igualdad de Género" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Participación y el Desarrollo Social" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Participación y Protección Social" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Planificación y Desarrollo" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Salud" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Salud y Protección Social" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Vivienda y Hábitat" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para las Comunas" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para las Comunas y los Movimientos Sociales" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para las Comunas y Protección Social" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para las Finanzas" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para las Industrias Básicas y Minería" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para las Industrias Ligeras y Comercio" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para las Obras Públicas y Vivienda" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para las Telecomunicaciones y la Informática" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para los Pueblos Indígenas" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Petróleo y Minería" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Relaciones Exteriores" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Relaciones Interiores y Justicia" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Relaciones Interiores, Justicia y Paz" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Transporte Acuático y Aéreo" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Transporte Terrestre" },
    { classname: "Organismo", nombre: "Ministerio del Poder popular para Transporte Terrestre y Obras Públicas" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Transporte y Comunicaciones" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Vivienda, Hábitat y el Ecosocialismo" },
    { classname: "Organismo", nombre: "Viceministerio para la Suprema Felicidad Social del Pueblo" },
    { classname: "Organismo", nombre: "Parlamento Andino" },
    { classname: "Organismo", nombre: "Parlamento Indígena de América" },
    { classname: "Organismo", nombre: "Parlamento Latinoamericano" },
    { classname: "Organismo", nombre: "Poder Ciudadano" },
    { classname: "Organismo", nombre: "Presidencia de la República Bolivariana de Venezuela" },
    { classname: "Organismo", nombre: "Presidencia de la República de los Estados Unidos de Venezuela" },
    { classname: "Organismo", nombre: "Presidencia de la República de Venezuela" },
    { classname: "Organismo", nombre: "Procuraduría General de la República" },
    { classname: "Organismo", nombre: "Región Estratégica de Desarrollo Integral de la Zona Marítima y Espacios Insulares" },
    { classname: "Organismo", nombre: "República Bolivariana de Venezuela" },
    { classname: "Organismo", nombre: "Secretaría de la Presidencia" },
    { classname: "Organismo", nombre: "Territorio Insular Francisco de Miranda" },
    { classname: "Organismo", nombre: "Televisora Venezolana Social", acronimo: "TVES" },
    { classname: "Organismo", nombre: "Tribunal Supremo de Justicia" },
    { classname: "Organismo", nombre: "Vicepresidencia de la República Bolivariana de Venezuela" },
    { classname: "Organismo", nombre: "Vicepresidencia de la República Región Estratégica de Desarrollo Integral Occidental" },
    { classname: "Organismo", nombre: "Vicepresidencia de la República" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para la Economía Productiva" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular  para la Producción Agrícola y Tierras" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para  Agricultura Urbana y Rural" },
    { classname: "Organismo", nombre: "Ministerio del Poder Popular para Comercio Exterior e Inversión Extranjera" },
    { classname: "Organismo", nombre: "Junta Nacional Protectora y Conservadora del Patrimonio Histórico y Artístico de la Nación", depende_de: "Gobierno del Distrito Federal" },
    { classname: "Organismo", nombre: "Consejo Nacional de Universidades", acronimo: "CNU", depende_de: "Ministerio de Educación Superior" },
    { classname: "Organismo", nombre: "Comisión Nacional de Valores", depende_de: "Ministerio de Finanzas" },
    { classname: "Organismo", nombre: "Comisión de Administración de Divisas", acronimo: "CADIVI", depende_de: "Ministerio del Poder Popular de Economía y Finanzas" },
    { classname: "Organismo", nombre: "Servicio Nacional Integrado de Administración Aduanera y Tributaria", acronimo: "SENIAT", depende_de: "Ministerio del Poder Popular para la Banca y Finanzas" },
    { classname: "Organismo", nombre: "Superintendencia Nacional de Valores", acronimo: "SUNAVAL", depende_de: "Ministerio del Poder Popular para la Banca y Finanzas" },
    { classname: "Organismo", nombre: "Fondo de Garantía de Depósitos y Protección Bancaria", acronimo: "Fogade", depende_de: "Ministerio del Poder Popular para la Banca y Finanzas" },
    { classname: "Organismo", nombre: "Instituto Autónomo Consejo Nacional de Derechos de Niños, Niñas y Adolescentes", acronimo: "IDENNA", depende_de: "Ministerio del Poder Popular del Despacho de la Presidencia y Seguimiento de la Gestión de  Gobierno" },
    { classname: "Organismo", nombre: "Instituto Nacional de Deportes", acronimo: "IND", depende_de: "Ministerio del Poder Popular para el Deporte" },
    { classname: "Organismo", nombre: "Instituto Nacional de Prevención, Salud y Seguridad Laborales", acronimo: "INPSASEL", depende_de: "Ministerio del Poder Popular para el Proceso Social de Trabajo" },
    { classname: "Organismo", nombre: "Instituto Nacional de Investigaciones Agrícolas", acronimo: "INIA", depende_de: "Ministerio del Poder Popular para la Agricultura y Tierras" },
    { classname: "Organismo", nombre: "Instituto Socialista de la Pesca y Acuicultura", acronimo: "INSOPESCA", depende_de: "Ministerio del Poder Popular para la Agricultura y Tierras" },
    { classname: "Organismo", nombre: "Servicio Autónomo de Sanidad Agropecuaria", acronimo: "SASA", depende_de: "Ministerio del Poder Popular para la Agricultura y Tierras" },
    { classname: "Organismo", nombre: "Corporación Venezolana Agraria", acronimo: "CVA", depende_de: "Ministerio del Poder Popular para la Alimentación" },
    { classname: "Organismo", nombre: "Comisión Nacional de Telecomunicaciones", acronimo: "CONATEL", depende_de: "Ministerio del Poder Popular para la Comunicación y la Información" },
    { classname: "Organismo", nombre: "Instituto de las Artes Escénicas y Musicales", acronimo: "IAEM", depende_de: "Ministerio del Poder Popular para la Cultura" },
    { classname: "Organismo", nombre: "Instituto de las Artes de la Imagen y el Espacio", acronimo: "IARTES", depende_de: "Ministerio del Poder Popular para la Cultura" },
    { classname: "Organismo", nombre: "Instituto Nacional de Capacitación y Educación", acronimo: "INCE", depende_de: "Ministerio del Poder Popular para la Economía Comunal" },
    { classname: "Organismo", nombre: "Superintendencia de Seguros", acronimo: "SUDESEG", depende_de: "Ministerio del Poder Popular para la Economía y Finanzas" },
    { classname: "Organismo", nombre: "Oficina Nacional de Presupuesto", acronimo: "ONAPRE", depende_de: "Ministerio del Poder Popular para la Planificación y Desarrollo" },
    { classname: "Organismo", nombre: "Banco Nacional de Vivienda y Hábitat", acronimo: "BANAVIH", depende_de: "Ministerio del Poder Popular para la Vivienda y Hábitat" },
    { classname: "Organismo", nombre: "Fondo Nacional de Desarrollo Urbano", acronimo: "FONDUR", depende_de: "Ministerio del Poder Popular para la Vivienda y Hábitat" },
    { classname: "Organismo", nombre: "Corporación Venezolana de Guayana", depende_de: "Ministerio del Poder Popular para las Industrias Básicas y Minería" },
    { classname: "Organismo", nombre: "Instituto Autónomo Consejo Nacional de Derechos de Niños, Niñas y Adolescentes", acronimo: "IDENNA", depende_de: "Viceministerio para la Suprema Felicidad Social del Pueblo" }
])

# DocumentCloud source document fetched from DC platform
source_seeds = nil
page = 1
PER_PAGE = 1000
QUERY = 'group: ipysvenezuela'

def is_extraordinary(doc)
    doc.id.include? "extraordinaria"
end

begin
    source_seeds = DocumentCloud.search(QUERY, :per_page => PER_PAGE, :page => page)
    batch = []
    source_seeds.documents.each do |doc|
        batch << Source.new({dc_id: doc.id, canonical_url: doc.canonical_url, is_extraordinary: is_extraordinary(doc)})
    end
    Source.import batch
    page += 1
end until source_seeds.documents.length == 0

# Admin user
admin = User.new({
    email: "rdbvictor19@gmail.com",
    password: "12345678",
    password_confirmation: "12345678",
    role: :admin,
    name: "Victor De Ponte",
    nickname: "throoze"
    })
admin.skip_confirmation!
admin.confirm!
admin.save

# Admin user
admin = User.new({
    email: "kathypennacchio30@gmail.com",
    password: "12345678",
    password_confirmation: "12345678",
    role: :admin,
    name: "Katherine Pennacchio",
    nickname: "katherine"
    })
admin.skip_confirmation!
admin.confirm!
admin.save

# Admin user
admin = User.new({
    email: "arysucv@gmail.com",
    password: "12345678",
    password_confirmation: "12345678",
    role: :admin,
    name: "Arysbell Carolina Arismendi Velasquez",
    nickname: "arysbell"
    })
admin.skip_confirmation!
admin.confirm!
admin.save

# Admin user
admin = User.new({
    email: "frammnm@gmail.com",
    password: "12345678",
    password_confirmation: "12345678",
    role: :admin,
    name: "Francisco Martinez",
    nickname: "frammnm"
    })
admin.skip_confirmation!
admin.confirm!
admin.save

# Admin user
admin = User.new({
    email: "roseliaruiz@gmail.com",
    password: "12345678",
    password_confirmation: "12345678",
    role: :admin,
    name: "Roselia Ruíz",
    nickname: "roselia"
    })
admin.skip_confirmation!
admin.confirm!
admin.save

# Admin user
admin = User.new({email: "admin@gmail.com", password: "12345678", password_confirmation: "12345678", role: :admin})
admin.skip_confirmation!
admin.confirm!
admin.save

# Scraper user
scraper = User.new({email: "scraper@gmail.com", password: "12345678", password_confirmation: "12345678", role: :scraper})
scraper.skip_confirmation!
scraper.confirm!
scraper.save

# Validator user
validator = User.new({email: "validator@gmail.com", password: "12345678", password_confirmation: "12345678", role: :validator})
validator.skip_confirmation!
validator.confirm!
validator.save

# Banned user
banned = User.new({email: "banned@gmail.com", password: "12345678", password_confirmation: "12345678", role: :banned})
banned.skip_confirmation!
banned.confirm!
banned.save