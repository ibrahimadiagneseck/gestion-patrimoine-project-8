package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Reparation;
import sn.douanes.entities.keys.ReparationId;

@Repository
public interface ReparationRepository extends JpaRepository<Reparation, ReparationId> {

}
