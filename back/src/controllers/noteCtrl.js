const {Note, sequelize, QueryTypes, transact}=require('../models')


async function getMatiereByUnite(u){
    const matieres=await sequelize.query("select * from matiere where unite=:unite",{
        replacements: {unite: u},
        type: QueryTypes.SELECT
    })
    return matieres;
}

async function getEtudiantInscrit(u){
    const matieres=await sequelize.query("select etudiant from inscription where semestre in (select semestre from unite where id=:unite)",{
        replacements: {unite: u},
        type: QueryTypes.SELECT
    })
    return matieres;
}

async function getNoteUnite(u){
    const matieres=await sequelize.query("select matricule, unite, matiere, credit_matiere, moyenne_matiere from note where unite=:unite",{
        replacements: {unite: u},
        type: QueryTypes.SELECT
    })
    return matieres;
}
/*
async function getNoteByMatiere(u){
    const matieres=await sequelize.query("select * from matiere where unite=:unite",{
        replacements: {unite: u},
        type: QueryTypes.SELECT
    })
    return matieres;
}*/

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
    },
    async credits(req, res){
        try {
            const credits=await sequelize.query("select id, libelle, credit as credit_matiere, r2.unite, somme_unite from (select id, libelle, unite, credit from matiere where id=:matiere order by id) r1 left join(select  unite, sum(credit) as somme_unite from matiere group by unite order by unite) r2 on r1.unite=r2.unite",{
                replacements: {matiere: req.params.matiere},
                type: QueryTypes.SELECT
            })
            res.send({credits: credits})
        } catch (error) {
            console.log('Error credits Notes ', error);
            res.status(404).send({error: 'Error credits '+error})
        }
    },

    async calculCredit(req, res){
        try {
            const resultat=await sequelize.query("update note set credit_matiere=:credit_matiere, credit_unite=:credit_unite where matiere=:matiere",{
                replacements: {matiere: req.params.matiere, credit_matiere: req.params.creditMatiere, credit_unite: req.params.creditUnite},
                type: QueryTypes.UPDATE
            })
            res.send({resultat: resultat, success: "Operation effectue"})
        } catch (error) {
            console.log('Error calculCredit Notes ', error);
            res.status(404).send({error: 'Error calculCredit '+error})
        }
    },

    async upadteMoyenneUE(req, res){
        try {
            /*const resultat=await sequelize.query("update note set moyenne_unite=:valeur where unite=:unite",{
                replacements: {valeur: req.params.valeur, unite: req.params.unite},
                type: QueryTypes.UPDATE
            })
            res.send({resultat: resultat, success: "Operation effectue"})*/
           const matieres=await getMatiereByUnite(req.params.unite)
          // const nbre=matieres.length;
           const etudiants= await getEtudiantInscrit(req.params.unite)
           const notes=await getNoteUnite(req.params.unite)
           let sommeCredit=0;
           for(m in matieres){
                sommeCredit+=matieres[m].credit
           }

           let moyenneUnite=[]

          for(let i=0; i< etudiants.length; i++){
              let pdt=0;
              let creditObtenu=0;
              
              for(let j=0; j<notes.length; j++){
                if(notes[j].matricule==etudiants[i].etudiant){
                    pdt+=notes[j].credit_matiere * notes[j].moyenne_matiere;
                    if(notes[j].moyenne_matiere >= 10){
                        creditObtenu+=notes[j].credit_matiere
                    }
                }
                
              }

              moyenneUnite.push({valide: "VALIDE", obtenu: creditObtenu, etudiant: etudiants[i].etudiant, moyenneUnite: (Number(pdt/sommeCredit).toFixed(2))})
              
              for(mm in moyenneUnite){
                if (moyenneUnite[mm].moyenneUnite < 10){
                    moyenneUnite[mm].valide="NON VALIDE"
                }
              }
           }
            //console.log(moyenneUnite);

            for (m in moyenneUnite){
                const resultat=await sequelize.query("update note set moyenne_unite=:valeur, credit_obtenu=:obtenu, validation_unite=:valide where unite=:unite and matricule=:etudiant",{
                    replacements: {valide: moyenneUnite[m].valide, valeur: moyenneUnite[m].moyenneUnite, unite: req.params.unite, etudiant:moyenneUnite[m].etudiant, obtenu:  moyenneUnite[m].obtenu},
                    type: QueryTypes.UPDATE
                })
            }

            res.send({message: "ok"})
        } catch (error) { 
            console.log('Error updateMoyenneUE Notes ', error);
            res.status(404).send({error: 'Error updateMoyenneUE '+error})
        }
    }

}