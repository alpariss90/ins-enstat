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
    }
}