import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'boldMarkdown', standalone: true })
export class BoldMarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    // HTML-escape all content first to prevent XSS, then convert **text** → <strong>text</strong>
    const escaped = value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
    const bolded = escaped.replace(/\*\*(.+?)\*\*/gs, '<strong>$1</strong>');
    return this.sanitizer.bypassSecurityTrustHtml(bolded);
  }
}
