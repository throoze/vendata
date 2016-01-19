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
            Documento: {
                classname: "Documento",
                human_readable: "Documento",
                constant: false,
                abstract: true,
                fields: {
                    numero: { type: "string", label: "Número" },
                    fecha:  { type: "date" },
                    listo:  { type: "boolean", hidden: true }
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
                fields: {
                    nombre: { type: "string" },
                    acronimo: { type: "string" }
                }
            },
            Ciudadano: {
                classname: "Ciudadano",
                human_readable: "Ciudadano",
                constant: true,
                abstract: false,
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
                human_readable: "Institucion",
                fields: {
                    nombre: { type: "string" },
                    acronimo: { type: "string" }
                }
            },
            Organismo: {
                classname: "Organismo",
                human_readable: "Organismo",
                constant: true,
                abstract: false,
                extends: ["Institucion"],
                fields: {
                    depende_de: {
                        type: "Organismo",
                        nullable: true
                    }
                }
            },
            Empresa: {
                classname: "Empresa",
                constant: true,
                abstract: true,
                human_readable: "Empresa",
                extends: ["Institucion"]
            },
            EmpresaPrivada: {
                classname: "EmpresaPrivada",
                human_readable: "Empresa Privada",
                constant: true,
                abstract: false,
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
                extends: ["Empresa", "Institucion"],
                fields: {
                    capital_inicial: { type: "number" },
                    duracion: { type: "string" },
                    accionista_de: { type: "[Empresa]" },
                    adscrita_a: {
                        type: "Organismo",
                        nullable: true
                    },
                    filial_de: {
                        type: "Institucion",
                        nullable: true
                    }
                }
            },
            CuerpoPolicial: {
                classname: "CuerpoPolicial",
                human_readable: "Cuerpo Policial",
                constant: true,
                abstract: false,
                extends: ["Institucion"]
            },
            EntidadBancaria: {
                classname: "EntidadBancaria",
                human_readable: "Entidad Bancaria",
                constant: true,
                abstract: false,
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
                fields: {
                    nombre: { type: "string" }
                }
            },
            Rango: {
                classname: "Rango",
                human_readable: "Rango",
                constant: true,
                abstract: false,
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
                        constraints: {
                            nullable: "this.status == 'encargado'",
                        }
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
                    destino: {type: "string" }
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
                    promocion: {
                        type: "string",
                        nullable: true
                    },
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