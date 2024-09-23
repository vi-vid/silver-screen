import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, Signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchFormStore } from './search-form.store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SearchFormService } from './search-form.service';

@UntilDestroy()
@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchFormStore, SearchFormService]
})
export class SearchFormComponent implements OnInit {
  private input = viewChild.required<ElementRef>('search');
  private readonly searchFormStore = inject(SearchFormStore);
  private readonly searchFormService = inject(SearchFormService);

  public searchFormControl = new FormControl<string>('');

  public vm = this.searchFormStore.vm;

  private searchFormControlValueChanges$ = this.searchFormControl.valueChanges;

  public ngOnInit(): void {
     this.input().nativeElement.focus();

     this.searchFormControlValueChanges$.pipe(untilDestroyed(this)).subscribe((searchTerm) => {
      if (searchTerm) {
        this.searchFormStore.searchMovie(searchTerm);
      }
     });
  }

  public addMovieToFavorites(id: string): void {
    this.searchFormService.addMovieToFavorites(id);
  }
}
