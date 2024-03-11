package sn.douanes.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "BON_ENTREE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BonEntree {

    @Id
    @Column(name = "IDENTIFIANT_BON_ENTREE", length = 25, nullable = false)
    private String identifiantBonEntree;

    @Column(name = "NUMERO_BON_ENTREE", unique = true)
    private String numeroBonEntree;


    @Column(name = "DATE_BON_ENTREE")
    private Date dateBonEntree;

    @OneToOne
    @JoinColumn(name = "IDENTIFIANT_BORDEREAU_LIVRAISON")
    private BordereauLivraison identifiantBordereauLivraison;


    @Column(name = "LIBELLE_BON_ENTREE")
    private String libelleBonEntree;


    @Column(name = "OBSERVATION_BON_ENTREE")
    private String observationBonEntree;

}