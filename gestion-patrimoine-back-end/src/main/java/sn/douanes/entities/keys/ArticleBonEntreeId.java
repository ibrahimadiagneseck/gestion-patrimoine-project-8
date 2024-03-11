package sn.douanes.entities.keys;

import sn.douanes.entities.BonEntree;

import java.io.Serializable;

public class ArticleBonEntreeId implements Serializable {

    private Integer codeArticleBonEntree;
    private String identifiantBonEntree;

    public ArticleBonEntreeId() {
    }

    public ArticleBonEntreeId(Integer codeArticleBonEntree, String identifiantBonEntree) {
        this.codeArticleBonEntree = codeArticleBonEntree;
        this.identifiantBonEntree = identifiantBonEntree;
    }
}
