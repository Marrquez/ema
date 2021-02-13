import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-mutual-interest',
  templateUrl: './mutual-interest.component.html',
  styleUrls: ['./mutual-interest.component.sass']
})
export class MutualInterestComponent implements OnInit {
  data = {
    date: '',
    edition: '',
    posts: [
      {
        title: '',
        img: '',
        description: '',
      },
      {
        title: '',
        img: '',
        description: '',
      },
      {
        title: '',
        img: '',
        description: '',
      },
      {
        title: '',
        img: '',
        description: '',
      },
    ],
    boletin: {
      title: 'BOLETÍN',
      urlVideo: 'https://www.youtube.com/watch?v=hY1pXSbs7hg',
    },
    footer: {
      banner: {
        title: '',
        content: '',
      },
      alert: {
        title: '',
        description: ''
      }
    }
  };

  constructor(
    private _sanitizer: DomSanitizer,
    private as: AuthService,
  ) { }

  ngOnInit(): void {
    this.as.getUser('A4FHgvrZwOdCLdevUbO15MsPCMs2').snapshotChanges().subscribe((data: any) => {
      const pageData = data.payload.toJSON();

      this.data.date = pageData.date ? pageData.date : new Date().toLocaleDateString();
      this.data.edition = pageData.edition;
      this.data.posts[0].title = pageData.posts.post1.title;
      this.data.posts[0].description = pageData.posts.post1.description;
      this.data.posts[1].img = pageData.posts.post2.img;
      this.data.posts[1].description = pageData.posts.post2.description;
      this.data.posts[2].img = pageData.posts.post3.img;
      this.data.posts[2].description = pageData.posts.post3.description;
      this.data.posts[3].title = pageData.posts.post4.title;
      this.data.posts[3].description = pageData.posts.post4.description;
      this.data.boletin.title = pageData.boletin.title;
      this.data.boletin.urlVideo = pageData.boletin.urlVideo;
      this.data.footer.banner.title = pageData.footer.banner.title;
      this.data.footer.banner.content = pageData.footer.banner.description;
      this.data.footer.alert.title = pageData.footer.alert.title;
      this.data.footer.alert.description = pageData.footer.alert.description;
    });
  }

  getSafeURL(url: string) {
    const videoURL = url.replace("watch?v=", "embed/");
    return this._sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }
}
