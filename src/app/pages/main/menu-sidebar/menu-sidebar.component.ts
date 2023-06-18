import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { ApiService } from 'src/app/shared/api.service';
@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit {
  isAdmin:boolean=false;
  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  userName = localStorage.userName;
  role=localStorage.role;
  name:any;
  imageSrc: any;
  constructor(public appService: AppService, public apiService: ApiService) {}

  ngOnInit() {
    this.getUser();
  }

  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
  getUser() {
    this.apiService
      .postapi('api/GroceryRegistartion/getUserinfo?id=' + localStorage.id)
      .subscribe((resp) => {
        if (resp) {
           this.name = resp.lstItems.firstname;
          this.imageSrc = resp.lstItems.profilepic;
        }
      });
  }
}