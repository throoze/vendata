# Instalación del ambiente de desarrollo

## Introducción

A continuación se detallan los pasos para instalar un ambiente de desarrollo para la aplicación sobre una máquina con Ubuntu 14.04 y 512Mb de memoria RAM. Los pasos deberían ser muy similares para otras distribuciones basadas en Debian.

Los requisitos para la ejecución de la aplicación son los siguientes:
* Ruby on Rails - Framework para el backend 
* Node.js 0.12.7 - Permite gestionar módulos empleados en el frontend ([React](https://facebook.github.io/react/))
* MongoDB - Almacena la información sobre las gacetas.
* Sqlite o PostgreSQL - Se usa para guardar información sobre los usuarios, la especificación de los documentos y todo lo relativo al control de la carga de información (bitácora de acciones). 

## Instalar pre-requisitos

    $ sudo aptitude clean
    $ sudo aptitude update
    $ sudo aptitude install build-essential libpq-dev git curl zlib1g-dev libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev mongodb-server
    
Iniciar el servicio de mongodb

    $ sudo service mongodb start

Para verificar podemos ejecutar el siguiente comando:

    $ netstat -tulpn | grep
    tcp        0      0 127.0.0.1:27017         0.0.0.0:*               ESCUCHAR    582/mongod

Habilitar el inicio de mongodb por defecto en el sistema operativo (**opcional**):

    $ update-rc.d mongodb-server defaults
    $ update-rc.d mongodb start

## Instalar Ruby on Rails

**Instalar rbenv y ruby-build**

    $ cd
    $ git clone git://github.com/sstephenson/rbenv.git .rbenv
    $ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.profile
    $ echo 'eval "$(rbenv init -)"' >> ~/.profile
    $ git clone git://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
    $ echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.profile
    
    # Carga los cambios implementados en ~/.profile en la sesión actual
    $ source ~/.profile
    
**Instalar ruby**

    # instala ruby 2.2.3
    $ rbenv install -v 2.2.3
    
    # Define la versión global de ruby a ser utilizar
    $ rbenv global 2.2.3

Verificar que la versión se corresponda

    $ ruby -v
    ruby 2.2.3p173 (2015-08-18 revision 51636) [x86_64-linux]
    
Deshabilitar la generación de documentación por gema instalada (**opcional**):

> **Nota importante:**  De no usar el siguiente comando el proceso de instalación tomará un poco mas tiempo debido a que se genera la documentación por cada paquete instalado.

    $ echo "gem: --no-rdoc --no-ri" > ~/.gemrc

**Instalar bundler** 

`bundler` nos permitirá manejar las dependencias de la aplicación:

    $ gem install bundler

**Instalar Ruby on Rails**

 Instalamos el framework para desarrollo:
 
     $ gem install rails
    
> **Nota importante:** En caso de instalar una nueva versión de ruby o una gema que provea comandos, deberías correr el subcomando `rehash`. Esto instalará `shims` para todos los ejecutables de Ruby conocidos para rbenv, lo cual te permitirá usar dichos ejecutables. [Fuente (en inglés)](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-14-04)

    $ rbenv rehash

Verifica que rails se haya instalado correctamente, imprimiendo su versión, con este comando:

    $ rails -v
    Rails 4.2.6
    
## Instalar node 0.12.7

La instalación se realiza manualmente por que la versiones superiores generan problemas con la aplicación:

> **Nota importante:** Se requiere esta versión en particular debido a problema con el paquete  **jquery CommonJS Package**. No funciona del lado del servidor a menos que se utilice **jsdom@3.1.2** que a su vez depende de **contextify** que solo compila con la referida versión de nodejs debido a que **node-gyp** es el único capaz de compilarlo.

    # Crear directorio para descargar y hacer compilar nodejs
    $ mkdir node-build
    $ cd node-build

    # Descargar y compilar node
    $ wget https://nodejs.org/download/release/v0.12.7/node-v0.12.7.tar.gz
    $ tar -xvzf node-v0.12.7.tar.gz
    $ cd node-v0.12.7
    $ ./configure --prefix=$HOME/node-v0.12.7/
    $ make prefix=$HOME/node-v0.12.7/
    $ make install

    # Creamos un enlace simbólico al directorio nodejs de para facilitar la
    # actualización de la versión nodejs. El PATH quedaría igual
    $ cd
    $ ln -s $HOME/node-v0.12.7/ ~/nodejs/ 

Luego de instalado nodejs es necesario colocar el directorio `/bin/` en el `PATH`. Para ello debemos agregar lo siguiente esto al final del archivo `~/.profile`

    echo 'export PATH="$HOME/nodejs/bin:$PATH"' > $HOME/.profile

Cargar todos lo cambios realizados al archivo `~/.profile` en la sesión de usuario actual:

    $ source ~/.profile

Para verificar que node se instaló correctamente podemos ejecutar:

    $ node -v
    v0.12.7


## Instalar la aplicación

### Instalar dependencias
    # Ir a directorio home
    $ cd ~
    
    # Descargar la aplicación de github
    $ git clone https://github.com/throoze/vendata
    
    # ir al directorio raíz de la aplicación
    $ cd vendata
    
    # Instalar las dependencias de ruby
    $ bundle install
    
    # Instalar las dependencias de node
    $ npm install

### Configurar la aplicación

Crear los siguientes archivos a partir del directorio raíz de la aplicación:

Crear el archivo de configuración **.rbenv-vars**

    VENDATA_HOST="localhost:3000"
    SECRET_KEY_BASE='your_generated_secret'
    DOCUMENTCLOUD_EMAIL='username@domain.com'
    DOCUMENTCLOUD_PASSWORD='somepassword'
    
Crear el archivo de configuración **config/app_environment_variables.rb**

    ENV['VENDATA_HOST'] = 'localhost:3000'
    ENV['SECRET_KEY_BASE'] = 'your_generated_secret'
    ENV['DOCUMENTCLOUD_EMAIL']    = 'username@domain.com'
    ENV['DOCUMENTCLOUD_PASSWORD'] = 'somepassword'

> **Nota importante:** Para obtener las credenciales de [DocumentCloud](https://www.documentcloud.org/home) se debe contactar al equipo de *Escuela de Datos Venezuela* a través de la dirección  <escueladedatosvenezuela@gmail.com>

### Cargar datos iniciales en repositorios de datos
En este paso se realizan los siguientes cambios:

* Crear la base de datos de autenticación (PostgreSQL o sqlite)
* Crear la base la datos para las gacetas (MongoDB)
* Descargar metadata de las gacetas almacenadas en DocumentCloud

Ejecutar la tarea en rake para carga de datos:

    $ RAILS_ENV=development bundle exec rake db:setup

Visto que no hemos instalado PostgreSQL la aplicación empleará sqlite.

> **Nota importante:** sqlite es la base de datos recomendada para ambientes de desarrollo. Para los ambientes de calidad y producción se debe emplear PostgreSQL.

### Iniciar la aplicación

    $ cd ~/vendata
    $ rails server -b 0.0.0.0

### Probar la aplicación
Para verificar que todo está funcionando bien podemos ingresar a la aplicación a través de http://localhost:3000

Los usuarios y contraseñas creados en la carga inicial de la base de datos se encuentra disponibles en: `db/seeds.rb`

## Errores comunes

### Cannot render console from 10.0.2.2!

Si se está usando [vagrant](https://www.vagrantup.com/) y aparecen los siguientes mensajes de error en la consola:

    Started GET "/assets/application-44c90e9e3965578e56555efcba4044d2.css?body=1" for 10.0.2.2 at 2016-05-03 19:14:45 +0000
    Cannot render console from 10.0.2.2! Allowed networks: 127.0.0.1, ::1, 127.0.0.0/127.255.255.255
    
    
    Started GET "/assets/api/v1/scraping-65b0a1f7fca8227770e4f4cdfc2446af.css?body=1" for 10.0.2.2 at 2016-05-03 19:14:46 +0000
    Cannot render console from 10.0.2.2! Allowed networks: 127.0.0.1, ::1, 127.0.0.0/127.255.255.255
    

Se debe agregar lo siguiente al final del archivo `config/environments/development.rb` 

    class Application < Rails::Application
      config.web_console.whitelisted_ips = '10.0.2.2'
    end

Con este cambio estaremos agregando la dirección IP a una lista blanca ya que por defecto el servidor solo permite acceso desde localhost  [Fuente (en inglés)](https://github.com/rails/web-console#configweb_consolewhitelisted_ips)

## Mejoras por incluir en el documento
* Agregar la configuración de PostgreSQL
* Agregar la configuración para desplegar la aplicación con Apache y mod passenger
* Referir el uso de gitflow
