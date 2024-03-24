package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Tolerie;
import sn.douanes.entities.keys.TolerieId;

@Repository
public interface TolerieRepository extends JpaRepository<Tolerie, TolerieId> {

}
