import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiPaginationLinks } from '../core/response/ApiPaginationLinks';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {


    //Gets the Array of apiLinks from the parentClass.
  /* for first page, lastPage, nextPage, previousPage */
  @Input() pageLinks : ApiPaginationLinks[] = []; 
  @Output() pageUrl =  new EventEmitter<string>(); //Emits the URL of pagination.
  @Output() contentSize = new EventEmitter<number>(); //Emits the ContentSize.

  // toastrService = inject(ToastrService);
  isMobile = false;

  /*dynamicContentSize variable that is only used within this component. */
  contentSizeSelf = 10;


  
    readonly panelOpenState = signal(false);

    /*changing "self","first", "last" ..... to proper url .*/
    changingRelToUrl(rel: string){
      console.log(`button clicked on the pagination on ${rel}`);
      const singleLink = this.pageLinks.find((link)=> link.rel===rel );
      console.log("This is the pagination link I am requesting for : ",singleLink);
      if(!singleLink){
        // this.toastrService.info(`${rel} Page Not Found.`)
        console.log(`rel : ${rel} not found in the given pagination request param. paginationComponent.ts`);
      }else{
        const url = singleLink.href;
        this.toSpecificPage(url);
      }
    }


    toSpecificPage(url : string){
      console.log(`Emitting the url ${url} from pagination component.`)
      this.pageUrl.emit(url);
    }



  /* ------------------------------------------FOR CONTENT SIZE---------------------------------------------------------------------- */

  //getting Array of number for content size.
  getcontentSize() : number[]{
    let contentSize : number[] = [] ;
    for(let i=10; i<=50; i+=5){
      contentSize.push(i);
    }
    return contentSize;
  }

  //when the user selects the content size it is emmited.
  onContentSizeChange(){
    // const contentSize = parseInt((event.target as HTMLSelectElement).value);
    // const content = this.contentSize;
    this.contentSize.emit(this.contentSizeSelf);
    console.log(`Emitting ${this.contentSizeSelf} content per page from pagination Component`);
  }



  
}
