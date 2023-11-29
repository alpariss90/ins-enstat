<template>
    <layout-template pageTitre="GESTION DES ETUDIANTS">

        <div class="alert alert-danger" v-if="error != ''">
            <strong>Error!</strong> {{ error }}
            <hr>
        </div>
        <div class="alert alert-success" v-if="success != ''">
            <strong>success!</strong> {{ success }}
            <hr>
        </div>
        


        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <ion-card>
                    <ion-card-header style="background-color: #E2E8E5;">
                        <ion-card-title>
                           {{titreForm}}
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>

                        <form action="">
                            <div class="mb-3 mt-3">
                                <label for="email" class="form-label">MATRICULE :</label>
                                <input type="text" autocomplete="off" v-model="etudiant.matricule"
                                    class="form-control form-control-sm" :disabled="isMatDis" id="email" placeholder="Enter matricule etudiant">
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="email" class="form-label">NOM :</label>
                                <input type="text" autocomplete="off" v-model="etudiant.nom"
                                    class="form-control form-control-sm" id="email" placeholder="Enter nom etudiant">
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="email" class="form-label">PRENOM :</label>
                                <input type="text" autocomplete="off" v-model="etudiant.prenom"
                                    class="form-control form-control-sm" id="email" placeholder="Enter prenom etudiant">
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="email" class="form-label">AGE :</label>
                                <input type="number" autocomplete="off" v-model="etudiant.age"
                                    class="form-control form-control-sm" id="email" placeholder="Enter age etudiant">
                            </div>

                            <button type="reset" class="btn btn-danger btn-sm" v-if="etat=='create'">RESET</button>
                            <button type="button" class="btn btn-primary btn-sm" style="float: right;"
                                @click="add" v-if="etat=='create'">ADD</button>
                                <button type="button" class="btn btn-primary btn-sm" style="float: right;"
                                @click="edit" v-if="etat=='edit'">EDIT</button>
                        </form>

                    </ion-card-content>
                </ion-card>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <ion-card>
                    <ion-card-header style="background-color: #E2E8E5;">
                        <ion-card-title>
                            LIST ETUDIANT
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content >
                        <div class="offset-lg-8 offset-md-8 col-lg-4 col-md-4"><ion-searchbar placeholder="matricule or nom or prenom"  v-model="filter" />
                        </div> <br />
                        <div style="overflow-y: scroll; max-height: 300px;">
                        <table class="table table-hover table-bordered"  >
                            <thead>
                                <tr>
                                    <th>MATRICULE</th>
                                    <th>NOM</th>
                                    <th>PRENOM</th>
                                    <th>AGE</th>
                                    <th style="text-align: right;">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="s in com_getList" :key="s.id">
                                    <th>{{ s.matricule }}</th>
                                    <th>{{ s.nom }}</th>
                                    <th>{{ s.prenom }}</th>
                                    <th>{{ s.age }}</th>
                                    <th style="text-align: right;"><button class="btn btn-success btn-sm" @click="editForm(s)">edit</button></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </ion-card-content>
                </ion-card>
            </div>
        </div>
    </layout-template>
</template>

<script>
import { defineComponent, reactive, toRefs, watch, onMounted, computed } from 'vue';
import service from '../services/service';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar } from '@ionic/vue'

export default defineComponent({
    name: 'etudiantPage',
    components: { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSearchbar },
    setup() {
        const state = reactive({
            error: '',
            success: '',
            etudiant: {
                matricule: '',
                nom: '',
                prenom: '',
                age: '',
                user: 'admin' //A implementer apres la partie auth
            },
            etudiants: [],
            filter: '',
            titreForm: 'Formulaire ajout etudiant',
            etat: 'create',
            isMatDis: false

        })

        const add = async () => {
            if (state.etudiant.matricule == '' || state.etudiant.matricule == undefined || state.etudiant.nom == '' || state.etudiant.nom == undefined || state.etudiant.prenom == '' || state.etudiant.prenom == undefined || state.etudiant.age == '' || state.etudiant.age == undefined)
                state.error = 'Veuillez remplir le champs libelle'
            else {
                try {
                    const response = await service.addEtudiant(state.etudiant)
                    changeEtat('create', null)
                    state.success = response.data.success;
                    getAll()
                } catch (error) {
                    state.error = error.response.data.error;
                }
            }
        }

        const edit = async () => {
            if (state.etudiant.matricule == '' || state.etudiant.matricule == undefined || state.etudiant.nom == '' || state.etudiant.nom == undefined || state.etudiant.prenom == '' || state.etudiant.prenom == undefined || state.etudiant.age == '' || state.etudiant.age == undefined)
                state.error = 'Veuillez remplir le champs libelle'
            else {
                try {
                    const response = await service.editEtudiant(state.etudiant)
                    changeEtat('create', null)
                    state.success = response.data.success;
                    getAll()
                } catch (error) {
                    state.error = error.response.data.error;
                }
            }
        }

        const changeEtat=(etat, etudiant)=>{
            if(etat=='create'){
                state.etudiant.matricule=''
                state.etudiant.nom=''
                state.etudiant.prenom=''
                state.etudiant.age=''
                state.etat='create'
                state.isMatDis=false
                state.titreForm='Formulaire ajout etudiant'
            }else{
                state.etudiant.matricule=etudiant.matricule
                state.etudiant.nom=etudiant.nom
                state.etudiant.prenom=etudiant.prenom
                state.etudiant.age=etudiant.age
                state.etat='edit'
                state.isMatDis=true
                state.titreForm='Formulaire modification etudiant'
            }
        }

        const editForm=(s)=>{
            changeEtat('edit', s)
        }

        watch(() => state.error, () => {
            if (state.error != '') {
                setTimeout(function () { state.error = '' }, 3000);
            }
        })

        watch(() => state.success, () => {
            if (state.success != '') {
                setTimeout(function () { state.success = '' }, 3000);
            }
        })


        const getAll = async () => {
            try {
                const response = await service.getAllEtudiant();
                state.etudiants = response.data.etudiants;
            } catch (error) {
                console.log("Erreur get list etudiant " + error);
            }
        }

        const com_getList = computed(() => {
            if (state.filter == '')
                return state.etudiants
            else {
                return state.etudiants.filter(e => {
                    return e.matricule.toLowerCase().includes(state.filter.toLowerCase()) || e.nom.toLowerCase().includes(state.filter.toLowerCase()) || e.prenom.toLowerCase().includes(state.filter.toLowerCase())
                })
            }

        })

        onMounted(() => {
            getAll()
        })






        return { ...toRefs(state), getAll, com_getList, add, editForm, edit }


    }
})

</script>

<style></style>