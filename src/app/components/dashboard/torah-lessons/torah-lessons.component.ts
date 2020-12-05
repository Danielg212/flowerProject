import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-torah-lessons',
  templateUrl: './torah-lessons.component.html',
  styleUrls: ['./torah-lessons.component.scss']
})
export class TorahLessonsComponent implements OnInit {

  urls: Array<{ url: string, description: string }> = [];

  constructor() {
  }

  ngOnInit(): void {
    this.urls = [
      {
        description: 'למה לשמור טהרת המשפחה ואימתי האישה נעשית נדה',
        url: 'https://www.youtube.com/embed/aoStHZL_eHo?list=PLU6l-8Yz1RRjv-Y8ZsUD52Jn1E4ymnHvB'
      },
      {
        description: 'סדר טהרת האישה א\' - דיני הפסק טהרה',
        url: 'https://www.youtube.com/embed/VBKLz-UPeXY?list=PLU6l-8Yz1RRjv-Y8ZsUD52Jn1E4ymnHvB'
      },
      {
        description: 'סדר טהרת האישה ב\' - שבעה נקיים והפסקה בין הריונות',
        url: 'https://www.youtube.com/embed/FOR4lYvB5o0?list=PLU6l-8Yz1RRjv-Y8ZsUD52Jn1E4ymnHvB'
      },
      {
        description: 'דיני יום הטבילה - טהרת המשפחה',
        url: 'https://www.youtube.com/embed/RXYiNDKabKQ?list=PLU6l-8Yz1RRjv-Y8ZsUD52Jn1E4ymnHvB'
      },
      {
        description: 'דיני חציצה בטבילה - טהרת המשפחה',
        url: 'https://www.youtube.com/embed/kxX6tV-uDIo?list=PLU6l-8Yz1RRjv-Y8ZsUD52Jn1E4ymnHvB'
      },
      {
        description: 'דיני הרחקות בזמן האיסור א\'',
        url: 'https://www.youtube.com/embed/hE8Ad5iXUys?list=PLU6l-8Yz1RRjv-Y8ZsUD52Jn1E4ymnHvB'
      },
      {
        description: 'דיני הרחקות בזמן האיסור ב\'',
        url: 'https://www.youtube.com/embed/N_zY0uYkl3Y?list=PLU6l-8Yz1RRjv-Y8ZsUD52Jn1E4ymnHvB'
      },
      {
        description: 'דיני פרישה סמוך לוסת ורואה מחמת תשמיש ',
        url: 'https://www.youtube.com/embed/um8_PK2ZNl0?list=PLU6l-8Yz1RRjv-Y8ZsUD52Jn1E4ymnHvB'
      },
      {
        description: 'דיני כתמים',
        url: 'https://www.youtube.com/embed/mzlzkvovyNA?list=PLU6l-8Yz1RRjv-Y8ZsUD52Jn1E4ymnHvB'
      },
      {
        description: 'דיני אישות וקיום מצוות עונה',
        url: 'https://www.youtube.com/embed/BEqN46kMQTc?list=PLU6l-8Yz1RRjv-Y8ZsUD52Jn1E4ymnHvB'
      }
    ];
  }

}
