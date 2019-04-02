
import { Component, OnInit } from '@angular/core';
import{FormControl} from '@angular/forms';
import{GithubService} from '../../services/github.service';
import {EMPTY, from} from 'rxjs';
import {User} from '../../component/models/user.model';
import {filter, switchMap, debounceTime, catchError} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private githubService: GithubService) { }
findControl = new FormControl();
error: boolean = false;
user:User = null;

  ngOnInit() {
    this.findControl.valueChanges
    .pipe(filter(value=> value.length > 3),
    debounceTime(1000),
    switchMap(value => this.githubService.getUser(value).pipe(catchError(err => {
      this.user = null;
      this.error = true;
      return EMPTY;
    })))
    ).subscribe(user => this.user = user );
  }

}
