import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from '../../../services/User.model';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userModel: UserModel;
  @Output() emitOutput = new EventEmitter<any>();

  faBar = faBars;

constructor() { }

  ngOnInit(): void {
  }

  logout() {
    this.emitOutput.emit(this.userModel.uid);
  }

  onAvatarClick($event: MouseEvent) {
    document.body.classList.toggle('sidebar-open');
  }
}
