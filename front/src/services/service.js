import API from './API'


export default{
    test(){
        return API().get('')
    },
    getAllSemestre(){
        return API().get('semestre/all')
    },
    getSemestreById(id){
        return API().get('semestre/get/'+id)
    },
    addSemestre(semestre){
        return API().post('semestre/save', semestre)
    },
    editSemestre(semestre){
        return API().post('semestre/edit', semestre)
    },


    //UNITE


    getAllUnite(){
        return API().get('unite/all')
    },
    getUniteById(id){
        return API().get('unite/get/'+id)
    },
    addUnite(unite){
        return API().post('unite/save', unite)
    },
    editUnite(unite){
        return API().post('unite/edit', unite)
    },

    //MATIERE

    getAllMatiere(){
        return API().get('matiere/all')
    },
    getMatiereById(id){
        return API().get('matiere/get/'+id)
    },
    addMatiere(matiere){
        return API().post('matiere/save', matiere)
    },
    editMatiere(matiere){
        return API().post('matiere/edit', matiere)
    },

    //ETUDIANT

    getAllEtudiant(){
        return API().get('etudiant/all')
    },
    getEtudiantById(matricule){
        return API().get('etudiant/get/'+matricule)
    },
    addEtudiant(etudiant){
        return API().post('etudiant/save', etudiant)
    },
    editEtudiant(etudiant){
        return API().post('etudiant/edit', etudiant)
    }


}