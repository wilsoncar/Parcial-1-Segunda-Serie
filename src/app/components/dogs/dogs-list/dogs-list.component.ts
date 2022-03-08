import { Component, OnInit, OnDestroy } from '@angular/core';
import { DogsService } from './../../../services/dogs/dogs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.css']
})
export class DogsListComponent implements OnInit, OnDestroy {

  dogsListSubscription$: Subscription;
  gallerySubscription$: Subscription;
  dogs: any[] = [];
  display: boolean;
  randomImages: any[] = [];
  responsiveOptions: any;

  constructor(private readonly dogsService: DogsService) {
    this.display = false;
    this.responsiveOptions = [
      {
        breakpoint: '500px',
        numVisible: 4,
        numScroll: 4
      },
      {
        breakpoint: '500px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '500px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '500px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  tableColumns: any[];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dogsListSubscription$ = this.dogsService.getAllDogs().subscribe(entry => {
      const finalDogs = [];
      for (let prop in entry.data.message) {
        finalDogs.push({ breed: prop, subbreed: entry.data.message[prop] });
      }
      this.dogs = finalDogs;
    });
  }

  filterResults(event) {
    const filterResults = this.dogs.filter(entry => entry.breed !== event);
    this.dogs = [];
    this.dogs = filterResults;
  }

  showDialog() {
    this.display = true;
    this.gallerySubscription$ = this.dogsService.getGalleryDogs().subscribe(entry => {
      this.randomImages = entry.data.message;
    });
  }

  ngOnDestroy(): void {
    if (this.dogsListSubscription$) {
      this.dogsListSubscription$.unsubscribe();
    }
    if (this.gallerySubscription$) {
      this.gallerySubscription$.unsubscribe();
    }
  }

}
