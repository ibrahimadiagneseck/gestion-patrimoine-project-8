package sn.douanes.entities.keys;

import java.io.Serializable;

public class TolerieId implements Serializable {

    private String identifiantMaintenance;
    private String identifiantAccident;


    public TolerieId() {
    }

    public TolerieId(String identifiantMaintenance, String identifiantAccident) {
        this.identifiantMaintenance = identifiantMaintenance;
        this.identifiantAccident = identifiantAccident;
    }
}
