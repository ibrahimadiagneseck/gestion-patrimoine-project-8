package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Accident;
import sn.douanes.repositories.AccidentRepository;
import sn.douanes.services.AccidentService;

import java.sql.Timestamp;
import java.util.List;


@Service
public class AccidentServiceImpl implements AccidentService {

    @Autowired
    AccidentRepository accidentRepository;

    @Override
    public Accident saveAccident(Accident a) {
        return accidentRepository.save(a);
    }

    @Override
    public Accident updateAccident(Accident a) {
        return accidentRepository.save(a);
    }

    @Override
    public void deleteAccident(Accident a) {
        accidentRepository.delete(a);
    }

    @Override
    public void deleteAccidentById(String id) {
        accidentRepository.deleteById(id);
    }

    @Override
    public Accident getAccidentById(String id) {
        return accidentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Accident> getAllAccidents() {
        return accidentRepository.findAll();
    }

    @Override
    public Accident ajouterAccident(
            String identifiantMaintenance,
            Timestamp dateIncident,
            String lieuIncident,
            String commentaireIncident,
            int nombreDeces,
            int nombreBlesse,
            byte[] rapportIncident
    ) {

        Accident Accident = new Accident();

        Accident.setIdentifiantMaintenance(identifiantMaintenance);
        Accident.setDateIncident(new Timestamp(System.currentTimeMillis()));
        Accident.setLieuIncident(lieuIncident);
        Accident.setCommentaireIncident(commentaireIncident);
        Accident.setNombreDeces(nombreDeces);
        Accident.setNombreBlesse(nombreBlesse);
        Accident.setRapportIncident(rapportIncident);

        return accidentRepository.save(Accident);
    }
}
