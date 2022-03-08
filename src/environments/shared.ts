export class SharedEndpoints {
  END_POINTS: any;
  API_URL: string;
  constructor(API_URL: string) {
    this.API_URL = API_URL;
    this.END_POINTS = {
      CREATE_USER: this.API_URL + '/register',
      ACTIVATE_USER: this.API_URL + '/activate-user',
      LOGIN: this.API_URL + '/login',
      HOME: this.API_URL + '/dogs',
      RANDOM_IMAGE: this.API_URL + '/dogs/random-image',
      FAVORITE_DOG: this.API_URL + '/dogs/favorite-dog',
      CREATE_FAVORITE_DOG: this.API_URL + '/dogs/add-favorite-dog',
      UPDATE_FAVORITE_DOG: this.API_URL + '/dogs/update-favorite-dog',
      GALLERY: this.API_URL + '/dogs/random-images'
    };
  }
}
