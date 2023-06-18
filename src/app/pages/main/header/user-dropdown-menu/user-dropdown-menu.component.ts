import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { ApiService } from 'src/app/shared/api.service';
@Component({
  selector: 'app-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styleUrls: ['./user-dropdown-menu.component.css']
})
export class UserDropdownMenuComponent implements OnInit {
  public user;
  name: string;
  imageSrc: any;

  @ViewChild('dropdownMenu', { static: false }) dropdownMenu;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private appService: AppService,
    public apiService: ApiService
  ) {}

  ngOnInit(): void {
   // this.user = this.appService.user;
    this.getUser();
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
  toggleDropdownMenu() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.hideDropdownMenu();
    } else {
      this.showDropdownMenu();
    }
  }

  showDropdownMenu() {
    this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  }

  hideDropdownMenu() {
    this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  }

  logout() {
    this.appService.logout();
  }
}
