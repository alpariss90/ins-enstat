<template>
    <layout-template pageTitre="GESTION DES INSCRIPTIONS">

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
                            {{ titreForm }}
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>

                        <form action="">
                            <div class="mb-3 mt-3">
                                <label class="form-label">ANNEE :</label>
                                <select class="form-control form-control-sm" v-model="inscription.annee" :disabled="true" >
                                    <option v-for="s in annees" :key="s.id" :value="s.id">{{ s.libelle }}</option>
                                </select>
                            </div>

                            <div class="mb-3 mt-3">
                                <label class="form-label">SEMESTRE :</label>
                                <select class="form-control form-control-sm" v-model="inscription.semestre" style="height: 120px;" multiple>
                                    <option v-for="s in semestres" :key="s.id" :value="s.id">{{ s.libelle }}</option>
                                </select>
                            </div>

                            <div class="mb-3 mt-3">
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
                                v-if="etat == 'edit'">EDIT</button>
                        </form>

                    </ion-card-content>
                </ion-card>
            </div>
            <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <ion-card>
                    <ion-card-header style="background-color: #E2E8E5;">
                        <ion-card-title>
                            LIST ETUDIANT
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <div class="offset-lg-8 offset-md-8 col-lg-4 col-md-4">
                            <br />
                            <select class="form-control form-control-sm" v-model="filter" >
                                <option value="">Choisir un semestre  </option>
                                    <option v-for="s in semestres" :key="s.id" :value="s.id">{{ s.libelle }}</option>
                                </select>
                        </div> <br />
                        <div style="overflow-y: scroll; max-height: 300px;">
                        <table class="table table-hover table-bordered"  >
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
                        </table>
                    </div>
                    </ion-card-content>
                </ion-card>
            </div>
        </div>
    </layout-template>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, watch, computed /*, computed */ } from 'vue';
import service from '../services/service';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent  } from '@ionic/vue'

export default defineComponent({
    name: 'inscriptionPage',
    components: { IonCard, IonCardContent, IonCardHeader, IonCardTitle},
    setup() {
        const state = reactive({
            error: '',
            success: '',
            etudiants: [],
            semestres: [],
            annees: [],
            inscription: {
                annee: 3,
                semestre: [],
                etudiants: [],
                user: 'admin' //A implementer
            },
            inscriptions: [],
            filter: '',
            titreForm: 'Formulaire ajout inscription',
            etat: 'create',
            showDiv: 0

        })


        const add = async () => {
            if (state.inscription.annee == '' || state.inscription.annee == undefined || state.inscription.semestre.length==0 || state.inscription.etudiants.length == 0)
                state.error = 'Veuillez remplir tout les champs'
            else {
                fecthInscription()
                //console.log(state.inscriptions);
                try {
                    const response =await service.addInscriptionMultiple(state.inscriptions)
                    changeEtat('create', null)
                    state.success = response.data.success;
                    //console.log(response);
                    getAll()
                } catch (error) {
                    console.log('ee');
                    console.log(error);
                    getAll()
                    state.error = error.response.data.error;
                }
            }
        }
        const com_getList = computed(() => {
            if (state.filter == '')
                return state.inscriptions
            else {
                return state.inscriptions.filter(e => {
                    return e.semestre==state.filter
                })
            }

        })

        const getAll = async () => {
            try {
                const response = await service.getAllInscription();
                state.inscriptions = response.data.inscriptions;
            } catch (error) {
                console.log("Erreur get list inscription " + error);
            }
        }


        const changeEtat = (etat, ins) => {
            if (etat == 'create') {
                state.inscription.annee = 3
                state.inscription.semestre = []
                state.inscription.etudiants = []
                state.etat = 'create'
                state.titreForm = 'Formulaire ajout inscription'
                state.filter=''
            } else {
                state.inscription.annee = 3
                state.inscription.semestre = ins.semestre
                state.inscription.etudiants = ins.etudiants
                state.etat = 'edit'
                state.isMatDis = true
                state.titreForm = 'Formulaire modification inscription'
            }
        }


        const getAllAnnee = async () => {
            try {
                const response = await service.getAllAnnee()
                state.annees = response.data.annees;
            } catch (error) {
                console.log("Erreur get annees  " + error);
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

        const getAllEtudiant = async () => {
            try {
                const response = await service.getAllEtudiant()
                state.etudiants = response.data.etudiants;
            } catch (error) {
                console.log("Erreur get list etudiants " + error);
            }
        }

        const fecthInscription = () => {
            let ins = []
            //console.log('etud');
            //console.log(state.inscription.etudiants);
            //console.log('semes');
            console.log(state.inscription.semestre);
            for (let i = 0; i < state.inscription.etudiants.length; i++) {
                for(let j=0; j<state.inscription.semestre.length; j++){
                    ins.push({ etudiant: state.inscription.etudiants[i], semestre: state.inscription.semestre[j], annee: state.inscription.annee, user: state.inscription.user })
                }
            }
            //console.log('res');
            //console.log(ins);
            state.inscriptions = ins;
        }

        onMounted(() => {
            getAllAnnee(), getAllEtudiant(), getAllSemestre()/*,  getSemestre2(), getSemestre3(), getSemestre4(), getSemestre5(),*/, getAll()
        })

        /*
                watch(() => state.inscription.annee, () => {
                    fecthInscription()
                    console.log(state.inscriptions);
                })
                watch(() => state.inscription.semestre, () => {
                    fecthInscription()
                    console.log(state.inscriptions);
                })
                watch(() => state.inscription.etudiants, () => {
                    fecthInscription()
                    console.log(state.inscriptions);
                })
        */

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


        return { ...toRefs(state), getAllAnnee, getAllEtudiant, getAllSemestre, add, com_getList}


    }
})

</script>

<style></style>