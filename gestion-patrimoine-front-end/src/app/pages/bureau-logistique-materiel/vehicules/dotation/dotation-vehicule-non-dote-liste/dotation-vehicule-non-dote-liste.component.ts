import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicule } from 'src/app/model/vehicule.model';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpErrorResponse } from '@angular/common/http';
import { DotationVehiculeNonDoteAjouterComponent } from '../dotation-vehicule-non-dote-ajouter/dotation-vehicule-non-dote-ajouter.component';

@Component({
  selector: 'app-dotation-vehicule-non-dote-liste',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './dotation-vehicule-non-dote-liste.component.html',
  styleUrl: './dotation-vehicule-non-dote-liste.component.css'
})
export class DotationVehiculeNonDoteListeComponent implements OnInit, OnDestroy {

  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule | undefined;

  private subscriptions: Subscription[] = [];


  /* ----------------------------------------------------------------------------------------- */
  focusOnInput: boolean = false;

  @ViewChild('monDiv', { static: true }) monDiv: ElementRef | undefined;

  divClique(): void {
    // Code à exécuter lorsque l'élément <div> est cliqué
    // Par exemple, vous pouvez modifier une variable ou déclencher une action
    // console.log('L\'élément <div> a été cliqué !');
    this.focusOnInput = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Vérifie si le clic a eu lieu en dehors de l'élément monDiv
    if (!this.monDiv?.nativeElement.contains(event.target)) {
      // Code à exécuter lorsque le clic est en dehors de monDiv
      // console.log('Clic en dehors de monDiv détecté.');
      this.focusOnInput = false;
    }
  }
  /* ----------------------------------------------------------------------------------------- */


  /* ----------------------------------------------------------------------------------------- */
  @ViewChild('myInputSearch') myInputSearch!: ElementRef;
  // rechercher
  searchTerms = new Subject<string>();
  vehicules$: Observable<Vehicule[]> = of();
  // recherche custom
  searchTermsFilterDoubleNumeroSerieModele = new Subject<string>();
  termeRechercheNumeroSerieModele: string = "";
  vehiculeFilterDoubleNumeroSerieModele$: Observable<Vehicule[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  // columnsToCodeMarque: string[] = [
  //   "codeMarque"
  // ];
  // columnsToCodePays: string[] = [
  //   "codePays"
  // ];
  columnsDateFormat: string[] = [
    "dateMiseEnCirculation"
  ];
  columnsToHide: string[] = [
  ];
  dataSource = new MatTableDataSource<Vehicule>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "numeroSerie",
    "numeroImmatriculation",
    "numeroCarteGrise",
    "dateMiseEnCirculation",
  ];
  displayedColumnsCustom: string[] = [
    "N° serie",
    "N° immatriculation",
    "N° carte grise",
    "Date mise en circulation",
  ];
  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private vehiculeService: VehiculeService,
    private matDialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.listeVehicules();


    /* ----------------------------------------------------------------------------------------- */
    // rechercher
    this.vehicules$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.vehiculeService.searchVehiculeList(term, this.vehicules))
      // {.....List(ab)............List(abc)......}
    );
    this.vehiculeFilterDoubleNumeroSerieModele$ = this.searchTermsFilterDoubleNumeroSerieModele.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.vehiculeService.searchVehiculeListFilterDouble(term, this.vehicules))
      // {.....List(ab)............List(abc)......}
    );
    /* ----------------------------------------------------------------------------------------- */
  }


  generatePDF(): void {

    const data: Vehicule[] = this.dataSource.filteredData;
    // const data: any[] = this.dataSource.filteredData;

    // console.log(data);


    // const months = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];
    const months = ['JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'];
    const doc = new jsPDF();

    // Créez un tableau de données pour autoTable
    const tableData = data.map((item: Vehicule) => [
    // const tableData = data.map((item: any) => [

      item.numeroSerie,
      item.numeroImmatriculation,
      item.modele || 'N/A',
      item.numeroCarteGrise,
      item.dateMiseEnCirculation ? `${new Date(item.dateMiseEnCirculation.toString()).getDate()} ${months[new Date(item.dateMiseEnCirculation.toString()).getMonth()]} ${new Date(item.dateMiseEnCirculation.toString()).getFullYear()}` : 'N/A',
      // item.dateMiseEnCirculation ? `${new Date(item.dateMiseEnCirculation.toString()).getDate()} ${months[new Date(item.dateMiseEnCirculation.toString()).getMonth()]} ${new Date(item.dateMiseEnCirculation.toString()).getFullYear() % 100}` : 'N/A',
      // `${new Date(item.dateMiseEnCirculation).getDate()} ${months[new Date(item.dateMiseEnCirculation).getMonth()]} ${new Date(item.dateMiseEnCirculation).getFullYear() % 100}`,
    ]);

    // Configuration pour le PDF avec une taille de page personnalisée

    const marginLeft = 10;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 10;

    // Générer le tableau dans le PDF avec des styles de texte personnalisés
    autoTable(doc, {
      head: [
        [
          { content: 'N° serie', styles: { fontSize: 6 } },
          { content: 'N° immatriculation', styles: { fontSize: 6 } },
          { content: 'Modele', styles: { fontSize: 6 } },
          { content: 'N° carte grise', styles: { fontSize: 6 } },
          { content: 'Date mise en circulation', styles: { fontSize: 6 } },
  
        ]
      ],
      body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
      margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
      theme: 'plain'
    });

    doc.save('vehicule-liste.pdf');
  }


  search(term: string): void {
    this.termeRechercheNumeroSerieModele = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleNumeroSerieModele.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  FilterDoubleNumeroSerieModele(termeRechercheNumeroSerieModele: string) {
    this.termeRechercheNumeroSerieModele = termeRechercheNumeroSerieModele;
    this.myInputSearch.nativeElement.value = termeRechercheNumeroSerieModele;
    this.dataSource.filter = termeRechercheNumeroSerieModele.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRechercheNumeroSerieModele: string): boolean {
    return !isNaN(Number(termeRechercheNumeroSerieModele))
  }


  public listeVehicules(): void {

    const subscription = this.vehiculeService.listeVehicules().subscribe({
      next: (response: Vehicule[]) => {

        // console.log(response);


        // this.vehicules = response.sort((a, b) => parseInt(a.numeroImmatriculation) - parseInt(b.numeroImmatriculation));
        this.vehicules = response.sort((a, b) => Number(a.numeroImmatriculation) - Number(b.numeroImmatriculation));
        // this.vehicules = response.sort((a, b) => a.numeroImmatriculation.localeCompare(b.numeroImmatriculation));
        // this.vehicules = response.sort((a, b) => a.numeroChassis - b.numeroChassis);
        // this.vehicules = response.sort((a, b) => new Date(b.dateModification).getTime() - new Date(a.dateModification).getTime());



        // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
        this.dataSource = new MatTableDataSource<Vehicule>(this.vehicules.map((item) => ({
          ...item,
          // vehicule: [] as Vehicule[],
          // rowMarque: item.codeMarque.libelleMarque,
          // rowPays: item.codePays.libellePays,
          // rowEtat: item.codeEtat.libelleEtat,
          // rowTypeEnergie: item.codeTypeEnergie.libelleTypeEnergie,
          // rowTypeVehicule: item.codeTypeVehicule.libelleTypeVehicule
        })));


        // console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }



  popupDetail(vehicule: Vehicule): void {
    const dialogRef = this.matDialog.open(
      DotationVehiculeNonDoteAjouterComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: vehicule
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }


  compare(value1: String, value2: String): boolean {
    return value1 === value1;
  }


}
