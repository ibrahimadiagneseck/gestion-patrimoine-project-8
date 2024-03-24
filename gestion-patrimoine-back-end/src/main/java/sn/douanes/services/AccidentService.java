package sn.douanes.services;

import sn.douanes.entities.Accident;
import sn.douanes.entities.Accident;
import sn.douanes.entities.Vehicule;

import java.sql.Timestamp;
import java.util.List;

public interface AccidentService {

    Accident saveAccident(Accident a);
    Accident updateAccident(Accident a);
    void deleteAccident(Accident a);
    void deleteAccidentById(String id);
    Accident getAccidentById(String id);
    List<Accident> getAllAccidents();


    Accident ajouterAccident(String identifiantAccident, Timestamp dateIncident, String lieuIncident, String commentaireIncident, int nombreDeces, int nombreBlesse, byte[] rapportIncident);


}
