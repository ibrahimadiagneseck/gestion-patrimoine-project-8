package sn.douanes.services;

import sn.douanes.entities.Reparation;
import sn.douanes.entities.Vehicule;

import java.sql.Timestamp;
import java.util.List;

public interface ReparationService {

    Reparation saveReparation(Reparation r);
    Reparation updateReparation(Reparation r);
    void deleteReparation(Reparation r);
    void deleteReparationById(String identifiantMaintenance, String identifiantAccident);
    Reparation getReparationById(String identifiantMaintenance, String identifiantAccident);
    List<Reparation> getAllReparations();


    Reparation ajouterReparation(String identifiantMaintenance, String identifiantAccident, String motifReparation);


}
