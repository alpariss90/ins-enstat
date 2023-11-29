const {Unite, sequelize, QueryTypes}=require('../models')


module.exports={
    async add(req, res){
        try {
            const unite=await Unite.create(req.body)
            res.send({success: 'Unite succefly added'})
        } catch (error) {
            console.log("Add Unite "+error);
            res.status(404).send({error: 'Unite existe déja '+error})
        }
    },
    async edit(req, res){
        try {
            let unite=await Unite.findByPk(req.body.id)
            await unite.update(req.body)
            res.send({success: 'Unite successfuly edited'})
        } catch (error) {
            console.log('error edit Unite '+error);
            res.status(404).send({error: 'Error edit Unite    '+error})
        }
    },
    async getById(req, res){
        try {
            const unite=Unite.findByPk(req.params.id)
            res.send({unite: unite})
        } catch (error) {
            console.log('Unite getById '+error);
            res.status(404).send({error: 'Error getById '+error})
        }
    },

    async getAll(req, res){
        try {
            const unites=await sequelize.query("select * from v_unite",{
                replacements: {},
                type: QueryTypes.SELECT
            })
            res.send({unites: unites})
        } catch (error) {
            console.log('Error getAll Unite '+error);
            res.status(404).send({error: 'Error getAll '+error})
        }
    }

}