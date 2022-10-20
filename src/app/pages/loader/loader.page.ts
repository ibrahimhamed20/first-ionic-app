import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this._router.navigate(['login']);
    }, 1000);
  }

}
