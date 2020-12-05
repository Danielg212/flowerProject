import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  @Input() videoUrl: { url: string, description: string };
  public displayURL: SafeResourceUrl = null;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl.url);

  }

}
