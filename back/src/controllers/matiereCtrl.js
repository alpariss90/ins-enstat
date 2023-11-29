const {Matiere, sequelize, QueryTypes}=require('../models')


module.exports={
    async add(req, res){
        try {
            const matiere=await Matiere.create(req.body)
            res.send({success: 'Matiere succefly added'})
        } catch (error) {
            console.log("Add Matiere "+error);
            res.status(404).send({error: 'Matiere existe déja '+error})
        }
    },
    async edit(req, res){
        try {
            let matiere=await Matiere.findByPk(req.body.id)
            await matiere.update(req.body)
            res.send({success: 'Matiere successfuly edited'})
        } catch (error) {
            console.log('error edit Matiere '+error);
            res.status(404).send({error: 'Error edit Matiere    '+error})
        }
    },
    async getById(req, res){
        try {
            const matiere=Matiere.findByPk(req.params.id)
            res.send({matiere: matiere})
        } catch (error) {
            console.log('Matiere getById '+error);
            res.status(404).send({error: 'Error getById '+error})
        }
    },

    async getAll(req, res){
        try {
            const matieres=await sequelize.query("select * from v_matiere",{
                replacements: {},
                type: QueryTypes.SELECT
            })
            res.send({matieres: matieres})
        } catch (error) {
            console.log('Error getAll Matiere '+error);
            res.status(404).send({error: 'Error getAll '+error})
        }
    }

}