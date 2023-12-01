import API from "./API";

export default {
  test() {
    return API().get("");
  },
  getAllSemestre() {
    return API().get("semestre/all");
  },
  getAllAnnee() {
    return API().get("annee/list");
  },
  getSemestreById(id) {
    return API().get("semestre/get/" + id);
  },
  addSemestre(semestre) {
    return API().post("semestre/save", semestre);
  },
  editSemestre(semestre) {
    return API().post("semestre/edit", semestre);
  },

  //UNITE

  getAllUnite() {
    return API().get("unite/all");
  },
  getUniteById(id) {
    return API().get("unite/get/" + id);
  },
  addUnite(unite) {
    return API().post("unite/save", unite);
  },
  editUnite(unite) {
    return API().post("unite/edit", unite);
  },

  //MATIERE

  getAllMatiere() {
    return API().get("matiere/all");
  },
  getMatiereById(id) {
    return API().get("matiere/get/" + id);
  },
  addMatiere(matiere) {
    return API().post("matiere/save", matiere);
  },
  editMatiere(matiere) {
    return API().post("matiere/edit", matiere);
  },

  //ETUDIANT

  getAllEtudiant() {
    return API().get("etudiant/all");
  },
  getEtudiantById(matricule) {
    return API().get("etudiant/get/" + matricule);
  },
  addEtudiant(etudiant) {
    return API().post("etudiant/save", etudiant);
  },
  editEtudiant(etudiant) {
    return API().post("etudiant/edit", etudiant);
  },

  //Inscription

  getAllInscription() {
    return API().get("inscription/all");
  },
  addInscription(inscription) {
    return API().post("inscription/save", inscription);
  },
  addInscriptionMultiple(inscription) {
    return API().post("inscription/save-multiple", inscription);
  },
  editInscription(inscription) {
    return API().post("inscription/edit", inscription);
  },

  //note

  getAllNote() {
    return API().get("note/all");
  },
  addNote(note) {
    return API().post("note/save", note);
  },
  addNoteMultiple(notes) {
    return API().post("note/save-multiple", notes);
  },
  editNote(note) {
    return API().post("note/edit", note);
  },
  getAnneeIns() {
    return API().get("note/annee");
  },
  getSemestreIns() {
    return API().get("note/semestre");
  },
  getEtudiantIns(semestre) {
    return API().get("note/etudiant/" + semestre);
  },
  getUEbySemestre(semestre) {
    return API().get("note/ue/semestre/" + semestre);
  },
  getMatiereByUE(unite) {
    return API().get("note/matiere/ue/" + unite);
  }
};
