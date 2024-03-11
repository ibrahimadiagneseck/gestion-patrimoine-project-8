import { Agent } from "./agent.model";
import { MyDate } from "./my-date.model";
import { Prestataires } from "./prestataires.model";
import { Sections } from "./sections.model";


export class BordereauLivraison {

  public identifiantBordereauLivraison: string;
  public numeroBordereauLivraison: string;
  public dateBordereauLivraison: MyDate;
  public descriptionBordereauLivraison: string;
  public lieuDeLivraison: string;
  public representantPrestataire: string;
  public codeSection: Sections;
  public conformiteBordereauLivraison: string;
  public matriculeAgent: Agent;
  public dateEnregistrement: MyDate;
  public ninea: Prestataires;


  constructor(
    identifiantBordereauLivraison: string = '',
    numeroBordereauLivraison: string = '',
    dateBordereauLivraison: MyDate = new MyDate(),
    descriptionBordereauLivraison: string = '',
    lieuDeLivraison: string = '',
    representantPrestataire: string = '',
    codeSection: Sections = new Sections(),
    conformiteBordereauLivraison: string = '',
    matriculeAgent: Agent = new Agent(),
    dateEnregistrement: MyDate = new MyDate(),
    ninea: Prestataires = new Prestataires()
  ) {
    this.identifiantBordereauLivraison = identifiantBordereauLivraison;
    this.numeroBordereauLivraison = numeroBordereauLivraison;
    this.dateBordereauLivraison = dateBordereauLivraison;
    this.descriptionBordereauLivraison = descriptionBordereauLivraison;
    this.lieuDeLivraison = lieuDeLivraison;
    this.representantPrestataire = representantPrestataire;
    this.codeSection = codeSection;
    this.conformiteBordereauLivraison = conformiteBordereauLivraison;
    this.matriculeAgent = matriculeAgent;
    this.dateEnregistrement = dateEnregistrement;
    this.ninea = ninea;
  }

}
