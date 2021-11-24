import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

import i18next from "i18next";
import { intlMessage } from 'i18next-wc'

// initialize i18next
i18next.init({
  lng: 'en-GB',
  fallbackLng: "en",
  resources: {
    en: {
      default: {
        placeholder: 'fill in here',
        'Selected language': 'Selected language: {{value}}'
      },
    },
    fr: {
      default: {
        placeholder: 'remplir ici',
        'Selected language': 'Langue choisie : {{value}}'
      }
    }
  },
  defaultNS: 'default'
});

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return (
      <div>
        Hello, World! I'm {this.getText()}
        <input placeholder={intlMessage({i18next, label: 'placeholder'})} />
      </div>
    );
  }
}
