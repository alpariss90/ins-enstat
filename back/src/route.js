const semestreCtrl=require('./controllers/semestreCtrl')
const uniteCtrl=require('./controllers/uniteCtrl')
const matiereCtrl=require('./controllers/matiereCtrl')
const etudiantCtrl= require('./controllers/etudiantCtrl')
const inscriptionCtrl=require('./controllers/inscriptionCtrl')
const noteCtrl=require('./controllers/noteCtrl')

module.exports=(app)=>{
    app.get('/', semestreCtrl.accueil),
    app.get('/annee/list', semestreCtrl.getAllAnnee),
    /**
     * Semestre
     */
    app.post('/semestre/save', semestreCtrl.add)
    app.post('/semestre/edit', semestreCtrl.edit),
    app.get('/semestre/get/:id', semestreCtrl.getById),
    app.get('/semestre/all', semestreCtrl.getAll)


    /**
     * Unite
     */
    app.post('/unite/save', uniteCtrl.add)
    app.post('/unite/edit', uniteCtrl.edit),
    app.get('/unite/get/:id', uniteCtrl.getById),
    app.get('/unite/all', uniteCtrl.getAll)

    /**
     * Matiere
     */
    app.post('/matiere/save', matiereCtrl.add)
    app.post('/matiere/edit', matiereCtrl.edit),
    app.get('/matiere/get/:id', matiereCtrl.getById),
    app.get('/matiere/all', matiereCtrl.getAll)

    /***
     * Etudiant
     */

    app.post('/etudiant/save', etudiantCtrl.add)
    app.post('/etudiant/edit', etudiantCtrl.edit),
    app.get('/etudiant/get/:matricule', etudiantCtrl.getById),
    app.get('/etudiant/all', etudiantCtrl.getAll)


     /***
     * Inscription
     */
     app.post('/inscription/save', inscriptionCtrl.add)
     app.post('/inscription/save-multiple', inscriptionCtrl.addMany)
     app.post('/inscription/edit', inscriptionCtrl.edit),
     app.get('/inscription/get/:id', inscriptionCtrl.getById),
     app.get('/inscription/all', inscriptionCtrl.getAll)


     /***
     * Note
     */
     app.post('/note/save', noteCtrl.add)
     app.post('/note/save-multiple', noteCtrl.addMany)
     app.post('/note/edit', noteCtrl.edit),
     app.get('/note/get/:id', noteCtrl.getById),
     app.get('/note/all', noteCtrl.getAll)
     app.get('/note/annee', noteCtrl.getAnneIns)
     app.get('/note/semestre', noteCtrl.getSemestreIns)
     app.get('/note/etudiant/:semestre', noteCtrl.getEtudiantIns)
     app.get('/note/ue/semestre/:semestre', noteCtrl.getUEBySemestre)
     app.get('/note/matiere/ue/:unite', noteCtrl.getMatiereByUE)
}





