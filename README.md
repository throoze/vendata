Vendata
=======

A platform for a hosted repository and the interfaces to help people ask
information from it.

## Important!

Use `nodejs` engine version less than `v0.12.7`. This is due to a dependency
on the `jquery` CommonJS Package, that won't work while running on the server
side, unless it uses `jsdom@3.1.2` which depends on `contextify` which will
only compile with the mentioned `nodejs` engine, since its `node-gyp` package
is the only one able to compile it.

## Install rbenv-vars

```
cd ~/.rbenv/plugins
git clone https://github.com/sstephenson/rbenv-vars.git
```

## Install rbenv-sudo

```
$ git clone git://github.com/dcarley/rbenv-sudo.git ~/.rbenv/plugins/rbenv-sudo
```

Usage:  Prefix your use of sudo with the `rbenv` command:

```
$ rbenv sudo passenger-install-nginx-module
```

## Getting Started

- Clone this repository
- `cd` to the repo's root folder
- `$ npm install`
- `$ bundle`
- `$ bundle exec rails server`

## Roadmap (in Spanish)

- Flaguear gacetas en caso de nuevas entidades, con comentario adjunto.
- Añadir hints a la descripción de los campos complicados.
- Varios efectos por Acto Normativo?
- Método de carga de Organismos
- Revisar la info requerida de los créditos adicionales
- Feedback y ayuda
- Mensajes de los administradores a los scrapers
- Mostrar estadisticas personales (progress bar y porcentajes)
- Botón de ayuda en el toolbar (link a página de ayuda)
- Calendario a los campos de fecha
- Campo clave para las constantes
