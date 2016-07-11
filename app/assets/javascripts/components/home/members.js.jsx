// ./components/home/members.js.jsx
var datauri       = require('datauri');


Members = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {
        var linea_team = "assets/" + datauri(__dirname+'/../../../images/Linea-team.png');
        var twitter    = "assets/" + datauri(__dirname+'/../../../images/Twitter.png');
        var linkedin   = "assets/" + datauri(__dirname+'/../../../images/Linkedin.png');
        
        var katherine = "assets/" + datauri(__dirname+'/../../../images/team/Kathe-1000x1000.jpg');
        var victor    = "assets/" + datauri(__dirname+'/../../../images/team/Victor-1000x1000.jpg');
        var arysbel   = "assets/" + datauri(__dirname+'/../../../images/team/Arys-1000x1000.jpg');
        // var jeffrey   = "assets/" + datauri(__dirname+'/../../../images/team/Jeffrey-1000x1000.jpg');
        var roselia   = "assets/" + datauri(__dirname+'/../../../images/team/Rose-1000x1000.jpg');
        var francisco = "assets/" + datauri(__dirname+'/../../../images/team/Francisco-1000x1000.jpg');

        var html = (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">                        
                            <img src={linea_team} className="img-responsive img-center" />
                            <div className="col-lg-4 team-item">
                                <img src={katherine} className="img-responsive img-circle div-team" />
                                <div>
                                    <h2 className="member-name"> Katherine Pennacchio</h2>
                                    <p className="career"> Coordinadora </p>
                                    <p className="profile"> 
                                        Periodista venezolana con una Maestría en Periodismo de Investigación y Datos. Actualmente
                                        forma parte del equipo reporteril y redactor de Armando.info.
                                    </p>
                                    <br/>
                                    <div style={{textAlign: "center"}}>
                                        
                                    <a href="https://twitter.com/KathyPennacchio">
                                        <img src={twitter} className="img-center " />
                                    </a>
                                    <a href="https://www.linkedin.com/in/katherine-pennacchio-88510274">
                                        <img src={linkedin} className="img-center " />
                                    </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 team-item">
                                <img src={victor} className="img-responsive img-circle div-team" />
                                <div>
                                    <h2 className="member-name"> Victor De Ponte</h2>
                                    <p className="career"> Coordinador de desarrollo </p>
                                    <p className="profile"> 
                                        Emprendedor y desarrollador de software, especializado en arquitectura de software. Actualmente
                                        se encuentra en Santiago de Chile (Chile) levantando un proyecto startup en el área de Internet
                                        de Las Cosas. 
                                    </p>
                                    <div style={{textAlign: "center"}}>                                
                                        <a href="https://twitter.com/Throoze">
                                            <img src={twitter} className="img-center " />
                                        </a>
                                        <a href="https://www.linkedin.com/in/victordeponte">
                                            <img src={linkedin} className="img-center " />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 team-item">
                                <img src={arysbel} className="img-responsive img-circle div-team"/>
                                <div>
                                    <h2 className="member-name"> Arysbell Arismendi</h2>
                                    <p className="career"> Asistente de coordinaci&oacute;n </p>
                                    <p className="profile"> 
                                        Periodista egresada de la Universidad Central de Venezuela. Actualmente integra la
                                        Unidad de Investigación de El Pitazo, cursa estudios de postgrado en Comunicación
                                        para el Desarrollo e imparte talleres a través de Escuela de Datos.
                                    </p>
                                    <div style={{textAlign: "center"}}>
                                        
                                    <a href="https://twitter.com/Arysbell">
                                        <img src={twitter} className="img-center "/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/arysbellarismendi">
                                        <img src={linkedin} className="img-center "/>
                                    </a>
                                    </div>
                                </div>
                            </div>
                            {/*
                            <div className="col-lg-4 team-item">
                                <img src={jeffrey} className="img-responsive img-circle div-team"/>
                                <div>
                                    <h2 className="member-name"> Jeffrey Leon</h2>
                                    <p className="career"> Programador </p>
                                    <p className="profile"> 
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, suscipit, rerum quos facilis repellat architecto commodi officia atque nemo facere eum non illo voluptatem quae delectus odit vel itaque amet.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, suscipit, rerum quos facilis repellat architecto commodi officia atque nemo facere eum non illo voluptatem quae delectus odit vel itaque.
                                    </p>
                                    <div style={{textAlign: "center"}}>
                                        
                                    <a href="">
                                        <img src={twitter} className="img-center "/>
                                    </a>
                                    <a href="">
                                        <img src={linkedin} className="img-center "/>
                                    </a>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-lg-4 col-lg-offset-2 team-item">
                                <img src={roselia} className="img-responsive img-circle div-team"/>
                                <div>
                                    <h2 className="member-name"> Roselia Ruiz</h2>
                                    <p className="career"> Diseñadora web </p>
                                    <p className="profile"> 
                                        Diseñadora especializada en periodismo gráfico audiovisual. Ha trabajado en varios de
                                        los principales medios de comunicación en Venezuela. Actualmente trabaja en Grupo IG.
                                    </p>
                                    <div style={{textAlign: "center"}}>                                
                                        <a href="https://twitter.com/Roseliaruiz">
                                            <img src={twitter} className="img-center "/>
                                        </a>
                                        <a href="https://www.linkedin.com/in/roselia-ruiz-98440117">
                                            <img src={linkedin} className="img-center "/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 team-item">
                                <img src={francisco} className="img-responsive img-circle div-team"/>
                                <div>
                                    <h2 className="member-name"> Francisco Mart&iacute;nez</h2>
                                    <p className="career"> Programador </p>
                                    <p className="profile"> 
                                        Estudiante de Ingeniería en Computación de la Universidad Simón Bolívar, en Caracas.
                                        Forma parte del laboratorio docente de aulas computarizadas de la misma universidad.
                                    </p>
                                    <div style={{textAlign: "center"}}>
                                        
                                    <a href="">
                                        <img src={twitter} className="img-center "/>
                                    </a>
                                    <a href="">
                                        <img src={linkedin} className="img-center "/>
                                    </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            );
        return html;
    }

});

module.exports = Members;