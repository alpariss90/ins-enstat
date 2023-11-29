<template>
    <layout-template pageTitre="GESTION DES UNITES">

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
                                <label  class="form-label">TITRE :</label>
                                <input type="text" autocomplete="off" v-model="unite.titre"
                                    class="form-control form-control-sm"  placeholder="Enter titre unite">
                            </div>

                            <div class="mb-3 mt-3">
                                <label  class="form-label">LIBELLE :</label>
                                <input type="text" autocomplete="off" v-model="unite.libelle"
                                    class="form-control form-control-sm" placeholder="Enter libelle unite">
                            </div>

                            <div class="mb-3 mt-3">
                                <label  class="form-label">SEMESTRE :</label>
                                <select class="form-control form-control-sm" v-model="unite.semestre">
                                    <option  v-for="s in semestres" :key="s.id" :value="s.id">{{ s.libelle }}</option>
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
                            LIST unite
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
                                    <th>TITRE</th>
                                    <th>LIBELLE</th>
                                    <th>SEMESTRE</th>
                                    <th style="text-align: right;">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="s in com_getList" :key="s.id">
                                    <th>{{ s.id }}</th>
                                    <th>{{ s.titre }}</th>
                                    <th>{{ s.libelle }}</th>
                                    <th>{{ s.libelle_semestre }}</th>
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
    name: 'unitePage',
    components: { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSearchbar },
    setup() {
        const state = reactive({
            error: '',
            success: '',
            unite: {
                id: 0,
                libelle: '',
                titre: '',
                semestre: '',
                user: 'admin' //A implementer apres la partie auth
            },
            unites: [],
            filter: '',
            titreForm: 'Formulaire ajout unite',
            etat: 'create',
            semestres: []

        })

        const add = async () => {
            if (state.unite.libelle == '' || state.unite.libelle == undefined || state.unite.titre == '' || state.unite.titre == undefined || state.unite.semestre == '' || state.unite.semestre == undefined)
                state.error = 'Veuillez remplir tout les champs'
            else {
                try {
                    const response = await service.addUnite({libelle: state.unite.libelle, titre: state.unite.titre, semestre: state.unite.semestre, user: state.unite.user})
                    changeEtat('create', null)
                    state.success = response.data.success;
                    getAll()
                } catch (error) {
                    state.error = error.response.data.error;
                }
            }
        }

        const edit = async () => {
            if (state.unite.libelle == '' || state.unite.libelle == undefined || state.unite.titre == '' || state.unite.titre == undefined || state.unite.semestre == '' || state.unite.semestre == undefined)
                state.error = 'Veuillez remplir tout les champs'
            else {
                try {
                    const response = await service.editUnite(state.unite)
                    changeEtat('create', null)
                    state.success = response.data.success;
                    getAll()
                } catch (error) {
                    state.error = error.response.data.error;
                }
            }
        }

        const changeEtat=(etat, unite)=>{
            if(etat=='create'){
                state.unite.libelle=''
                state.unite.titre=''
                state.unite.semestre=''
                state.unite.id=0
                state.etat='create'
                state.titreForm='Formulaire ajout unite'
            }else{
                state.unite.libelle=unite.libelle
                state.unite.titre=unite.titre
                state.unite.semestre=unite.semestre
                state.unite.id=unite.id
                state.etat='edit'
                state.titreForm='Formulaire modification unite'
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
                const response = await service.getAllUnite()
                state.unites = response.data.unites;
            } catch (error) {
                console.log("Erreur get list unite " + error);
            }
        }

        const getAllSemestre = async () => {
            try {
                const response = await service.getAllSemestre()
                state.semestres = response.data.semestres;
            } catch (error) {
                console.log("Erreur get list semestres " + error);
            }
        }

        const com_getList = computed(() => {
            if (state.filter == '')
                return state.unites
            else {
                return state.unites.filter(e => {
                    return e.libelle.toLowerCase().includes(state.filter.toLowerCase()) || e.titre.toLowerCase().includes(state.filter.toLowerCase()) ||  e.libelle_semestre.toLowerCase().includes(state.filter.toLowerCase()) || e.id == state.filter
                })
            }
        })

        onMounted(() => {
            getAll(),
            getAllSemestre()
        })

        return { ...toRefs(state), getAll, com_getList, add, editForm, edit }

    }
})

</script>

<style></style>