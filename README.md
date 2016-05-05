[Logo Vendata](https://github.com/throoze/vendata/blob/develop/logo.png)

# Sobre el proyecto: 

En Venezuela, un país en donde las restricciones a la prensa están a la orden del día y el acceso a la información pública no está garantizado en la ley, estar informado sobre las decisiones del gobierno puede ser problemático. Por eso, el Instituto Prensa y Sociedad (IPYS) Venezuela junto a Transparencia Venezuela están lanzando Vendata, una plataforma en línea que busca ofrecer de manera sencilla la información contenida en la Gaceta Oficial.

La Gaceta, el medio de comunicación a través del cual el Estado publica sus normas, resoluciones, órdenes administrativas y actos. Es el único imperativo con el que deben cumplir diariamente quienes gobiernan.

El objetivo principal del equipo Vendata es hacer de ella la plataforma de datos abiertos más importante de Venezuela. Para ello, el equipo está creando un motor de búsqueda y una enorme base de datos abiertos disponible para periodistas, investigadores y público en general, presentada de tal manera que la información pueda ser comprendida y reutilizada,. La plataforma web tendrá también una API (application program interface) pública que permitirá que la información contenida en Vendata pueda ser leída y cruzada con otras bases de datos

En el siguiente vídeo se muestra el funcionamiento el módulo de colaboración y carga de información:
https://www.youtube.com/watch?v=S0FJu4CbbGk


## Ejecución del proyecto:

El proceso de construcción de Vendata está dividido en tres etapas: 

1. Análisis de las Gacetas Oficiales y creación del formulario de vaciado.
2. Activación de la plataforma interna de colaboración y vaciado de información.
3. Verificación de los datos y montaje de la plataforma de búsqueda online para uso de los usuarios.

Actualmente nos encontramos en la segunda etapa, realizando la carga de información. A la par se está realizando la implementación de la plataforma tecnológica. 

## ¿Cómo participar?

Vendata se encuentra en su fase de ejecución por lo que IPYS Venezuela (http://ipysvenezuela.org/) está buscando voluntarios para ayudar a vaciar y organizar los datos. El puede ser realizado a distancia y requiere de acceso a Internet. También buscamos desarrolladores que nos apoyen a mejorar la aplicación.

### Periodistas e interesados en liberar datos

Escríbenos a escueladedatosvenezuela@gmail.com y te damos más detalles.

### Desarrolladores

La aplicación emplea las siguientes tecnologías: 

* Ruby on Rails - Framework para el backend 
* Node.js - Permite gestionar módulos empleados en el frontend 
* ReactJS - Framework en JavaScript para el frontend
* MongoDB - Almacena la información sobre los documentos
* PostgreSQL - Se usa para guardar información sobre los usuarios, la especificación de los documentos y todo lo relativo al control de la carga de información (bitácora de acciones)
* ElasticSearch - Motor de indexado y búsquedas 

El siguiente enlace tiene todos los pasos para instalar la aplicación en un ambiente de desarrollo:
https://github.com/throoze/vendata/blob/develop/instalacion-del-ambiente-de-desarrollo.md
