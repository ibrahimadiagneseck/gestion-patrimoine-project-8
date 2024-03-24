package sn.douanes.entities.keys;

import java.io.Serializable;

public class ChangementPieceId implements Serializable {

    private String identifiantMaintenance;
    private String identifiantAccident;


    public ChangementPieceId() {
    }

    public ChangementPieceId(String identifiantMaintenance, String identifiantAccident) {
        this.identifiantMaintenance = identifiantMaintenance;
        this.identifiantAccident = identifiantAccident;
    }
}
