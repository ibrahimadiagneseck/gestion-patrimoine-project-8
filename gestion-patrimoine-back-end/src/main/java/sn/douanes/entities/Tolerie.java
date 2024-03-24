package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.douanes.entities.keys.TolerieId;

import javax.persistence.*;

@Entity
@IdClass(TolerieId.class)
@Table(name = "TOLERIE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tolerie {

    @Id
    @Column(name = "IDENTIFIANT_MAINTENANCE", length = 25, nullable = false)
    private String identifiantMaintenance;


    @Id
    @Column(name = "IDENTIFIANT_ACCIDENT", length = 25, nullable = false)
    private String identifiantAccident;


    @Column(name = "DESCRIPTION_TOLERIE", length = 512)
    private String descriptionTolerie;

}
