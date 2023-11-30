const semestreCtrl=require('./controllers/semestreCtrl')
const uniteCtrl=require('./controllers/uniteCtrl')
const matiereCtrl=require('./controllers/matiereCtrl')
const etudiantCtrl= require('./controllers/etudiantCtrl')
const inscriptionCtrl=require('./controllers/inscriptionCtrl')

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
     app.get('/inscription/get/:matricule', inscriptionCtrl.getById),
     app.get('/inscription/all', inscriptionCtrl.getAll)
}





