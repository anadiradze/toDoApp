import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskItems, ITask } from 'src/app/shared/models/http-model.model';
import { Subject, takeUntil } from 'rxjs';
import { ChangesServiceService } from 'src/app/shared/services/changes-service.service';
import { ImageUploadServiceService } from 'src/app/shared/services/image-upload-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  modalForm!: FormGroup;
  @Input() taskToEdit!: ITask;
  editModeisOn = this.modalService.editModeisOn;

  maxNumOfCharacters: number = 70;

  //modalService
  index: number = this.modalService.index;
  length: number = this.modalService.tasks?.length;

  //priorities
  priorities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  statuses: TaskItems[] = [TaskItems.New, TaskItems.InProgress, TaskItems.Done];

  //task status enums
  newStatusEnum = this.changesService.newStatusEnum;
  inProgressStatusEnum = this.changesService.inProgressStatusEnum;
  doneStatusEnum = this.changesService.doneStatusEnum;

  //attach image
  selectedFile!: File;
  base64String!: string;
  imageSrc!: SafeUrl | undefined;
  images!: string[] | undefined;

  constructor(
    private modalService: ModalServiceService,
    private httpService: HttpServiceService,
    private changesService: ChangesServiceService,
    private imageUploadService: ImageUploadServiceService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    this.initModalForm();
    if (this.editModeisOn) {
      this.images = this.taskToEdit.images;
    }
  }

  initModalForm() {
    this.modalForm = new FormGroup({
      name: new FormControl(this.taskToEdit?.title, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      priority: new FormControl(this.taskToEdit?.priority),
      status: new FormControl(this.taskToEdit?.status),
      description: new FormControl(this.taskToEdit?.description),
     // image: new FormControl(this.imageSrc),
    });
  }

  get nameControl() {
    return this.modalForm.get('name') as FormControl;
  }
  get priorityControl() {
    return this.modalForm.get('priority') as FormControl;
  }
  get statusControl() {
    return this.modalForm.get('status') as FormControl;
  }
  get descriptionControl() {
    return this.modalForm.get('description') as FormControl;
  }
  get imageControl() {
    return this.modalForm.get('image') as FormControl;
  }

  // add task when user adds the task
  addTask() {
    const task: ITask = {
      title: this.nameControl.value,
      status: this.statusControl.value,
      priority: this.priorityControl.value,
      description: this.descriptionControl.value,
    };
    this.httpService
      .addTask(task)
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseTask) => {
        if (this.selectedFile) {
          this.postImage(responseTask);
        }
        this.changesService.refreshData = true;
        this.modalService.closeModal();
      });
  }

  // update task when user edits the task
  updateTask() {
    this.changesService
      .UpdateTask({
        ...this.taskToEdit,
        title: this.nameControl.value,
        priority: this.priorityControl.value,
        status: this.statusControl.value,
        description: this.descriptionControl.value,
        images: [...(this.taskToEdit.images ? this.taskToEdit.images : [])],
      })

      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.selectedFile) {
          this.postImage(this.taskToEdit);
        }
        this.changesService.refreshData = true;
        this.modalService.closeModal();
      });
  }

  // get to the next/previous task in edit mode
  nextTask(event: Event) {
    if (this.index + 1 === this.length) {
      this.index = -1;
    }
    this.taskToEdit = this.modalService.tasks[(this.index += 1)];
    this.initModalForm();
    event.stopPropagation();
  }

  previousTask(event: Event) {
    if (this.index - 1 < 0) {
      this.index = this.length;
    }
    this.taskToEdit = this.modalService.tasks[(this.index -= 1)];
    this.initModalForm();
    event.stopPropagation();
  }

  // change icon colors according to task list
  getIconSource(taskToEdit: ITask, side: string): string {
    return taskToEdit.status === this.newStatusEnum
      ? `../../../assets/red${side}.png`
      : taskToEdit.status === this.inProgressStatusEnum
      ? `../../../assets/yellow${side}.png`
      : taskToEdit.status === this.doneStatusEnum
      ? `../../../assets/green${side}.png`
      : '';
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.convertToBase64();
  }

  convertToBase64() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        this.base64String = reader.result as string;
        this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          e.target.result
        );
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  postImage(task: ITask) {
    this.imageUploadService.postImage(task, this.base64String).subscribe();
  }

  //prevent event bubbling - when user clicks backdrop modal closes, when user clicks on the modal itself, modal is still open
  onModalClick(event: MouseEvent) {
    event.stopPropagation();
  }

  //close the modal on backdrop click and on cancel click
  closeModal() {
    this.modalService.closeModal();
  }
}
