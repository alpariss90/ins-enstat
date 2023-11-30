CREATE OR REPLACE VIEW public.v_unite
 AS
 SELECT u.id,
    u.titre,
    u.libelle,
    u."user",
    u.semestre AS id_semestre,
    s.libelle AS libelle_semestre
   FROM unite u
     JOIN semestre s ON u.semestre = s.id;


     CREATE OR REPLACE VIEW public.v_matiere
 AS
 SELECT m.id,
    m.libelle,
    m.credit,
    m.volume,
    m.unite AS id_unite,
    u.libelle AS libelle_unite,
    u.titre AS titre_unite,
    u.libelle_semestre
   FROM matiere m
     JOIN v_unite u ON m.unite = u.id;


     
CREATE OR REPLACE VIEW public.v_inscription
 AS
 SELECT i.id,
    i.etudiant,
    i.semestre,
    i.annee,
    i."user",
    e.matricule,
    e.nom,
    e.prenom,
    s.libelle AS libelle_semestre,
    a.libelle AS libelle_annee
   FROM inscription i,
    etudiant e,
    semestre s,
    USER u(u),
    annee a
  WHERE i.etudiant::text = e.matricule::text AND i.semestre = s.id AND i.annee = a.id;
