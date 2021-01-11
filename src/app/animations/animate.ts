import {animate, animateChild, group, query, stagger, style, transition, trigger, useAnimation} from '@angular/animations';
import {bounceIn} from 'ng-animate';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({opacity: 0}), animate('300ms', style({opacity: 1}))]
  ),
  transition(':leave',
    [style({opacity: 1}), animate('300ms', style({opacity: 0}))]
  )
]);
export const listAnimation = trigger('listAnimation', [
  transition('* => *', group([
    query(':enter',
      [
        animateChild(),
        style({opacity: 0, transform: 'translateY(-100px)'}),
        stagger(-30, [
          animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({opacity: 1, transform: 'none'}))
        ])
      ],
      {optional: true}
    ),
    query('@bounceAnimation', animateChild(), {optional: true}), // can use also @* as wildcard
    query(':leave',
      animate('200ms', style({opacity: 0})),
      {optional: true}
    )
  ]))
]);

export const bounceAnimation = trigger('bounceAnimation', [
  transition('* <=> *', useAnimation(bounceIn))
]);
