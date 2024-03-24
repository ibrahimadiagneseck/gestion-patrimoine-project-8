package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.*;
import sn.douanes.entities.keys.ReparationId;
import sn.douanes.repositories.ReparationRepository;
import sn.douanes.repositories.ReparationRepository;
import sn.douanes.services.ReparationService;
import sn.douanes.services.ReparationService;

import java.sql.Timestamp;
import java.util.List;

@Service
public class ReparationServiceImpl implements ReparationService {

    @Autowired
    ReparationRepository reparationRepository;

    @Override
    public Reparation saveReparation(Reparation r) {
        return reparationRepository.save(r);
    }

    @Override
    public Reparation updateReparation(Reparation r) {
        return reparationRepository.save(r);
    }

    @Override
    public void deleteReparation(Reparation r) {
        reparationRepository.delete(r);
    }

    @Override
    public void deleteReparationById(String identifiantMaintenance, String identifiantAccident) {
        reparationRepository.deleteById(new ReparationId(identifiantMaintenance, identifiantAccident));
    }

    @Override
    public Reparation getReparationById(String identifiantMaintenance, String identifiantAccident) {
        return reparationRepository.findById(new ReparationId(identifiantMaintenance, identifiantAccident)).orElse(null);
    }

    @Override
    public List<Reparation> getAllReparations() {
        return reparationRepository.findAll();
    }

    @Override
    public Reparation ajouterReparation(
            String identifiantMaintenance,
            String identifiantAccident,
            String motifReparation
    ) {

        Reparation reparation = new Reparation();

        reparation.setIdentifiantMaintenance(identifiantMaintenance);
        reparation.setIdentifiantAccident(identifiantAccident);
        reparation.setMotifReparation(motifReparation);

        return reparationRepository.save(reparation);
    }



}
