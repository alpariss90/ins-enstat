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

                        <div class="mb-3 mt-3">
                            <label class="form-label">ANNEE : </label>
                            <select class="form-control form-control-sm" v-model="c_annee" @change="initSelect()">
                                <option v-for="s in annees_ins" :key="s.id" :value="[s.id, s.libelle]">{{ s.libelle }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-3 mt-3">
                            <label class="form-label">SEMESTRE : </label>
                            <select class="form-control form-control-sm" v-model="c_semestre"
                                @change="getUniteBySemestre()">
                                <option v-for="s in semestres_ins" :key="s.id" :value="[s.id, s.libelle]">{{ s.libelle
                                }}</option>
                            </select>
                        </div>

                        <div class="alert alert-danger" v-if="error != ''">
                            <strong>Error!</strong> {{ error }}
                            <hr>
                        </div>
                        <div class="alert alert-success" v-if="success != ''">
                            <strong>success!</strong> {{ success }}
                            <hr>
                        </div>

                        <b style="color: rgb(30, 152, 30);">ANNEE CHOISIE :</b> {{ notes.libelle_annee }}<br>
                        <b style="color: rgb(30, 152, 30);">SEMESTRE CHOISI :</b> {{ notes.libelle_semestre }} <br>
                        <b style="color: rgb(30, 152, 30);"> UNITE CHOISIE : </b> {{ notes.libelle_unite }}<br>
                        <b style="color: rgb(30, 152, 30);">MATIERE CHOISIE :</b> {{ notes.libelle_matiere }} <br>

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

                    </ion-card-content>
                </ion-card>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <ion-card>
                    <ion-card-header style="background-color: #E2E8E5;">
                        <ion-card-title>
                            LIST ETUDIANT
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <b style="color: rgb(30, 152, 30);">ANNEE CHOISIE :</b> {{ notes.libelle_annee }}<br>
                        <b style="color: rgb(30, 152, 30);">SEMESTRE CHOISI :</b> {{ notes.libelle_semestre }} <br>
                        <b style="color: rgb(30, 152, 30);"> UNITE CHOISIE : </b> {{ notes.libelle_unite }}<br>
                        <b style="color: rgb(30, 152, 30);">MATIERE CHOISIE :</b> {{ notes.libelle_matiere }} <br>
                        <div class="offset-lg-8 offset-md-8 col-lg-4 col-md-4">


                        </div> <br />
                        <!--<div  style="overflow-y: scroll; max-height: 300px;">-->
                        <div>
                            <form>
                                <table class="table table-bordered">
                                    <tr>
                                        <td colspan="4">NOMBRE DE NOTE</td>
                                        <td><input type="number" class="form-control from-control-sm"
                                                v-model="notes.nombre_note" placeholder="NOMBRE NOTE" /></td>
                                    </tr>
                                    <tr v-for="s in etudiants_ins" :key="s.matricule" style="padding-top: 3px;">
                                        <td><!--<label>{{ s.matricule }}</label> -- -->{{ s.nom }} {{ s.prenom }}</td>
                                        <td><input :disabled="notes.nombre_note < 1" type="number"
                                                class="form-control from-control-sm" v-model="s.note1"
                                                placeholder="note 1" /></td>
                                        <td><input :disabled="notes.nombre_note < 2" type="number"
                                                class="form-control from-control-sm" v-model="s.note2"
                                                placeholder="note 2" /></td>
                                        <td><input :disabled="notes.nombre_note < 3" type="number"
                                                class="form-control from-control-sm" v-model="s.note3"
                                                placeholder="note 3" /></td>
                                        <td><input :disabled="notes.nombre_note < 4" type="number"
                                                class="form-control from-control-sm" v-model="s.note4"
                                                placeholder="note 4" /></td>
                                    </tr>
                                    <tr>
                                        <td><button type="reset" class="btn btn-danger btn-sm"
                                                v-if="etudiants_ins.length > 0">RESET</button></td>
                                        <td colspan="4"><button type="button" class="btn btn-primary btn-sm"
                                                style="float: right;" @click="add"
                                                v-if="etudiants_ins.length > 0">ADD</button></td>
                                    </tr>
                                </table>



                            </form>
                            <!--
                            <p v-for="s in ets" :key="s.nom">
                                <input type="text" v-model="s.note" />
                            </p>-->

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

                        <div class="mb-3 mt-3">
                            <label class="form-label">UNITE ENSEIGNEMENT : </label>
                            <select class="form-control form-control-sm" v-model="c_unite" @change="getMatiereByUE()">
                                <option v-for="s in unites" :key="s.id" :value="[s.id, s.libelle]">{{ s.libelle }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-3 mt-3">
                            <label class="form-label">MATIERES : </label>
                            <select class="form-control form-control-sm" v-model="c_matiere" @change="initMatiere()">
                                <option v-for="s in matieres" :key="s.id" :value="[s.id, s.libelle, s.credit]">{{ s.libelle
                                }}
                                </option>
                            </select>
                        </div>

                        <div class="alert alert-danger" v-if="error != ''">
                            <strong>Error!</strong> {{ error }}
                            <hr>
                        </div>
                        <div class="alert alert-success" v-if="success != ''">
                            <strong>success!</strong> {{ success }}
                            <hr>
                        </div>

                        <b style="color: rgb(30, 152, 30);">ANNEE CHOISIE :</b> {{ notes.libelle_annee }}<br>
                        <b style="color: rgb(30, 152, 30);">SEMESTRE CHOISI :</b> {{ notes.libelle_semestre }} <br>
                        <b style="color: rgb(30, 152, 30);"> UNITE CHOISIE : </b> {{ notes.libelle_unite }}<br>
                        <b style="color: rgb(30, 152, 30);">MATIERE CHOISIE :</b> {{ notes.libelle_matiere }} <br>
                    </ion-card-content>
                </ion-card>
            </div>
        </div>
        <note-liste :notes="liste_note"></note-liste>
    </layout-template>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue';
import service from '../services/service';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue'
import NoteListe from '../components/NoteListeComponent.vue';

export default defineComponent({
    name: 'inscriptionPage',
    components: { IonCard, IonCardContent, IonCardHeader, IonCardTitle, NoteListe },
    setup() {
        const state = reactive({
            error: '',
            success: '',
            annees_ins: [],
            semestres_ins: [],
            etudiants_ins: [],
            unites: [],
            matieres: [],
            notes: {
                annee: '',
                libelle_annee: '',
                semestre: '',
                libelle_semestre: '',
                unite: '',
                libelle_unite: '',
                matiere: '',
                libelle_matiere: '',
                matricule: '',
                nom: '',
                prenom: '',
                users: 'admin', //A implementer apres auth,
                note1: '',
                note2: '',
                note3: '',
                note4: '',
                credit_matiere: 0,
                nombre_note: '',
                credit_unite: 0
            },

            c_annee: [],
            c_semestre: '',
            c_unite: '',
            c_matiere: '',
            notes_saisie: [],
            liste_note: []


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
                const response = await service.getUEbySemestre(state.c_semestre[0]);
                state.unites = response.data.unites_semestre;
                state.notes.libelle_semestre = state.c_semestre[1]
                state.notes.semestre = state.c_semestre[0]
                state.notes.matiere = ''
                state.notes.libelle_matiere = ''
                state.notes.unite = ''
                state.notes.libelle_unite = ''
                state.c_matiere = []
                state.c_unite = []
                state.matieres = []
                state.etudiants_ins = []
                state.liste_note = []



            } catch (error) {
                console.log("Erreur getUniteBySemestre ", error);
            }
        }

        const getMatiereByUE = async () => {
            try {
                const response = await service.getMatiereByUE(state.c_unite[0]);
                state.matieres = response.data.matieres_unite;
                state.notes.matiere = ''
                state.notes.libelle_matiere = ''
                state.notes.libelle_unite = state.c_unite[1]
                state.notes.unite = state.c_unite[0]
                state.c_matiere = []
                state.etudiants_ins = []
                state.liste_note = []


            } catch (error) {
                console.log("Erreur getMatiereByUE ", error);
            }
        }

        const initMatiere = () => {
            state.notes.libelle_matiere = state.c_matiere[1]
            state.notes.matiere = state.c_matiere[0]
            getEtudiantIns()
            getNoteFilter()
        }

        const getEtudiantIns = async () => {
            try {
                const response = await service.getEtudiantIns(state.notes.semestre);
                state.etudiants_ins = response.data.etudiants_ins;
            } catch (error) {
                console.log("Erreur getEtudiantIns ", error);
            }
        }


        const getNoteFilter = async () => {
            try {
                const response = await service.getNoteFilter(state.notes.annee, state.notes.semestre, state.notes.unite, state.notes.matiere)
                state.liste_note = response.data.liste_note;
                console.log(state.liste_note);
            } catch (error) {
                console.log("Erreur getNoteFilter ", error);
            }
        }

        const initSelect = () => {
            state.notes.libelle_annee = state.c_annee[1]
            state.notes.annee = state.c_annee[0]
            state.notes.semestre = ''
            state.notes.unite = ''
            state.notes.matiere = ''
            state.etudiants_ins = []
        }

        const add = async () => {

            if (
                state.notes.annee === "" || state.notes.annee == undefined
                || state.notes.semestre === "" || state.notes.semestre == undefined
                || state.notes.unite === "" || state.notes.unite == undefined
                || state.notes.matiere === "" || state.notes.matiere == undefined
                || state.notes.nombre_note == undefined || state.notes.nombre_note === ""
            )
                state.error = 'Veuillez remplir tout les champs'
            else if (!checkEtudiantInsNote() || state.notes.nombre_note < 0 || state.notes.nombre_note > 4) {
                state.error = 'Verifier les notes saisies'
            } else {
                try {
                    const response = await service.addNoteMultiple(fetchNote())
                    state.success = response.data.success;
                    getNoteFilter()
                    clearNote()
                } catch (error) {
                    state.error = error.response.data.error;
                }
            }
        }

        const checkEtudiantInsNote = () => {
            let isOk = true;
            for (let i = 0; i < state.etudiants_ins.length; i++) {
                if (state.notes.nombre_note == 1 && ('note1' in state.etudiants_ins[i] == false || state.etudiants_ins[i].note1 === "" || state.etudiants_ins[i].note1 == undefined || state.etudiants_ins[i].note1 > 20 || state.etudiants_ins[i].note1 < 0)) {
                    isOk = false
                    break;
                } else if (
                    state.notes.nombre_note == 2
                    && (
                        'note1' in state.etudiants_ins[i] == false || 'note2' in state.etudiants_ins[i] == false
                        || state.etudiants_ins[i].note1 === "" || state.etudiants_ins[i].note1 == undefined || state.etudiants_ins[i].note1 > 20 || state.etudiants_ins[i].note1 < 0
                        || state.etudiants_ins[i].note2 === "" || state.etudiants_ins[i].note2 == undefined || state.etudiants_ins[i].note2 > 20 || state.etudiants_ins[i].note2 < 0
                    )
                ) {

                    isOk = false
                    break;
                } else if (
                    state.notes.nombre_note == 3
                    && (
                        'note1' in state.etudiants_ins[i] == false || 'note2' in state.etudiants_ins[i] == false || 'note3' in state.etudiants_ins[i] == false
                        || state.etudiants_ins[i].note1 === "" || state.etudiants_ins[i].note1 == undefined || state.etudiants_ins[i].note1 > 20 || state.etudiants_ins[i].note1 < 0
                        || state.etudiants_ins[i].note2 === "" || state.etudiants_ins[i].note2 == undefined || state.etudiants_ins[i].note2 > 20 || state.etudiants_ins[i].note2 < 0
                        || state.etudiants_ins[i].note3 === "" || state.etudiants_ins[i].note3 == undefined || state.etudiants_ins[i].note3 > 20 || state.etudiants_ins[i].note3 < 0
                    )
                ) {

                    isOk = false
                    break;
                } else if (
                    state.notes.nombre_note == 4
                    && (
                        'note1' in state.etudiants_ins[i] == false || 'note2' in state.etudiants_ins[i] == false || 'note3' in state.etudiants_ins[i] == false || 'note4' in state.etudiants_ins[i] == false
                        || state.etudiants_ins[i].note1 === "" || state.etudiants_ins[i].note1 == undefined || state.etudiants_ins[i].note1 > 20 || state.etudiants_ins[i].note1 < 0
                        || state.etudiants_ins[i].note2 === "" || state.etudiants_ins[i].note2 == undefined || state.etudiants_ins[i].note2 > 20 || state.etudiants_ins[i].note2 < 0
                        || state.etudiants_ins[i].note3 === "" || state.etudiants_ins[i].note3 == undefined || state.etudiants_ins[i].note3 > 20 || state.etudiants_ins[i].note3 < 0
                        || state.etudiants_ins[i].note4 === "" || state.etudiants_ins[i].note4 == undefined || state.etudiants_ins[i].note4 > 20 || state.etudiants_ins[i].note4 < 0
                    )
                ) {

                    isOk = false
                    break;
                }




                /*
                                if ('note1' in state.etudiants_ins[i] == false || 'note2' in state.etudiants_ins[i] == false || 'note3' in state.etudiants_ins[i] == false || 'note4' in state.etudiants_ins[i] == false) {
                                    isOk = false
                                    break;
                                } else if (
                                    state.etudiants_ins[i].note1 === "" || state.etudiants_ins[i].note1 == undefined || state.etudiants_ins[i].note1 > 20 || state.etudiants_ins[i].note1 < 0
                                    || state.etudiants_ins[i].note2 === "" || state.etudiants_ins[i].note2 == undefined || state.etudiants_ins[i].note2 > 20 || state.etudiants_ins[i].note2 < 0
                                    || state.etudiants_ins[i].note3 === "" || state.etudiants_ins[i].note3 == undefined || state.etudiants_ins[i].note3 > 20 || state.etudiants_ins[i].note3 < 0
                                    || state.etudiants_ins[i].note4 === "" || state.etudiants_ins[i].note4 == undefined || state.etudiants_ins[i].note4 > 20 || state.etudiants_ins[i].note4 < 0
                                ) {
                                    isOk = false
                                    break
                                }
                            }*/
                
            }

            return isOk
        
        }

            const fetchNote = () => {
                let notes = []
                for (let i = 0; i < state.etudiants_ins.length; i++) {
                    let moy=0
                    if(state.nombre_note ==1){
                        moy=Number((state.etudiants_ins[i].note1).toFixed(2))
                    }else if(state.notes.nombre_note ==2){
                        moy=Number(((state.etudiants_ins[i].note1 + state.etudiants_ins[i].note2) / state.notes.nombre_note).toFixed(2))
                    }else if(state.notes.nombre_note ==3){
                        moy=Number(((state.etudiants_ins[i].note1 + state.etudiants_ins[i].note2 + state.etudiants_ins[i].note3) / state.notes.nombre_note).toFixed(2))
                    }else if(state.notes.nombre_note ==4){
                        moy=Number(((state.etudiants_ins[i].note1 + state.etudiants_ins[i].note2 + state.etudiants_ins[i].note3 + state.etudiants_ins[i].note4) / state.notes.nombre_note).toFixed(2))
                    }
                    notes.push({
                        annee: state.notes.annee,
                        libelle_annee: state.notes.libelle_annee,
                        semestre: state.notes.semestre,
                        libelle_semestre: state.notes.libelle_semestre,
                        unite: state.notes.unite,
                        libelle_unite: state.notes.libelle_unite,
                        matiere: state.notes.matiere,
                        libelle_matiere: state.notes.libelle_matiere,
                        matricule: state.etudiants_ins[i].matricule,
                        nom: state.etudiants_ins[i].nom,
                        prenom: state.etudiants_ins[i].prenom,
                        users: state.notes.users,
                        note1: state.etudiants_ins[i].note1,
                        note2: state.etudiants_ins[i].note2,
                        note3: state.etudiants_ins[i].note3,
                        note4: state.etudiants_ins[i].note4,
                        nombre_note: state.notes.nombre_note,
                        credit_matiere: state.notes.credit_matiere,
                        moyenne_matiere: moy,//Number(((state.etudiants_ins[i].note1 + state.etudiants_ins[i].note2 + state.etudiants_ins[i].note3 + state.etudiants_ins[i].note4) / state.notes.nombre_note).toFixed(2)),
                        moyenne_unite: 0,//getMoyenneUnite(state.notes.unite, getUniteCredit(state.notes.unite), (state.etudiants_ins[i].note1 + state.etudiants_ins[i].note2 + state.etudiants_ins[i].note3 + state.etudiants_ins[i].note4) / state.notes.nombre_note),
                        credit_obtenu: 0, //A implementer
                        validation_unite: '-', //A implementer
                        credit_unite: 0,//getUniteCredit(state.notes.unite)
                    })
                }
                return notes;
            }

            const clearNote = () => {
                for (let i = 0; i < state.etudiants_ins.length; i++) {
                    state.etudiants_ins[i].note1 = ''
                    state.etudiants_ins[i].note2 = ''
                    state.etudiants_ins[i].note3 = ''
                    state.etudiants_ins[i].note4 = ''
                }
                state.notes.nombre_note = ''
            }




            onMounted(() => {
                getAnneeIns(), getSemestreIns()
            })




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


            return { ...toRefs(state), getUniteBySemestre, getMatiereByUE, getEtudiantIns, add, initSelect, initMatiere }


        }
    })

</script>

<style></style>