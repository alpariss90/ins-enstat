<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title style="text-align: center; font-size: 20px; color: black; font-weight: bold;">
                    <nav class="navbar navbar-expand-lg navbar-light " style="background-color: #F07D0A;">
                        <div class="container-fluid" >
                            <a class="navbar-brand" href="#">ENSTAT</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                  
                                    <li class="nav-item">
                                        <a class="nav-link" href="/semestre">SEMESTRES</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/unite">UNITES</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/matiere">MATIERES</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/etudiant">ETUDIANTS</a>
                                    </li>
                                   
                                </ul>
                                <form class="d-flex">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item">
                                        <a class="nav-link disabled" href="#" tabindex="-1"
                                            aria-disabled="true">CONNECTED USER</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link " href="#" tabindex="-1"
                                            aria-disabled="true">LOGOUT</a>
                                    </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </nav>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="container"  >
                <h2>{{pageTitre}}</h2>
                <hr />
                <!--<div class="col-md-2 col-lg-2 col-sm-4" style="background-color: gray; min-height: 100vh;;">
                    
                </div>
                <div class="col-md-8 col-lg-8 col-sm-8">
                    
                </div>-->
                <slot />
            </div>
           
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-title style="text-align: center; font-size: 20px; color: black; font-weight: bold;">
                    GESTION DES NOTES
                </ion-title>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
import { IonFooter, IonTitle, IonToolbar, IonPage, IonContent, IonHeader } from '@ionic/vue'
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'layoutTemplate',
    components: {
        IonContent, IonHeader,
        IonFooter, IonTitle, IonToolbar, IonPage
    },
    setup() {

    },
    props:['pageTitre']
})
</script>
<style setup>
img {
    width: 80%;
}

ion-content {
    --padding-top: 10px;
    min-height: 100px;
}

ion-footer ion-toolbar {
    --color: red;
    --background: #269d2f;

}

ion-header ion-toolbar {
    --color: red;
    --background: #F07D0A;

}</style>