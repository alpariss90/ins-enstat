const {Note, sequelize, QueryTypes, transact}=require('../models')


module.exports={
    
    async add(req, res){
        try {
            const note=await Note.create(req.body)
            res.send({success: 'note succefly added'})
        } catch (error) {
            console.log("Add note "+error);
            res.status(404).send({error: 'note existe déja '+error})
        }
    },
    async addMany(req, res){
        try {
            const result=await sequelize.transaction(async(transact)=>{
                const note=await Note.bulkCreate(req.body,{transaction: transact})
                //await transact.commit() 
                res.send({success: 'note succefly added'})
            })
            
        } catch (error) { 
            //await transact.rollback()
            console.log("Add note "+error);
            res.status(404).send({error: 'note existe déja '+error})
        }
    },
    async edit(req, res){
        try {
            let note=await Note.findByPk(req.body.matricule)
            await note.update(req.body)
            res.send({success: 'note successfuly edited'})
        } catch (error) {
            console.log('error edit note '+error);
            res.status(404).send({error: 'Error edit note    '+error})
        }
    },
    async getById(req, res){
        try {
            const note=await Note.findByPk(req.params.id)
            res.send({note: note})
        } catch (error) {
            console.log('note getById note'+error);
            res.status(404).send({error: 'Error getById '+error})
        }
    },
    async getAll(req, res){
        try {
            const notes=await Note.findAll()
            //console.log('les notes');
            //console.log((await notes).length);
            res.send({notes: notes})
        } catch (error) {
            console.log('error getAll note'+error);
            res.status(404).send({error: 'Error getAll '+error})
        }
    },

    async getAnneIns(req, res){
        try {
            const annees_ins=await sequelize.query("select * from annee where id in (select annee from inscription)",{
                replacements: {},
                type: QueryTypes.SELECT
            })
            res.send({annees_ins: annees_ins})
        } catch (error) {
            console.log('Error getAnneIns Notes '+error);
            res.status(404).send({error: 'Error getAnneIns '+error})
        }
    },

    async getSemestreIns(req, res){

        req.session.user='alpariss'
        try {
            const semestres_ins=await sequelize.query("select * from semestre where id in (select semestre from inscription)",{
                replacements: {},
                type: QueryTypes.SELECT
            })
            res.send({semestres_ins: semestres_ins})
        } catch (error) {
            console.log('Error getSemestreIns Notes '+error);
            res.status(404).send({error: 'Error getSemestreIns '+error})
        }
    },

    async getEtudiantIns(req, res){
        try {
            const etudiants_ins=await sequelize.query("select * from etudiant where matricule in (select etudiant from inscription where semestre=:semestre)",{
                replacements: {semestre: req.params.semestre},
                type: QueryTypes.SELECT
            })
            res.send({etudiants_ins: etudiants_ins})
        } catch (error) {
            console.log('Error getEtudiantIns Notes '+error);
            res.status(404).send({error: 'Error getEtudiantIns '+error})
        }
    },
    async getUEBySemestre(req, res){
        try {
            const unites_semestre=await sequelize.query("select * from unite where semestre=:semestre",{
                replacements: {semestre: req.params.semestre},
                type: QueryTypes.SELECT
            })
            res.send({unites_semestre: unites_semestre})
        } catch (error) {
            console.log('Error getUEBySemestre Notes '+error);
            res.status(404).send({error: 'Error getUEBySemestre '+error})
        }
    },
    async getMatiereByUE(req, res){
        try {
            const matieres_unite=await sequelize.query("select * from matiere where unite=:unite",{
                replacements: {unite: req.params.unite},
                type: QueryTypes.SELECT
            })
            res.send({matieres_unite: matieres_unite})
        } catch (error) {
            console.log('Error getMatiereByUE Notes '+error);
            res.status(404).send({error: 'Error getMatiereByUE '+error})
        }
    },

    async getNoteByAnneeSemestreUniteMatiere(req, res){
        console.log(req.body);
        try {
            const liste_note=await sequelize.query("select * from note where annee=:annee and semestre=:semestre and unite=:unite and matiere=:matiere",{
                replacements: {annee: req.params.annee, semestre: req.params.semestre, unite: req.params.unite, matiere: req.params.matiere},
                type: QueryTypes.SELECT
            })
            res.send({liste_note: liste_note})
        } catch (error) {
            console.log('Error getNoteByAnneeSemestreUniteMatiere Notes ', error);
            res.status(404).send({error: 'Error getNoteByAnneeSemestreUniteMatiere '+error})
        }
    }

}