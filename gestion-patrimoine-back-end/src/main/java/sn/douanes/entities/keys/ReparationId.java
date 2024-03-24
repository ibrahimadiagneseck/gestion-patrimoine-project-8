package sn.douanes.entities.keys;

import java.io.Serializable;

public class ReparationId implements Serializable {

    private String identifiantMaintenance;
    private String identifiantAccident;


    public ReparationId() {
    }

    public ReparationId(String identifiantMaintenance, String identifiantAccident) {
        this.identifiantMaintenance = identifiantMaintenance;
        this.identifiantAccident = identifiantAccident;
    }
}
