const {Inscription, sequelize, QueryTypes, transact}=require('../models')


module.exports={
    
    async add(req, res){
        try {
            const inscription=await Inscription.create(req.body)
            res.send({success: 'Inscription succefly added'})
        } catch (error) {
            console.log("Add Inscription "+error);
            res.status(404).send({error: 'Inscription existe déja '+error})
        }
    },
    async addMany(req, res){
        try {
            const result=await sequelize.transaction(async(transact)=>{
                const inscription=await Inscription.bulkCreate(req.body,{transaction: transact}) 
                res.send({success: 'Inscription succefly added'})
            })
                       
            //await transact.commit()
        } catch (error) {
            //await transact.rollback()
            console.log("Add Inscription "+error);
            res.status(404).send({error: 'Inscription existe déja '+error})
        }
    },
    async edit(req, res){
        try {
            let inscription=await Inscription.findByPk(req.body.matricule)
            await inscription.update(req.body)
            res.send({success: 'Inscription successfuly edited'})
        } catch (error) {
            console.log('error edit Inscription '+error);
            res.status(404).send({error: 'Error edit Inscription    '+error})
        }
    },
    async getById(req, res){
        try {
            const inscription=Inscription.findByPk(req.params.matricule)
            res.send({inscription: inscription})
        } catch (error) {
            console.log('Inscription getById '+error);
            res.status(404).send({error: 'Error getById '+error})
        }
    },

    async getAll(req, res){
        try {
            const inscriptions=await sequelize.query("select * from v_inscription",{
                replacements: {},
                type: QueryTypes.SELECT
            })
            res.send({inscriptions: inscriptions})
        } catch (error) {
            console.log('Error getAll inscriptions '+error);
            res.status(404).send({error: 'Error getAll '+error})
        }
    }

}