const {Semestre, Annee, sequelize, QueryTypes}=require('../models')


module.exports={
    accueil(req, res){
        res.send({message: 'Hello Myy API works'})
    },
    async add(req, res){
        try {
            const semestre=await Semestre.create(req.body)
            res.send({success: 'Semestre succefly added'})
        } catch (error) {
            console.log("Add semestre "+error);
            res.status(404).send({error: 'Semestre existe déja '+error})
        }
    },
    async edit(req, res){
        try {
            let semestre=await Semestre.findByPk(req.body.id)
            await semestre.update(req.body)
            res.send({success: 'Semestre successfuly edited'})
        } catch (error) {
            console.log('error edit semestre '+error);
            res.status(404).send({error: 'Error edit semestre    '+error})
        }
    },
    async getById(req, res){
        try {
            const semestre=Semestre.findByPk(req.params.id)
            res.send({semestre: semestre})
        } catch (error) {
            console.log('semestre getById '+error);
            res.status(404).send({error: 'Error getById '+error})
        }
    },
    async getAll(req, res){
        try {
            const semestres=await Semestre.findAll()
            res.send({semestres: semestres})
        } catch (error) {
            console.log('Error getAll semestre '+error);
            res.status(404).send({error: 'Error getAll '+error})
        }
    },
    async getAllAnnee(req, res){
        try {
            const annees=await Annee.findAll()
            res.send({annees: annees})
        } catch (error) {
            console.log('Error getAll annees '+error);
            res.status(404).send({error: 'Error getAll '+error})
        }
    }

}