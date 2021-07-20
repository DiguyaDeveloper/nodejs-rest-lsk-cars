import { VeiculeService } from './services/veicule.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ToastComponent } from './components/toast/toast.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ToastComponent,
  ],
  imports: [
    NgbModule,
    RouterModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ToastComponent
  ],
  providers: [VeiculeService]
})
export class SharedModule { }
