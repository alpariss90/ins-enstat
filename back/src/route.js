const semestreCtrl=require('./semestreCtrl')

module.exports=(app)=>{
    app.get('/', semestreCtrl.accueil),
    app.post('/semestre/save', semestreCtrl.add)
    app.post('/semestre/edit', semestreCtrl.edit),
    app.get('semestre/get/:id', semestreCtrl.getById),
    app.get('/semestre/all', semestreCtrl.getAll)
}





