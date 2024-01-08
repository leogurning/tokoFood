import { Directive,
  HostListener,
  ElementRef,
  Input,
  OnInit,
  inject} from '@angular/core';

import { formatCurrency, formatNumber } from '@angular/common';
import { NgControl } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';  

@Directive({
  selector: '[FormatNumbers]',
  standalone: true
})
export class FormatNumbersDirective implements OnInit {
  private locale = inject(LOCALE_ID);
  private el = inject(ElementRef);
  control = inject(NgControl);
  //currencyChars = new RegExp('[\,]', 'g'); // we're going to remove commas and dots
  constructor() { }
  format = 'N0';
  digitsInfo = '1.0-0';
  @Input() currency = '$';
  @Input() sufix = '';
  @Input() decimalCharacter = null;
  @Input('FormatNumbers') set _(value: string) {
    this.format = value;
    if (this.format == 'N2') this.digitsInfo = '1.2-2';

    const parts = value.split(':');
    if (parts.length > 1) {
      this.format = parts[0];
      this.digitsInfo = parts[1];
    }
  }

  @HostListener('input', ["$event.target.value"]) onInput(e: string) {
    this.parse(e);
  };

  @HostListener('blur', ['$event.target']) blur(target: any) {
    target.value = this.parse(target.value);
  }
  
  @HostListener('focus', ['$event.target']) focus(target: any) {
    target.value = this.control.value;
  }
  
  navigationKeys: Array<string> = ['Backspace']; //Add keys as per requirement

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter, etc
      this.navigationKeys.indexOf(e.key) > -1 || 
        (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
        (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
        (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
        (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
        (e.key === 'a' && e.metaKey === true) || // Cmd+A (Mac)
        (e.key === 'c' && e.metaKey === true) || // Cmd+C (Mac)
        (e.key === 'v' && e.metaKey === true) || // Cmd+V (Mac)
        (e.key === 'x' && e.metaKey === true) // Cmd+X (Mac)
    ) {
        return;  // let it happen, don't do anything
    } else if (e.key === '.') // ALLOW . for Decimal
    {
        if (this.format != 'N0') return;
    }

    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
  event.preventDefault();
  const pastedInput: string = event.clipboardData!
    .getData('text/plain')
    .replace(/[^0-9\.]/g, ''); // get a digit-only string and dots for decimals
  document.execCommand('insertText', false, pastedInput);
}
@HostListener('drop', ['$event'])
onDrop(event: DragEvent) {
  event.preventDefault();
  const textData = event.dataTransfer!
    .getData('text').replace(/[^0-9\.]/g, '');
  this.el.nativeElement.focus();
  document.execCommand('insertText', false, textData);
}

  ngOnInit(): void {
    setTimeout(() => {
      this.el.nativeElement.value = this.parse(this.el.nativeElement.value);
    });
  }

  parse(value: any) {
    let newValue = value;
    // 1. test for non-number characters and replace/remove them
    //const numberFormat = parseInt(String(newValue).replace(this.currencyChars, ''));
    //console.log(newValue + ', '+ isFinite(newValue));
    
    if (!isFinite(newValue)) return 'error'
    if (this.format == 'C2')
      newValue = formatCurrency(value, this.locale, this.currency);
    if (this.format == 'N2')
      newValue = formatNumber(value, this.locale, this.digitsInfo);
    if (this.format == 'N0')
      newValue = formatNumber(value, this.locale, this.digitsInfo);
    if (this.format == 'NX')
      newValue = formatNumber(value, this.locale, this.digitsInfo);
    if (this.decimalCharacter)
      return (
        newValue.replace('.', 'x').replace(',', '.').replace('x', ',') +
        this.sufix
      );

    return newValue + this.sufix;
  }
}
