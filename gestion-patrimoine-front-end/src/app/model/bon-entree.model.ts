import { BordereauLivraison } from "./bordereau-livraison.model";
import { MyDate } from "./my-date.model";

export class BonEntree {

  public identifiantBonEntree: string;
  public numeroBonEntree: string;
  public dateBonEntree: MyDate;
  public identifiantBordereauLivraison: BordereauLivraison;
  public libelleBonEntree:string;
  public observationBonEntree:string;


  constructor(
    identifiantBonEntree = '',
    numeroBonEntree = '',
    dateBonEntree = new MyDate(),
    identifiantBordereauLivraison = new BordereauLivraison(),
    libelleBonEntree = '',
    observationBonEntree = '',

  ) {
    this.identifiantBonEntree = identifiantBonEntree;
    this.numeroBonEntree = numeroBonEntree;
    this.dateBonEntree = dateBonEntree;
    this.identifiantBordereauLivraison = identifiantBordereauLivraison;
    this.libelleBonEntree = libelleBonEntree;
    this.observationBonEntree = observationBonEntree;

  }

}
