package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Tolerie;
import sn.douanes.entities.keys.TolerieId;
import sn.douanes.repositories.TolerieRepository;
import sn.douanes.services.TolerieService;

import java.util.List;

@Service
public class TolerieServiceImpl implements TolerieService {

    @Autowired
    TolerieRepository tolerieRepository;

    @Override
    public Tolerie saveTolerie(Tolerie t) {
        return tolerieRepository.save(t);
    }

    @Override
    public Tolerie updateTolerie(Tolerie t) {
        return tolerieRepository.save(t);
    }

    @Override
    public void deleteTolerie(Tolerie t) {
        tolerieRepository.delete(t);
    }

    @Override
    public void deleteTolerieById(String identifiantMaintenance, String identifiantAccident) {
        tolerieRepository.deleteById(new TolerieId(identifiantMaintenance, identifiantAccident));
    }

    @Override
    public Tolerie getTolerieById(String identifiantMaintenance, String identifiantAccident) {
        return tolerieRepository.findById(new TolerieId(identifiantMaintenance, identifiantAccident)).orElse(null);
    }

    @Override
    public List<Tolerie> getAllToleries() {
        return tolerieRepository.findAll();
    }

    @Override
    public Tolerie ajouterTolerie(
            String identifiantMaintenance,
            String identifiantAccident,
            String descriptionTolerie
    ) {

        Tolerie tolerie = new Tolerie();

        tolerie.setIdentifiantMaintenance(identifiantMaintenance);
        tolerie.setIdentifiantAccident(identifiantAccident);
        tolerie.setDescriptionTolerie(descriptionTolerie);

        return tolerieRepository.save(tolerie);
    }



}
