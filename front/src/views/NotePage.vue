<template>
    <layout-template pageTitre="GESTION DES NOTES">

        <div class="alert alert-danger" v-if="error != ''">
            <strong>Error!</strong> {{ error }}
            <hr>
        </div>
        <div class="alert alert-success" v-if="success != ''">
            <strong>success!</strong> {{ success }}
            <hr>
        </div>



        <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <ion-card>
                    <ion-card-header style="background-color: #E2E8E5;">
                        <ion-card-title>
                            FILTRE
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>

                        <form action="">
                            <div class="mb-3 mt-3">
                                <label class="form-label">ANNEE : </label>
                                <select class="form-control form-control-sm" v-model="c_annee">
                                    <option v-for="s in annees_ins" :key="s.id" :value="[s.id, s.libelle]">{{ s.libelle }}</option>
                                </select>
                            </div>

                            <div class="mb-3 mt-3">
                                <label class="form-label">SEMESTRE : </label>
                                <select class="form-control form-control-sm" v-model="c_semestre" @change="getUniteBySemestre()">
                                    <option v-for="s in semestres_ins" :key="s.id" :value="[s.id, s.libelle]">{{ s.libelle }}</option>
                                </select>
                            </div>

                            <!-- <div class="mb-3 mt-3">
                                <label class="form-label">ETUDIANTS :</label>
                                <select style="height: 350px;" class="form-control form-control-sm" v-model="inscription.etudiants" multiple>
                                    <option v-for="s in etudiants" :key="s.matricule" :value="s.matricule">{{ s.matricule
                                    }}--{{ s.nom }}</option>
                                </select>
                            </div>
                            <button type="reset" class="btn btn-danger btn-sm" v-if="etat == 'create'">RESET</button>
                            <button type="button" class="btn btn-primary btn-sm" style="float: right;" @click="add"
                                v-if="etat == 'create'">ADD</button>
                            <button type="button" class="btn btn-primary btn-sm" style="float: right;" @click="edit"
                                v-if="etat == 'edit'">EDIT</button>-->
                        </form>

                    </ion-card-content>
                </ion-card>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <ion-card>
                    <ion-card-header style="background-color: #E2E8E5;">
                        <ion-card-title>
                            LIST ETUDIANT {{ notes_saisie }}
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <div class="offset-lg-8 offset-md-8 col-lg-4 col-md-4">
                            
                            
                        </div> <br />
                        <!--<div  style="overflow-y: scroll; max-height: 300px;">-->
                            <div>
                            <form>
                            <table class="table table-bordered">
                                <tr v-for="s in com_getListEtudiant" :key="s.matricule" style="padding-top: 3px;">
                                    <td><label>{{ s.matricule }}</label> -- {{ s.nom }} {{ s.prenom }}</td>
                                    <td><input type="number" class="form-control from-control-sm" v-model="notes_saisie"/></td>
                                </tr>
                                <tr>
                                    <td><button type="reset" class="btn btn-danger btn-sm" v-if="com_getListEtudiant.length > 0">RESET</button></td>
                                    <td><button type="button" class="btn btn-primary btn-sm" style="float: right;"
                                @click="add" v-if="com_getListEtudiant.length > 0">ADD</button></td>
                                </tr>
                            </table>
                            
                            
                               
                            </form>

                            <!--<table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>SEMESTRE</th>
                                        <th>MATRICULE</th>
                                        <th>NOM</th>
                                        <th>PRENOM</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="s in com_getList" :key="s.id">
                                        <td>{{ s.libelle_semestre }}</td>
                                        <td>{{ s.matricule }}</td>
                                        <td>{{ s.nom }}</td>
                                        <td>{{ s.prenom }}</td>
                                    </tr>
                                </tbody>
                            </table>-->
                        </div>
                    </ion-card-content>
                </ion-card>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <ion-card>
                    <ion-card-header style="background-color: #E2E8E5;">
                        <ion-card-title>
                            FILTRE
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>

                        <form action="">
                            <div class="mb-3 mt-3">
                                <label class="form-label">UNITE ENSEIGNEMENT : </label>
                                <select class="form-control form-control-sm" v-model="c_unite" @change="getMatiereByUE()">
                                    <option v-for="s in unites" :key="s.id" :value="[s.id, s.libelle]">{{ s.libelle }}</option>
                                </select>
                            </div>

                            <div class="mb-3 mt-3">
                                <label class="form-label">MATIERES : </label>
                                <select class="form-control form-control-sm" v-model="c_matiere" @change="getEtudiantIns()">
                                    <option v-for="s in matieres" :key="s.id" :value="[s.id, s.libelle]">{{ s.libelle }}</option>
                                </select>
                            </div>
                        </form>

                    </ion-card-content>
                </ion-card>
            </div>
        </div>
    </layout-template>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, watch, computed/*, , , */ } from 'vue';
import service from '../services/service';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue'

export default defineComponent({
    name: 'inscriptionPage',
    components: { IonCard, IonCardContent, IonCardHeader, IonCardTitle },
    setup() {
        const state = reactive({
            error: '',
            success: '',
            annees_ins: [],
            semestres_ins: [],
            etudiants_ins: [],
            unites: [],
            matieres: [],
            notes:{
                annee:'',
                libelle_annee: '',
                semestre:'',
                libelle_semestre:'',
                unite:'',
                libelle_unite:'',
                matiere:'',
                libelle_matiere:'',
                matricule: '',
                nom: '',
                prenom: '',
                users: 'admin', //A implementer apres auth,
                note: ''
            },

            c_annee:[],
            c_semestre:'',
            c_unite:'',
            c_matiere:'',
            notes_saisie:[]
            

        })


        const getAnneeIns = async () => {
            try {
                const response = await service.getAnneeIns();
                state.annees_ins = response.data.annees_ins;
            } catch (error) {
                console.log("Erreur getAnneeIns ", error);
            }
        }

        const getSemestreIns = async () => {
            try {
                const response = await service.getSemestreIns();
                state.semestres_ins = response.data.semestres_ins;
            } catch (error) {
                console.log("Erreur getSemestreIns ", error);
            }
        }

        const getUniteBySemestre = async () => {
            try {
                const response = await service.getUEbySemestre(state.notes.semestre);
                state.unites = response.data.unites_semestre;
            } catch (error) {
                console.log("Erreur getUniteBySemestre ", error);
            }
        }

        const getMatiereByUE = async () => {
            try {
                const response = await service.getMatiereByUE(state.notes.unite);
                state.matieres = response.data.matieres_unite;
            } catch (error) {
                console.log("Erreur getMatiereByUE ", error);
            }
        }

        const getEtudiantIns = async () => {
            try {
                const response = await service.getEtudiantIns(state.notes.semestre);
                state.etudiants_ins = response.data.etudiants_ins;
            } catch (error) {
                console.log("Erreur getEtudiantIns ", error);
            }
        }


        onMounted(() => {
            getAnneeIns(), getSemestreIns()
        })


        const com_getListEtudiant = computed(() => {
            if (state.notes.annee=='' || state.notes.semestre=='' || state.notes.unite=='' || state.notes.matiere=='')
                return []
            else {
               return  state.etudiants_ins
            }

        })




        watch(() => state.c_annee, () => {
           
            state.notes.annee=state.c_annee[0]
            state.notes.libelle_annee=state.c_annee[1]
        })
        watch(() => state.c_semestre, () => {
            state.notes.semestre=state.c_semestre[0]
            state.notes.libelle_semestre=state.c_semestre[1]
        })
        watch(() => state.c_unite, () => {
            state.notes.unite=state.c_unite[0]
            state.notes.libelle_unite=state.c_unite[1]
        })
        watch(() => state.c_matiere, () => {
            state.notes.matiere=state.c_matiere[0]
            state.notes.libelle_matiere=state.c_matiere[1]
        })


        return { ...toRefs(state), getUniteBySemestre, getMatiereByUE, getEtudiantIns, com_getListEtudiant }


    }
})

</script>

<style></style>