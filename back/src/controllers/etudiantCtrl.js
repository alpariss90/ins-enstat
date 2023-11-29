const {Etudiant, sequelize, QueryTypes}=require('../models')


module.exports={
    
    async add(req, res){
        try {
            const etudiant=await Etudiant.create(req.body)
            res.send({success: 'Etudiant succefly added'})
        } catch (error) {
            console.log("Add etudiant "+error);
            res.status(404).send({error: 'etudiant existe déja '+error})
        }
    },
    async edit(req, res){
        try {
            let etudiant=await Etudiant.findByPk(req.body.matricule)
            await etudiant.update(req.body)
            res.send({success: 'etudiant successfuly edited'})
        } catch (error) {
            console.log('error edit etudiant '+error);
            res.status(404).send({error: 'Error edit etudiant    '+error})
        }
    },
    async getById(req, res){
        try {
            const etudiant=Etudiant.findByPk(req.params.matricule)
            res.send({etudiant: etudiant})
        } catch (error) {
            console.log('etudiant getById '+error);
            res.status(404).send({error: 'Error getById '+error})
        }
    },

    async getAll(req, res){
        try {
            const etudiants=await Etudiant.findAll()
            res.send({etudiants: etudiants})
        } catch (error) {
            console.log('Error getAll etudiant '+error);
            res.status(404).send({error: 'Error getAll '+error})
        }
    }

}