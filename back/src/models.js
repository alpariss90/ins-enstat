const {sequelize, DataTypes, QueryTypes, transact}=require('./provider')


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

const Inscription=sequelize.define('inscription',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    etudiant:{
        type: DataTypes.STRING,
        references:{
            model: Etudiant,
            key: 'matricule'
        },
        unique: 'uniqueUserItemType'
    },
    semestre:{
        type: DataTypes.INTEGER,
        references:{
            model: Semestre,
            key: 'id'
        },
        unique: 'uniqueUserItemType'
    },
    annee:{
        type: DataTypes.INTEGER,
        references:{
            model: Annee,
            key: 'id'
        },
        unique: 'uniqueUserItemType'
    },
    user:{
        type: DataTypes.STRING,
        references:{
            model: Users,
            key: 'login'
        }
    }
},{
    freezeTableName: true
})


const Note=sequelize.define('note',{
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    matricule:{
        type: DataTypes.STRING,
        references:{
            model: Etudiant,
            key: 'matricule'
        },
        unique: 'uniqueAnnee'
    }, 
    nom:{
        type: DataTypes.STRING
    },
    prenom:{
        type: DataTypes.STRING
    },
    annee:{
        type: DataTypes.INTEGER,
        references:{
            model: Annee,
            key: 'id'
        },
        unique: 'uniqueAnnee'
    },
    libelle_annee:{
        type: DataTypes.STRING
    },
    semestre: {
        type: DataTypes.INTEGER,
        references:{
            model: Semestre,
            key: 'id'
        },
        unique: 'uniqueAnnee'
    },
    libelle_semestre: {
        type: DataTypes.STRING
    },
    unite: {
        type: DataTypes.INTEGER,
        references:{
            model: Unite,
            key: 'id'
        },
        unique: 'uniqueAnnee'
    },
    libelle_unite: {
        type: DataTypes.STRING
    },
    matiere: {
        type: DataTypes.INTEGER,
        references:{
            model: Matiere,
            key: 'id'
        },
        unique: 'uniqueAnnee'
    },
    libelle_matiere: {
        type: DataTypes.STRING
    },
    users: {
        type: DataTypes.STRING,
        references:{
            model: Users,
            key: 'login'
        }
    },
    note:{
        type: DataTypes.INTEGER,
    }
},{
    freezeTableName: true
})


Users.hasMany(Etudiant, {foreignKey: 'user'})
Users.hasMany(Semestre, {foreignKey: 'user'})
Users.hasMany(Unite, {foreignKey: 'user'})
Semestre.hasMany(Unite, {foreignKey: 'semestre'})
Unite.hasMany(Matiere, {foreignKey: 'unite'})




module.exports={
    Users, Semestre, Unite, Etudiant, Annee, sequelize, QueryTypes, Matiere, Inscription, transact, Note
}