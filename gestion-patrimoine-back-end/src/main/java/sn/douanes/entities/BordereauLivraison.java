package sn.douanes.entities;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "BORDEREAU_LIVRAISON")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BordereauLivraison {

    @Id
    @Column(name = "IDENTIFIANT_BORDEREAU_LIVRAISON", length = 25, nullable = false)
    private String identifiantBordereauLivraison;

    @Column(name = "NUMERO_BORDEREAU_LIVRAISON", length = 100, unique = true)
    private String numeroBordereauLivraison;

    @Column(name = "DATE_BORDEREAU_LIVRAISON")
    private Date dateBordereauLivraison;


    @Column(name = "DESCRIPTION_BORDEREAU_LIVRAISON", length = 512)
    private String descriptionBordereauLivraison;

    @Column(name = "LIEU_DE_LIVRAISON")
    private String lieuDeLivraison;

    @Column(name = "REPRESENTANT_PRESTATAIRE")
    private String representantPrestataire;

    @ManyToOne
    @JoinColumn(name = "CODE_SECTION")
    private Sections codeSection;


    @Column(name = "CONFORMITE_BORDEREAU_LIVRAISON", length = 3)
    private String conformiteBordereauLivraison;

    @ManyToOne
    @JoinColumn(name = "MATRICULE_AGENT")
    private Agent matriculeAgent;

    @Column(name = "DATE_ENREGISTREMENT")
    private Timestamp dateEnregistrement;

    @ManyToOne
    @JoinColumn(name = "NINEA")
    private Prestataires ninea;



}