import { Component } from '@angular/core';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'app-comments-preview',
  templateUrl: './comments-preview.component.html',
  styleUrls: ['./comments-preview.component.css']
})
export class CommentsPreviewComponent {
  comments: any[] = [];

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.comments = this.commentService.getComments();
  }
}
