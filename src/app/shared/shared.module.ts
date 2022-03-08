import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmationService} from 'primeng/api';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MenuModule} from 'primeng/menu';
import {SpinnerModule} from 'primeng/spinner';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import {SelectButtonModule} from 'primeng/selectbutton';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import {MultiSelectModule} from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { StepsModule } from 'primeng/steps';
import { FieldsetModule } from 'primeng/fieldset';
import {InputTextModule} from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';
import {CarouselModule} from 'primeng/carousel';

@NgModule({
  imports: [
    CommonModule,
    TabViewModule,
    StepsModule,
    FieldsetModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ContextMenuModule,
    MenuModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    TreeTableModule,
    TreeModule,
    ButtonModule,
    ToastModule,
    CalendarModule,
    CardModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    SpinnerModule,
    CheckboxModule,
    PanelModule,
    FileUploadModule,
    SelectButtonModule,
    ConfirmDialogModule,
    TooltipModule,
    InputTextModule,
    BrowserAnimationsModule,
    MenubarModule,
    DialogModule,
    CarouselModule
  ],
  providers: [
    ConfirmationService
  ],
  declarations: [
  ],
  exports: [
    TabViewModule,
    StepsModule,
    FieldsetModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ContextMenuModule,
    MenuModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    TreeTableModule,
    TreeModule,
    ButtonModule,
    ToastModule,
    CalendarModule,
    CardModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    SpinnerModule,
    CheckboxModule,
    PanelModule,
    FileUploadModule,
    SelectButtonModule,
    ConfirmDialogModule,
    TooltipModule,
    HttpClientModule,
    InputTextModule,
    MenubarModule,
    DialogModule,
    CarouselModule
  ]
})
export class SharedModule { }
