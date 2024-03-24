package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.douanes.entities.keys.ReparationId;

import javax.persistence.*;

@Entity
@IdClass(ReparationId.class)
@Table(name = "REPARATION")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reparation {

    @Id
    @Column(name = "IDENTIFIANT_MAINTENANCE", length = 25, nullable = false)
    private String identifiantMaintenance;

    @Id
    @Column(name = "IDENTIFIANT_ACCIDENT", length = 25, nullable = false)
    private String identifiantAccident;


    @Column(name = "MOTIF_REPARATION", length = 512)
    private String motifReparation;


}
