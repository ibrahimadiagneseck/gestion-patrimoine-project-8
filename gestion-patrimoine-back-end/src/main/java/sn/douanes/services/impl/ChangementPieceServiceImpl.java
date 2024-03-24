package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.ChangementPiece;
import sn.douanes.entities.keys.ChangementPieceId;
import sn.douanes.repositories.ChangementPieceRepository;
import sn.douanes.repositories.ChangementPieceRepository;
import sn.douanes.services.ChangementPieceService;

import java.util.List;

@Service
public class ChangementPieceServiceImpl implements ChangementPieceService {

    @Autowired
    ChangementPieceRepository changementPieceRepository;

    @Override
    public ChangementPiece saveChangementPiece(ChangementPiece c) {
        return changementPieceRepository.save(c);
    }

    @Override
    public ChangementPiece updateChangementPiece(ChangementPiece c) {
        return changementPieceRepository.save(c);
    }

    @Override
    public void deleteChangementPiece(ChangementPiece c) {
        changementPieceRepository.delete(c);
    }

    @Override
    public void deleteChangementPieceById(String identifiantMaintenance, String identifiantAccident) {
        changementPieceRepository.deleteById(new ChangementPieceId(identifiantMaintenance, identifiantAccident));
    }

    @Override
    public ChangementPiece getChangementPieceById(String identifiantMaintenance, String identifiantAccident) {
        return changementPieceRepository.findById(new ChangementPieceId(identifiantMaintenance, identifiantAccident)).orElse(null);
    }

    @Override
    public List<ChangementPiece> getAllChangementPieces() {
        return changementPieceRepository.findAll();
    }

    @Override
    public ChangementPiece ajouterChangementPiece(
            String identifiantMaintenance,
            String identifiantAccident,
            int nombrePiecesRechangees,
            String referencePieces
    ) {

        ChangementPiece ChangementPiece = new ChangementPiece();

        ChangementPiece.setIdentifiantMaintenance(identifiantMaintenance);
        ChangementPiece.setIdentifiantAccident(identifiantAccident);
        ChangementPiece.setNombrePiecesRechangees(nombrePiecesRechangees);
        ChangementPiece.setReferencePieces(referencePieces);

        return changementPieceRepository.save(ChangementPiece);
    }



}
