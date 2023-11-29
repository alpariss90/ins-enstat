const {sequelize, DataTypes, QueryTypes}=require('./provider')


const Etudiant=sequelize.define('etudiant', {
    matricule:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    nom:{
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom:{
        type:DataTypes.STRING,
        allowNull: false
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    freezeTableName: true
})

const Annee=sequelize.define('annee',{
    id: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    libelle:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName: true
})

const Semestre=sequelize.define('semestre',{
    id: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    libelle:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName: true
})


const Unite=sequelize.define('unite', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    libelle:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName:true
})


const Matiere=sequelize.define('matiere', {
   id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
   },
   libelle: {
    type: DataTypes.STRING,
    allowNull: false
   },
   credit:{
    type: DataTypes.INTEGER,
    allowNull: false
   },
   volume:{
    type: DataTypes.INTEGER,
    allowNull: false
   }
}, {
    freezeTableName: true
})


const Users=sequelize.define('users', {
    login:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    nom_prenom:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
})





Users.hasMany(Etudiant, {foreignKey: 'user'})
Users.hasMany(Semestre, {foreignKey: 'user'})
Users.hasMany(Unite, {foreignKey: 'user'})
Semestre.hasMany(Unite, {foreignKey: 'semestre'})
Unite.hasMany(Matiere, {foreignKey: 'unite'})



module.exports={
    Users, Semestre, Unite, Etudiant, Annee, sequelize, QueryTypes, Matiere
}