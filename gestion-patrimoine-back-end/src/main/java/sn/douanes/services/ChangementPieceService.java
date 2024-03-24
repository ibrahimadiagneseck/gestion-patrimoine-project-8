package sn.douanes.services;

import sn.douanes.entities.ChangementPiece;

import java.util.List;

public interface ChangementPieceService {

    ChangementPiece saveChangementPiece(ChangementPiece c);
    ChangementPiece updateChangementPiece(ChangementPiece c);
    void deleteChangementPiece(ChangementPiece c);
    void deleteChangementPieceById(String identifiantMaintenance, String identifiantAccident);
    ChangementPiece getChangementPieceById(String identifiantMaintenance, String identifiantAccident);
    List<ChangementPiece> getAllChangementPieces();


    ChangementPiece ajouterChangementPiece(String identifiantMaintenance, String identifiantAccident, int nombrePiecesRechangees, String referencePieces);


}
