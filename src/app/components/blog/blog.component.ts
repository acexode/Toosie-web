import { BlogService } from './../../core/service/blog/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs = []
  loading = false;
  constructor(private blogS: BlogService) { }

  ngOnInit(): void {
    this.loading = true
    this.blogS.blogStore.subscribe(e =>{
      console.log(e)
      this.loading = false
      this.blogs = e.blogs
    })
  }

}
