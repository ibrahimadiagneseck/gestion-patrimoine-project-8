package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.*;
import sn.douanes.repositories.MaintenanceRepository;
import sn.douanes.services.MaintenanceService;

import java.sql.Timestamp;
import java.util.List;


@Service
public class MaintenanceServiceImpl implements MaintenanceService {

    @Autowired
    MaintenanceRepository maintenanceRepository;

    @Override
    public Maintenance saveMaintenance(Maintenance m) {
        return maintenanceRepository.save(m);
    }

    @Override
    public Maintenance updateMaintenance(Maintenance m) {
        return maintenanceRepository.save(m);
    }

    @Override
    public void deleteMaintenance(Maintenance m) {
        maintenanceRepository.delete(m);
    }

    @Override
    public void deleteMaintenanceById(String id) {
        maintenanceRepository.deleteById(id);
    }

    @Override
    public Maintenance getMaintenanceById(String id) {
        return maintenanceRepository.findById(id).orElse(null);
    }

    @Override
    public List<Maintenance> getAllMaintenances() {
        return maintenanceRepository.findAll();
    }

    @Override
    public Maintenance ajouterMaintenance(String identifiantMaintenance, Vehicule numeroSerie, Timestamp dateDebutMaintenance, Timestamp dateFinMaintenance, String typeMaintenance, String observationMaintenance) {

        Maintenance maintenance = new Maintenance();

        maintenance.setIdentifiantMaintenance(identifiantMaintenance);
        maintenance.setNumeroSerie(numeroSerie);
        maintenance.setDateDebutMaintenance(new Timestamp(System.currentTimeMillis()));
        maintenance.setDateFinMaintenance(null);
        maintenance.setTypeMaintenance(typeMaintenance);
        maintenance.setObservationMaintenance(observationMaintenance);

        return maintenanceRepository.save(maintenance);
    }
}
