<template>
    <layout-template pageTitre="GESTION DES MATIERES">

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
                                <label  class="form-label">LIBELLE :</label>
                                <input type="text" autocomplete="off" v-model="matiere.libelle"
                                    class="form-control form-control-sm" placeholder="Enter libelle matiere">
                            </div>

                            <div class="mb-3 mt-3">
                                <label  class="form-label">CREDIT :</label>
                                <input type="number" autocomplete="off" v-model="matiere.credit"
                                    class="form-control form-control-sm"  placeholder="Enter credit matiere">
                            </div>

                            <div class="mb-3 mt-3">
                                <label  class="form-label">VOLUME :</label>
                                <input type="number" autocomplete="off" v-model="matiere.volume"
                                    class="form-control form-control-sm"  placeholder="Enter volume matiere">
                            </div>

                            <div class="mb-3 mt-3">
                                <label  class="form-label">UE :</label>
                                <select class="form-control form-control-sm" v-model="matiere.unite">
                                    <option  v-for="s in unites" :key="s.id" :value="s.id">{{ s.libelle_semestre }}--{{ s.titre }}--{{ s.libelle }}</option>
                                </select>
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
                            LIST matiere
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content >
                        <div class="offset-lg-8 offset-md-8 col-lg-4 col-md-4"><ion-searchbar placeholder="id / libelle / titre / semestre"  v-model="filter" />
                        </div> <br />
                        <div style="overflow-y: scroll; max-height: 300px;">
                        <table class="table table-hover table-bordered"  >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>LIBELLE</th>
                                    <th>CREDIT</th>
                                    <th>VOLUME</th>
                                    <th>UE</th>
                                    <th style="text-align: right;">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="s in com_getList" :key="s.id">
                                    <th>{{ s.id }}</th>
                                    <th>{{ s.libelle }}</th>
                                    <th>{{ s.credit }}</th>
                                    <th>{{ s.volume }}</th>
                                    <th>{{ s.libelle_semestre }}-{{ s.titre_unite }}-{{ s.libelle_unite }}</th>
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
    name: 'matierePage',
    components: { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSearchbar },
    setup() {
        const state = reactive({
            error: '',
            success: '',
            matiere: {
                id: 0,
                libelle: '',
                credit: '',
                volume: '',
                unite: '',
                user: 'admin' //A implementer apres la partie auth
            },
            matieres: [],
            filter: '',
            titreForm: 'Formulaire ajout matiere',
            etat: 'create',
            unites: []

        })

        const add = async () => {
            if (state.matiere.libelle == '' || state.matiere.libelle == undefined || state.matiere.credit == '' || state.matiere.credit == undefined || state.matiere.volume == '' || state.matiere.volume == undefined || state.matiere.unite == '' || state.matiere.unite == undefined)
                state.error = 'Veuillez remplir tout les champs'
            else {
                try {
                    const response = await service.addMatiere({libelle: state.matiere.libelle, credit: state.matiere.credit, volume: state.matiere.volume, unite: state.matiere.unite, user: state.matiere.user})
                    changeEtat('create', null)
                    state.success = response.data.success;
                    getAll()
                } catch (error) {
                    state.error = error.response.data.error;
                }
            }
        }

        const edit = async () => {
            if (state.matiere.libelle == '' || state.matiere.libelle == undefined || state.matiere.credit == '' || state.matiere.credit == undefined || state.matiere.volume == '' || state.matiere.volume == undefined || state.matiere.unite == '' || state.matiere.unite == undefined)
                state.error = 'Veuillez remplir tout les champs'
            else {
                try {
                    const response = await service.editMatiere(state.matiere)
                    changeEtat('create', null)
                    state.success = response.data.success;
                    getAll()
                } catch (error) {
                    state.error = error.response.data.error;
                }
            }
        }

        const changeEtat=(etat, matiere)=>{
            console.log(matiere);
            if(etat=='create'){
                state.matiere.libelle=''
                state.matiere.credit=''
                state.matiere.volume=''
                state.matiere.unite=''
                state.matiere.id=0
                state.etat='create'
                state.titreForm='Formulaire ajout matiere'
            }else{
                state.matiere.libelle=matiere.libelle
                state.matiere.credit=matiere.credit
                state.matiere.volume=matiere.volume
                state.matiere.unite=matiere.id_unite
                state.matiere.id=matiere.id
                state.etat='edit'
                state.titreForm='Formulaire modification matiere'
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
                const response = await service.getAllMatiere()
                state.matieres = response.data.matieres;
            } catch (error) {
                console.log("Erreur get list matiere " + error);
            }
        }

        const getAllUnite = async () => {
            try {
                const response = await service.getAllUnite()
                state.unites = response.data.unites;
            } catch (error) {
                console.log("Erreur get list unites " + error);
            }
        }

        const com_getList = computed(() => {
            if (state.filter == '')
                return state.matieres
            else {
                return state.matieres.filter(e => {
                    return e.libelle.toLowerCase().includes(state.filter.toLowerCase()) ||  e.id == state.filter
                })
            }
        })

        onMounted(() => {
            getAll(),
            getAllUnite()
            
        })

        return { ...toRefs(state), getAll, com_getList, add, editForm, edit }

    }
})

</script>

<style></style>