package sn.douanes.services;


import sn.douanes.entities.Tolerie;

import java.sql.Timestamp;
import java.util.List;

public interface TolerieService {

    Tolerie saveTolerie(Tolerie t);
    Tolerie updateTolerie(Tolerie t);
    void deleteTolerie(Tolerie t);
    void deleteTolerieById(String identifiantMaintenance, String identifiantAccident);
    Tolerie getTolerieById(String identifiantMaintenance, String identifiantAccident);
    List<Tolerie> getAllToleries();


    Tolerie ajouterTolerie(String identifiantMaintenance, String identifiantAccident, String descriptionTolerie);


}
