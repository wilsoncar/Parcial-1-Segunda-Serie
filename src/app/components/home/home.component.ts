import { ConfirmationService } from 'primeng/api';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from './../../services/home/home.service';
import { Subscription } from 'rxjs';
import { TokenStorageService } from './../../services/auth/token-storage.service';
import { User } from './../../../dto/app.dtos';
import { UtilsService } from './../../services/utils/utils.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  favoriteDogSubscription$: Subscription;
  randomImageSubscription$: Subscription;
  crateFavoriteDogSubscription$: Subscription;
  randomImage: any;
  user: User;
  favoriteDogNotSelected: string = null;
  nextDog: boolean;


  constructor(
    private readonly homeService: HomeService,
    private readonly tokenStorareService: TokenStorageService,
    private readonly utilsService: UtilsService,
    private confirmationService: ConfirmationService
  ) {
    this.nextDog = false;
  }

  ngOnInit(): void {
    this.loadFavoriteDog();
  }

  loadFavoriteDog() {
    const { mail } = this.tokenStorareService.getUser();
    this.favoriteDogSubscription$ = this.homeService.getFavoriteDog(mail).subscribe(entry => {
      if (entry.data.img) {
        this.randomImage = entry.data.img;
        this.favoriteDogNotSelected = 'Favorite Dog Selected';
      } else {
        this.randomImageSubscription$ = this.homeService.getRandomImage().subscribe(rand => {
          if (rand) {
            this.favoriteDogNotSelected = 'Favorite Dog Not Selected';
            this.randomImage = rand.data.message;
          }
        });
      }
    });
  }

  addFavoriteDog() {
    const { mail } = this.tokenStorareService.getUser();
    const obj = {
      email: mail,
      img: this.randomImage
    };
    if (!this.nextDog) {
      this.homeService.createFavoriteDog(obj).subscribe(entry => {
        if (entry) {
          this.utilsService.alerts.show({
            severity: 'success',
            summary: 'Favorite Dog',
            detail: 'The selected dog was successfully added as a favorite.'
          });
          this.favoriteDogNotSelected = 'Favorite Dog Selected';
        }
      });
    } else {
      this.confirm(obj);
    }
  }

  confirm(obj) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.homeService.updateFavoriteDog(obj).subscribe(entry => {
          if (entry) {
            this.utilsService.alerts.show({
              severity: 'success',
              summary: 'Favorite Dog Updated',
              detail: 'The selected dog was successfully added as a favorite.'
            });
            this.nextDog = false;
          }
        });
      }
    });
  }

  dogRandom() {
    this.randomImageSubscription$ = this.homeService.getRandomImage().subscribe(rand => {
      if (rand) {
        this.favoriteDogNotSelected = 'Favorite Dog Not Selected';
        this.randomImage = rand.data.message;
        this.nextDog = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.favoriteDogSubscription$) {
      this.favoriteDogSubscription$.unsubscribe();
    }
    if (this.randomImageSubscription$) {
      this.randomImageSubscription$.unsubscribe();
    }
    if (this.crateFavoriteDogSubscription$) {
      this.crateFavoriteDogSubscription$.unsubscribe();
    }
  }

}
