package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Authorities;
import sn.douanes.entities.Utilisateur;

import java.util.Set;


@Repository
public interface AuthoritiesRepository extends JpaRepository<Authorities, Integer> {

//    Set<Authorities> findByUtilisateurID(Utilisateur utilisateur);
}