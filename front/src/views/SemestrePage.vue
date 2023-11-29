<template>
    <layout-template pageTitre="GESTION DES SEMESTRES">

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
                                <label for="email" class="form-label">LIBELLE :</label>
                                <input type="text" autocomplete="off" v-model="semestre.libelle"
                                    class="form-control form-control-sm" id="email" placeholder="Enter libelle semestre">
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
                            LIST SEMESTRE
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content >
                        <div class="offset-lg-8 offset-md-8 col-lg-4 col-md-4"><ion-searchbar placeholder="id or libelle"  v-model="filter" />
                        </div> <br />
                        <div style="overflow-y: scroll; max-height: 300px;">
                        <table class="table table-hover table-bordered"  >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>LIBELLE</th>
                                    <th style="text-align: right;">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="s in com_getList" :key="s.id">
                                    <th>{{ s.id }}</th>
                                    <th>{{ s.libelle }}</th>
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
    name: 'semestrePage',
    components: { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSearchbar },
    setup() {
        const state = reactive({
            error: '',
            success: '',
            semestre: {
                id: 0,
                libelle: ''
            },
            semestres: [],
            filter: '',
            titreForm: 'Formulaire ajout semestre',
            etat: 'create'

        })

        const add = async () => {
            if (state.semestre.libelle == '' || state.semestre.libelle == undefined)
                state.error = 'Veuillez remplir le champs libelle'
            else {
                try {
                    const response = await service.addSemestre({libelle: state.semestre.libelle})
                    changeEtat('create', null)
                    state.success = response.data.success;
                    getAll()
                } catch (error) {
                    state.error = error.response.data.error;
                }
            }
        }

        const edit = async () => {
            if (state.semestre.libelle == '' || state.semestre.libelle == undefined)
                state.error = 'Veuillez remplir le champs libelle'
            else {
                try {
                    const response = await service.editSemestre(state.semestre)
                    changeEtat('create', null)
                    state.success = response.data.success;
                    getAll()
                } catch (error) {
                    state.error = error.response.data.error;
                }
            }
        }

        const changeEtat=(etat, semestre)=>{
            if(etat=='create'){
                state.semestre.libelle=''
                state.semestre.id=0
                state.etat='create'
                state.titreForm='Formulaire ajout semestre'
            }else{
                state.semestre.libelle=semestre.libelle
                state.semestre.id=semestre.id
                state.etat='edit'
                state.titreForm='Formulaire modification semestre'
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
                const response = await service.getAllSemestre();
                state.semestres = response.data.semestres;
            } catch (error) {
                console.log("Erreur get list semestre " + error);
            }
        }

        const com_getList = computed(() => {
            if (state.filter == '')
                return state.semestres
            else {
                return state.semestres.filter(e => {
                    return e.libelle.includes(state.filter) || e.id == state.filter
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