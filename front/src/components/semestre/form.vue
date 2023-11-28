<template>
    <ion-card>
        <ion-card-header style="background-color: #E2E8E5;">
            <ion-card-title>
                FORMULARE SEMESTRE
            </ion-card-title>
        </ion-card-header>
        <ion-card-content>

            <form action="">
                <div class="mb-3 mt-3">
                    <label for="email" class="form-label">LIBELLE :</label>
                    <input type="text" autocomplete="off" v-model="semestre.libelle" class="form-control form-control-sm"
                        id="email" placeholder="Enter libelle semestre">
                </div>

                <button type="reset" class="btn btn-danger btn-sm">RESET</button>
                <button type="button" class="btn btn-primary btn-sm" style="float: right;" @click="add">ADD</button>
            </form>
            <hr>
            <div class="alert alert-danger" v-if="error!=''">
                <strong>Error!</strong> {{error}}
            </div>
            <div class="alert alert-success" v-if="success!=''">
                <strong>success!</strong> {{success}}
            </div>
            <hr>
        </ion-card-content>
    </ion-card>
</template>
    
<script>
import { defineComponent, reactive, toRefs, watch } from 'vue';

import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue'
import service from '../../services/service';

export default defineComponent({
    name: 'formSemestre',
    props: [],
    components: {
        IonCard, IonCardContent, IonCardHeader, IonCardTitle
    },
    setup() {


        const state = reactive({
            error: '',
            success: '',
            semestre: {
                id: 0,
                libelle: ''
            }
        })

        const add = async () => {
            if (state.semestre.libelle == '' || state.semestre.libelle == undefined)
                state.error = 'Veuillez remplir le champs libelle'
            else {
                try {
                    const response= await service.addSemestre({libelle: state.semestre.libelle})
                    state.success=response.data.success;
                } catch (error) {
                    state.error=error.response.data.error;
                }
            }
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


        return { add, ...toRefs(state) }
    }
})



</script>
    
<style></style>