import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  showDropdown: boolean = false;
  searchGroup: FormGroup;
  @Input() name: string;
  @Input() array: Array<string> = [];
  @Input() events: Observable<string>;
  @Output() sendValue: EventEmitter<Object> = new EventEmitter<Object>();

  ngOnInit() {
    this.initSearchGroup();
    this.events.subscribe((res) => {
      if (res === this.name) {
        this.emitSearchedValue();
      }
    });
  }

  initSearchGroup() {
    this.searchGroup = this.fb.group({
      search: ''
    });
  }

  setDropdown(value: boolean) {
    if (value) {
      this.searchGroup.patchValue({search: ''});
    }
    this.showDropdown = value;
  }

  selectValue(value) {
    this.searchGroup.patchValue({search: value});
    this.setDropdown(false);
  }

  getSearchValue() {
    return this.searchGroup.value.search;
  }

  emitSearchedValue() {
    if (this.array.indexOf(this.searchGroup.value.search) !== -1) {
      this.sendValue.emit({
        name: this.name,
        value: this.searchGroup.value.search
      });
    } else {
      this.sendValue.emit({
        name: this.name,
        value: ''
      });
    }
  }
}
