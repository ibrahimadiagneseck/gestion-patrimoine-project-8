package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "ACCIDENT")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Accident {


    @Id
    @Column(name = "IDENTIFIANT_ACCIDENT", length = 25, nullable = false)
    private String identifiantAccident;


    @Column(name = "DATE_INCIDENT")
    private Timestamp dateIncident;


    @Column(name = "LIEU_INCIDENT", length = 15)
    private String lieuIncident;


    @Column(name = "COMMENTAIRE_INCIDENT", length = 512)
    private String commentaireIncident;


    @Column(name = "NOMBRE_DECES")
    private int nombreDeces;

    @Column(name = "NOMBRE_BLESSE")
    private int nombreBlesse;

    @Lob // Ajout de cette annotation pour gérer les données volumineuses
    @Column(name = "RAPPORT_INCIDENT", columnDefinition="BYTEA")
    private byte[] rapportIncident;

}
