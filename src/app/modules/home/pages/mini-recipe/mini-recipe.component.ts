import {Component, OnInit, Input} from '@angular/core';
import {server} from 'src/environments/api-environment';
import {Router} from '@angular/router';
import {HomeRoute} from '../../home.route';

@Component({
  selector: 'app-mini-recipe',
  templateUrl: './mini-recipe.component.html',
  styleUrls: ['./mini-recipe.component.scss']
})

export class MiniRecipeComponent implements OnInit {

  constructor(private router: Router) {
  }

  private imgPrefix = `${server.address}/public/`;

  @Input() id: string;
  @Input() name: string;
  @Input() desc: string;
  @Input() author: string;
  @Input() imgPath: string;


  ngOnInit() {
  }

  showRecipeDetails() {
    this.router.navigate([`${this.router.url}/${HomeRoute.RECIPE_DETAILS}`, this.id]);
  }

}
