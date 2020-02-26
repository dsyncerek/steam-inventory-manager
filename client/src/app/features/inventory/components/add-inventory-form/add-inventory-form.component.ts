import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorsService } from '../../../../shared/services/form-errors.service';
import { Inventory } from '../../models/inventory';

@Component({
  selector: 'app-add-inventory-form',
  templateUrl: './add-inventory-form.component.html',
  styleUrls: ['./add-inventory-form.component.scss'],
})
export class AddInventoryFormComponent {
  @Input() adding: boolean = false;
  @Output() addInventory = new EventEmitter<Inventory>();

  form: FormGroup = this.formBuilder.group({
    appId: ['', Validators.required],
    contextId: ['', Validators.required],
  });

  appIdHintLink = 'https://steamdb.info/';

  constructor(private readonly formBuilder: FormBuilder, private readonly formErrors: FormErrorsService) {}

  submit(): void {
    if (this.form.valid) {
      const inventory: Inventory = { ...this.form.value };
      this.addInventory.emit(inventory);
    }
  }

  getControlErrorMessage(controlName: string): string {
    return this.formErrors.getControlErrorMessage(this.form, controlName);
  }
}
